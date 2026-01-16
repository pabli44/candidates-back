import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CandidateDocument = HydratedDocument<Candidate>;

@Schema()
export class Candidate {
  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop()
  seniority: string;

  @Prop()
  years: number;

  @Prop()
  availability: boolean;
}

export const CandidateSchema = SchemaFactory.createForClass(Candidate);
