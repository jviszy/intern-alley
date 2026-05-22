import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  Req,
  Param,
  UseGuards,
} from '@nestjs/common';

import { JobsService } from './jobs.service';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

import { Roles } from '../common/decorators/roles.decorator';

import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Get()
  findAll(@Query() query: any) {
    return this.jobsService.findAll(query);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('COMPANY_ADMIN')
  @Post()
  create(
    @Req() req: any,
    @Body() dto: CreateJobDto,
  ) {
    return this.jobsService.create(
      req.user.userId,
      dto,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('COMPANY_ADMIN')
  @Get('company/me')
  companyJobs(@Req() req: any) {
    return this.jobsService.companyJobs(
      req.user.userId,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('COMPANY_ADMIN')
  @Patch(':id')
  update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: UpdateJobDto,
  ) {
    return this.jobsService.update(
      req.user.userId,
      id,
      dto,
    );
  }
}