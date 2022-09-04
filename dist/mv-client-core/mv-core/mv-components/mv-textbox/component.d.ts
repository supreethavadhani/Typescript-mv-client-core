import { EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Field } from '../../mv-form-core/form';
import { FormData } from '../../mv-form-core/formData';
import * as i0 from "@angular/core";
/**
 * app-mv -> metadev component prefix
 */
export declare class MvTextboxComponent implements OnInit {
    field: Field | undefined;
    formData: FormData | undefined;
    type: string | undefined;
    valueChange: EventEmitter<any>;
    control: FormControl | undefined;
    /**
     * On component initalization get
     * form contorl from the formData
     */
    ngOnInit(): void;
    valueChangeDetector(_$event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MvTextboxComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MvTextboxComponent, "app-mv-textbox", never, { "field": "field"; "formData": "formData"; "type": "type"; }, { "valueChange": "valueChange"; }, never, never, false>;
}
//# sourceMappingURL=component.d.ts.map