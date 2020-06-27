import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {PostsService} from '../shared/post.service';
import {Observable} from 'rxjs';
import {Post} from '../shared/interface';
import {switchMap} from 'rxjs/operators';


@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  post$: Observable<Post>;
    id: any;




  constructor( private route: ActivatedRoute,
               private postsService: PostsService
  ) { }

  ngOnInit() {
    this.post$ = this.route.params
        .pipe(switchMap((params: Params) => { this.id = params.id; console.log(this.id);
                                              return this.postsService.getById(params.id);
        }));
      }


}
