import { Document } from 'mongoose';

export interface Heroe {
  readonly name: string;
  readonly power: number;
  readonly speed: number;
  readonly urlImage: string;
}

export interface Heroes extends Document {
  readonly name: string;
  readonly power: number;
  readonly speed: number;
  readonly urlImage: string;
}
