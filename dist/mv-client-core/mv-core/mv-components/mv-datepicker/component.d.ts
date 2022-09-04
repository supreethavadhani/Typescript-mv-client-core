import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Field } from '../../mv-form-core/form';
import { FormData } from '../../mv-form-core/formData';
import * as i0 from "@angular/core";
export declare class MvDatePickerComponent implements OnInit {
    private dateAdapter;
    field: Field | undefined;
    formData: FormData | undefined;
    formControl: FormControl | undefined;
    today: Date;
    constructor(dateAdapter: DateAdapter<Date>);
    ngOnInit(): void;
    dateChange(_$event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MvDatePickerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MvDatePickerComponent, "app-mv-date", never, { "field": "field"; "formData": "formData"; }, {}, never, never, false>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MvDatePickerComponent>;
}
//# sourceMappingURL=component.d.ts.map