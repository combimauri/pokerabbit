import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { PokedexService } from './pokedex/pokedex.service';

@NgModule({
  declarations: [HomeComponent, PokedexComponent],
  imports: [CommonModule],
  providers: [PokedexService]
})
export class HomeModule {}
