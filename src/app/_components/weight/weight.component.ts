import { Component, OnInit } from '@angular/core';
import {ChartType} from "angular-google-charts";
import {ApiService} from "../../_services/api.service";
import {Weight} from "../../_models/weight";

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.scss']
})
export class WeightComponent implements OnInit {

  constructor(
    private apiService: ApiService
  ) { }

  chartType = ChartType.LineChart;
  allWeights: Weight[] = [];
  weights = [];

  animalModel = null;
  animals = [];

  ngOnInit(): void {
    this.apiService.list('weight').subscribe((data: Weight[]) => {
      this.animals = [...new Set(data.map(d => d.animal))];
      this.allWeights = data;
      this.animalModel = 'Pyro';
      this.updateChart('Pyro');
    });
  }

  updateChart(animal: string) {
    this.weights = this.allWeights.filter(w => w.animal === animal).sort(this.sortByDate).map(w => {
      return [new Date(w.timestamp), w.weight];
    })
  }

  getWeightList(animal: string) {
    return this.allWeights.filter(w => w.animal === animal).sort(this.sortByDate);
  }

  sortByDate(a, b) {
    const aDate = new Date(a.timestamp);
    const bDate = new Date(b.timestamp);
    return aDate.getTime() - bDate.getTime();
  }

  updateData() {
    this.apiService.list('weight').subscribe((data: Weight[]) => {
      this.allWeights = data;
      this.updateChart(this.animalModel);
    });
  }

  tabChanged(event) {
    this.animalModel = this.animals[event];
    this.updateChart(this.animalModel);
  }

}
