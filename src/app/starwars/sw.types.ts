export type ApiURL = `https://${string}`

export type CharacterDTO = {
  name: string;
  birth_year: string;
  height: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  mass: string;
  skin_color: string;
  homeworld: ApiURL;
  starships: string[];
  films: string[];
  movieData: Movie[];
}

// characterVM

export type APIResponse = {
  results: CharacterDTO[];
}

export type Homeworld = {
  name: string;
}

export type Starship = {
  name: string;
}

export type Movie = {
  title: string;
  episode_id: number;
}
