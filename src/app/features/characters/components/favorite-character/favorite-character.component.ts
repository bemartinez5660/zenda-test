import {Component, EventEmitter, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import {Character} from '../../models/character.model';
import {selectedCharacterAsFavorite} from '../../store/character.selectors';
import {Router} from '@angular/router';
import {firstValueFrom, Observable} from 'rxjs';

@Component({
  selector: 'app-favorite-character',
  standalone: false,
  templateUrl: './favorite-character.component.html',
  styleUrl: './favorite-character.component.css'
})
export class FavoriteCharacterComponent {
  favoriteCharacter$?: Observable<Character | null>;
  @Output() showFavoriteCharacterEmit: EventEmitter<Character | null> = new EventEmitter<Character | null>();

  constructor(
    private readonly _store: Store,
    private readonly _router: Router
  ) {
    this.favoriteCharacter$ = this._store.select(selectedCharacterAsFavorite);
  }

  async showCharacterDetails() {
    if (!!this.favoriteCharacter$) {
      this.showFavoriteCharacterEmit.emit(await this.getFavoriteCharacterCurrentValue());
    }
  }

  async navigateToDetails() {
    const character =  await this.getFavoriteCharacterCurrentValue();
    this._router.navigate(['/character-details', character?.id]);
  }

  async getFavoriteCharacterCurrentValue(): Promise<Character | null> {
    if (!this.favoriteCharacter$) return null;
    return await firstValueFrom(this.favoriteCharacter$);
  }
}
