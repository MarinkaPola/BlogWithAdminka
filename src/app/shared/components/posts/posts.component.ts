import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../interface';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  @Input() post: Post
  constructor() { }

  ngOnInit() {
  }

}
