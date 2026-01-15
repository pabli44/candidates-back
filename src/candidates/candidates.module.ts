import { Module } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CandidatesController } from './candidates.controller';

@Module({
    imports: [],
    controllers: [CandidatesController],
    providers: [CandidatesService]
})
export class CandidatesModule {}
