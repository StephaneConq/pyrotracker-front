import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Weight} from "../../_models/weight";

@Component({
  selector: 'app-add-weight',
  templateUrl: './add-weight.component.html',
  styleUrls: ['./add-weight.component.scss']
})
export class AddWeightComponent implements OnInit, AfterViewInit {

  model = {
    timestamp: new Date(),
    weight: null
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: Weight) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.data) {
        this.data.timestamp = new Date(this.data.timestamp);
        this.model = this.data;
      }
    });
  }

}
