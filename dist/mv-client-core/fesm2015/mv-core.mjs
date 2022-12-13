import * as i0 from '@angular/core';
import { Injectable, NgModule, EventEmitter, Component, Input, Output, ViewEncapsulation } from '@angular/core';
import * as i4 from '@angular/forms';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl } from '@angular/forms';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2 from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as i3 from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import * as i3$1 from '@angular/material/select';
import { MatSelectModule } from '@angular/material/select';
import * as i2$1 from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import * as i1$2 from '@angular/material/checkbox';
import { MatCheckboxModule } from '@angular/material/checkbox';
import * as i5 from '@angular/material/datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import * as i1$3 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i1$1 from '@angular/material/core';
import { __decorate } from 'tslib';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as i1$4 from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

class MvClientCoreService {
    constructor() { }
}
MvClientCoreService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MvClientCoreService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
MvClientCoreService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MvClientCoreService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MvClientCoreService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

const materialModules = [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatButtonModule
];
class MaterialModule {
}
MaterialModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MaterialModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MaterialModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.1.3", ngImport: i0, type: MaterialModule, imports: [MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatCardModule,
        MatDatepickerModule,
        MatTooltipModule,
        MatButtonModule], exports: [MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatCardModule,
        MatDatepickerModule,
        MatTooltipModule,
        MatButtonModule] });
MaterialModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MaterialModule, imports: [materialModules, MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatCardModule,
        MatDatepickerModule,
        MatTooltipModule,
        MatButtonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MaterialModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        ...materialModules
                    ],
                    exports: [
                        ...materialModules
                    ]
                }]
        }] });

/**
 * app-mv -> metadev component prefix
 */
/**
 * Wrapper class for angular material.
 * Unpacks values from the model to render a textbox
 * @ouput - valueChange - value change emitter.
 */
class MvTextboxComponent {
    constructor() {
        this.field = {
            label: "",
            name: "",
            valueType: 0,
            errorId: "",
            hint: "",
            isRequired: true,
        };
        this.valueChange = new EventEmitter();
    }
    /**
     * On component initalization get
     * form contorl from the formData
     */
    ngOnInit() {
        if (this.formData && this.field) {
            this.control = this.formData.formGroup.get(this.field.name);
        }
    }
    valueChangeDetector(_$event) {
        if (this.formData && this.field) {
            this.valueChange.next(this.formData.getFieldValue(this.field.name));
        }
    }
}
MvTextboxComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MvTextboxComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MvTextboxComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.3", type: MvTextboxComponent, selector: "app-mv-textbox", inputs: { field: "field", formData: "formData", type: "type" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: "<mat-form-field class=\"col-md-12\" appearance=\"fill\">\r\n  <mat-label>{{field?.label}} <span *ngIf=\"!field?.isRequired\" class=\"optional\">(optional)</span></mat-label>\r\n  <span matPrefix>{{field?.prefix}}</span>\r\n  <input *ngIf=\"control\" [formControl]=\"control\" matInput (input)=\"valueChangeDetector($event)\"\r\n    [readonly]=\"field?.isEditable\" placeholder=\"{{field?.placeHolder}}\">\r\n  <mat-hint>{{field?.hint}}</mat-hint>\r\n  <mat-icon matSuffix>{{field?.icon}}</mat-icon>\r\n  <mat-error>\r\n    <div *ngIf=\"this.control?.errors\">\r\n      {{this.field?.errorId}}\r\n    </div>\r\n  </mat-error>\r\n", dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.MatError, selector: "mat-error", inputs: ["id"] }, { kind: "component", type: i2.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i2.MatHint, selector: "mat-hint", inputs: ["align", "id"] }, { kind: "directive", type: i2.MatLabel, selector: "mat-label" }, { kind: "directive", type: i2.MatPrefix, selector: "[matPrefix]" }, { kind: "directive", type: i2.MatSuffix, selector: "[matSuffix]" }, { kind: "directive", type: i3.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "directive", type: i4.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i4.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MvTextboxComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-mv-textbox', template: "<mat-form-field class=\"col-md-12\" appearance=\"fill\">\r\n  <mat-label>{{field?.label}} <span *ngIf=\"!field?.isRequired\" class=\"optional\">(optional)</span></mat-label>\r\n  <span matPrefix>{{field?.prefix}}</span>\r\n  <input *ngIf=\"control\" [formControl]=\"control\" matInput (input)=\"valueChangeDetector($event)\"\r\n    [readonly]=\"field?.isEditable\" placeholder=\"{{field?.placeHolder}}\">\r\n  <mat-hint>{{field?.hint}}</mat-hint>\r\n  <mat-icon matSuffix>{{field?.icon}}</mat-icon>\r\n  <mat-error>\r\n    <div *ngIf=\"this.control?.errors\">\r\n      {{this.field?.errorId}}\r\n    </div>\r\n  </mat-error>\r\n" }]
        }], propDecorators: { field: [{
                type: Input
            }], formData: [{
                type: Input
            }], type: [{
                type: Input
            }], valueChange: [{
                type: Output
            }] } });

/**
 * app-mv -> metadev component prefix
 */
/**
 * Wrapper class for angular material.
 * Unpacks values from the model to render a dropdown
 */
class MvDropDownComponent {
    constructor() {
        this.field = {
            label: "",
            name: "",
            valueType: 0,
            errorId: "",
            hint: "",
            isRequired: true,
        };
        this.valueChange = new EventEmitter();
        this.changeListener = new EventEmitter();
    }
    ngOnInit() {
        if (this.formData && this.field) {
            this.formControl = this.formData.formGroup.get(this.field.name);
            this.formControl.valueChanges.subscribe(value => {
                this.changeListener.next(value);
            });
        }
    }
    currentValue(value) {
        this.valueChange.next(value);
    }
}
MvDropDownComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MvDropDownComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MvDropDownComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.3", type: MvDropDownComponent, selector: "app-mv-dropdown", inputs: { field: "field", formData: "formData", type: "type" }, outputs: { valueChange: "valueChange", changeListener: "changeListener" }, ngImport: i0, template: "<mat-form-field class=\"col-md-12\" appearance=\"fill\">\r\n  <mat-label>{{field?.label}}<span *ngIf=\"!field?.isRequired\" class=\"optional\">(optional)</span></mat-label>\r\n  <mat-select disableOptionCentering=\"true\" (selectionChange)=\"currentValue($event.value);\"\r\n    [required]=\"field?.isRequired\" placeholder=\"{{field?.placeHolder}}\" [formControl]=\"formControl\">\r\n    <mat-option *ngIf=\"!field?.isRequired\">None</mat-option>\r\n    <mat-option *ngFor=\"let list of formData?.lists[field?.name]\" [(value)]=\"list.value\">\r\n      {{list.text}}\r\n    </mat-option>\r\n  </mat-select>\r\n  <mat-error>\r\n    <div *ngIf=\"this.formControl?.errors\">\r\n      {{this.field.errorId}}\r\n    </div>\r\n  </mat-error>\r\n</mat-form-field>\r\n", dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.MatError, selector: "mat-error", inputs: ["id"] }, { kind: "component", type: i2.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i2.MatLabel, selector: "mat-label" }, { kind: "component", type: i3$1.MatSelect, selector: "mat-select", inputs: ["disabled", "disableRipple", "tabIndex"], exportAs: ["matSelect"] }, { kind: "component", type: i1$1.MatOption, selector: "mat-option", exportAs: ["matOption"] }, { kind: "directive", type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i4.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i4.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MvDropDownComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-mv-dropdown', template: "<mat-form-field class=\"col-md-12\" appearance=\"fill\">\r\n  <mat-label>{{field?.label}}<span *ngIf=\"!field?.isRequired\" class=\"optional\">(optional)</span></mat-label>\r\n  <mat-select disableOptionCentering=\"true\" (selectionChange)=\"currentValue($event.value);\"\r\n    [required]=\"field?.isRequired\" placeholder=\"{{field?.placeHolder}}\" [formControl]=\"formControl\">\r\n    <mat-option *ngIf=\"!field?.isRequired\">None</mat-option>\r\n    <mat-option *ngFor=\"let list of formData?.lists[field?.name]\" [(value)]=\"list.value\">\r\n      {{list.text}}\r\n    </mat-option>\r\n  </mat-select>\r\n  <mat-error>\r\n    <div *ngIf=\"this.formControl?.errors\">\r\n      {{this.field.errorId}}\r\n    </div>\r\n  </mat-error>\r\n</mat-form-field>\r\n" }]
        }], propDecorators: { field: [{
                type: Input
            }], formData: [{
                type: Input
            }], type: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], changeListener: [{
                type: Output
            }] } });

