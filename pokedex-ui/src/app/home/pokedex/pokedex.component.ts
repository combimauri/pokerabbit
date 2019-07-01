import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { PokedexService } from './pokedex.service';
import { Pokemon } from '../../shared/models/pokemon';

@Component({
  selector: 'pok-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {
  pokemon$: Observable<Pokemon[]>;

  constructor(private pokeService: PokedexService) {}

  ngOnInit(): void {
    this.pokemon$ = this.pokeService.getPokemon();
  }
}
