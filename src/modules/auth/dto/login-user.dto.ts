import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: '3e5dX@example.com' })
  @IsEmail()
  email: string;
  @IsString()
  @ApiProperty({ example: '12345678' })
  password: string;
}
