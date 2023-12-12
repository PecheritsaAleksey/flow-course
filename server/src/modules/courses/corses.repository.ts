import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './schemas/course.schema';
import { EntityRepository } from 'src/database/entity.repository';

@Injectable()
export class CoursesRepository extends EntityRepository<CourseDocument> {
  constructor(@InjectModel(Course.name) courseModel: Model<CourseDocument>) {
    super(courseModel);
  }
}
