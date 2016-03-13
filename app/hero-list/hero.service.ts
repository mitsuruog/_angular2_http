import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import {Hero}           from './hero.model';

@Injectable()
export class HeroService {
  
  private URL = 'app/hero-list/heroes.json';

  constructor(
    private http: Http
  ) { }
  
  getHeroes() {
    return this.http.get(this.URL)
    // sampleでは.mapができるみたいだけどObservableがかえってくる。。。
      .subscribe(
        response => <Hero[]>response.json().data,
        error => this.handleError
      );
  }
  
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server Error');
  }
  
}