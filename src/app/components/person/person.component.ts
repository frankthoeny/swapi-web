import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  @Input() name: string;
  @Input() birth_year: string;
  @Input() gender: string;
  @Input() height: string;
  @Input() mass: string;
  @Input() homeworld: string;
  public planet: string;

  public ngOnInit(): void {
    this.planet = this.homeworld.split('/')[5];
  }

}
