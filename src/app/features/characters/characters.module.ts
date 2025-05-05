import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {CharactersListComponent} from './components/characters-list/characters-list.component';
import {CharacterDetailsComponent} from './components/character-details/character-details.component';
import {SharedModule} from '../../shared/shared.module';
import {EffectsModule} from '@ngrx/effects';
import {CharacterEffects} from './store/character.effects';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FavoriteCharacterComponent } from './components/favorite-character/favorite-character.component';
import { CharactersFooterComponent } from './components/characters-footer/characters-footer.component';


@NgModule({
  declarations: [
    CharactersListComponent,
    CharacterDetailsComponent,
    FavoriteCharacterComponent,
    CharactersFooterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EffectsModule.forFeature([CharacterEffects]),
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
  ],
  exports: [
    CharacterDetailsComponent,
    CharactersListComponent,
    FavoriteCharacterComponent,
    CharactersFooterComponent
  ]
})
export class CharactersModule { }
