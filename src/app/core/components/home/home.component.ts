import {Component, ElementRef, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {Character} from '../../../features/characters/models/character.model';
import {characterSelected, selectedCharacterAsFavorite} from '../../../features/characters/store/character.selectors';
import {Observable} from 'rxjs';
import {deselectCharacter, selectCharacter} from '../../../features/characters/store/character.actions';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  favoriteCharacter$?: Observable<Character | null>;
  selectedCharacter$?: Observable<Character | null>;

  constructor(
    private readonly _store: Store
  ) {
    this.favoriteCharacter$ = this._store.select(selectedCharacterAsFavorite);
    this.selectedCharacter$ = this._store.select(characterSelected);
  }

  updateCharacter($event: Character | null) {
    if (!!$event)
      this._store.dispatch(selectCharacter({payload: $event}));
  }

  onOutsideClick() {
    this._store.dispatch(deselectCharacter());
  }
}