/**
 * app-mv -> metadev component prefix
 */
/**
 * Wrapper class for angular material.
 * Unpacks values from the model to render a textarea
 * @ouput - valueChange - value change emitter.
 */
class MvTextareaComponent {
    constructor() {
        this.field = {
            label: "",
            name: "",
            valueType: 0,
            errorId: "",
            hint: "",
            isRequired: true,
        };
        this.valueChange = new EventEmitter();
    }
    ngOnInit() {
        if (this.formData && this.field) {
            this.control = this.formData.formGroup.get(this.field.name);
        }
    }
    valueChangeDetector(_$event) {
        var _a;
        if (this.formData && this.field) {
            this.valueChange.next((_a = this.formData) === null || _a === void 0 ? void 0 : _a.getFieldValue(this.field.name));
        }
    }
}
MvTextareaComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MvTextareaComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MvTextareaComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.3", type: MvTextareaComponent, selector: "app-mv-textarea", inputs: { field: "field", formData: "formData", type: "type" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: "<mat-form-field class=\"col-md-12\" appearance=\"fill\">\r\n\t<mat-label>{{field?.label}} <span *ngIf=\"!field?.isRequired\" class=\"optional\">(optional)</span></mat-label>\r\n\t<span matPrefix>{{field?.prefix}}</span>\r\n\t<textarea [formControl]=\"control\" matInput (input)=\"valueChangeDetector($event)\"\r\n\t\t[required]=\"field?.isRequired\" [readonly]=\"field?.isEditable\" placeholder=\"{{field?.placeHolder}}\"> </textarea>\r\n\t<mat-hint>{{field?.hint}}</mat-hint>\r\n\t<mat-icon matSuffix>{{field?.icon}}</mat-icon>\r\n\t<mat-error>\r\n\t\t<div *ngIf=\"this.control?.errors\">\r\n\t\t\t{{this.field.errorId}}\r\n\t\t</div>\r\n\t</mat-error>\r\n</mat-form-field>", dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.MatError, selector: "mat-error", inputs: ["id"] }, { kind: "component", type: i2.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i2.MatHint, selector: "mat-hint", inputs: ["align", "id"] }, { kind: "directive", type: i2.MatLabel, selector: "mat-label" }, { kind: "directive", type: i2.MatPrefix, selector: "[matPrefix]" }, { kind: "directive", type: i2.MatSuffix, selector: "[matSuffix]" }, { kind: "directive", type: i3.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "directive", type: i4.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i4.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i4.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MvTextareaComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-mv-textarea', template: "<mat-form-field class=\"col-md-12\" appearance=\"fill\">\r\n\t<mat-label>{{field?.label}} <span *ngIf=\"!field?.isRequired\" class=\"optional\">(optional)</span></mat-label>\r\n\t<span matPrefix>{{field?.prefix}}</span>\r\n\t<textarea [formControl]=\"control\" matInput (input)=\"valueChangeDetector($event)\"\r\n\t\t[required]=\"field?.isRequired\" [readonly]=\"field?.isEditable\" placeholder=\"{{field?.placeHolder}}\"> </textarea>\r\n\t<mat-hint>{{field?.hint}}</mat-hint>\r\n\t<mat-icon matSuffix>{{field?.icon}}</mat-icon>\r\n\t<mat-error>\r\n\t\t<div *ngIf=\"this.control?.errors\">\r\n\t\t\t{{this.field.errorId}}\r\n\t\t</div>\r\n\t</mat-error>\r\n</mat-form-field>" }]
        }], propDecorators: { field: [{
                type: Input
            }], formData: [{
                type: Input
            }], type: [{
                type: Input
            }], valueChange: [{
                type: Output
            }] } });

/**
 * The componenet unpacks the formdata (input)
 * and renders the all the fields of the form.
 * The component uses Metadev (Mv) components to
 * render the fields
 * @formData - FormData
 */
class MvFormGeneratorComponent {
    ngOnInit() {
        var _a, _b;
        this.form = (_a = this.formData) === null || _a === void 0 ? void 0 : _a.form;
        this.fields = (_b = this.formData) === null || _b === void 0 ? void 0 : _b.form.fields;
    }
}
MvFormGeneratorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MvFormGeneratorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MvFormGeneratorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.3", type: MvFormGeneratorComponent, selector: "app-mv-form-generator", inputs: { formData: "formData" }, ngImport: i0, template: "<mat-card class=\"col-md-12\" style=\"margin: 0 auto;\">\r\n  <div *ngFor=\"let field of fields | keyvalue\" [ngSwitch]=\"field.value.controlType\">\r\n    <app-mv-textbox class=\"col\" *ngSwitchCase=\"'Input'\" [field]=\"form[field.key]\" [formData]=\"formData\"></app-mv-textbox>\r\n    <app-mv-textarea class=\"col\" *ngSwitchCase=\"'Textarea'\" [field]=\"form[field.key]\" [formData]=\"formData\"></app-mv-textarea>\r\n    <app-mv-dropdown class=\"col\" *ngSwitchCase=\"'Dropdown'\" [field]=\"form[field.key]\" [formData]=\"formData\"></app-mv-dropdown>\r\n  </div>\r\n</mat-card>\r\n", dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "component", type: i2$1.MatCard, selector: "mat-card", exportAs: ["matCard"] }, { kind: "component", type: MvTextboxComponent, selector: "app-mv-textbox", inputs: ["field", "formData", "type"], outputs: ["valueChange"] }, { kind: "component", type: MvDropDownComponent, selector: "app-mv-dropdown", inputs: ["field", "formData", "type"], outputs: ["valueChange", "changeListener"] }, { kind: "component", type: MvTextareaComponent, selector: "app-mv-textarea", inputs: ["field", "formData", "type"], outputs: ["valueChange"] }, { kind: "pipe", type: i1.KeyValuePipe, name: "keyvalue" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MvFormGeneratorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-mv-form-generator', template: "<mat-card class=\"col-md-12\" style=\"margin: 0 auto;\">\r\n  <div *ngFor=\"let field of fields | keyvalue\" [ngSwitch]=\"field.value.controlType\">\r\n    <app-mv-textbox class=\"col\" *ngSwitchCase=\"'Input'\" [field]=\"form[field.key]\" [formData]=\"formData\"></app-mv-textbox>\r\n    <app-mv-textarea class=\"col\" *ngSwitchCase=\"'Textarea'\" [field]=\"form[field.key]\" [formData]=\"formData\"></app-mv-textarea>\r\n    <app-mv-dropdown class=\"col\" *ngSwitchCase=\"'Dropdown'\" [field]=\"form[field.key]\" [formData]=\"formData\"></app-mv-dropdown>\r\n  </div>\r\n</mat-card>\r\n" }]
        }], propDecorators: { formData: [{
                type: Input
            }] } });

