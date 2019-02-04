import {Component, OnInit, Injectable} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-dashboard1-page',
    templateUrl: './dashboard1.component.html',
    styleUrls: ['./dashboard1.component.scss'],
    animations: [routerTransition()]
})

@Injectable()
export class Dashboard1Component implements OnInit {
    public formId = '';
    public path = '';

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.formId = params['id'];
            this.path = params['path'] || '';
        })
    }
}

