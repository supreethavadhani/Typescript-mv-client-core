import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-mv-toolbar',
	templateUrl: './component.html',
	styleUrls: ['./component.scss']
})

export class MvToolbarComponent {
	@Input() appName: string = "MetadevApp";
}
