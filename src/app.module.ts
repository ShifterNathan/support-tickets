import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClaimsModule } from './claims/claims.module';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [

    ConfigModule.forRoot(),
    // GraphQL config to block the schema if token is not provided/valid
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [ AuthModule ],
      inject: [ JwtService ] ,
      useFactory: async( jwtService: JwtService) => ({
        playground: false,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        sortSchema: true,
        plugins: [
          ApolloServerPluginLandingPageLocalDefault()
        ],
        context({ req }) {
          const token = req.headers.authorization?.replace('Bearer ','') 
          if ( !token ) throw Error ('Token needed');
          
          const payload = jwtService.decode( token );
          if ( !payload ) throw Error ('Invalid token')
          
        }
      })
    }),

    // GraphQL common config
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   //debug: false,
    //   playground: false,
    //   autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    //   sortSchema: true,
    //   plugins: [
    //     ApolloServerPluginLandingPageLocalDefault()
    //   ],

    // }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME ,
      synchronize: true,
      autoLoadEntities: true,
      retryAttempts: 3,
      retryDelay: 3000,
    }),

    ClaimsModule,
    UsersModule,
    AuthModule,
    SeedModule,

    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
