import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ example: '3e5dX@example.com' })
  email: string;
  @ApiProperty({ example: '12345678' })
  password: string;
}
