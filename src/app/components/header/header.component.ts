import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SwapiService } from 'src/app/services/swapi.service';
import { StarWarsPerson } from 'src/app/services/swapi.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public title: String;
  public show: boolean;
  public starWarsCharacters: StarWarsPerson[] = [];

  constructor( public swapiService: SwapiService, private location: Location ) { }

  public ngOnInit(): void {
    this.swapiService.getTitle().subscribe(pageTitle => this.title = pageTitle);
  }

  public showBackLink(): boolean {
    return this.title === 'Planet' ? this.show = true : this.show = false;
  }

  public goBack(): void {
    this.location.back();
  }

  public swapiSetLocalStorage(): void {
    this.starWarsCharacters = this.swapiService.people;
    this.swapiService.set('STARWARS-CHARACTERS', this.starWarsCharacters);
  }

}
