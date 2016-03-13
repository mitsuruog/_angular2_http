// [MEMO] angular2ではすべてのRxjsのI/Fを開放しているわけではないため
// このハンズオン用に明示的にimportしている
// 本来は.mapのusecaseはあまり無いらしい。。。
// http.get(..).map function is not working with alpha 48 · Issue #5632 · angular/angular 
// https://github.com/angular/angular/issues/5632
import 'rxjs/Rx';

import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS}    from 'angular2/http';

import {Logger} from './common/services/logger.service';
import {HeroService} from './hero-list/hero.service';
import {WikipediaService} from './wikipedia/wikipedia.service';

import {AppComponent} from './app.component';

bootstrap(AppComponent, [ROUTER_PROVIDERS, HTTP_PROVIDERS, HeroService, WikipediaService, Logger]);
