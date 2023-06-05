import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/layout";
import * as i2 from "@angular/common";
export class MvSideNavComponent {
    constructor(changeDetectorRef, media) {
        this.appName = "Metadev App";
        this.emitRoute = new EventEmitter();
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
        this.navMenu = [];
    }
    ngOnDestroy() {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }
    emitPageRoute(routeTo) {
        this.emitRoute.next(routeTo);
    }
}
MvSideNavComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MvSideNavComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.MediaMatcher }], target: i0.ɵɵFactoryTarget.Component });
MvSideNavComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.3", type: MvSideNavComponent, selector: "app-mv-sidenav", inputs: { navMenu: "navMenu", appName: "appName" }, outputs: { emitRoute: "emitRoute" }, ngImport: i0, template: "<div class = \"nav-container\">\r\n  <div class = \"item-list\">\r\n    <h3 style=\"margin:2rem;\">\r\n       Metadev UI\r\n    </h3>\r\n    <div *ngFor=\"let nav of navMenu\" (click)=\"emitPageRoute(nav.routeTo)\" style=\"cursor: pointer;padding: 1rem;\">\r\n      <div class=\"list-item\" style=\"font-size:1.35rem; color:white;padding:1rem\">{{nav.name}}</div>\r\n    </div>\r\n  </div>\r\n</div>", styles: [".nav-container{height:96vh;width:20rem;background-color:#004faa;box-shadow:#00000040 0 14px 28px,#00000038 0 10px 10px;font-size:1.5rem;border-radius:1.5rem;margin:1rem}.item-list{padding:.5rem;font-size:1.3rem;font-weight:200;color:#f5f5f5}.white-line{margin:0 2rem;border-top:1px solid rgba(254,254,254,.63)}.list-item:hover{border-radius:10px;background-color:#0000001a;color:#fff}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MvSideNavComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-mv-sidenav', template: "<div class = \"nav-container\">\r\n  <div class = \"item-list\">\r\n    <h3 style=\"margin:2rem;\">\r\n       Metadev UI\r\n    </h3>\r\n    <div *ngFor=\"let nav of navMenu\" (click)=\"emitPageRoute(nav.routeTo)\" style=\"cursor: pointer;padding: 1rem;\">\r\n      <div class=\"list-item\" style=\"font-size:1.35rem; color:white;padding:1rem\">{{nav.name}}</div>\r\n    </div>\r\n  </div>\r\n</div>", styles: [".nav-container{height:96vh;width:20rem;background-color:#004faa;box-shadow:#00000040 0 14px 28px,#00000038 0 10px 10px;font-size:1.5rem;border-radius:1.5rem;margin:1rem}.item-list{padding:.5rem;font-size:1.3rem;font-weight:200;color:#f5f5f5}.white-line{margin:0 2rem;border-top:1px solid rgba(254,254,254,.63)}.list-item:hover{border-radius:10px;background-color:#0000001a;color:#fff}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.MediaMatcher }]; }, propDecorators: { navMenu: [{
                type: Input
            }], appName: [{
                type: Input
            }], emitRoute: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbXYtY2xpZW50LWNvcmUvc3JjL212LWNvcmUvbXYtY29tcG9uZW50cy9tdi1zaWRlbmF2L2NvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL212LWNsaWVudC1jb3JlL3NyYy9tdi1jb3JlL212LWNvbXBvbmVudHMvbXYtc2lkZW5hdi9jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQXFCLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQzs7OztBQVV6RixNQUFNLE9BQU8sa0JBQWtCO0lBVTdCLFlBQVksaUJBQW9DLEVBQUUsS0FBbUI7UUFSN0QsWUFBTyxHQUFXLGFBQWEsQ0FBQztRQUM5QixjQUFTLEdBQXlCLElBQUksWUFBWSxFQUFFLENBQUM7UUFRN0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLG9CQUFvQixHQUFHLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3BFLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRyxDQUFBO0lBQ25CLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFjO1FBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQy9CLENBQUM7OytHQXZCVSxrQkFBa0I7bUdBQWxCLGtCQUFrQiwrSUNWL0IsaVpBU007MkZEQ08sa0JBQWtCO2tCQU45QixTQUFTOytCQUNDLGdCQUFnQjttSUFNakIsT0FBTztzQkFBZixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDSyxTQUFTO3NCQUFsQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTWVkaWFNYXRjaGVyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2xheW91dCc7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6ICdhcHAtbXYtc2lkZW5hdicsXHJcblx0dGVtcGxhdGVVcmw6ICcuL2NvbXBvbmVudC5odG1sJyxcclxuXHRzdHlsZVVybHM6WycuL2NvbXBvbmVudC5zY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBNdlNpZGVOYXZDb21wb25lbnQge1xyXG5cdEBJbnB1dCgpIG5hdk1lbnU/OiBbXTtcclxuXHRASW5wdXQoKSBhcHBOYW1lOiBzdHJpbmcgPSBcIk1ldGFkZXYgQXBwXCI7XHJcbiAgQE91dHB1dCgpIGVtaXRSb3V0ZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG5tb2JpbGVRdWVyeTogTWVkaWFRdWVyeUxpc3Q7XHJcblxyXG5cclxuICBwcml2YXRlIF9tb2JpbGVRdWVyeUxpc3RlbmVyOiAoKSA9PiB2b2lkO1xyXG4gIFxyXG4gIGNvbnN0cnVjdG9yKGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZiwgbWVkaWE6IE1lZGlhTWF0Y2hlcikge1xyXG4gICAgdGhpcy5tb2JpbGVRdWVyeSA9IG1lZGlhLm1hdGNoTWVkaWEoJyhtYXgtd2lkdGg6IDYwMHB4KScpO1xyXG4gICAgdGhpcy5fbW9iaWxlUXVlcnlMaXN0ZW5lciA9ICgpID0+IGNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICAgIHRoaXMubW9iaWxlUXVlcnkuYWRkTGlzdGVuZXIodGhpcy5fbW9iaWxlUXVlcnlMaXN0ZW5lcik7ICBcclxuXHQgIHRoaXMubmF2TWVudSA9IFsgXSBcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5tb2JpbGVRdWVyeS5yZW1vdmVMaXN0ZW5lcih0aGlzLl9tb2JpbGVRdWVyeUxpc3RlbmVyKTtcclxuICB9XHJcblxyXG4gIGVtaXRQYWdlUm91dGUocm91dGVUbzpzdHJpbmcpIHtcclxuICAgIHRoaXMuZW1pdFJvdXRlLm5leHQocm91dGVUbyk7XHJcbiAgfVxyXG59IiwiPGRpdiBjbGFzcyA9IFwibmF2LWNvbnRhaW5lclwiPlxyXG4gIDxkaXYgY2xhc3MgPSBcIml0ZW0tbGlzdFwiPlxyXG4gICAgPGgzIHN0eWxlPVwibWFyZ2luOjJyZW07XCI+XHJcbiAgICAgICBNZXRhZGV2IFVJXHJcbiAgICA8L2gzPlxyXG4gICAgPGRpdiAqbmdGb3I9XCJsZXQgbmF2IG9mIG5hdk1lbnVcIiAoY2xpY2spPVwiZW1pdFBhZ2VSb3V0ZShuYXYucm91dGVUbylcIiBzdHlsZT1cImN1cnNvcjogcG9pbnRlcjtwYWRkaW5nOiAxcmVtO1wiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibGlzdC1pdGVtXCIgc3R5bGU9XCJmb250LXNpemU6MS4zNXJlbTsgY29sb3I6d2hpdGU7cGFkZGluZzoxcmVtXCI+e3tuYXYubmFtZX19PC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9kaXY+Il19