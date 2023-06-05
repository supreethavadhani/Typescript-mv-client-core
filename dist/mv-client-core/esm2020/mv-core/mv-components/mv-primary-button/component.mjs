import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/button";
export class MvPrimaryButtonComponent {
    constructor() {
        this.isDisabled = false;
    }
}
MvPrimaryButtonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MvPrimaryButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MvPrimaryButtonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.3", type: MvPrimaryButtonComponent, selector: "app-mv-primary-button", inputs: { name: "name", tooltip: "tooltip", isDisabled: "isDisabled" }, ngImport: i0, template: "\r\n<button style=\"margin:2rem\" [disabled]=\"isDisabled\" mat-raised-button color=\"primary\">{{name}}</button>\r\n\r\n", dependencies: [{ kind: "component", type: i1.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MvPrimaryButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-mv-primary-button', template: "\r\n<button style=\"margin:2rem\" [disabled]=\"isDisabled\" mat-raised-button color=\"primary\">{{name}}</button>\r\n\r\n" }]
        }], ctorParameters: function () { return []; }, propDecorators: { name: [{
                type: Input
            }], tooltip: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbXYtY2xpZW50LWNvcmUvc3JjL212LWNvcmUvbXYtY29tcG9uZW50cy9tdi1wcmltYXJ5LWJ1dHRvbi9jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tdi1jbGllbnQtY29yZS9zcmMvbXYtY29yZS9tdi1jb21wb25lbnRzL212LXByaW1hcnktYnV0dG9uL2NvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7QUFRaEQsTUFBTSxPQUFPLHdCQUF3QjtJQUluQztRQURTLGVBQVUsR0FBUyxLQUFLLENBQUM7SUFDbkIsQ0FBQzs7cUhBSkwsd0JBQXdCO3lHQUF4Qix3QkFBd0IscUlDUnJDLDJIQUdBOzJGREthLHdCQUF3QjtrQkFOcEMsU0FBUzsrQkFDRSx1QkFBdUI7MEVBTXhCLElBQUk7c0JBQVosS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtbXYtcHJpbWFyeS1idXR0b24nLFxyXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tcG9uZW50Lmh0bWxcIixcclxufSlcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgTXZQcmltYXJ5QnV0dG9uQ29tcG9uZW50IHtcclxuICBASW5wdXQoKSBuYW1lPzpzdHJpbmc7XHJcbiAgQElucHV0KCkgdG9vbHRpcD86c3RyaW5nO1xyXG4gIEBJbnB1dCgpIGlzRGlzYWJsZWQ6Ym9vbGVhbj1mYWxzZTtcclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcbn1cclxuIiwiXHJcbjxidXR0b24gc3R5bGU9XCJtYXJnaW46MnJlbVwiIFtkaXNhYmxlZF09XCJpc0Rpc2FibGVkXCIgbWF0LXJhaXNlZC1idXR0b24gY29sb3I9XCJwcmltYXJ5XCI+e3tuYW1lfX08L2J1dHRvbj5cclxuXHJcbiJdfQ==