class MvCheckboxComponent {
    constructor() {
        this.field = {
            label: "",
            name: "",
            valueType: 0,
            errorId: "",
            hint: "",
            isRequired: true,
        };
        this.valueChange = new EventEmitter();
        this.changeListener = new EventEmitter();
        this.isChecked = false;
    }
    ngOnInit() {
        if (this.formData && this.field) {
            this.control = this.formData.formGroup.get(this.field.name);
            this.isChecked = this.control.value;
            this.control.valueChanges.subscribe(value => {
                this.changeListener.next(value);
            });
        }
    }
    changed() {
        var _a, _b;
        this.isChecked = (_a = this.control) === null || _a === void 0 ? void 0 : _a.value;
        this.valueChange.next((_b = this.control) === null || _b === void 0 ? void 0 : _b.value);
    }
}
MvCheckboxComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MvCheckboxComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MvCheckboxComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.3", type: MvCheckboxComponent, selector: "app-mv-checkbox", inputs: { field: "field", formData: "formData" }, outputs: { valueChange: "valueChange", changeListener: "changeListener" }, ngImport: i0, template: "<div class=\"col-md-12\">\r\n  <mat-checkbox class=\"align-margin\" (change)=\"changed()\" [formControl]=\"control\">{{field?.label}}</mat-checkbox>\r\n</div>", dependencies: [{ kind: "component", type: i1$2.MatCheckbox, selector: "mat-checkbox", inputs: ["disableRipple", "color", "tabIndex"], exportAs: ["matCheckbox"] }, { kind: "directive", type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i4.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MvCheckboxComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-mv-checkbox', template: "<div class=\"col-md-12\">\r\n  <mat-checkbox class=\"align-margin\" (change)=\"changed()\" [formControl]=\"control\">{{field?.label}}</mat-checkbox>\r\n</div>" }]
        }], propDecorators: { field: [{
                type: Input
            }], formData: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], changeListener: [{
                type: Output
            }] } });

class MvDatePickerComponent {
    constructor(dateAdapter) {
        this.dateAdapter = dateAdapter;
        this.field = {
            label: "",
            name: "",
            valueType: 0,
            errorId: "",
            hint: "",
            isRequired: true,
        };
        this.today = new Date();
        dateAdapter.setLocale('en-in');
    }
    ngOnInit() {
        var _a;
        if (this.formData && this.field) {
            this.formControl = (_a = this.formData) === null || _a === void 0 ? void 0 : _a.formGroup.get(this.field.name);
            this.formControl.setValue(this.today);
        }
    }
    dateChange(_$event) {
        var _a, _b;
        (_a = this.formControl) === null || _a === void 0 ? void 0 : _a.setValue(((_b = this.formControl) === null || _b === void 0 ? void 0 : _b.value).format("YYYY-MM-DD"));
    }
}
MvDatePickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MvDatePickerComponent, deps: [{ token: i1$1.DateAdapter }], target: i0.ɵɵFactoryTarget.Component });
MvDatePickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.3", type: MvDatePickerComponent, selector: "app-mv-date", inputs: { field: "field", formData: "formData" }, providers: [], ngImport: i0, template: "<mat-form-field class=\"col-md-12\" appearance=\"fill\">\r\n\t<mat-label>{{field?.label}}<span *ngIf=\"!field?.isRequired\" class=\"optional\">(optional)</span></mat-label>\r\n\t<input matInput [matDatepicker]=\"picker\" [required]=\"field?.isRequired\" [formControl]=formControl\r\n\t\t(dateChange)=\"dateChange($event)\">\r\n\t<mat-datepicker-toggle matSuffix [for]=\"picker\" style=\"outline: none;\"></mat-datepicker-toggle>\r\n\t<mat-datepicker style=\"outline: none;\" #picker></mat-datepicker>\r\n</mat-form-field>", dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i2.MatLabel, selector: "mat-label" }, { kind: "directive", type: i2.MatSuffix, selector: "[matSuffix]" }, { kind: "directive", type: i3.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "component", type: i5.MatDatepicker, selector: "mat-datepicker", exportAs: ["matDatepicker"] }, { kind: "directive", type: i5.MatDatepickerInput, selector: "input[matDatepicker]", inputs: ["matDatepicker", "min", "max", "matDatepickerFilter"], exportAs: ["matDatepickerInput"] }, { kind: "component", type: i5.MatDatepickerToggle, selector: "mat-datepicker-toggle", inputs: ["for", "tabIndex", "aria-label", "disabled", "disableRipple"], exportAs: ["matDatepickerToggle"] }, { kind: "directive", type: i4.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i4.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i4.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
MvDatePickerComponent.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MvDatePickerComponent });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MvDatePickerComponent, decorators: [{
            type: Injectable
        }, {
            type: Component,
            args: [{ selector: 'app-mv-date', providers: [], encapsulation: ViewEncapsulation.Emulated, template: "<mat-form-field class=\"col-md-12\" appearance=\"fill\">\r\n\t<mat-label>{{field?.label}}<span *ngIf=\"!field?.isRequired\" class=\"optional\">(optional)</span></mat-label>\r\n\t<input matInput [matDatepicker]=\"picker\" [required]=\"field?.isRequired\" [formControl]=formControl\r\n\t\t(dateChange)=\"dateChange($event)\">\r\n\t<mat-datepicker-toggle matSuffix [for]=\"picker\" style=\"outline: none;\"></mat-datepicker-toggle>\r\n\t<mat-datepicker style=\"outline: none;\" #picker></mat-datepicker>\r\n</mat-form-field>" }]
        }], ctorParameters: function () { return [{ type: i1$1.DateAdapter }]; }, propDecorators: { field: [{
                type: Input
            }], formData: [{
                type: Input
            }] } });

class MvPrimaryButtonComponent {
    constructor() {
        this.isDisabled = false;
    }
}
MvPrimaryButtonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MvPrimaryButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MvPrimaryButtonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.3", type: MvPrimaryButtonComponent, selector: "app-mv-primary-button", inputs: { name: "name", tooltip: "tooltip", isDisabled: "isDisabled" }, ngImport: i0, template: "\r\n<button [disabled]=\"isDisabled\" mat-raised-button color=\"primary\">{{name}}</button>\r\n\r\n", dependencies: [{ kind: "component", type: i1$3.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MvPrimaryButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-mv-primary-button', template: "\r\n<button [disabled]=\"isDisabled\" mat-raised-button color=\"primary\">{{name}}</button>\r\n\r\n" }]
        }], ctorParameters: function () { return []; }, propDecorators: { name: [{
                type: Input
            }], tooltip: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }] } });

class MVComponentsModule {
}
MVComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MVComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MVComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.1.3", ngImport: i0, type: MVComponentsModule, declarations: [MvTextboxComponent,
        MvDropDownComponent,
        MvTextareaComponent,
        MvFormGeneratorComponent,
        MvCheckboxComponent,
        MvDatePickerComponent,
        MvPrimaryButtonComponent], imports: [CommonModule,
        MaterialModule,
        ReactiveFormsModule], exports: [MvTextboxComponent,
        MvDropDownComponent,
        MvTextareaComponent,
        MvFormGeneratorComponent,
        MvCheckboxComponent,
        MvDatePickerComponent,
        MvPrimaryButtonComponent] });
MVComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MVComponentsModule, imports: [CommonModule,
        MaterialModule,
        ReactiveFormsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MVComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        MvTextboxComponent,
                        MvDropDownComponent,
                        MvTextareaComponent,
                        MvFormGeneratorComponent,
                        MvCheckboxComponent,
                        MvDatePickerComponent,
                        MvPrimaryButtonComponent,
                    ],
                    imports: [
                        CommonModule,
                        MaterialModule,
                        ReactiveFormsModule
                    ],
                    exports: [
                        MvTextboxComponent,
                        MvDropDownComponent,
                        MvTextareaComponent,
                        MvFormGeneratorComponent,
                        MvCheckboxComponent,
                        MvDatePickerComponent,
                        MvPrimaryButtonComponent
                    ]
                }]
        }] });

