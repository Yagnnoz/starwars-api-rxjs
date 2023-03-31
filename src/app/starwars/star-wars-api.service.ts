import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, debounceTime, distinctUntilChanged, filter, map, Observable, switchMap} from "rxjs";
import {swAPIResponse, swCharacter} from "./sw.types";

@Injectable({
  providedIn: 'root'
})
export class StarWarsAPIService {

  constructor(private http: HttpClient) {
  }

  search$: BehaviorSubject<string> = new BehaviorSubject('');

  result$: Observable<swCharacter[]> = this.search$
    .pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter((v: string) => v !== ""),
      switchMap((term: string) => this.http.get<swAPIResponse>(`https://swapi.dev/api/people/?search=${term}`)
        .pipe(
          map((res: swAPIResponse) => res.results)
        )
      ),
    );

  setTerm(term: string): void {
    this.search$.next(term);
  }
}
