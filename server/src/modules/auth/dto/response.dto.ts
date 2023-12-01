import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({ example: 'token123' })
  token: string;
  @ApiProperty({ example: '4NqgY@example.com' })
  userEmail: string;
  @ApiProperty({ example: 'John' })
  userName: string;
}
