export type Character = {
  name: string;
  birth_year: string;
  height: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  mass: string;
  skin_color: string;
  homeworld: string;
  starships: string[];
  films: string[];
  movieData: Movie[];
}

export type APIResponse = {
  results: Character[];
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
