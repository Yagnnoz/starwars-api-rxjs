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
import { APIResponse, Character, Homeworld, Movie, Starship } from './sw.types';

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

  characters$: Observable<Character[]> = this.search$
    .pipe(
      // debounceTime(5000),
      // distinctUntilChanged(),
      // filter((v: string) => v !== ""),
      switchMap((term: string) => this.http.get<APIResponse>(`https://swapi.dev/api/people/?search=${term}`)
        .pipe(
          tap((apiResponse: APIResponse) => console.log(apiResponse)),
          map((res: APIResponse) => res.results),

          // setting Homeworld

          // concatMap((characters: Character[]) => {
          //   const homeworlds$: Observable<Homeworld>[] = characters.map((character: Character) => this.http.get<Homeworld>(character.homeworld));
          //   return forkJoin(homeworlds$) //waits for homeworlds$ to complete
          //     .pipe(
          //       map((homeworlds: Homeworld[]) => {
          //         return characters.map((character: Character, index: number): Character => {
          //           return {
          //             ...character,
          //             homeworld: homeworlds[index].name,
          //           };
          //         });
          //       }),
          //     );
          // }),

          // set starship(s)

          // concatMap((characters: Character[]) => {
          //
          //   const ships$: Observable<Starship>[] = characters.flatMap((character: Character) => {
          //     if (character.starships.length > 0) {
          //       return character.starships.map((url: string) => this.http.get<Starship>(url));
          //     } else {
          //       return from(this.noShipArray);
          //     }
          //   });
          //   return forkJoin(ships$)
          //     .pipe(
          //       map((ships: Starship[]) => {
          //           return characters.map((character: Character, index: number): Character => {
          //             const shipNames: string[] = ships.slice(index * character.starships.length, (index + 1) * character.starships.length).map((ship: Starship) => ship.name);
          //             return {
          //               ...character,
          //               starships: shipNames,
          //             };
          //           });
          //         },
          //       ),
          //     );
          // }),

          // movie appearances

          // concatMap((characters: Character[]) => {
          //   const movies$: Observable<Movie>[] = characters.flatMap((character: Character) => {
          //     return character.films.map((url: string) => this.http.get<Movie>(url));
          //   });
          //
          //   return forkJoin(movies$)
          //     .pipe(
          //       map((movies: Movie[]) => {
          //         return characters.map((character: Character, index: number): Character => {
          //           const movies1: Movie[] = movies.slice(index * character.films.length, (index + 1) * character.films.length).map((movie: Movie): Movie => {
          //             return {title: movie.title, episode_id: movie.episode_id};
          //           });
          //
          //           return {
          //             ...character,
          //             // sort movie names
          //             movieData: movies1.sort(this.sortMovies),
          //           };
          //         });
          //       }),
          //     );
          // }),
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
