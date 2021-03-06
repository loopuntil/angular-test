import { Injectable } from '@angular/core';
import { Hero } from './hero';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';
import 'rxjs/add/operator/delay';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable()
export class AppService {

  constructor(private http: HttpClient) { }

  heroList: Hero[] = [
    { id: 31, name: 'Mr. Nice' },
    { id: 12, name: 'Narco' },
    { id: 19, name: 'Magma' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'RubberMan' },
    { id: 17, name: 'Dynama' },
    { id: 13, name: 'Bombasto' },
    { id: 14, name: 'Celeritas' },
    { id: 18, name: 'Dr IQ' },
    { id: 20, name: 'Tornado' }
  ];

  private baseUrl: string = 'http://localhost:3000/api/hero';

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getHeroList(): Promise<Hero[]> {
    //return this.mockClient()
    return this.http.get(this.baseUrl)
      .toPromise()
      .then(list => list as Hero[])
      .catch(this.handleError);
  }

  add(hero: Hero): Promise<boolean> {
    //return this.mockClientAdd(hero)
    return this.http.post(this.baseUrl, hero)
      .toPromise()
      .then(success => success).catch(this.handleError);

  }

  remove(id: string): Promise<boolean> {
    //return this.mockClientRemove(id)
    return this.http.delete(this.baseUrl+'/'+id)
      .toPromise()
      .then(success => success)
      .catch(this.handleError);

  }

  edit(hero: Hero): Promise<boolean> {
    //return this.mockClientEdit(hero)
    return this.http.put(this.baseUrl+'/'+hero.id, hero)
      .toPromise()
      .then(success => success)
      .catch(this.handleError);
  }

  private mockClient(): Observable<Hero[]> {
    return of(this.heroList).delay(300);
  }

  private mockClientAdd(hero: Hero): Observable<Hero[]> {
    let list = [...this.heroList];
    list.push(hero);
    this.heroList = list;
    return of(this.heroList).delay(100);
  }

  private mockClientRemove(id: string): Observable<boolean> {
    let list = [...this.heroList];
    let rtn: boolean = false;
    let index: number = list.findIndex(o => o.id === id);
    if (index > -1) {
      list.splice(index, 1);
      this.heroList = list;
      rtn = true;
    }
    return of(rtn).delay(100);
  }

  private mockClientEdit(hero: Hero): Observable<boolean> {

    let rtn: boolean = false;
    let list = this.heroList.map(o => {
      rtn = true;
      if (o.id === hero.id) {
        console.log(`id:${hero.id}, name:${hero.name}`);
        o = hero;
      }
      return o;
    })
    this.heroList = list;
    return of(rtn).delay(100);
  }
}