class MVClientCoreAppModule {
}
MVClientCoreAppModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MVClientCoreAppModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MVClientCoreAppModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.1.3", ngImport: i0, type: MVClientCoreAppModule, imports: [MaterialModule, MVComponentsModule], exports: [MaterialModule, MVComponentsModule] });
MVClientCoreAppModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MVClientCoreAppModule, providers: [ReactiveFormsModule, FormsModule, CommonModule], imports: [MaterialModule, MVComponentsModule, MaterialModule, MVComponentsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MVClientCoreAppModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [],
                    imports: [MaterialModule, MVComponentsModule],
                    providers: [ReactiveFormsModule, FormsModule, CommonModule],
                    exports: [MaterialModule, MVComponentsModule]
                }]
        }] });

class ClientConfig {
    constructor() {
        this.url = 'http://localhost:8080/a';
    }
}
ClientConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: ClientConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ClientConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: ClientConfig, providedIn: "root" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: ClientConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

/**
 * acts as a cache from session storage. designed keeping in mind that
 * most session-scoped data is stored-once-accessed-often
 */
const USER = "_user";
const TOKEN = "_token";
class ClientContext {
    constructor() {
        this.values = new Map();
        this.validPages = {};
        this.validPagesArray = [];
    }
    setToken(token) {
        this.setValue(TOKEN, token);
    }
    /**
     * any data that  is to be saved as part of session.
     * This will survive page reloads, but not browser closure
     *
     * @param key
     * @param value
     */
    setValue(key, value) {
        this.values.set(key, value);
        if (value == null) {
            sessionStorage.removeItem(key);
        }
        else {
            sessionStorage.setItem(key, JSON.stringify(value));
        }
    }
    /**
     * value of a field that is session scoped
     * @param key
     */
    getValue(key) {
        let value = this.values.get(key);
        if (value) {
            return value;
        }
        const s = sessionStorage.getItem(key);
        if (!s) {
            return s;
        }
        value = s;
        this.values.set(key, value);
        return value;
    }
    /**
     * details of logged-in user.
     */
    getToken() {
        return this.getValue(TOKEN);
    }
}
ClientContext.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: ClientContext, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ClientContext.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: ClientContext, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: ClientContext, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

/**
 * constants/conventions that are used across layers.
 * These are fixed at design time. deployment-time parameters can be found in Config
 */
class Conventions {
}
/**
 * HTTP headers
 */
Conventions.HEADER_SERVICE = '_s';
Conventions.HEADER_AUTH = 'Authorization';
/**
 * tags or field names in the paylaod back-and-forth
 */
Conventions.TAG_MESSAGES = 'messages';
Conventions.TAG_ALL_OK = 'allOk';
Conventions.TAG_DATA = 'data';
Conventions.TAG_LIST = 'list';
Conventions.TAG_MAX_ROWS = 'maxRows';
Conventions.TAG_CONDITIONS = 'conditions';
Conventions.TAG_FILTER_COMP = 'comp';
Conventions.TAG_FILTER_VALUE = 'value';
Conventions.TAG_FILTER_VALUE_TO = 'toValue';
/**
* special pre-defined service to get drop-down values
*/
Conventions.SERVICE_LIST = 'list';
/*
 * form I/O service prefixes
 */
Conventions.OP_FETCH = 'get';
Conventions.OP_NEW = 'create';
Conventions.OP_UPDATE = 'update';
Conventions.OP_DELETE = 'delete';
Conventions.OP_FILTER = 'filter';
Conventions.OP_BULK = 'bulk';
/*
 * filter operators
 */
Conventions.FILTER_EQ = '=';
Conventions.FILTER_NE = '!=';
Conventions.FILTER_LE = '<=';
Conventions.FILTER_LT = '<';
Conventions.FILTER_GE = '>=';
Conventions.FILTER_GT = '>';
Conventions.FILTER_BETWEEN = '><';
Conventions.FILTER_STARTS_WITH = '^';
Conventions.FILTER_CONTAINS = '~';
/*
 * value types of fields
 */
Conventions.TYPE_TEXT = 0;
Conventions.TYPE_INTEGER = 1;
Conventions.TYPE_DECIMAL = 2;
Conventions.TYPE_BOOLEAN = 3;
Conventions.TYPE_DATE = 4;
Conventions.TYPE_TIMESTAMP = 5;

