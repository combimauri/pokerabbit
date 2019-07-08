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
  pokenumber: number;
  pokename: string;

  constructor(private pokeService: PokedexService) {}

  ngOnInit(): void {
    this.pokemon$ = this.pokeService.getPokemon();
  }

  savePokemon(): void {
    const pokemon = {
      pokenumber: this.pokenumber,
      pokename: this.pokename,
      picture_url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
        this.pokenumber
      }.png`
    };

    this.pokeService.savePokemon(pokemon).subscribe(_ => {
      this.pokemon$ = this.pokeService.getPokemon();
      this.pokenumber = null;
      this.pokename = '';
    });
  }
}
