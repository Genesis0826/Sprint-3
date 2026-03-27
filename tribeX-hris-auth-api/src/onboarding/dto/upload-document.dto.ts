import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UploadDocumentDto {
  @ApiProperty()
  @IsString() @IsNotEmpty()
  taskId: string;

  @ApiProperty({ type: 'string', format: 'binary', description: 'PDF, JPG, or PNG' })
  file: any;
}
