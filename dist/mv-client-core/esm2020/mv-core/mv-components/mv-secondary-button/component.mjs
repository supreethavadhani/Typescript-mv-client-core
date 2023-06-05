import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/button";
export class MvSecondaryButtonComponent {
    constructor() {
        this.isDisabled = false;
    }
}
MvSecondaryButtonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MvSecondaryButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MvSecondaryButtonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.3", type: MvSecondaryButtonComponent, selector: "app-mv-secondary-button", inputs: { name: "name", tooltip: "tooltip", isDisabled: "isDisabled" }, ngImport: i0, template: "\r\n<button style=\"margin: 2rem;\" [disabled]=\"isDisabled\" mat-raised-button>{{name}}</button>\r\n\r\n", dependencies: [{ kind: "component", type: i1.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MvSecondaryButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-mv-secondary-button', template: "\r\n<button style=\"margin: 2rem;\" [disabled]=\"isDisabled\" mat-raised-button>{{name}}</button>\r\n\r\n" }]
        }], ctorParameters: function () { return []; }, propDecorators: { name: [{
                type: Input
            }], tooltip: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbXYtY2xpZW50LWNvcmUvc3JjL212LWNvcmUvbXYtY29tcG9uZW50cy9tdi1zZWNvbmRhcnktYnV0dG9uL2NvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL212LWNsaWVudC1jb3JlL3NyYy9tdi1jb3JlL212LWNvbXBvbmVudHMvbXYtc2Vjb25kYXJ5LWJ1dHRvbi9jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQzs7O0FBUWhELE1BQU0sT0FBTywwQkFBMEI7SUFJckM7UUFEUyxlQUFVLEdBQVMsS0FBSyxDQUFDO0lBQ25CLENBQUM7O3VIQUpMLDBCQUEwQjsyR0FBMUIsMEJBQTBCLHVJQ1J2QywyR0FHQTsyRkRLYSwwQkFBMEI7a0JBTnRDLFNBQVM7K0JBQ0UseUJBQXlCOzBFQU0xQixJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLW12LXNlY29uZGFyeS1idXR0b24nLFxyXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tcG9uZW50Lmh0bWxcIixcclxufSlcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgTXZTZWNvbmRhcnlCdXR0b25Db21wb25lbnQge1xyXG4gIEBJbnB1dCgpIG5hbWU/OnN0cmluZztcclxuICBASW5wdXQoKSB0b29sdGlwPzpzdHJpbmc7XHJcbiAgQElucHV0KCkgaXNEaXNhYmxlZDpib29sZWFuPWZhbHNlO1xyXG4gIGNvbnN0cnVjdG9yKCkge31cclxufVxyXG4iLCJcclxuPGJ1dHRvbiBzdHlsZT1cIm1hcmdpbjogMnJlbTtcIiBbZGlzYWJsZWRdPVwiaXNEaXNhYmxlZFwiIG1hdC1yYWlzZWQtYnV0dG9uPnt7bmFtZX19PC9idXR0b24+XHJcblxyXG4iXX0=