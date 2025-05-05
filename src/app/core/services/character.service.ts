import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CharacterParams} from '../models/character-filter';
import {environment} from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private readonly _url = '/api/character';

  constructor(
    private readonly _http: HttpClient,
  ) {
  }

  getAllCharacters(getParams?: CharacterParams) {
    let params: HttpParams = new HttpParams();
    if (!!getParams?.page) {
      params = params.set('page', getParams?.page.toString());
    }
    getParams?.filters?.forEach(filter => {
      if (!!filter && !!filter.filterName && !!filter.filterValue) {
        params = params.set(filter?.filterName, filter.filterValue);
      }
    })

    return this._http.get<any>( environment.base_url + this._url, {params});
  }

  getByUrl(url: string) {
    return this._http.get<any>(url);
  }

  getCharacterById(characterId: any) {
    return this._http.get<any>(`${environment.base_url + this._url}/${characterId}`);
  }
}
