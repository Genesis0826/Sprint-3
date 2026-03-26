import { Controller, Get, Post, Body, UseGuards, UseInterceptors, UploadedFile, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiConsumes, ApiBearerAuth } from '@nestjs/swagger';
import { OnboardingService } from '../onboarding.service';
import { UploadDocumentDto } from '../dto/upload-document.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';


@ApiTags('Applicant Onboarding')
@ApiBearerAuth()
@Controller('tribe1/onboarding/v1/applicant') 
//@UseGuards(JwtAuthGuard, RolesGuard)
export class ApplicantOnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}


  @Get('status')
  @Roles('APPLICANT', 'INTERNAL_STAFF', 'EMPLOYEE') // The business rule enforced!
  @ApiOperation({ summary: 'Get current onboarding progress' })
  getStatus(@Req() req: any) {
    const applicantId = req.user?.id || 'mock-applicant-id'; 
    return this.onboardingService.getEmployeeProgress(applicantId);
  }


  @Post('upload-document')
  @Roles('APPLICANT', 'INTERNAL_STAFF', 'EMPLOYEE') // The business rule enforced!
  @ApiOperation({ summary: 'Upload a required document (PDF only)' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  uploadDocument(@Body() dto: UploadDocumentDto, @UploadedFile() file: Express.Multer.File) {
    return this.onboardingService.uploadDocument(dto.taskId, file);
  }
}
