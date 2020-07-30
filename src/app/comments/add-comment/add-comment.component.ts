import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ChatService} from '../chat.service';
import {Message} from '../../shared/interface';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';



@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {

  @Input() id: string;

  constructor(private chatService: ChatService) {
  }

  form: FormGroup;
  messages: Message[] = [];
  mSub: Subscription;
  m2Sub: Subscription;
  private subjU: BehaviorSubject<any> = new BehaviorSubject([]);
  ESub: Subscription;
  vartruef = false;


  ngOnInit() {
    this.mSub = this.chatService.getALL(this.id).subscribe(messages => {
      this.messages = messages;
    });
    this.form = new FormGroup({
      textmes: new FormControl(null, Validators.required),
      namemes: new FormControl(null, Validators.required)
    });
    this.ESub = this.chatService.getsaveNametext().subscribe(data => {
                                                                       if (data.event === 'saveNametext') {
                                                                        this.chatService.getALL(this.id)
                                                                           .subscribe(messages => {this.messages = messages;
                                                                                                   this.vartruef = false;
                                                                           });

      }
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.vartruef = true;
    const message: Message = {
      namemes: this.form.value.namemes,
      textmes: this.form.value.textmes,
      datemes: new Date(),
    };


    this.chatService.createmes(message, this.id).subscribe(() => {
      this.form.reset();
      this.messages.push(message);
      this.subjU.next(this.messages);
      console.log(message);
    });
  }

  openModalWithComponent(idmes: string, textmes: string, nememes: string, datemes: Date, id: string) {

    this.chatService.edit(idmes, textmes, nememes, datemes, id);
    this.ngOnInit(); console.log(7);
    this.vartruef = true;
  }

  remove(idmes: string) {
    this.m2Sub = this.chatService.remove(this.id, idmes).subscribe(() => {
      this.messages = this.messages.filter(message => message.idmes !== idmes);
    });
  }
}
