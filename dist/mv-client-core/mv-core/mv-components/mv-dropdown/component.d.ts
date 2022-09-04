import { EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Field } from '../../mv-form-core/form';
import { FormData } from '../../mv-form-core/formData';
import * as i0 from "@angular/core";
/**
 * app-mv -> metadev component prefix
 */
export declare class MvDropDownComponent implements OnInit {
    field: Field | undefined;
    formData: FormData | undefined;
    type: string | undefined;
    valueChange: EventEmitter<string>;
    changeListener: EventEmitter<any>;
    formControl: FormControl | undefined;
    ngOnInit(): void;
    currentValue(value: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MvDropDownComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MvDropDownComponent, "app-mv-dropdown", never, { "field": "field"; "formData": "formData"; "type": "type"; }, { "valueChange": "valueChange"; "changeListener": "changeListener"; }, never, never, false>;
}
//# sourceMappingURL=component.d.ts.map