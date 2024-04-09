import { Routes } from '@angular/router';
import { PokemonIndexComponent } from './pokemon-index/pokemon-index.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';

export const routes: Routes = [
  {path:'',
  redirectTo:'pokemon-list/0/10',
  pathMatch: 'full'},
  {path: 'pokemon-details/:id',
  component: PokemonDetailsComponent,
  title: 'Pokemon details'},
  {path: 'pokemon-list/:offset/:limit',
  component: PokemonIndexComponent,
  title: 'Pokemon list'}
];
//remove os parametros e o componente aparece pq nao pode ter opcionais aqui tem q ser a url toda
