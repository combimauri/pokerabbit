import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { PokedexService } from './pokedex/pokedex.service';
import { PokemonComponent } from './pokedex/pokemon/pokemon.component';
import { ModalModule } from '../shared/directives/modal/modal.module';

@NgModule({
  declarations: [HomeComponent, PokedexComponent, PokemonComponent],
  imports: [CommonModule, RouterModule, FormsModule, ModalModule],
  providers: [PokedexService]
})
export class HomeModule {}
