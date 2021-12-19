export interface Hero {
  id:string;
  name:string;
  speed:number;
  power:number;
  urlImage:string;
}

export interface bodyHero {
  name:string;
  speed:number;
  power:number;
  urlImage:string;
}

export interface createHeroOk{
  message:string,
  createHeroe: createUpdateDeleteHero
}

export interface updateHero{
  message:string,
  updateHeroe: createUpdateDeleteHero
}

export interface deleteHero{
  message:string,
  deleteHero: createUpdateDeleteHero
}

export interface createUpdateDeleteHero{
  urlImage:string,
  speed: number,
  power: number,
  name: string,
  _id: string,
  __v: number
}