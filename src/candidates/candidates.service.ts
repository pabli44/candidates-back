import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Candidate } from './models/Candidate';
import { Model } from 'mongoose';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';


@Injectable()
export class CandidatesService {

    constructor(@InjectModel(Candidate.name) private candidateModel: Model<Candidate>) {}



    async findAll(): Promise<Candidate[]> {
        return this.candidateModel.find().exec();
    }

    async createCandidate(candidate: CreateCandidateDto){
        const newCandidate = new this.candidateModel(candidate);
        return await newCandidate.save();
    }

    async findCandidateById(id: string): Promise<Candidate> {
        const findCandidate = await this.candidateModel.findById(id);
        if(!findCandidate){
            throw new NotFoundException(`Candidate with id ${id} not found`);
        }

        return findCandidate;
    }

    async updateCandidate(id: string, updateCandidate: UpdateCandidateDto): Promise<Candidate> {
        const updatedCandidate = await this.candidateModel
            .findByIdAndUpdate(
                id, 
                { $set: updateCandidate }, 
                { new: true, runValidators: true } 
            )
            .exec();

        if (!updatedCandidate) {
            throw new NotFoundException(`Candidate with id ${id} not found`);
        }

        return updatedCandidate;
    }

    async deleteById(id: string): Promise<Candidate> {
        const deletedCandidate = await this.candidateModel.findByIdAndDelete(id);
        if (!deletedCandidate) {
            throw new NotFoundException(`Candidate with id ${id} not found`);
        }
        return deletedCandidate;
    }
}
