export type Character = {
  name: string;
  birth_year: string;
  height: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  mass: string;
  skin_color: string;
}

export type CharacterAPIResponse = {
  results: Character[];
}
