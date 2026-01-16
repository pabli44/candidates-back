import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common/decorators';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { CandidatesService } from './candidates.service';
import { Candidate } from './models/Candidate';
import { UpdateCandidateDto } from './dto/update-candidate.dto';


@Controller('candidates')
export class CandidatesController {

    constructor(private readonly candidatesService: CandidatesService) {}


    @Get()
    findAll(): Promise<Candidate[]> {
        return this.candidatesService.findAll();
    }

    @Post()
    createCandidate(@Body() candidate: CreateCandidateDto): Promise<Candidate> {
        return this.candidatesService.createCandidate(candidate);
    }

    @Post('/upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadCandidateFile(
        @UploadedFile() file: Express.Multer.File, 
        @Body('name') name: string, 
        @Body('surname') surname: string
    ): Promise<Candidate> {
        return this.candidatesService.createWithExcel(file, name, surname);
    }
    
    @Get(':id')
    findById(@Param('id') id: string): Promise<Candidate> {
        return this.candidatesService.findCandidateById(id);
    }

    @Put(':id')
    update(@Body() updateCandidate: UpdateCandidateDto, @Param('id') id: string): Promise<Candidate> {
        return this.candidatesService.updateCandidate(id, updateCandidate);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<Candidate> {
        return this.candidatesService.deleteById(id);
    }
}
