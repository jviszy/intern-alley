import { Injectable, NotFoundException } from '@nestjs/common';
import { Pool } from 'pg';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JobsService {
  private pool: Pool;

  constructor(private prisma: PrismaService) {
    const databaseUrl = process.env.DATABASE_URL
      ?.replace('?sslmode=require&schema=public', '?schema=public')
      ?.replace('&sslmode=require', '');

    this.pool = new Pool({
      connectionString: databaseUrl,
      ssl: {
        rejectUnauthorized: false,
      },
      max: 5,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 30000,
    });
  }

  async findAll(query?: any) {
    const result = await this.pool.query(`
      SELECT 
        j.*,
        json_build_object(
          'id', c.id,
          'ownerUserId', c."ownerUserId",
          'name', c.name,
          'description', c.description,
          'website', c.website,
          'industry', c.industry,
          'location', c.location,
          'logoUrl', c."logoUrl",
          'createdAt', c."createdAt",
          'updatedAt', c."updatedAt"
        ) AS company
      FROM "Job" j
      JOIN "Company" c ON c.id = j."companyId"
      WHERE j.status = 'OPEN'
      ORDER BY j."createdAt" DESC
    `);

    return result.rows;
  }

  async companyJobs(userId: string) {
    const company = await this.prisma.company.findUnique({
      where: { ownerUserId: userId },
    });

    if (!company) {
      throw new NotFoundException('Company profile not found');
    }

    return this.prisma.job.findMany({
      where: { companyId: company.id },
      include: { company: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(userId: string, dto: any) {
    const company = await this.prisma.company.findUnique({
      where: { ownerUserId: userId },
    });

    if (!company) {
      throw new NotFoundException('Company profile not found');
    }

    return this.prisma.job.create({
      data: {
        companyId: company.id,
        title: dto.title,
        description: dto.description,
        location: dto.location,
        jobType: dto.jobType,
        workMode: dto.workMode,
        requiredSkills: dto.requiredSkills || [],
        salaryMin: dto.salaryMin,
        salaryMax: dto.salaryMax,
        deadline: dto.deadline ? new Date(dto.deadline) : null,
      },
      include: {
        company: true,
      },
    });
  }

  async update(userId: string, jobId: string, dto: any) {
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
      include: {
        company: true,
      },
    });

    if (!job || job.company.ownerUserId !== userId) {
      throw new NotFoundException('Job not found');
    }

    return this.prisma.job.update({
      where: { id: jobId },
      data: dto,
      include: {
        company: true,
      },
    });
  }
}