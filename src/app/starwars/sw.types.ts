export type swCharacter = {
  name: string;
  birth_year: string;
  height: number;
  eye_color: string;
  gender: string;
  hair_color: string;
  mass: number;
  skin_color: string;
}

export type swAPIResponse = {
  results: swCharacter[];
}
