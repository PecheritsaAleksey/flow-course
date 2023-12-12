import { Module, forwardRef } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { UsersModule } from '../users/users.module';
import { CoursesRepository } from './corses.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './schemas/course.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService, CoursesRepository],
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    AuthModule,
    UsersModule,
  ],
})
export class CoursesModule {}
