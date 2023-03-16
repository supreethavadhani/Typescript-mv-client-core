import { ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';


@Component({
	selector: 'app-mv-sidenav',
	templateUrl: './component.html',
	styleUrls:['./component.scss']
})

export class MvSideNavComponent {
	@Input() navMenu?: [];
	@Input() appName: string = "Metadev App";
  @Output() emitRoute: EventEmitter<string> = new EventEmitter();

mobileQuery: MediaQueryList;


  private _mobileQueryListener: () => void;
  
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);  
	  this.navMenu = [ ] 
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  emitPageRoute(routeTo:string) {
    this.emitRoute.next(routeTo);
  }
}