class PanelData {
    constructor(form, serverAgent) {
        this.form = form;
        this.serverAgent = serverAgent;
        /**
        * data as received from the server
        */
        this.data = {};
        /**
         * data for child forms that ane non-tabular
         */
        this.childData = new Map();
        /**
        * data for child forms that are tabukar
        */
        this.childTabularData = new Map();
        /**
         * set to true when a service is requested from the server.
         * this can be used by the view-component to indicate aciton
         */
        this.waitingForServerResponse = false;
        /**
           * errors returned by the server
           */
        this.errors = [];
        /**
         * warnings returned by the server
         */
        this.warnings = [];
        /**
         * informations messages received by the server
         */
        this.info = [];
        this.hasFg = false;
        this.formGroup = new FormGroup({});
        if (!form.childForms) {
            return;
        }
        form.childForms.forEach((child, key) => {
            if (child.isTabular && child.isEditable) {
                this.childTabularData.set(key, new TabularData(child.form, serverAgent, child.isEditable));
            }
            else {
                if (child.isEditable) {
                    this.childData.set(key, new FormData$1(child.form, serverAgent));
                }
                else {
                    this.childData.set(key, new PanelData(child.form, serverAgent));
                }
            }
        });
    }
    /**
     * get data as a Value Object. HAs values as received from the server.
     * Any input field/control DOES not have the lates value entered by the user.
     * getFieldValue() must be used to get the current value of an input field.
     */
    getRawData() {
        return this.data;
    }
    /**
    * @override data is to be set to form group
    * @param data as received from a service request
    */
    setAll(data) {
        if (!data) {
            data = {};
        }
        this.data = data;
        if (this.hasFg) {
            this.formGroup.patchValue(data);
        }
        this.childData.forEach((fd, key) => {
            fd.setAll(data[key] || {});
        });
        this.childTabularData.forEach((table, key) => {
            table.setAll(data[key] || []);
        });
    }
    /**
     * @returns object contianing all data from form controls. as well as all child forms.
     * Note that this data will not contain fields from non-form panel
     */
    extractAll() {
        const d = this.hasFg ? this.formGroup.value : this.data;
        this.childData.forEach((fd, key) => {
            d[key] = fd.extractAll();
        });
        this.childTabularData.forEach((table, key) => {
            d[key] = table.extractAll();
        });
        return d;
    }
    /**
     * @returns object contianing all data from form controls, or raw data as recived, but no tany child-data.
     * That is why the returned type id FieldValues and not Vo
     */
    extractAllFields() {
        return this.hasFg ? this.formGroup.value : this.data;
    }
    /**
     *
     * @param name name of the field. Valid field names can be picked up from
     * static definitions in the form
     * @param value
     */
    setFieldValue(name, value) {
        const fc = this.formGroup.controls[name];
        if (fc) {
            fc.setValue(value);
        }
        this.data[name] = value;
    }
    /**
     *
     * @param values name-value pairs to be se to this data
     */
    setFieldValues(values) {
        Object.keys(values).forEach(key => {
            this.setFieldValue(key, values[key]);
        });
    }
    /**
      *
      * @param name name of the field.
      * concrete classes over-ride this method to restict name values to their valid list
      * @returns value of this field, or null/undefined if this is not a field
      */
    getFieldValue(name) {
        const fc = this.formGroup.controls[name];
        if (fc) {
            return fc.value;
        }
        return this.data[name];
    }
    /**
     * @param names to be extracted
     * @returns data-object with name-values. null if no value is found for a field
     */
    getFieldValues(names) {
        let values = {};
        names.forEach(key => {
            values[key] = this.getFieldValue(key);
        });
        return values;
    }
    /**
     *
     * @param name name of the child field.
     * Valid child names are available as static members of the form
     * @returns appropriate data for the child form. null/undefined if no such child
     */
    getChildData(name) {
        if (this.childData) {
            return this.childData.get(name);
        }
        return undefined;
    }
    /**
     *
     * @param name name of the child field.
     * Valid child names are available as static members of the form
     * @returns appropriate data for the child form. null/undefined if no such child
     */
    getChildTable(name) {
        if (this.childTabularData) {
            return this.childTabularData.get(name);
        }
        return undefined;
    }
    /**
     * extarct key fields only
     */
    extractKeyFields() {
        if (this.form.keyFields && this.form.keyFields.length) {
            return this.extractFields(this.form.keyFields);
        }
        console.info('Form has no keys. Doing a get operation with all fields');
        return this.extractAllFields();
    }
    extractFields(fields) {
        if (!fields || !fields.length) {
            return null;
        }
        const data = {};
        fields.forEach(f => {
            data[f] = this.getFieldValue(f);
        });
        return data;
    }
    /**
     * reset the messages. typically called when user dismisses them, or before a server-request is made
     */
    resetMessages() {
        this.errors = [];
        this.warnings = [];
        this.info = [];
    }
    /**
     * messages are set to this model, from where the
     * html component can pick it up for rendering
     * @param messages
     */
    setMessages(messages) {
        this.resetMessages();
        if (messages && messages.forEach) {
            messages.forEach(msg => {
                switch (msg.type) {
                    case "error":
                        this.errors.push(msg.text);
                        break;
                    case "warning":
                        this.warnings.push(msg.text);
                        break;
                    default:
                        this.info.push(msg.text);
                        break;
                }
            });
        }
        else {
            console.error('Error messages received from server', messages);
        }
    }
    /**
     * invoke a specific service with your own pay load, and receive data into this form data
     * @param serviceName service name.
     * @param data input expected by the service
     */
    callService(serviceName, data) {
        this.waitingForServerResponse = true;
        this.resetMessages();
        return this.serverAgent.serve(serviceName, { data: data, asQueryParams: true }, !this.form.serveGuests).pipe(map((vo) => {
            this.waitingForServerResponse = false;
            this.setAll(vo);
            return vo;
        }), catchError(msgs => {
            this.waitingForServerResponse = false;
            this.setMessages(msgs);
            throw msgs;
        }));
    }
    /**
    * get data for this entity based on primary or unique key
    * caller has to enaure that either key fields, or unique fields have valid values in the model before making this call
    */
    fetchData() {
        const serviceName = this.form.getServiceName(Conventions.OP_FETCH);
        if (!serviceName) {
            return throwError(Conventions.OP_FETCH + ' operation not allowed');
        }
        const data = this.extractKeyFields();
        if (data == null) {
            const msg = 'Key values not found. Fetch request abandoned';
            console.error(msg);
            return throwError(msg);
        }
        return this.callService(serviceName, data);
    }
    /**
     * fetch data based the provided input. Use this insted of fetch() if the API
     * requires some data that is not primary key
     * @param data
     */
    fetchFor(data) {
        const serviceName = this.form.getServiceName(Conventions.OP_FETCH);
        if (!serviceName) {
            return throwError(Conventions.OP_FETCH + ' operation not allowed');
        }
        return this.callService(serviceName, data);
    }
    /**
     * get filtered rows from the server.
     * The data received from the server is set to the child-model (PanelData/formData) before returning it to the caller
     * @param child for which data is to be fecthed from the serber
     * @param filters to be applied on the child to get data
     */
    fetchChildren(child, filters) {
        var _a, _b;
        const td = this.childTabularData.get(child);
        if (!td) {
            const msg = child + ' is not a tabular child of this panel. operation abandoned';
            console.error(msg);
            return throwError(msg);
        }
        const childForm = (_b = (_a = this.form.childForms) === null || _a === void 0 ? void 0 : _a.get(child)) === null || _b === void 0 ? void 0 : _b.form;
        const serviceName = childForm === null || childForm === void 0 ? void 0 : childForm.getServiceName(Conventions.OP_FILTER);
        if (!serviceName) {
            return throwError(Conventions.OP_FILTER + ' operation not allowed.');
        }
        this.waitingForServerResponse = true;
        this.resetMessages();
        return this.serverAgent.serve(serviceName, { data: filters }).pipe(map((vo) => {
            const data = vo['list'];
            td.setAll(data);
            this.waitingForServerResponse = false;
            return data;
        }), catchError(msgs => {
            this.waitingForServerResponse = false;
            this.setMessages(msgs);
            throw msgs;
        }));
    }
    /**
     * filter rows for this form and return raw-rows.
     * Note that the returned data is NOT set to any model before returning it the caller
     */
    filter(filters) {
        const serviceName = this.form.getServiceName(Conventions.OP_FILTER);
        if (!serviceName) {
            return throwError(Conventions.OP_FILTER + ' operation is not allowed.');
        }
        const payload = filters ? { data: filters } : {};
        this.resetMessages();
        this.waitingForServerResponse = false;
        return this.serverAgent.serve(serviceName, payload).pipe(map((vo) => {
            this.waitingForServerResponse = false;
            return vo['list'];
        }), catchError(msgs => {
            console.error('catching error in filters fd', msgs);
            this.waitingForServerResponse = false;
            this.setMessages(msgs);
            throw msgs;
        }));
    }
    /**
     * filter rows for this form and return raw-rows.
     * Note that the returned data is NOT set to any model before returning it the caller
     */
    bulkUpdate(data) {
        const serviceName = this.form.getServiceName(Conventions.OP_BULK);
        if (!serviceName) {
            return throwError(Conventions.OP_BULK + ' operation is not allowed.');
        }
        this.resetMessages();
        this.waitingForServerResponse = true;
        return this.serverAgent.serve(serviceName, { data: { list: data } }).pipe(map(_vo => {
            this.waitingForServerResponse = false;
            return true;
        }), catchError(msgs => {
            this.waitingForServerResponse = false;
            this.setMessages(msgs);
            throw msgs;
        }));
    }
    /**
     * validate all editable fields in this form
     */
    validateForm() {
        this.formGroup.updateValueAndValidity();
        let ok = this.formGroup.valid;
        if (!ok) {
            console.error('Form ' + this.form.getName() + ' validation failed. Fields in error:', this.getFieldsInError());
        }
        this.childData.forEach((fd) => {
            const b = fd.validateForm();
            ok = ok && b;
        });
        this.childTabularData.forEach((table) => {
            const b = table.validateForm();
            ok = ok && b;
        });
        return ok;
    }
    /**
     * get list of invalid fields in this form.
     * if a child is in error, this does not get the actualfield in the child, but return child itsemf as a field
     */
    getFieldsInError() {
        const result = [];
        if (this.formGroup.valid) {
            return result;
        }
        Object.keys(this.formGroup.controls).forEach((key) => {
            const cntr = this.formGroup.controls[key];
            if (cntr.invalid) {
                result.push(key);
            }
        });
        return result;
    }
    /**
     * should we convert this to a promise? Or should we have some standard way of handling error and success?
     */
    saveAsNew() {
        const serviceName = this.form.getServiceName(Conventions.OP_NEW);
        if (!serviceName) {
            return throwError(Conventions.OP_NEW + ' operation is not allowed.');
        }
        if (!this.validateForm()) {
            //we have to ensure that the field in error is brought to focus!!
            return throwError('One or more fields are in error. Please edit them and re-submit');
        }
        const data = this.extractAll();
        this.waitingForServerResponse = true;
        this.resetMessages();
        return this.serverAgent.serve(serviceName, { data: data }, !this.form.serveGuests).pipe(map(vo => {
            this.waitingForServerResponse = false;
            return vo;
        }), catchError(msgs => {
            this.setErrorFields(msgs);
            this.waitingForServerResponse = false;
            this.setMessages(msgs);
            console.error(msgs);
            throw new Error("Server returned with errors ");
        }));
    }
    /**
     * @param msgs fields in error sent by the server
     * Manually setting error state to the fields sent by the server
     */
    setErrorFields(msgs) {
        msgs.forEach(element => {
            var _a;
            (_a = this.formGroup.get(element.fieldName)) === null || _a === void 0 ? void 0 : _a.setErrors({ 'Invalid': true });
            this.formGroup.markAllAsTouched();
        });
    }
    /**
     * update operation. WHat do we do after successful operation?
     */
    save() {
        const serviceName = this.form.getServiceName(Conventions.OP_UPDATE);
        if (!serviceName) {
            return throwError(Conventions.OP_UPDATE + ' operation is not allowed.');
        }
        if (!this.validateForm()) {
            //we have to ensure that the field in error is brought to focus!!
            return throwError('Fileds that have errors :' + this.getFieldsInError().join(','));
        }
        const data = this.extractAll();
        this.waitingForServerResponse = true;
        this.resetMessages();
        return this.serverAgent.serve(serviceName, { data: data }, !this.form.serveGuests).pipe(map(vo => {
            this.waitingForServerResponse = false;
            //we do not set back values in updaetmode
            return vo;
        }), catchError(msgs => {
            this.waitingForServerResponse = false;
            this.setMessages(msgs);
            throw msgs;
        }));
    }
    /**
     * delete this entity
     */
    delete() {
        const serviceName = this.form.getServiceName(Conventions.OP_DELETE);
        if (!serviceName) {
            return throwError(Conventions.OP_DELETE + ' operation is not allowed.');
        }
        const data = this.extractKeyFields();
        this.waitingForServerResponse = true;
        this.resetMessages();
        return this.serverAgent.serve(serviceName, { data: data, asQueryParams: false }).pipe(map(vo => {
            this.waitingForServerResponse = false;
            //we do not set back values into fd
            return vo;
        }), catchError(msgs => {
            this.waitingForServerResponse = false;
            this.setMessages(msgs);
            throw msgs;
        }));
    }
    /**
     *
     * @param voArray ~ array of Vo
     * @param form ~ form of the fd
     * @param sa ~ ServerAgent
     * @returns vo as an array of FD
     * Generally used in bulk update operations
     */
    toFdArray(voArray, form, sa) {
        let fdArray = [];
        voArray.forEach(vo => {
            const fd = form.newFormData(sa);
            fd.setAll(vo);
            fdArray.push(fd);
        });
        return fdArray;
    }
    /**
     *
     * @param fdArray ~ Array of FormData to be converted to
     * @returns an array of vo
     * Generally used in bulk update operations
     */
    toVoArray(fdArray) {
        let voArray = [];
        fdArray.forEach(fd => {
            voArray.push(fd.extractAll());
        });
        return voArray;
    }
}
/**
 * represents the data contained in a form. Manages two-way binding with input fields in the form
 */
