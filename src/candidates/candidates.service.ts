import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Candidate } from './models/Candidate';
import { Model } from 'mongoose';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import * as XLSX from 'xlsx';


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

    async createWithExcel(file: Express.Multer.File, name: string, surname: string) {
        const workbook = XLSX.read(file.buffer, { type: 'buffer' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        
        const excelData = XLSX.utils.sheet_to_json(firstSheet)[0] as any;

        const candidate: CreateCandidateDto = {
            name,
            surname,
            seniority: excelData.Seniority,
            years: excelData.Years,
            availability: String(excelData.Availability).toLowerCase() === 'true'
        };

        return this.createCandidate(candidate);
    }


    async findCandidateById(id: string): Promise<Candidate> {
        const findCandidate = await this.candidateModel.findById(id).exec();
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
        const deletedCandidate = await this.candidateModel.findByIdAndDelete(id).exec();
        if (!deletedCandidate) {
            throw new NotFoundException(`Candidate with id ${id} not found`);
        }
        return deletedCandidate;
    }
}
