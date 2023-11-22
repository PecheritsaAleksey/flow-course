import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, ObjectId } from 'mongoose';
import { Entity } from 'src/database/entity.schema';

export type CourseDocument = HydratedDocument<Course>;

@Schema({ timestamps: true })
export class Module {
  @ApiProperty({ example: 'Module 1' })
  @Prop()
  name: string;
}

@Schema({ timestamps: true })
export class Course extends Entity {
  @ApiProperty({ example: 'Web Development' })
  @Prop()
  name: string;

  @ApiProperty({ example: '5f068e0aa1cbbf5288164780' })
  @Prop()
  owner: { type: ObjectId; ref: 'User' };

  @ApiProperty({ example: '[{"name": "Module 1"}]' })
  @Prop({
    type: [Module],
  })
  modules: Module[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
