import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { CreateTemplateDto } from './dto/create-template.dto';

@Injectable()
export class OnboardingService {
  private readonly logger = new Logger(OnboardingService.name);

  // ---------------------------------------------------------
  // 1. APPLICANT MOCK METHODS
  // ---------------------------------------------------------

  getEmployeeProgress(employeeId: string) {
    return {
      employeeId: employeeId,
      overallProgress: 45,
      tasks: [
        { id: 'task-1', title: 'Upload Valid ID', status: 'pending' },
        { id: 'task-2', title: 'Sign Contract', status: 'approved' }
      ]
    };
  }

  uploadDocument(taskId: string, file: Express.Multer.File) {
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB limit

    if (!file) {
      throw new BadRequestException('No file uploaded.');
    }

    if (file.mimetype !== 'application/pdf') {
      throw new BadRequestException('Invalid file type. Only PDF is allowed.');
    }

    if (file.size > MAX_SIZE) {
      throw new BadRequestException('File is too large. Maximum size is 5MB.');
    }

    this.logger.log(`Valid PDF uploaded for task: ${taskId}`);

    return {
      message: 'Document uploaded successfully',
      taskId: taskId,
      status: 'submitted',
    };
  }

  // ---------------------------------------------------------
  // 2. HR MOCK METHODS 
  // ---------------------------------------------------------

  getAllOnboardingEmployees() {
    return [
      {
        id: 'mock-applicant-1',
        name: 'John Doe',
        position: 'Software Engineer',
        startDate: '2026-04-01', // Example date matching your project context
        overallProgress: 45,
        status: 'In Progress',
      },
      {
        id: 'mock-applicant-2',
        name: 'Jane Smith',
        position: 'Data Analyst',
        startDate: '2026-04-15',
        overallProgress: 100,
        status: 'For Review', // HR needs to approve this one!
      }
    ];
  }

  updateTaskStatus(taskId: string, dto: UpdateTaskStatusDto) {
    this.logger.log(`HR updated task ${taskId} to: ${dto.status}`);
    
    return {
      message: `Task successfully marked as ${dto.status}`,
      taskId: taskId,
      updatedStatus: dto.status,
      remarks: dto.remarks || null
    };
  }

  // ---------------------------------------------------------
  // 3. SYSTEM ADMIN MOCK METHODS
  // ---------------------------------------------------------

  createTemplate(dto: CreateTemplateDto) {
    this.logger.log(`Admin created new requirement: ${dto.taskName}`);
    
    return {
      message: 'Onboarding template created successfully',
      template: {
        id: `template-${Math.floor(Math.random() * 1000)}`,
        taskName: dto.taskName,
        description: dto.description,
        deadlineDays: dto.deadlineDays
      }
    };
  }
}