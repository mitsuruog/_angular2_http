import {Injectable} from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Hero} from './hero.model';

@Injectable()
export class HeroService {

  private URL = 'app/hero-list/heroes.json';

  constructor(
    private http: Http
  ) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get(this.URL)
      .map(res => <Hero[]>res.json().data)
      .do(data => console.log(data))
      .catch(this.handleError)
  }

  addHero(name: string): Observable<Hero> {
    let body: string = JSON.stringify({ name });
    let headers: Headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options: RequestOptions = new RequestOptions({
      headers: headers
    })
    return this.http.post(this.URL, body, options)
      .map(res => <Hero>res.json().data)
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.log(error);
    return Observable.throw(error.text() || 'Server Error');
  }

}