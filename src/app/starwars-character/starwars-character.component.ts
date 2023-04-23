import {Component, Input} from '@angular/core';
import {Character} from "../starwars/sw.types";

@Component({
  selector: 'app-starwars-character',
  templateUrl: './starwars-character.component.html',
  styleUrls: ['./starwars-character.component.scss']
})
export class StarwarsCharacterComponent {

  @Input()
  characterData?: Character;

}
