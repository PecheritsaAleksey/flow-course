import { Injectable } from '@nestjs/common';
import { CreateNewCourseDto } from './dto/create-new-course.dto';
import { UsersService } from '../users/users.service';
import { CoursesRepository } from './corses.repository';
import { plainToClass } from 'class-transformer';
import { CreatedCourseDto } from './dto/created-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    private readonly coursesRepository: CoursesRepository,
    private readonly usersService: UsersService,
  ) {}

  async createCourse(
    CreateNewCourseDto: CreateNewCourseDto,
  ): Promise<CreatedCourseDto> {
    try {
      const course = await this.coursesRepository.create(CreateNewCourseDto);

      if (!course) {
        throw new Error('Course not created');
      }

      const user = await this.usersService.getUserById(
        CreateNewCourseDto.owner,
      );
      if (!user) {
        throw new Error('User not found');
      }

      await this.usersService.updateUser(CreateNewCourseDto.owner, {
        $push: {
          ownedCourses: course._id,
        },
      });

      return plainToClass(CreatedCourseDto, course);
    } catch (error) {
      console.log(error);
    }

    return null;
  }
}
