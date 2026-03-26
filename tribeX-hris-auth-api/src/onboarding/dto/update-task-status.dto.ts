import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsOptional } from 'class-validator';


export enum ItemStatusEnum {
  APPROVED = 'approved',
  REJECTED = 'rejected',
  FOR_REVIEW = 'for-review'
}


export class UpdateTaskStatusDto {
  @ApiProperty({ description: 'Feedback or reason for rejection from HR', required: false })
  @IsString()
  @IsOptional()
  remarks?: string;


  @ApiProperty({ enum: ItemStatusEnum })
  @IsEnum(ItemStatusEnum, { message: 'Status must be approved, rejected, or for-review' })
  status: ItemStatusEnum;
}
