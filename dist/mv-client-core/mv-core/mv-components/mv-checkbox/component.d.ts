import { EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Field } from '../../mv-form-core/form';
import { FormData } from '../../mv-form-core/formData';
import * as i0 from "@angular/core";
export declare class MvCheckboxComponent implements OnInit {
    field: Field | undefined;
    formData: FormData | undefined;
    valueChange: EventEmitter<boolean>;
    changeListener: EventEmitter<any>;
    control: FormControl | undefined;
    isChecked: boolean;
    ngOnInit(): void;
    changed(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MvCheckboxComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MvCheckboxComponent, "app-mv-checkbox", never, { "field": "field"; "formData": "formData"; }, { "valueChange": "valueChange"; "changeListener": "changeListener"; }, never, never, false>;
}
//# sourceMappingURL=component.d.ts.map