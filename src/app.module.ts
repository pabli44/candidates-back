import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CandidatesController } from './candidates/candidates.controller';
import { CandidatesService } from './candidates/candidates.service';
import { CreateCandidateDto } from './candidates/dto/create-candidate.dto';
import { UpdateCandidateDto} from './candidates/dto/update-candidate.dto';
import { CandidatesModule } from './candidates/candidates.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [CandidatesModule, MongooseModule.forRoot('mongodb://localhost/candidates-db')],
  controllers: [AppController, CandidatesController],
  providers: [AppService, CandidatesService, CreateCandidateDto, UpdateCandidateDto]
})
export class AppModule {}
