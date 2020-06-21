import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FbCreateResponse, FbCreateResponsemes, Message, Post} from '../shared/interface';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class ChatService {
    public subjm = new Subject<any>();
    constructor(private http: HttpClient) {}


    getId(): Observable<Post> {
        return this.subjm.asObservable(); }


    createmes(message: Message, id: string): Observable<Message> {

        return this.http.post(`${environment.fbDbUrl}/posts/${id}/messages.json`, message)
            .pipe(map((responsemes: FbCreateResponsemes) => {
                return {
                    ...message,
                    idmes: responsemes.name,
                    datemes: new Date(message.datemes)
                };
            }));




    }


}

