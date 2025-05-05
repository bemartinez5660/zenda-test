import {AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Character} from '../../models/character.model';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {environment} from '../../../../../environment/environment';
import {Store} from '@ngrx/store';
import {
  selectCharacters,
  selectedCharacterAsFavorite,
  selectError,
  selectLoading,
  selectSelectedCharacter
} from '../../store/character.selectors';
import {loadCharacters, selectCharacter, selectCharacterAsFavorite} from '../../store/character.actions';
import {MatSort, Sort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime, Observable} from 'rxjs';
import {CharacterFilter, CharacterParams} from '../../../../core/models/character-filter';
import {GENDER} from '../../../../core/enums/gender.enum';
import {STATUS} from '../../../../core/enums/status.enum';

const genders: string [] = [GENDER.FEMALE, GENDER.MALE, GENDER.GENDERLESS, GENDER.UNKNOWN];
const statuses: string [] = [STATUS.DEAD, STATUS.ALIVE, STATUS.UNKNOWN];

@Component({
  selector: 'app-characters-list',
  standalone: false,
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.css']
})
export class CharactersListComponent implements OnInit, AfterViewInit {
  protected readonly environment = environment;
  protected readonly genders = genders;
  protected readonly statuses = statuses;
  private _liveAnnouncer = inject(LiveAnnouncer);

  displayedColumns: string[] = [];
  filterColumns: string[] = [];
  page: number = 1;
  pageSize: number = 20;
  previousPageIndex: number | undefined;
  total: number = 0;
  error: string | null = null;
  isLoading$: Observable<boolean>;
  selectedCharacter$: Observable <Character | null>;
  favoriteCharacter$?: Observable<Character | null>;

  dataSource = new MatTableDataSource<Character>();
  @ViewChild('paginator') paginator!: MatPaginatorModule;
  @ViewChild('charactersTable', {read: MatSort}) sort!: MatSort;

  form: FormGroup;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  constructor(
    private readonly _store: Store,
    private readonly _fb: FormBuilder,
  ) {
    this.form = this._fb.group({
      name: [null],
      status: [null],
      gender: [null],
      species: [null],
      type: [null],
    });
    this.displayedColumns = ['name', 'status', 'species', 'type', 'gender', 'created', 'actions'];
    this.filterColumns = ['filter_name', 'filter_status', 'filter_species', 'filter_type', 'filter_gender', 'filter_created', 'filter_actions'];

    this._store.select(selectCharacters).subscribe((characters: any) => {
      this.dataSource.data = characters?.results;
      this.total = characters?.info?.count;
    });
    this.selectedCharacter$ = this._store.select(selectSelectedCharacter);

    this.isLoading$ = this._store.select(selectLoading);

    this._store.select(selectError).subscribe((error: any) => {
      if (!!error) {
        this.dataSource.data = [];
      }
      this.error = error;
    });

    this.favoriteCharacter$ = this._store.select(selectedCharacterAsFavorite);
  }

  ngOnInit() {
    this.fetchCharacters();
    this.filtersSubscription();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  filtersSubscription() {
    this.form.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(() => {
        this.page = 1;
        this.fetchCharacters();
      });
  }

  handlePageEvent(e: PageEvent) {
    this.total = e.length;
    this.pageSize = e.pageSize;
    this.page = e.pageIndex + 1;
    this.previousPageIndex = e.previousPageIndex;
    this.fetchCharacters();
  }

  fetchCharacters() {
    const rawValue = this.form.getRawValue();
    const filters: CharacterFilter[] = Object.entries(rawValue).map(([key, value]) => ({
      filterName: key,
      filterValue: value?.toString() || "",
    }));
    const params: CharacterParams = {
      page: this.page,
      filters: filters,
    };
    this._store.dispatch(loadCharacters({payload: params}));
  }

  markAsFavorite(element: any) {
    this._store.dispatch(selectCharacterAsFavorite({payload: element}));
  }

  selectCharacter(row: any) {
    this._store.dispatch(selectCharacter({payload: row}));
  }
}
