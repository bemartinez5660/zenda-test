import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {CharacterService} from '../../services/character.service';
import {Character} from '../../../features/characters/models/character.model';
import {selectSelectedCharacter} from '../../../features/characters/store/character.selectors';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-character-details-page',
  standalone: false,
  templateUrl: './character-details-page.component.html',
  styleUrl: './character-details-page.component.css'
})
export class CharacterDetailsPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  character: Character | null = null;
  @Output() characterEmitter: EventEmitter<Character | null> = new EventEmitter<Character | null>();

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _characterService: CharacterService,
    // private readonly _store: Store,
  ) {
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    // This is just like an illustrative way to use the takeUntil Rxjs operator
    // to unsubscribe from the observable
    this._activatedRoute.params.subscribe(params => {
      this._characterService.getCharacterById(params['id'])
        .pipe(takeUntil(this.destroy$))
        .subscribe(character => {
          this.character = character;
          this.characterEmitter.emit(this.character);
        });
    });
    // The best implementation will be to get from the store the character,
    // something like this
    // this.character$ = this._store.select(selectSelectedCharacter);
  }
}
