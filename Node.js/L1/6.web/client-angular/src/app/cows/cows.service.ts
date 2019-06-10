import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Cow} from "./cow";


@Injectable()
export class CowsService {

  constructor(private http: HttpClient) {
  }

  public getCows(): Observable<Cow[]> {
    return this.http.get('/api/cows');
  }

  public addCow(cow: Cow) {
    return this.http.post('/api/cows', cow);
  }

}
