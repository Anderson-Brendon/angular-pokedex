import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PokeApiService {


  constructor(private http : HttpClient) {

  }

  urlDetails: string = `https://pokeapi.co/api/v2/pokemon/`;

  urlGeneration: string = `https://pokeapi.co/api/v2/generation/`

  pokemonList: any;

  pokemonDetails: any;

  getPokemonsByGeneration(id: number){

  }

  getPokemonDetails(id: number){
    
  }

  getPokemonDescription(id: number){

  }
}
