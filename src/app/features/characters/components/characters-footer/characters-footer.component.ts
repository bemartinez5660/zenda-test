import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectCharacters} from '../../store/character.selectors';
import {Character} from '../../models/character.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-characters-footer',
  standalone: false,
  templateUrl: './characters-footer.component.html',
  styleUrl: './characters-footer.component.css'
})
export class CharactersFooterComponent implements OnDestroy {
  characters?: Character[];
  totalBySpecies: Map<string, number> = new Map<string, number>();
  totalByType: Map<string, number> = new Map<string, number>();
  private subscription: Subscription;

  constructor(
    private readonly _store: Store,
  ) {
    this.subscription = this._store.select(selectCharacters).subscribe((resp: any) => {
      this.characters = resp?.results;
      if (!!this.characters) {
        const newTotalBySpecies = new Map<string, number>();
        const newTotalByType = new Map<string, number>();

        this.characters.forEach((character: Character) => {
          if (character?.species) {
            const speciesCount = newTotalBySpecies.get(character.species) || 0;
            newTotalBySpecies.set(character.species, speciesCount + 1);
          }

          if (character?.type) {
            const typeCount = newTotalByType.get(character.type) || 0;
            newTotalByType.set(character.type, typeCount + 1);
          }
        });

        this.totalBySpecies = newTotalBySpecies;
        this.totalByType = newTotalByType;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
