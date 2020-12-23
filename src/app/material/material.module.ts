import { NgModule } from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatTabsModule} from "@angular/material/tabs";
import {MatSelectModule} from "@angular/material/select";
import {MatDialogModule} from "@angular/material/dialog";

const material = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatBottomSheetModule,
  MatInputModule,
  MatDatepickerModule,
  MatMomentDateModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatListModule,
  MatTabsModule,
  MatSelectModule,
  MatDialogModule,
];

@NgModule({
  imports: material,
  exports: material
})
export class MaterialModule { }
