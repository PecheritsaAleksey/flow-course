import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John' })
  firstName: string;
  @ApiProperty({ example: 'Doe' })
  lastName: string;
  @ApiProperty({ example: '2GQ0H@example.com' })
  email: string;
  @ApiProperty({ example: 'password' })
  password: string;
}
