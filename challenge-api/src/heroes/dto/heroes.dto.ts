export class createHeroeDTO {
  readonly name: string;
  readonly power: number;
  readonly speed: number;
  readonly urlImage: string;
}

export class DeleteOrUpdateHeroeDTO {
  id: string;
}
