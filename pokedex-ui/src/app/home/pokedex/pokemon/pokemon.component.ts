import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import { PokedexService } from '../pokedex.service';
import { Pokemon } from '../../../shared/models/pokemon';

@Component({
  selector: 'pok-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {
  pokenumber: number;
  pokemon$: Observable<Pokemon>;

  constructor(
    private route: ActivatedRoute,
    private pokeService: PokedexService
  ) {}

  ngOnInit(): void {
    this.pokenumber = +this.route.snapshot.paramMap.get('pokenumber');
    this.pokemon$ = this.pokeService.getPokemonByNumber(this.pokenumber);
  }
}
