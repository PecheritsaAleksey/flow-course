import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateNewCourseDto } from './dto/create-new-course.dto';
import { RequestWithUser } from '../auth/dto/req-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatedCourseDto } from './dto/created-course.dto';

@ApiTags('Courses')
@Controller('api/courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @ApiOperation({ summary: 'Create new course' })
  @ApiResponse({ status: 200, type: CreatedCourseDto })
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Post('')
  createCourse(
    @Req() req: RequestWithUser,
    @Body() CreateNewCourseDto: CreateNewCourseDto,
  ): Promise<CreatedCourseDto> {
    const ownerId = req.user._id;
    return this.coursesService.createCourse({
      ...CreateNewCourseDto,
      owner: ownerId.toString(),
    });
  }
}
