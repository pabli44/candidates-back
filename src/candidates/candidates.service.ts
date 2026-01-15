import { Injectable, NotFoundException } from '@nestjs/common';
import { Candidate } from './models/Candidate';


@Injectable()
export class CandidatesService {

    candidates: Candidate[] = [
        {
            id: 1, 
            name: 'John Doe', 
            surname: 'Doe', 
            seniority: 'Senior', 
            years: 5, 
            availability: true
        },
        { 
            id: 2, 
            name: 'Jane Smith', 
            surname: 'Smith', 
            seniority: 'Junior', 
            years: 1, 
            availability: false 
        },
        {
            id: 3,
            name: 'Bob Johnson',
            surname: 'Johnson',
            seniority: 'Mid-Level',
            years: 3,
            availability: true
        }
    ]

    findAll(): Candidate[] {
        return this.candidates;
    }

    findOne(id: number): Candidate {
        const candidate = this.candidates.find(candidate => candidate.id === id);
        if (!candidate) {
            throw new NotFoundException(`Candidate with id ${id} not found`);
        }

        return candidate;
    }

    
    create(candidate) {
        this.candidates.push(candidate);
        return candidate;
    }

    update(id: number, updatedCandidate) {
        const index = this.candidates.findIndex(candidate => candidate.id === id);
        if (index !== -1) {
            this.candidates[index] = updatedCandidate;
            return updatedCandidate;
        }
        return null;
    }

    delete(id: number): Candidate {
        const candidate = this.findOne(id);
        this.candidates.splice(candidate.id - 1, 1);

        return candidate;
    }
    

}
