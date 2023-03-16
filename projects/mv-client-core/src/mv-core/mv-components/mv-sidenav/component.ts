import { ChangeDetectorRef, Component, Input} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';


@Component({
	selector: 'app-mv-sidenav',
	templateUrl: './component.html',
})

export class MvSideNavComponent {
	@Input() navMenu?: NavMenuItem[];
	@Input() appName: string = "MetadevApp";

mobileQuery: MediaQueryList;


  private _mobileQueryListener: () => void;
  
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);  
	this.navMenu = [ {
		"name":"no items in menu",
		"routeTo": ""
	} ,] 
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  emitPageRoute() {
	// hello
	console.log(this.navMenu)
  }

}

interface NavMenuItem {
	name:string,
	routeTo: string
}