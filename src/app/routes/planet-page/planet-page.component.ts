import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarWarsPlanet } from 'src/app/services/swapi.interface';
import { SwapiService } from 'src/app/services/swapi.service';

@Component({
  selector: 'app-planet-page',
  templateUrl: './planet-page.component.html',
  styleUrls: ['./planet-page.component.scss']
})
export class PlanetPageComponent implements OnInit {
  public title = 'Planet';
  public id: number;
  public url: string;
  public planet: StarWarsPlanet;

  constructor(
    public route: ActivatedRoute,
    public swapiService: SwapiService
  ) {}

  public ngOnInit(): void {
    this.swapiService.setTitle(this.title);
    this.id = +this.route.snapshot.paramMap.get('planetId');
    this.url = this.swapiService.planetsUrl + this.id.toString() + '/';

    this.swapiService
      .getPlanetById(this.url)
      .subscribe(data => (this.planet = data));
  }
}
