import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ApplicationStatus, JobStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ApplicationsService {
  constructor(private prisma: PrismaService) {}

  async apply(userId: string, dto: any) {
    const intern = await this.prisma.internProfile.findUnique({
      where: { userId },
    });

    if (!intern) {
      throw new ForbiddenException('Intern profile required');
    }

    const job = await this.prisma.job.findUnique({
      where: { id: dto.jobId },
    });

    if (!job || job.status !== JobStatus.OPEN) {
      throw new NotFoundException('Open job not found');
    }

    const existing = await this.prisma.application.findUnique({
      where: {
        jobId_internId: {
          jobId: dto.jobId,
          internId: intern.id,
        },
      },
    });

    if (existing) {
      throw new ConflictException('You have already applied to this job');
    }

    return this.prisma.application.create({
      data: {
        jobId: dto.jobId,
        internId: intern.id,
        coverLetter: dto.coverLetter,
      },
      include: {
        job: {
          include: {
            company: true,
          },
        },
      },
    });
  }

  async myApplications(userId: string) {
    const intern = await this.prisma.internProfile.findUnique({
      where: { userId },
    });

    if (!intern) {
      throw new ForbiddenException('Intern profile required');
    }

    return this.prisma.application.findMany({
      where: {
        internId: intern.id,
      },
      include: {
        job: {
          include: {
            company: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async jobApplications(userId: string, jobId: string) {
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
      include: {
        company: true,
      },
    });

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    if (job.company.ownerUserId !== userId) {
      throw new ForbiddenException();
    }

    return this.prisma.application.findMany({
      where: {
        jobId,
      },
      include: {
        intern: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                role: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async updateStatus(userId: string, applicationId: string, status: ApplicationStatus) {
    const application = await this.prisma.application.findUnique({
      where: {
        id: applicationId,
      },
      include: {
        job: {
          include: {
            company: true,
          },
        },
      },
    });

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    if (application.job.company.ownerUserId !== userId) {
      throw new ForbiddenException();
    }

    return this.prisma.application.update({
      where: {
        id: applicationId,
      },
      data: {
        status,
      },
    });
  }
}