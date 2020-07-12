import { Component, OnInit } from '@angular/core';
import {ChatService, Message} from '../comments/chat.service';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-modal-for-add-comment',
  templateUrl: './modal-for-add-comment.component.html',
  styleUrls: ['./modal-for-add-comment.component.scss']
})
export class ModalForAddCommentComponent implements OnInit {
  private subscription: Subscription;
  id: string;
  idmes: string;
  textmes: string;
  namemes: string;
  datemes: Date;
  vartruefalse = true;
  text: string;
  private message: Message;
  private form: FormGroup;

  constructor(private chatServise: ChatService) {
  }
  messages: Message[] = [];
  ngOnInit() {
    this.subscription = this.chatServise.getMessageEdit().subscribe(data => {
      if (data.event === 'openModalWithComponent') {
        this.showModal();
      }
      this.id = data.id;
      this.idmes = data.idmes;
      this.textmes = data.textmes;
      this.datemes = data.datemes;
      this.namemes = data.namemes;
      console.log(this.textmes);
      console.log(this.namemes);
      console.log(this.datemes);
      console.log(this.idmes);
      console.log(this.id);
    });
  }

  showModal() {
    this.vartruefalse = !this.vartruefalse;
  }

  saveNametext(textmes: string, namemes: string, idmes: string, datemes: Date, id: string) {
    if (this.textmes) {
      this.chatServise.saveNametext({
        idmes: this.idmes,
        textmes: this.textmes,
        datemes: this.datemes,
        namemes: this.namemes
      }, this.id)
          .subscribe(() => {
            this.message = {
              textmes: this.textmes,
              idmes: this.idmes,
              datemes: this.datemes,
              namemes: this.namemes,
          };
            });
          }
    this.textmes = '';
    this.chatServise.Update(); console.log(7);
    this.showModal();
    }
  }

