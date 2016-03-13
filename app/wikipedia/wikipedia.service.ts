import {Injectable} from 'angular2/core';
import {Jsonp, URLSearchParams} from 'angular2/http';

@Injectable()
export class WikipediaService {
  
  private WIKI_URL = 'http://en.wikipedia.org/w/api.php';
  
  constructor(
    private jsonp: Jsonp
  ) { }
  
  search(query: string) {
    
    let params = new URLSearchParams();
    params.set('search', query);
    params.set('action', 'opensearch');
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');
    
    return this.jsonp.get(this.WIKI_URL, {
      search: params
    }).map(result => <string[]>result.json()[1]);
  }
  
}