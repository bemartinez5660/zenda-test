import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Character} from '../../models/character.model';
import {Episode} from '../../../../core/models/episode.model';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {loadCharacterDetails} from '../../store/character.actions';
import {selectEpisode, selectLoadingDetails, selectLocation, selectResident} from '../../store/character.selectors';
import {Location} from '../../../../core/models/location.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-character-details',
  standalone: false,
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.css'
})
export class CharacterDetailsComponent implements OnChanges, OnInit {
  @Input() character?: Character | null;
  @Input() portrait = true;

  location$?: Observable<Location | null>;
  locationResident$?: Observable<Character | null>;
  episodeInfo$?: Observable<Episode | null>;
  loadingDetails$?: Observable<boolean>;


  constructor(
    private readonly _store: Store,
    private readonly _activatedRoute: ActivatedRoute
  ) {
    this.locationResident$ = this._store.select(selectResident);
    this.loadingDetails$ = this._store.select(selectLoadingDetails);
    this.episodeInfo$ = this._store.select(selectEpisode);
    this.location$ = this._store.select(selectLocation);
  }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      if (!!params['id']) {
        this.portrait = false
      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['character'] && changes['character'].currentValue) {
      if (!!this.character)
        this._store.dispatch(loadCharacterDetails({payload: this.character}));
    }
  }
}
