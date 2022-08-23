import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { MaterialModule } from "./material.module";
import { FormModule } from "./mv-form-core/form.module";
import { MVComponentsModule } from "../public-api";

@NgModule({
    declarations:[],
    imports: [MaterialModule],
    providers:[ReactiveFormsModule,FormsModule,CommonModule,FormModule, MVComponentsModule],
    exports: [MaterialModule]
})

export class MVClientCoreAppModule {}