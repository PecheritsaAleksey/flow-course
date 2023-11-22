import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, ObjectId } from 'mongoose';
import { Entity } from 'src/database/entity.schema';

export type LessonDocument = HydratedDocument<Lesson>;

@Schema({ timestamps: true })
export class Block {
  @ApiProperty({ example: 'Video' })
  @Prop()
  type: string;

  @Prop()
  content: string;
}

@Schema({ timestamps: true })
export class Lesson extends Entity {
  @ApiProperty({ example: 'How to start' })
  @Prop()
  name: string;

  @ApiProperty({ example: '5f068e0aa1cbbf5288164780' })
  @Prop()
  course: { type: ObjectId; ref: 'Course' };

  @ApiProperty({ example: '[{"type": "Video"}]' })
  @Prop({
    type: [Block],
  })
  blocks: Block[];
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
