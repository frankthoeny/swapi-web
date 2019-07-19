import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, EMPTY } from 'rxjs';
import { catchError, expand, distinct } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {
  StarWarsPerson,
  StarWarsPersonResponse,
  StarWarsPlanet
} from './swapi.interface';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  private title: BehaviorSubject<string> = new BehaviorSubject('SWAPI APP');
  private title$: Observable<string> = this.title.asObservable();

  public people: StarWarsPerson[] = [];
  public peopleUrl: string = 'https://swapi.co/api/people/';
  public planetsUrl: string = 'https://swapi.co/api/planets/';

  constructor(public httpClient: HttpClient) {}

  public setTitle(title: string): void {
    this.title.next(title);
  }

  public getTitle(): Observable<String> {
    return this.title$;
  }

  public getPeople(url: string): Observable<StarWarsPersonResponse> {
    return this.httpClient.get<StarWarsPersonResponse>(url).pipe(
      catchError(error => {
        console.log('error: ', error);
        return of(error);
      })
    );
  }

  public starWarsPeople(): void {
    if (this.people.length === 0 || localStorage.length === 0) {
      this.getPeople(this.peopleUrl)
        .pipe(
          expand(response =>
            response.next ? this.getPeople(response.next) : EMPTY
          )
        )
        .subscribe(data => {
          this.people.push(...data.results);
        });
    } else if (localStorage) {
      this.people = this.get('STARWARS-CHARACTERS');
    }
  }

  public getPlanetById(url: string): Observable<StarWarsPlanet> {
    return this.httpClient.get<StarWarsPlanet>(url).pipe(
      catchError(error => {
        console.log('error: ', error);
        return of(error);
      })
    );
  }

  public set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  public get(key: string): any {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }
}
