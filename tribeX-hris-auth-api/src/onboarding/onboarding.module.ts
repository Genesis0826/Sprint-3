import { Module } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { ApplicantOnboardingController } from './controllers/applicant-onboarding.controller';
import { HrOnboardingController } from './controllers/hr-onboarding.controller';
import { AdminOnboardingController } from './controllers/admin-onboarding.controller';
import { AuthModule } from '../auth/auth.module';
import { SupabaseModule } from '../supabase/supabase.module';


@Module({
  imports: [AuthModule, SupabaseModule], 
  controllers: [
    ApplicantOnboardingController, 
    HrOnboardingController,
    AdminOnboardingController
  ],
  providers: [OnboardingService],
})
export class OnboardingModule {}
