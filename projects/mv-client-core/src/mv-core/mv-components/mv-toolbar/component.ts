import { ChangeDetectorRef, Component, Input} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';


@Component({
	selector: 'app-mv-toolbar',
	templateUrl: './component.html',
})

export class MvToolbarComponent {
	@Input() appName: string = "MetadevApp";
}
