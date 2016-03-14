import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Logger} from './common/services/logger.service';
import {HeroListComponent} from './hero-list/hero-list.component';
import {WikipediaComponent} from './wikipedia/wikipedia.component';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.html',
  styleUrls: ['app/app.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [Logger]
})
@RouteConfig([
  { path: 'hero-list', name: 'HeroList', component: HeroListComponent, useAsDefault: true },
  { path: 'wikipedia', name: 'Wikipedia', component: WikipediaComponent}
])
export class AppComponent {

  constructor(private logger: Logger) { }

  ngOnInit() {
    this.logger.log('Alo!! Alo!!');
  }

}
