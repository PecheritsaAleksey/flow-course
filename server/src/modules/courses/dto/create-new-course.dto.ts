import { ApiProperty } from '@nestjs/swagger';

export class CreateNewCourseDto {
  @ApiProperty({ example: 'My course' })
  name: string;

  @ApiProperty({ example: 'my-course' })
  urlName: string;

  owner: string;
}
