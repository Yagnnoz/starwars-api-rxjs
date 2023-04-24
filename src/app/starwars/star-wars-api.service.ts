import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, map, Observable, switchMap, tap } from 'rxjs';
import { Character, CharacterAPIResponse } from './sw.types';

@Injectable({
  providedIn: 'root',
})
export class StarWarsAPIService {

  constructor(private http: HttpClient) {
  }

  search$: BehaviorSubject<string> = new BehaviorSubject('');

  characters$: Observable<Character[]> = this.search$
    .pipe(
      // debounceTime(5000),
      // distinctUntilChanged(),
      // filter((searchString: string) => searchString !== ''),
      switchMap((term: string) => this.http.get<CharacterAPIResponse>(`https://swapi.dev/api/people/?search=${term}`)),
      tap((apiResponse: CharacterAPIResponse) => console.log(apiResponse)),
      map((res: CharacterAPIResponse) => res.results),
    );

  setTerm(term: string): void {
    this.search$.next(term);
  }
}