class FormData$1 extends PanelData {
    constructor(f, sa) {
        super(f, sa);
        /**
         * list of options/values for all drop-downs in this form.
         * html components should bind the drop-downs to a member in this
         */
        this.lists = {};
        this.hasFg = true;
        const ctrls = this.form.controls;
        if (this.form.fields) {
            this.form.fields.forEach((field, key) => {
                const ctrl = (ctrls === null || ctrls === void 0 ? void 0 : ctrls.get(key)) || [];
                const fc = new FormControl(field.defaultValue, ctrl);
                this.formGroup.addControl(key, fc);
            });
        }
        this.handleDropDowns(f);
    }
    setAList(name, list) {
        const field = this.formGroup.get(name);
        if (!field) {
            console.error(name + ' is not a field but a drop-down is being set to it');
            return;
        }
        this.lists[name] = list;
        if (!field.value) {
            let value = '';
            if (list && list[0]) {
                value = list[0].value;
            }
            if (value) {
                field.setValue(value);
            }
        }
    }
    /**
     * set drop-down list of values for a field.
     * it may be available locally, or we my have to get it from the server
     * @param field for which drop-down list id to be fetched
     * @param key value of the key field,if this is a keyed-list
     */
    setListValues(field, key) {
        if (field.listKey && !key) {
            this.setAList(field.name, []);
            return;
        }
        if (field.keyedList) {
            /*
             * design-time list. locally avaliable
             */
            let arr = field.keyedList[key];
            if (!arr) {
                console.error('Design time list of values for drop-down not available for key=' + key);
                arr = [];
            }
            this.setAList(field.name, arr);
            return;
        }
        /**
         * we have to ask the server to get this
         */
        let data;
        if (field.listKey) {
            data = { list: field.listName, key: key };
        }
        else {
            data = { list: field.listName };
        }
        const obs = this.serverAgent.serve(Conventions.SERVICE_LIST, { data: data });
        obs.subscribe((vo) => {
            const arr = vo['list'];
            if (arr) {
                this.setAList(field.name, arr);
            }
            else {
                console.error('Server returned a respnse with no list in it. Drop downwill not work for field ' + field.name);
            }
        }, (msgs) => {
            console.error('Error while receiving list values for field ' + field.name + JSON.stringify(msgs));
        });
    }
    /**
     *
     * @param f form for which we are handling drop-downs.
     */
    handleDropDowns(f) {
        if (!f.listFields) {
            return null;
        }
        this.lists = {};
        f.listFields.forEach(nam => {
            var _a;
            const field = (_a = f.fields) === null || _a === void 0 ? void 0 : _a.get(nam);
            if (field === null || field === void 0 ? void 0 : field.valueList) {
                this.setAList(nam, field.valueList);
            }
            else {
                this.setAList(nam, []);
                if (field === null || field === void 0 ? void 0 : field.listKey) {
                    const fc = this.formGroup.get(field.listKey);
                    if (!fc) {
                        console.error("Unable to find form control named " + field.listKey + " drop down for field " + field.name + " will not work properly");
                    }
                    else {
                        const val = fc.value;
                        if (val) {
                            this.setListValues(field, val);
                        }
                        fc.valueChanges.subscribe((value) => this.setListValues(field, value));
                    }
                }
                else if (field) {
                    //fixed list, but we have to get it from server at run time
                    this.setListValues(field, '');
                }
            }
        });
    }
    /**
     * validate all editable fields in this form
     */
    validateForm() {
        var _a, _b;
        this.formGroup.updateValueAndValidity();
        if (!this.formGroup.valid) {
            this.formGroup.setErrors({ 'err': 'Please enter a valid value' });
            this.formGroup.markAllAsTouched();
            return false;
        }
        const vals = this.form.validations;
        let allOk = true;
        if (vals) {
            for (const v of vals) {
                /**
                 * n is name, f is field, c is cntrol and v is value
                 */
                const n1 = v['f1'];
                const n2 = v['f2'];
                const f1 = (_a = this.form.fields) === null || _a === void 0 ? void 0 : _a.get(n1);
                const f2 = (_b = this.form.fields) === null || _b === void 0 ? void 0 : _b.get(n2);
                const v1 = this.getFieldValue(n1);
                const v2 = this.getFieldValue(n2);
                const c1 = this.formGroup.get(n1);
                const c2 = this.formGroup.get(n2);
                let isDateType = false;
                if (f1 && f2 && f1.valueType == Conventions.TYPE_DATE && f2.valueType == Conventions.TYPE_DATE) {
                    isDateType = true;
                }
                const valType = v['type'];
                let ok;
                if (valType === 'range') {
                    ok = this.validateRange(v1, v2, v['isStrict'], isDateType);
                }
                else if (valType === 'incl') {
                    ok = this.validateInclPair(v1, v2, v['value']);
                }
                else if (valType === 'excl') {
                    ok = this.validateExclPair(v1, v2, v['atLeastOne']);
                }
                else {
                    console.error('Form validation type ' + valType + ' is not valid. validation ignored');
                    ok = true;
                }
                if (!ok) {
                    console.error('Inter field validation failed');
                    const err = { interfield: valType, errorId: v['errorId'] };
                    if (c1 && (f1 === null || f1 === void 0 ? void 0 : f1.controlType) != 'Hidden' && (f1 === null || f1 === void 0 ? void 0 : f1.controlType) != 'Output') {
                        c1.setErrors(err);
                    }
                    if (c2 && (f2 === null || f2 === void 0 ? void 0 : f2.controlType) != 'Hidden' && (f2 === null || f2 === void 0 ? void 0 : f2.controlType) != 'Output') {
                        c2.setErrors(err);
                    }
                    allOk = false;
                }
            }
        }
        if (!allOk) {
            console.error('Inter-field validaiton failed');
            return false;
        }
        this.childData.forEach((fd, key) => {
            const b = fd.validateForm();
            if (!b) {
                console.error('Child validation failed');
            }
            allOk = allOk && b;
        });
        this.childTabularData.forEach((table, key) => {
            const b = table.validateForm();
            if (!b) {
                console.error('Child Table validation failed');
            }
            allOk = allOk && b;
        });
        return allOk;
    }
    /**
     * check if v1 to v2 us a range
     * @param v1
     * @param v2
     * @param useStrict if true, v2 must be > v2, v1 == v2 woudn't cut
     */
    validateRange(v1, v2, equalOk, dateType) {
        if (dateType) {
            console.error('Date comparison not yet implementd. returning true');
            return true;
        }
        const n1 = v1;
        const n2 = v2;
        if (isNaN(n1) || isNaN(n2) || n2 > n1) {
            return true;
        }
        if (n1 > n2) {
            return false;
        }
        //equal. is it ok?
        return equalOk;
    }
    /**
     * two fields have to be both specified or both skipped.
     * if value is specified, it means that the rule is applicable if v1 == value
     * @param v1
     * @param v2
     * @param value
     */
    validateInclPair(v1, v2, value) {
        /*
         * we assume v1 is specified when a value is given.
         * However, if value is specified, then it has to match it'
         */
        const v1Specified = v1 && (!value || value == v1);
        if (v1Specified) {
            if (v2) {
                return true;
            }
            return false;
        }
        // v1 is not specified, so v2 should not be specified
        if (v2) {
            return false;
        }
        return true;
    }
    /**
     *
     * @param errorId v1 and v2 are exclusive
     * @param primaryField
     * @param otherField
     * @param atLeastOne if true, exactly one of teh twoto be specified
     */
    validateExclPair(v1, v2, noneOk) {
        if (v1) {
            if (v2) {
                return false;
            }
            return true;
        }
        if (v2) {
            return true;
        }
        //none specifield, is it ok?
        return noneOk;
    }
    /**
     *
     * @param fieldName name of the drop-down field
     * @returns the displayed value (not the internal value) of this field
     */
    getDisplayedValueOf(fieldName) {
        const list = this.lists[fieldName];
        if (!list) {
            return '';
        }
        const val = this.getFieldValue(fieldName);
        if (!val) {
            return '';
        }
        const n = list.length;
        for (let i = 0; i < n; i++) {
            const sel = list[i];
            if (sel.value == val) {
                return sel.text;
            }
        }
        return '';
    }
}
/**
 * represents an array of panel data or form data
 */
