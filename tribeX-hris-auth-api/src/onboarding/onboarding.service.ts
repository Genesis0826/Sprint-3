import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { CreateTemplateDto } from './dto/create-template.dto';

@Injectable()
export class OnboardingService {
  private readonly logger = new Logger(OnboardingService.name);

  
  getEmployeeProgress(employeeId: string) {
    const tasks = [
      { id: '1', title: 'Review Handbook', status: 'pending', isRequired: true, type: 'confirm' },
      { id: '2', title: 'NBI Clearance', status: 'approved', isRequired: true, type: 'upload' },
      { id: '3', title: 'Equipment Proof', status: 'pending', isRequired: false, type: 'upload' }
    ];

  
    const required = tasks.filter(t => t.isRequired);
    const completed = required.filter(t => t.status === 'approved' || t.status === 'confirmed').length;
    const progress = required.length > 0 ? Math.round((completed / required.length) * 100) : 0;

    return { employeeId, overallProgress: progress, tasks };
  }

  uploadDocument(taskId: string, file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file uploaded.');
    
    
    if (!['application/pdf', 'image/jpeg', 'image/png'].includes(file.mimetype)) {
        throw new BadRequestException('Invalid file type. Only PDF, JPG, and PNG allowed.');
    }
    if (file.size > 5 * 1024 * 1024) throw new BadRequestException('Max size is 5MB.');

    this.logger.log(`Valid file uploaded for task: ${taskId}`);
    return { message: 'File uploaded successfully', taskId, status: 'for-review' };
  }

  confirmTask(taskId: string) {
    this.logger.log(`Task confirmed: ${taskId}`);
    return { message: 'Task confirmed successfully', taskId, status: 'confirmed' };
  }

  
  getAllOnboardingEmployees() {
    return [{ id: 'mock-1', name: 'John Doe', progress: 50, status: 'In Progress' }];
  }

  updateTaskStatus(taskId: string, dto: UpdateTaskStatusDto) {
    this.logger.log(`HR updated task ${taskId} to: ${dto.status}`);
    return { message: `Task marked as ${dto.status}`, taskId, updatedStatus: dto.status, remarks: dto.remarks };
  }

  createTemplate(dto: CreateTemplateDto) {
    this.logger.log(`Admin created requirement: ${dto.taskName}`);
    return {
      message: 'Template created',
      template: { id: `temp-${Date.now()}`, ...dto }
    };
  }
}