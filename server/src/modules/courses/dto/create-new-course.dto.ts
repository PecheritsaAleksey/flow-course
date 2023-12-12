import { ApiProperty } from '@nestjs/swagger';

export class CreateNewCourseDto {
  @ApiProperty({ example: 'My course' })
  name: string;

  @ApiProperty({ example: 'my-course' })
  urlName: string;

  @ApiProperty({ example: '5e9f8f8f8f8f8f8f8f8f8f8' })
  owner: string;
}
