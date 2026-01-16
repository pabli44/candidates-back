import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
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
