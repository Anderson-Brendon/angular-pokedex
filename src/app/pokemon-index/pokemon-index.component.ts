import { Component} from '@angular/core';
import { PokeApiService } from '../poke-api.service';
import { Event, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { OnInit,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PaginationIndexComponent } from '../pagination-index/pagination-index.component';

@Component({
  selector: 'app-pokemon-index',
  standalone: true,
  imports: [RouterLink, PaginationIndexComponent],
  templateUrl: './pokemon-index.component.html',
  styleUrl: './pokemon-index.component.css'
})

export class PokemonIndexComponent implements OnInit,OnDestroy {

  urlImgPokemon = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png';

  pokemonList : any = [];

  offset!: number;

  limit!: number;

  paramsObserver!: Subscription;

  pokemonGeneration!: keyof typeof this.pokeApi.pokemonGeneration;

  constructor(private pokeApi: PokeApiService, private activatedRoute: ActivatedRoute){
    this.captureQueryParams();
    this.getPokemonNameList();
  }

  //sempre que o componente for montado, esse método vai observar as mudanças no parametro da rota
  ngOnInit(){
    this.observeOnParamsChange();
  }

  //pra evitar desperdício de recurso, na destruição do componente devo usar o unsubscribe, parando a emissão de valores do observável
  ngOnDestroy(): void {
    this.paramsObserver.unsubscribe();
  }

  //método responsável por fazer as requisições http, usando as propriedades da classe como argumento para definir o offset e limit da consulta na api
  getPokemonNameList(){
    this.pokeApi.requestPokemonList(this.offset, this.limit).subscribe(response => {
      this.pokemonList = response;
      this.pokemonList = this.pokemonList.results;
    })
  }

  //método que captura os parametros da rota associada ao componente
  captureQueryParams(){
    this.offset = parseInt(this.activatedRoute.snapshot.params['offset']);
    this.limit = parseInt(this.activatedRoute.snapshot.params['limit']);
    this.pokemonGeneration = this.activatedRoute.snapshot.params['generation'];
  }

  //esse método vai observar a mudança de parametros da rota atual, com o intuito de chamar um método que captura os valores dessa mudança e outro que faz a solicitação http a partir disso
  observeOnParamsChange(){
    this.paramsObserver = this.activatedRoute.params.subscribe(()=>{
      this.captureQueryParams();
      this.getPokemonNameList();
    })
  }

  onLoadImg(event : any){
    event.target.classList.add('img-load-complete');
  }
 }
