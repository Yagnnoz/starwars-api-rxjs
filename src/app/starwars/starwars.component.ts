import {Component} from '@angular/core';
import {StarWarsAPIService} from "./star-wars-api.service";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Character} from "./sw.types";

@Component({
  selector: 'app-starwars',
  templateUrl: './starwars.component.html',
  styleUrls: ['./starwars.component.scss']
})
export class StarwarsComponent {

  searchTerm: string = '';

  constructor(private swService: StarWarsAPIService) {
  }

  search$: BehaviorSubject<string> = this.swService.search$;

  data$: Observable<Character[]> = this.swService.characters$
    .pipe(
      tap((v: Character[]) => console.log(v)),

    );

  setNewSearchTerm(term: string): void {
    console.log(`new searchTerm is  "${term}"`);
    this.swService.setTerm(term);
  }
}
