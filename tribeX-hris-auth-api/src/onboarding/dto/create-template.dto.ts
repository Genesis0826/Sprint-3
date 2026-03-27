import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export class CreateTemplateDto {
  @ApiProperty({ example: 'Developer Checklist' })
  @IsString() @IsNotEmpty()
  taskName: string;

  @ApiProperty({ example: 'Please upload necessary files' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Is this required for 100% progress?', example: true })
  @IsBoolean()
  isRequired: boolean; 

  @ApiProperty({ example: 7 })
  @IsNumber()
  deadlineDays: number;
}
 