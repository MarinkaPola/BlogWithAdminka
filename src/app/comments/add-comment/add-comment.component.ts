import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ChatService} from '../chat.service';
import {Message} from '../../shared/interface';
import {Observable, Subscription} from 'rxjs';


@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {

  constructor(private chatService: ChatService) {
  }
  subscription: Subscription;

  form: FormGroup;
  id: string;



  ngOnInit() {

    this.subscription = this.chatService.getId().subscribe(data => {this.id = data.id; console.log(this.id);
                                                                    } );
    this.form = new FormGroup({
      textmes: new FormControl(null, Validators.required),
      namemes: new FormControl(null, Validators.required)
    });

  }
  submit() {
    if (this.form.invalid) {
      return;
    }
    const message: Message = {
      namemes: this.form.value.namemes,
      textmes: this.form.value.textmes,
      datemes: new Date(),
    };



    this.chatService.createmes(message, this.id).subscribe(() => {this.form.reset(); console.log(message); });

  }
}
