import { ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import * as i0 from "@angular/core";
export declare class MvSideNavComponent {
    navMenu?: NavMenuItem[];
    appName: string;
    mobileQuery: MediaQueryList;
    private _mobileQueryListener;
    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher);
    ngOnDestroy(): void;
    emitPageRoute(selectedPage: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MvSideNavComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MvSideNavComponent, "app-mv-sidenav", never, { "navMenu": "navMenu"; "appName": "appName"; }, {}, never, never, false>;
}
interface NavMenuItem {
    name: string;
    routeTo: string;
}
export {};
//# sourceMappingURL=component.d.ts.map