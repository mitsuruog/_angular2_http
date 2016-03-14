import {Component, OnInit} from 'angular2/core';
import {JSONP_PROVIDERS} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {WikipediaService} from './wikipedia.service';

@Component({
  templateUrl: 'app/wikipedia/wikipedia.html',
  providers: [JSONP_PROVIDERS, WikipediaService]
})
export class WikipediaComponent {

  constructor(
    private service: WikipediaService
  ) { }

  // [MEMO] このままではkeyupのたびにRequestを送信するのでやめる
  // items: Observable<string[]>
  // search(query: string) {
  //   this.items = this.service.search(query);
  // }

  private searchTermStream: Subject<string> = new Subject<string>()

  items: Observable<string[]> = this.searchTermStream
    .debounceTime(300)      // 300msec待つ
    .distinctUntilChanged() // 前回を変わってないことを保証する
    // 前提条件がクリアされた場合のみserviceを呼び出す
    .switchMap((query: string) => this.service.search(query));

  search(query: string) {
    this.searchTermStream.next(query);
  }

}