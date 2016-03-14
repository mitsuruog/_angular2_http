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

import 'rxjs/Rx';
import {Component, provide} from 'angular2/core';
import {Http, BaseRequestOptions, Response, ResponseOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {MockBackend, MockConnection} from 'angular2/http/testing';

import {Hero} from './hero.model';
import {HeroService} from './hero.service';

describe('Test: HeroService', () => {

  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    provide(Http, {
      useFactory: function(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    }),
    HeroService
  ]);

  it('HeroServiceが存在すること', inject([HeroService], (testee: HeroService) => {
    expect(testee).toBeDefined();
  }));

  describe('getHeroes: 正常系', () => {

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

    it('2件取得できること', inject([HeroService], (testee: HeroService) => {
      testee.getHeroes().subscribe((res: Hero[]) => {
        expect(res.length).toEqual(2);
        expect(res[0].name).toEqual('mitsuru');
      });
    }));

  });

  // describe('getHeroes: 異常系', () => {

  //   beforeEach(inject([MockBackend], (backend: MockBackend) => {
  //     // [MEMO] 普通の(？)エラーはこれでいいはず
  //     // backend.connections.subscribe(
  //     //   (conn: MockConnection) => conn.mockError(new Error('noop'))
  //     // );
  //     const response = new Response(new ResponseOptions({
  //       status: 500,
  //       statusText: 'noop'
  //     }));
  //     backend.connections.subscribe(
  //       (conn: MockConnection) => conn.mockRespond(response)
  //     );
  //   }));

  //   it('', inject([HeroService], (testee: HeroService) => {
  //     testee.getHeroes().subscribe(null, (error: Error) => {
  //       expect(error.message).toEqual('noop');
  //     })
  //   }));

  // });

});