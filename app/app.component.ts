import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Logger} from './common/services/logger.service';
import {HeroListComponent} from './hero-list/hero-list.component';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.html',
  styleUrls: ['app/app.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [Logger]
})
@RouteConfig([
  { path: 'hero', name: 'Hero', component: HeroListComponent, useAsDefault: true }
])
export class AppComponent {

  constructor(private logger: Logger) { }

  ngOnInit() {
    this.logger.log('Alo!! Alo!!');
  }

}
