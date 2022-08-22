import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { MaterialModule } from "./material.module";

@NgModule({
    imports: [MaterialModule],
    providers:[ReactiveFormsModule,FormsModule,CommonModule],
    declarations:[],
    exports: [MaterialModule]
})

export class MVClientCoreAppModule {}