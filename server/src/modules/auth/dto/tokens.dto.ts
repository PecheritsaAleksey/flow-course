import { ApiProperty } from '@nestjs/swagger';

export class AuthTokensDto {
  @ApiProperty({ example: 'token123' })
  accessToken: string;
  @ApiProperty({ example: 'token321' })
  refreshToken: string;
}
