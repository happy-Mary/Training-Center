import {Component, OnInit} from '@angular/core';
import {CowsService} from "./cows.service";
import {Cow} from "./cow";

@Component({
  selector: 'app-cows',
  templateUrl: './cows.component.html',
  styleUrls: ['./cows.component.css']
})
export class CowsComponent implements OnInit {

  cows: Cow[] = [];

  constructor(private cowsService: CowsService) {
  }

  ngOnInit() {
    this.cowsService.getCows()
      .subscribe((data: Cow[]) => {
        this.cows = Array.from(Object.values(data));
      });
  }

  addCow(newCow: string) {
    if (newCow) {
      var cow: Cow = <Cow>{name: newCow};
      this.cowsService.addCow(cow)
        .subscribe(() => {
          this.cows.push(cow);
        });

    }
  }
}
