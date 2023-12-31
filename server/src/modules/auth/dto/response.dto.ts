import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({ example: 'token123' })
  accessToken: string;
  @ApiProperty({ example: 'token321' })
  refreshToken: string;
  @ApiProperty({ example: '4NqgY@example.com' })
  userEmail: string;
  @ApiProperty({ example: 'John' })
  userName: string;
}