class TabularData {
    constructor(form, serverAgent, isEditable) {
        this.form = form;
        this.serverAgent = serverAgent;
        this.isEditable = isEditable;
        this.childData = [];
    }
    /**
     * set data to this panel
     * @param data
     */
    setAll(data) {
        this.childData.length = 0;
        data.forEach(vo => {
            let fd;
            if (this.isEditable) {
                fd = new FormData$1(this.form, this.serverAgent);
            }
            else {
                fd = new PanelData(this.form, this.serverAgent);
            }
            fd.setAll(vo);
            this.childData.push(fd);
        });
    }
    /**
     * extract data from each of the child-panel into an array
     */
    extractAll() {
        const data = [];
        this.childData.forEach(fd => data.push(fd.extractAll()));
        return data;
    }
    /**
     * validate all the forms
     * @returns true if all ok. false if any one form-control is in error, or any custom-validaiton fails
     */
    validateForm() {
        let allOk = true;
        this.childData.forEach(fd => {
            const ok = fd.validateForm();
            allOk = allOk && ok;
        });
        return allOk;
    }
    /**
     * append a default data model to this array
     */
    appendRow() {
        let fd;
        if (this.isEditable) {
            fd = new FormData$1(this.form, this.serverAgent);
        }
        else {
            fd = new PanelData(this.form, this.serverAgent);
        }
        this.childData.push(fd);
        return fd;
    }
    /**
      * append a default data model to this array
      */
    removeRow(idx) {
        this.childData.splice(idx);
    }
}

/**
 * represents the data model, both structure and run-time data
 */
class Form {
    constructor() {
        /**
         * what operations are allowed on this form.
         */
        this.opsAllowed = {};
        /**
         * for operations are offered to guests/unauthenticated/non-logged-in users?
         */
        this.serveGuests = false;
    }
    /**
     * name of this form.
     */
    getName() {
        // name of this form
    }
    ;
    /**
     * create a model (data-holder) for this form
     * @param serverAgent is injectable
     */
    newFormData(serverAgent) {
        return new FormData$1(this, serverAgent);
    }
    /**
     * create a model (data-holder) for this form
     * @param serverAgent is injectable
     */
    newPanelData(serverAgent) {
        return new PanelData(this, serverAgent);
    }
    /**
     *
     * @param operation
     * @returns service name of the form "operation-formName", say filter-costomer
     */
    getServiceName(operation) {
        if (this.opAllowed(operation)) {
            return operation + '_' + this.getName();
        }
        console.error('Operation ' + operation + ' not allowed on form ' + this.getName());
        return null;
    }
    /**
     *
     * @param operation
     * @returns true of this operation is designed for this form
     */
    opAllowed(operation) {
        if (this.opsAllowed && this.opsAllowed[operation]) {
            return true;
        }
        console.error('Form ', this.getName(), ' is not designed for ', operation, ' operation');
        return false;
    }
}

/**
 * A wrapper on HttpClient to take care of our protocols
 * Draws heavily on Observables. If you are tounderstand/maintain this code,  you MUST be thorough with the Observables
 */
