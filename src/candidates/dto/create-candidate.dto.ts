import { IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export class CreateCandidateDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    surname: string;

    @IsString()
    @IsNotEmpty()
    seniority: string;

    @IsNumber()
    @IsNotEmpty()
    years: number;

    @IsBoolean()
    @IsNotEmpty()
    availability: boolean;
}