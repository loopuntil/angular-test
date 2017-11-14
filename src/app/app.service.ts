import { Injectable } from '@angular/core';
import { Hero } from './hero';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';
import 'rxjs/add/operator/delay';
@Injectable()
export class AppService {

  constructor() { }

  heroList: Hero[] = [];

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getHeroList(): Promise<Hero[]> {
    return this.mockClient().toPromise()
      .then(list => list as Hero[])
      .catch(this.handleError);
  }

  add(hero: Hero): Promise<boolean>{
    return this.mockClientAdd(hero).toPromise()
    .then(list=>{
        if(list.length >0){
          return true;
        }
        return false;
    }).catch(this.handleError);

  }

  remove(id: string): Promise<boolean> {
    console.log(`list size:` + this.heroList.length);
    return this.mockClientRemove(id).toPromise()
      .then( success =>success)
      .catch(this.handleError);

  }

  private mockClient(): Observable<Hero[]> {
    return of(this.heroList).delay(300);
  }

  private mockClientAdd(hero: Hero): Observable<Hero[]> {
    let list = this.heroList.map(o => o);
    list.push(hero);
    this.heroList = list;
    return of(this.heroList).delay(100);
  }

  private mockClientRemove(id: string): Observable<boolean> {
    let list = this.heroList.map(o => o);
    let rtn:boolean = false;
    let index: number = list.findIndex(o => o.id === id);
        if (index > -1) {
          list.splice(index, 1);
          this.heroList = list;
          rtn=true;
        }
    return of(rtn).delay(100);
  }
}
