import {Component, Input, OnInit} from '@angular/core';
import {LabelFn, LabelSettings, ProgressBarModule} from '@progress/kendo-angular-progressbar';

@Component({
	selector: 'app-progress',
	styleUrls: ['./app-progress.component.scss'],
	templateUrl: './app-progress.component.html',
	standalone: true,
	imports: [ProgressBarModule]
})

export class AppProgressComponent implements OnInit {
	@Input() mode: 'stretch' | 'inline' | 'bar' = 'stretch';
	@Input() barValue: number;
	@Input() barMaxValue: number;
	@Input() barLabelFormatter: LabelFn;
	public barLabelOptions: LabelSettings;

	ngOnInit(): void {
		if(this.mode === 'bar') {
			this.barLabelOptions = {
				format: this.barLabelFormatter,
				position: 'center'
			};
		}
	}
}
