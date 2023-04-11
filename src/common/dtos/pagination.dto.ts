import { IsOptional, IsPositive, Min } from "class-validator";


export class paginationDto {

    @IsOptional()
    @IsPositive()
    @Min(1)
    limit?: number;

    @IsOptional()
    @IsPositive()
    offset?: number;
}