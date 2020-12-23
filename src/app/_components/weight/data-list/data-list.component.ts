import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Weight} from "../../../_models/weight";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmComponent} from "../../../_dialogs/confirm/confirm.component";
import {ApiService} from "../../../_services/api.service";
import {AddWeightComponent} from "../../../_dialogs/add-weight/add-weight.component";

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit {

  @Input() weightList: Weight[];
  @Input() animal: string;
  @Output() updateData = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private apiService: ApiService
  ) {
  }

  ngOnInit(): void {
  }

  delete(doc: Weight) {
    this.dialog.open(ConfirmComponent, {
      data: {
        title: 'Supprimer cette entrée ?',
        message: 'T\'es sûr de vouloir supprimer cette entrée ?'
      }
    }).afterClosed().subscribe(confirm => {
      if (confirm) {
        this.apiService.delete('weight', doc.id).subscribe(() => {
          this.updateData.emit();
        });
      }
    });
  }

  edit(doc: Weight) {
    this.dialog.open(AddWeightComponent, {
      data: doc
    }).afterClosed().subscribe((weight: Weight) => {
      if (weight) {
        this.apiService.update('weight', doc.id, weight).subscribe(() => {
          this.updateData.emit();
        })
      }
    })
  }

  add() {
    this.dialog.open(AddWeightComponent).afterClosed().subscribe((weight: Weight) => {
      if (weight) {
        weight.animal = this.animal;
        this.apiService.insert('weight', weight).subscribe(() => {
          this.updateData.emit();
        })
      }
    });
  }

}
