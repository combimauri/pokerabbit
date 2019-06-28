import { Component, OnInit } from '@angular/core';

import { PokedexService } from './pokedex.service';

@Component({
  selector: 'pok-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {
  constructor(private pokeService: PokedexService) {}

  ngOnInit(): void {
    this.pokeService
      .getPokemon()
      .subscribe(pokemon => console.log('Pokemon:', pokemon));
  }
}
