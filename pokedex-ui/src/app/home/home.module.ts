import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { PokedexService } from './pokedex/pokedex.service';
import { PokemonComponent } from './pokedex/pokemon/pokemon.component';

@NgModule({
  declarations: [HomeComponent, PokedexComponent, PokemonComponent],
  imports: [CommonModule, RouterModule],
  providers: [PokedexService]
})
export class HomeModule {}
