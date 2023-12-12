import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Types, Schema as MongooseSchema } from 'mongoose';
import { Entity } from 'src/database/entity.schema';

export type CourseDocument = HydratedDocument<Course>;

@Schema({ timestamps: true })
export class Module extends Entity {
  @ApiProperty({ example: 'Module 1' })
  @Prop()
  name: string;
}

@Schema({ timestamps: true })
export class Course extends Entity {
  @ApiProperty({ example: 'Web Development' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ example: 'web-development' })
  @Prop({ required: true, unique: true })
  urlName: string;

  @ApiProperty({ example: '5f068e0aa1cbbf5288164780' })
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  owner: { type: Types.ObjectId; ref: 'User' };

  @ApiProperty({ example: false })
  @Prop({ required: true, default: false })
  isRunning: boolean;

  @ApiProperty({ example: '[{"name": "Module 1"}]' })
  @Prop()
  modules: Module[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
