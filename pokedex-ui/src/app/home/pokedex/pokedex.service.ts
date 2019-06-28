import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Pokemon } from '../../shared/models/pokemon';
import { environment } from '../../../environments/environment';

@Injectable()
export class PokedexService {
  constructor(private http: HttpClient) {}

  getPokemon(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${environment.baseUrl}/pokemon`);
  }
}
