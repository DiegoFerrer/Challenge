import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Heroes {
  @Prop()
  name: string;

  @Prop()
  power: number;

  @Prop()
  speed: number;

  @Prop()
  urlImage: string;
}

export const HeroesSchema = SchemaFactory.createForClass(Heroes);
