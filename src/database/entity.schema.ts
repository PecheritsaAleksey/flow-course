import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

@Schema({ timestamps: true })
export class Entity {
  _id: ObjectId;
}

export const EntitySchema = SchemaFactory.createForClass(Entity);