class ServiceAgent {
    constructor(http, config, ctx) {
        this.http = http;
        this.config = config;
        this.ctx = ctx;
    }
    /**
     * serve this service. we use a strict service oriented architecture,
     * where in the only thing the client can ask the server is to serve a service.
     * There is no concept of resources or operations. Any such concepts are to be
     * implemented using the service paradigm.
     * @param serviceName  name of the service to be requested
     * @param data input data for the request
     * @param asQueryParams true if the data is just a set of name-string params, and the srver expects them in query string
     * @param headers any special headers to be communicated. Typically for additional authentication.
     * @param withAuth true if the request is to be sent with auth. If auth is not present, this wil trigger a login
     */
    serve(serviceName, options = {}, withAuth = true) {
        const token = this.ctx.getToken();
        if (withAuth && !token) {
            //not logged-in.To be re-tried after  a successful login
            return this.notLoggedIn({
                serviceName: serviceName,
                options: options,
                withAuth: withAuth
            });
        }
        const headers = options.headers || {};
        headers[Conventions.HEADER_SERVICE] = serviceName;
        if (withAuth) {
            headers[Conventions.HEADER_AUTH] = token;
        }
        let data = options.data || null;
        let params;
        if (data && options.asQueryParams) {
            params = this.toParams(data);
        }
        const obs = this.http.post(this.config.url, data, {
            observe: "response",
            headers: headers,
            params: params
        });
        return obs.pipe(map((resp) => {
            if (!resp.ok) {
                const msg = 'Server Error. http-status :' + resp.status + '=' + resp.statusText + (resp.body ? 'Response: ' + JSON.stringify(resp.body) : '');
                console.error(msg);
                throw {
                    type: 'error',
                    id: 'serverError',
                    text: msg
                };
            }
            //no-news is good-news!!
            if (!resp.body) {
                return {};
            }
            const { messages, allOk, data, token } = resp.body;
            if (allOk) {
                if (token) {
                    this.ctx.setToken(token);
                }
                if (messages) {
                    if (messages[0].type == 'info') {
                        throw messages;
                    }
                }
                return data;
            }
            if (messages) {
                console.error('Server returned with errors :', messages);
                throw messages;
            }
            const msg = 'Server Error. server reported a failure, but did not return any error message';
            console.error(msg);
            throw [{
                    type: 'error',
                    id: 'serverError',
                    text: msg
                }];
        }));
    }
    /**
     * filter rows for a form and return raw-rows.
     * Note that the returned data is NOT set to any model before returning it the caller
     */
    filter(form, filters) {
        const serviceName = form.getServiceName(Conventions.OP_FILTER);
        if (!serviceName) {
            return throwError(Conventions.OP_FILTER + ' operation is not allowed.');
        }
        const obs = this.serve(serviceName, {
            data: filters
        });
        return obs.pipe(map((vo) => {
            return vo['list'];
        }), catchError(msgs => {
            console.error('catching in sa');
            throw msgs;
        }));
    }
    /**
     *
     * @param call parameters for serve that was interrupted.
     * We have to design a way to return an observable that works after a successful login.
     */
    notLoggedIn(params) {
        /**
         * what we want to do is:
         * 1. show a modal panel and accept credentials.
         * 2. call login service with these credentials.
         * 3. on successful login, make this service request again.
         * Logic would be quite tricky becaue we have t0 return an observable right now that triggers all these..
         ^ for te time being, we just throw-up our hands!!!
         */
        const msg = 'Sorry you are not logged in. Please try again after logging in';
        return new Observable((observer) => {
            const { error } = observer;
            error('msg');
        });
    }
    toParams(data) {
        let params = new HttpParams();
        for (const a in data) {
            if (data.hasOwnProperty(a)) {
                const val = data[a] || "";
                params.set(a, val.toString());
            }
        }
        return params;
    }
    /**
     * initiates a file-down load by the browser with supplied data as content
     * @param data  to be downloaded
     * @param fileName naem of the file to be downloaded as
     */
    download(data, fileName) {
        const json = JSON.stringify(data);
        const blob = new Blob([json], {
            type: 'octet/stream'
        });
        const url = window.URL.createObjectURL(blob);
        const a = window.document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.target = '_blank';
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}
ServiceAgent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: ServiceAgent, deps: [{ token: i1$4.HttpClient }, { token: ClientConfig }, { token: ClientContext }], target: i0.ɵɵFactoryTarget.Injectable });
ServiceAgent.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: ServiceAgent, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: ServiceAgent, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1$4.HttpClient }, { type: ClientConfig }, { type: ClientContext }]; } });

/**
 * transposed column name is PRE + key to ensure that it does not clash with any existing attribute
 */
const PRE = 'c_';
/**
 * utility that handles row-to-column for rendering,
 * and possibly col back to row to send teh data back to the server
 */
class Transposer {
    /**
     * convert child-rows of each row of data inito its aown attributes as columns
     * @param rowToColMeta meta data as to what and how to convert data from row into column
     * @param tableMeta this is for our bt-table to get column headings and names
     * @param data actual data to be transposed.
     * Each row in this array will have additional members that will be used by bt-table.
     * these values can be later pushed back to the child-rows
     */
    static rowToCol(rowToColMeta, tableMeta, data) {
        /**
         * extract meta data for transposition
         */
        rowToColMeta.columns.forEach((row) => {
            const key = row[rowToColMeta.keyAttribute];
            if (!key) {
                console.error('Key not found in a names element with attr ' + rowToColMeta.keyAttribute + '. Element is ', row);
            }
            else {
                let heading = row[rowToColMeta.headingAttribute];
                if (rowToColMeta.subHeadingAttribute) {
                    heading = heading + '-' + row[rowToColMeta.subHeadingAttribute];
                }
                const colName = PRE + key;
                tableMeta.names.push(colName);
                tableMeta.headings[colName] = heading;
            }
        });
        /**
         * got meta-data. now go to each row and add columns to it based on its child-rows
         */
        const rowAtt = rowToColMeta.datarowsAttribute;
        const keyAtt = rowToColMeta.rowKeyAttribute;
        const valAtt = rowToColMeta.rowValueAttribute;
        const meta = {
            datarowsAttribute: rowAtt,
            rowKeyAttribute: keyAtt,
            rowValueAttribute: valAtt
        };
        if (!data || !data.length) {
            console.log('Input data is empty or has no rows');
            return meta;
        }
        /**
         * for each data row
         */
        data.forEach((row) => {
            if (!row) {
                console.log('Row is empty');
            }
            else {
                /**
                 * for each row meant to be transposed as a column
                 */
                const children = row[rowAtt];
                if (!children) {
                    console.log('Row does not have array value for tag/attr ' + rowAtt);
                }
                else {
                    children.forEach(child => {
                        if (child) {
                            const colName = PRE + child[keyAtt];
                            row[colName] = child[valAtt];
                        }
                        else {
                            console.warn('empty child element found. ignored');
                        }
                    });
                }
            }
        });
        return meta;
    }
    /**
     * convert column values back to rows in the data rows
     * @param colToRowMeta meta data that was returned from rowToCol() nethod
     * @param data data that was passed to rowToCol() method
     */
    static colToRow(colToRowMeta, data) {
        const rowAtt = colToRowMeta.datarowsAttribute;
        const keyAtt = colToRowMeta.rowKeyAttribute;
        const valAtt = colToRowMeta.rowValueAttribute;
        if (!data || !data.length) {
            console.warn('No data to re-transpose');
            return;
        }
        /**
         * for each data row
         */
        data.forEach((row) => {
            if (!row) {
                console.log('Data has an empty row');
            }
            else {
                const children = row[rowAtt];
                if (!children || !children.length) {
                    console.warn('Row has no or empty children with tag/attr ' + rowAtt);
                }
                else {
                    /**
                     * for each row meant to be transposed as a column
                     */
                    children.forEach((child) => {
                        const key = child[keyAtt];
                        child[valAtt] = row[PRE + key];
                    });
                }
            }
        });
    }
}

let FormModule = class FormModule {
};
FormModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            ReactiveFormsModule,
            FormsModule
        ],
        declarations: [
            ClientConfig,
            ClientContext,
            Conventions,
            Form,
            FormData,
            PanelData,
            TabularData,
            ServiceAgent,
            Transposer
        ],
        exports: [
            ClientConfig,
            ClientContext,
            Conventions,
            Form,
            FormData,
            PanelData,
            TabularData,
            ServiceAgent,
            Transposer
        ]
    })
], FormModule);

/*
 * Public API Surface of mv-client-core
 */

/**
 * Generated bundle index. Do not edit.
 */

export { Form, FormData$1 as FormData, FormModule, MVClientCoreAppModule, MVComponentsModule, MaterialModule, MvCheckboxComponent, MvClientCoreService, MvDatePickerComponent, MvDropDownComponent, MvFormGeneratorComponent, MvPrimaryButtonComponent, MvTextareaComponent, MvTextboxComponent, PanelData, ServiceAgent, TabularData, Transposer };
//# sourceMappingURL=mv-core.mjs.map
