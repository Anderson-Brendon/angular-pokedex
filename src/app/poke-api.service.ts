import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class PokeApiService {


  constructor(private http : HttpClient) {}

  urlPokemonDetails: string = `https://pokeapi.co/api/v2/pokemon/`;

  urlImg = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png';

  urlPokemonDescription = 'https://pokeapi.co/api/v2/pokemon-species/1'

  pokemonsPerPage: number = 18;

  pokemonList: any;

  pokemonDetails: any;

  pokemonNames: any;

  pokemonGeneration = {
    first:{offset: 0, limit:151},
    second:{offset: 151, limit: 100},
    third: {offset:251, limit: 135},
    fourth:{offset:386, limit:107},
    fifth:{offset:493, limit:156},
    sixth:{offset:649, limit: 72},
    seventh:{offset:721, limit:88},
    eighth:{offset:809, limit:96},
    ninth:{offset:905, limit:120}
  }

  //retorna observável para solicitar listagem dos nomes dos pokemons e a url com detalhes
  requestPokemonList(offset: number, limit: number){
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  }

  //retorna observável para solicitar de descrição de pokemon
  requestPokemonSpecies(id: number | string){
    return this.http.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
  }

  //retorna observável para solicitar os detalhes de um pokemon, podendo receber como argumento tanto um numero de id quanto uma string com o nome exato
  requestPokemonDetails(id: number | string){
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
  }

  requestEvolutionChain(url: string){
    return this.http.get(url);
  }

  findFlavorText(flavor_text_entries: any[], lang: string = 'en'){
    for (const flavor_text of flavor_text_entries) {
      if(flavor_text.language.name === lang){
        return flavor_text.flavor_text;
      }
    }
  }

}
