import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CandidatesController } from './candidates/candidates.controller';
import { CandidatesService } from './candidates/candidates.service';
import { CreateCandidateDto } from './candidates/dto/create-candidate.dto';
import { CandidatesModule } from './candidates/candidates.module';

@Module({
  imports: [CandidatesModule],
  controllers: [AppController, CandidatesController],
  providers: [AppService, CandidatesService, CreateCandidateDto],
})
export class AppModule {}
