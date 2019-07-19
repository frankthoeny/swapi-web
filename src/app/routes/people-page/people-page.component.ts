import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SwapiService } from '../../services/swapi.service';
import { StarWarsPerson } from 'src/app/services/swapi.interface';

@Component({
  selector: 'app-people-page',
  templateUrl: './people-page.component.html',
  styleUrls: ['./people-page.component.scss']
})
export class PeoplePageComponent implements OnInit {
  public title: string = 'People';
  public peopleCtrl: FormControl = new FormControl();
  public filteredPeople: StarWarsPerson[] = [];
  public selectedIndex: number = null;
  private _searchValue: string;

  constructor(private swapiService: SwapiService) {}

  public ngOnInit(): void {
    this.swapiService.setTitle(this.title);
    this.swapiService.starWarsPeople();
    this.peopleCtrl.enable();
    this.filteredPeople = this.swapiService.people;
  }

  public activateClass(index: number): void {
    this.selectedIndex = index;
  }

  get searchValue(): string {
    return this._searchValue;
  }

  set searchValue(value: string) {
    this._searchValue = value;
    this.filteredPeople = this.filterPeople(value);
  }

  public filterPeople(value: string): Array<StarWarsPerson> {
    return this.swapiService.people.filter(
      result => result.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }
}
