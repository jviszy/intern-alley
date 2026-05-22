import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

import {
  JobStatus,
  JobType,
  WorkMode,
} from '@prisma/client';

export class CreateJobDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  location: string;

  @IsEnum(JobType)
  jobType: JobType;

  @IsEnum(WorkMode)
  workMode: WorkMode;

  @IsArray()
  requiredSkills: string[];

  @IsOptional()
  salaryMin?: number;

  @IsOptional()
  salaryMax?: number;

  @IsOptional()
  deadline?: string;

  @IsEnum(JobStatus)
  status: JobStatus;
}