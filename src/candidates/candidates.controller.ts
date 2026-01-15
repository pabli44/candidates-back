import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { CandidatesService } from './candidates.service';
import { Candidate } from './models/Candidate';


@Controller('candidates')
export class CandidatesController {

    constructor(private readonly candidatesService: CandidatesService) {}


    @Get()
    findAll(): Candidate[] {
        return this.candidatesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Candidate {
        console.log(id);
        return this.candidatesService.findOne(id);
    }

    @Post()
    createCandidate(@Body() candidate: CreateCandidateDto): string {
        return 'This action adds a new Candidate';
    }

    @Put(':id')
    update(@Body() candidate: CreateCandidateDto, @Param('id') id: number): string {
        return 'This action update a Candidate';
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): Candidate {
        return this.candidatesService.delete(id);
    }
}
