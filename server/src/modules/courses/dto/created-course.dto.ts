import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreatedCourseDto {
  @Expose()
  @ApiProperty({ example: 'My course' })
  name: string;

  @Expose()
  @ApiProperty({ example: 'my-course' })
  urlName: string;

  @Expose()
  @ApiProperty({ example: '5e9f8f8f8f8f8f8f8f8f8f8' })
  owner: string;

  @Expose()
  @ApiProperty({ example: false })
  isRunning: boolean;
}
