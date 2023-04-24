import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  concatMap,
  debounceTime,
  distinctUntilChanged,
  filter,
  forkJoin,
  from,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { APIResponse, CharacterDTO, Homeworld, Movie, Starship } from './sw.types';

@Injectable({
  providedIn: 'root',
})
export class StarWarsAPIService {

  constructor(private http: HttpClient) {
  }

  noShipArray: Starship[] = [{
    name: 'Could not load ships',
  }];

  noMovieArray: Movie[] = [{
    title: 'Could not load movies',
    episode_id: 0,
  }];

  search$: BehaviorSubject<string> = new BehaviorSubject('');

  characters$: Observable<CharacterDTO[]> = this.search$
    .pipe(
      // debounceTime(5000),
      // distinctUntilChanged(),
      // filter((v: string) => v !== ""),   --> put this logic into the component
      switchMap((term: string) => this.http.get<APIResponse>(`https://swapi.dev/api/people/?search=${term}`)
        .pipe( // remove and check if it works :D
          tap((apiResponse: APIResponse) => console.log(apiResponse)),
          map((res: APIResponse) => res.results),

          // setting Homeworld

          concatMap((characters: CharacterDTO[]) => { //switch map
            const homeworlds$: Observable<Homeworld>[] = characters.map((character: CharacterDTO) => this.http.get<Homeworld>(character.homeworld)); // put http request in private method and return character with changed homeworld
            return forkJoin(homeworlds$) //waits for homeworlds$ to complete --- forkjoin with 1 = takeLast()
              .pipe(
                map((homeworlds: Homeworld[]) => {
                  return characters.map((character: CharacterDTO, index: number): CharacterDTO => {
                    return {
                      ...character,
                      homeworld: homeworlds[index].name,
                    };
                  });
                }),
              );
          }),

          // set starship(s)

          concatMap((characters: CharacterDTO[]) => {

            const ships$: Observable<Starship>[] = characters.flatMap((character: CharacterDTO) => {
              if (character.starships.length > 0) {
                return character.starships.map((url: string) => this.http.get<Starship>(url));
              } else {
                return from(this.noShipArray);
              }
            });
            return forkJoin(ships$)
              .pipe(
                map((ships: Starship[]) => {
                    return characters.map((character: CharacterDTO, index: number): CharacterDTO => {// put calculations in variables
                      const shipNames: string[] = ships.slice(index * character.starships.length, (index + 1) * character.starships.length).map((ship: Starship) => ship.name);
                      return {
                        ...character,
                        starships: shipNames,
                      };
                    });
                  },
                ),
              );
          }),

          // movie appearances

          concatMap((characters: CharacterDTO[]) => {
            const movies$: Observable<Movie>[] = characters.flatMap((character: CharacterDTO) => {
              return character.films.map((url: string) => this.http.get<Movie>(url));
            });

            return forkJoin(movies$)
              .pipe(
                map((movies: Movie[]) => {
                  return characters.map((character: CharacterDTO, index: number): CharacterDTO => {
                    const movies1: Movie[] = movies.slice(index * character.films.length, (index + 1) * character.films.length).map((movie: Movie): Movie => {
                      return {title: movie.title, episode_id: movie.episode_id};
                    });

                    return {
                      ...character,
                      // sort movie names
                      movieData: movies1.sort(this.sortMovies),
                    };
                  });
                }),
              );
          }),
        ),
      ),
    );

  setTerm(term: string):
    void {
    this.search$.next(term);
  }

  sortMovies(movieA: Movie, movieB: Movie): number {
    return movieA.episode_id - movieB.episode_id;
  }
}
