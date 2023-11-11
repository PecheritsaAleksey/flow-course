import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { Entity } from 'src/database/entity.schema';

export type UserDocument = HydratedDocument<User>;

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
}

export const UserSchema = SchemaFactory.createForClass(User);
