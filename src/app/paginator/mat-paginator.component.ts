import {Component, OnInit} from '@angular/core';
import {PostsService} from '../shared/post.service';

@Component({
    selector: 'app-mat-paginator',
    templateUrl: 'mat-paginator.component.html',
    styleUrls: ['mat-paginator.component.scss'],
})
export class MatPaginatorComponent implements OnInit {


    constructor(private postsService: PostsService) {
    }

    ngOnInit() {
    }
}
