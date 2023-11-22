import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

@Schema({ timestamps: true })
export class Entity {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  _id: ObjectId;
}

export const EntitySchema = SchemaFactory.createForClass(Entity);
