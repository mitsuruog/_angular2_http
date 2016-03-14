import {
  describe,
  it,
  inject,
  injectAsync,
  expect,
  beforeEach,
  beforeEachProviders,
  TestComponentBuilder
} from 'angular2/testing';

import {Component, View, provide} from 'angular2/core';
import {Http, BaseRequestOptions, Response, ResponseOptions} from 'angular2/http';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import {Observable} from 'rxjs/Observable';
import {MockBackend, MockConnection} from 'angular2/http/testing';

import {HeroListComponent} from './hero-list.component';
import {HeroService} from './hero.service';
import {Hero} from './hero.model';

describe('Test: HeroListComponent', () => {

  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    provide(Http, {
      useFactory: function(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    }),
    HeroService,
    HeroListComponent,
    TestComponentBuilder
  ]);

  it('HeroListComponentが存在すること', inject([HeroListComponent], (testee: HeroListComponent) => {
    expect(testee).toBeDefined();
  }));
  
  describe('初期処理', () => {
    
    beforeEach(inject([MockBackend], (backend: MockBackend) => {
      const response = new Response(new ResponseOptions({
        body: {
          data: [
            { "id": "1", "name": "mitsuru" },
            { "id": "2", "name": "ogawa" }
          ]
        }
      }));
      backend.connections.subscribe(
        (conn: MockConnection) => conn.mockRespond(response)
      );
    }));
    
    it('HeroListが2件表示されること', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      let template = '<hero-list></hero-list>';
      return tcb.overrideTemplate(TestComponent, template)
        .createAsync(TestComponent)
        .then((fixture) => {
          fixture.detectChanges();
          let li = fixture.nativeElement.querySelectorAll('li');
          expect(li.length).toEqual(2);
        });
      }));
    
  });

});

@Component({
  selector: 'container'
})
@View({
  directives: [HeroListComponent]
})
class TestComponent { }