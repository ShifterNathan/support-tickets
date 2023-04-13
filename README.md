<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


# Installations: 

1. Node: https://nodejs.org/en/download
2. Docker: https://www.docker.com
3. TablePlus: https://tableplus.com

4. Install yarn executing this command:
```
npm install --global yarn
```
5. Install nest executing the following command
```
yarn add @nestjs/cli
```

# Dev

1. Clone the project
2. Copy the ```.env.template``` and rename it to ```.env```
3. Fill the empty variables as you wish
4. Execute:
```
yarn install
```
5. Raise up the Docker image:
```
docker-compose up -d
```
6. Connect the DB running in the container with TablePlus using the same data from the .env
7. Run the project as dev mode:
```
yarn start:dev
```

8. Check out the .pdf file and find how to use the app and how was the development process
