import {Component, OnInit} from 'angular2/core';

import {HeroService} from './hero.service';
import {Hero} from './hero.model';

@Component({
  templateUrl: 'app/hero-list/hero-list.html'
})
export class HeroListComponent {
  
  constructor(
    private service: HeroService
  ) { }
  
  errorMessage: string;
  heroes: Hero[] = [];

  ngOnInit() {
    this.getHeroes();
  }  
  
  getHeroes() {
    this.service.getHeroes()
      .subscribe(
        heroes => this.heroes = heroes,
        error => this.errorMessage = error
      );
  }
  
  addHero() {
    
  }
  
}
