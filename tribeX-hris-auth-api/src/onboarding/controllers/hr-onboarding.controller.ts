import { Controller, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OnboardingService } from '../onboarding.service';
import { UpdateTaskStatusDto } from '../dto/update-task-status.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';

@ApiTags('HR Onboarding Management')
@ApiBearerAuth()
@Controller('tribe1/onboarding/v1/hr')
@UseGuards(JwtAuthGuard, RolesGuard)
export class HrOnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Get('applicants')
  @Roles('HR_OFFICER')
  @ApiOperation({ summary: 'Get list of onboarding hires' })
  getOnboardingApplicants() {
    return this.onboardingService.getAllOnboardingEmployees(); 
  }

  @Patch('tasks/:taskId')
  @Roles('HR_OFFICER')
  @ApiOperation({ summary: 'Approve/Reject submissions' })
  updateTaskStatus(@Param('taskId') taskId: string, @Body() dto: UpdateTaskStatusDto) {
    return this.onboardingService.updateTaskStatus(taskId, dto); 
  }
}
