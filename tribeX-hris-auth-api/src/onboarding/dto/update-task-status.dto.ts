import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsOptional } from 'class-validator';

export enum ItemStatusEnum {
  APPROVED = 'approved',
  REJECTED = 'rejected',
  FOR_REVIEW = 'for-review',
  PENDING = 'pending',
  CONFIRMED = 'confirmed'
}

export class UpdateTaskStatusDto {
  @ApiProperty({ required: false })
  @IsString() @IsOptional()
  remarks?: string;

  @ApiProperty({ enum: ItemStatusEnum })
  @IsEnum(ItemStatusEnum)
  status: ItemStatusEnum;
}
