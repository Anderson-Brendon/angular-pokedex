import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class PokeApiService {


  constructor(private http : HttpClient) {

  }

  urlPokemonDetails: string = `https://pokeapi.co/api/v2/pokemon/`;

  urlImg = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png';

  urlPokemonDescription = 'https://pokeapi.co/api/v2/pokemon-species/1'

  pokemonList: any;

  pokemonDetails: any;

  pokemonNames: any;

  pokemonGeneration = {
    first:{offset: 0, limit:151},//151
    second:{offset: 151, limit: 100},//251
    third: {offset:251, limit: 135},//386
    fourth:{offset:386, limit:107},//493
    fifth:{offset:493, limit:156},//649
    sixth:{offset:649, limit: 72},//
    seventh:{offset:721, limit:88},
    eighth:{offset:809, limit:96},
    ninth:{offset:905, limit:120}
  }

  requestPokemonList(offset: number, limit: number){
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  }

  requestPokemonDescription(id: number | string){
    return this.http.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
  }

  requestPokemonDetails(id: number | string){
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
  }

}
