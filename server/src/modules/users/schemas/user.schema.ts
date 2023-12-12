import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, ObjectId, Types } from 'mongoose';
import { Entity } from 'src/database/entity.schema';

export type UserDocument = HydratedDocument<User>;

class Course {
  @ApiProperty({ example: '5f068e0aa1cbbf5288164780' })
  @Prop({ type: Types.ObjectId, ref: 'Course' })
  course: ObjectId;
}

@Schema({ timestamps: true })
export class User extends Entity {
  @ApiProperty({ example: 'John' })
  @Prop()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @Prop()
  lastName: string;

  @ApiProperty({ example: 'johndoe@example.com' })
  @Prop({ required: true })
  email: string;

  @ApiProperty({ example: 'jasduas8udo9asuda81o212u21' })
  @Prop({ required: true })
  password: string;

  @ApiProperty({ example: 'USER' })
  @Prop({
    type: [{ type: String, enum: ['USER', 'ADMIN'] }],
    default: ['USER'],
  })
  roles: string[];

  @ApiProperty({ example: 'jasduas8udo9asuda81o212u21' })
  @Prop()
  ownedCourses: Course[];

  @ApiProperty({ example: 'jasduas8udo9asuda81o212u21' })
  @Prop()
  memberCourses: Course[];

  @ApiProperty({ example: 'jasduas8udo9asuda81o212u21' })
  @Prop()
  studentCourses: Course[];
}

export const UserSchema = SchemaFactory.createForClass(User);
