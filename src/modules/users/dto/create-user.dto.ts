import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John' })
  firstName: string;
  @ApiProperty({ example: 'Doe' })
  lastName: string;
  @ApiProperty({ example: '2GQ0H@example.com' })
  @IsEmail()
  email: string;
  @ApiProperty({ example: 'password' })
  @MinLength(6)
  password: string;
}
