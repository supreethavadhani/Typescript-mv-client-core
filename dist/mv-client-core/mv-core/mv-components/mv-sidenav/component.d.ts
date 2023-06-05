import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import * as i0 from "@angular/core";
export declare class MvSideNavComponent {
    navMenu?: [];
    appName: string;
    emitRoute: EventEmitter<string>;
    mobileQuery: MediaQueryList;
    private _mobileQueryListener;
    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher);
    ngOnDestroy(): void;
    emitPageRoute(routeTo: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MvSideNavComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MvSideNavComponent, "app-mv-sidenav", never, { "navMenu": "navMenu"; "appName": "appName"; }, { "emitRoute": "emitRoute"; }, never, never, false>;
}
//# sourceMappingURL=component.d.ts.map