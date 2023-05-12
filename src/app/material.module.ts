import { NgModule } from "@angular/core";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";

const myModules:any[] = [
    MatToolbarModule, 
    MatSidenavModule, 
    MatButtonModule, 
    MatMenuModule, 
    MatListModule, 
    MatIconModule, 
    MatInputModule, 
    MatCardModule
];

@NgModule({
    imports : [...myModules],
    exports: [...myModules],
})

export class MaterialModule{}