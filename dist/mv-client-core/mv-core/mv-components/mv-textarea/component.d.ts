import { EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Field } from '../../mv-form-core/form';
import { FormData } from '../../mv-form-core/formData';
import * as i0 from "@angular/core";
/**
 * app-mv -> metadev component prefix
 */
export declare class MvTextareaComponent implements OnInit {
    field: Field | undefined;
    formData: FormData | undefined;
    type: string | undefined;
    valueChange: EventEmitter<any>;
    control: FormControl | undefined;
    ngOnInit(): void;
    valueChangeDetector(_$event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MvTextareaComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MvTextareaComponent, "app-mv-textarea", never, { "field": "field"; "formData": "formData"; "type": "type"; }, { "valueChange": "valueChange"; }, never, never, false>;
}
//# sourceMappingURL=component.d.ts.map