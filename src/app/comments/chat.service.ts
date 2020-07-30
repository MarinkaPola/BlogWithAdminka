import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FbCreateResponsemes, FbsaveNametextResponsemes, Message, Post} from '../shared/interface';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';


export interface  Message {
    idmes?: string;
    textmes: string;
    namemes: string;
    datemes: Date;
}
@Injectable({providedIn: 'root'})
        export class ChatService {
    public subjm = new Subject<any>();
    public subjmup = new Subject<any>();
    public vartruef: boolean;
    constructor(private http: HttpClient) {
    }

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


    getALL(id: string): Observable<Message[]> {
        return this.http.get(`${environment.fbDbUrl}/posts/${id}/messages.json`)
            .pipe(map((responsemes: { [key: string]: any }) => {
                return Object
                    .keys(responsemes)
                    .map(key => ({
                        ...responsemes[key],
                        idmes: key,
                        datemes: new Date(responsemes[key].datemes)
                    }));
            }));
    }

    remove(id: string, idmes: string): Observable<Message> {
        return this.http.delete<Message>(`${environment.fbDbUrl}/posts/${id}/messages/${idmes}.json`);
    }

    getMessageEdit(): Observable<any> {
        return this.subjm.asObservable();
    }

    edit(idmes: string, textmes: string, namemes: string, datemes: Date, id: string) {
        this.subjm.next({event: 'openModalWithComponent', idmes, textmes, namemes, datemes, id});
        console.log(textmes, namemes);
    }

    getsaveNametext(): Observable<any> {
        return this.subjmup.asObservable();
    }
    Update() {
        this.subjmup.next({event: 'saveNametext'});
    }


    saveNametext(message: { idmes: string; textmes: string, datemes: Date, namemes: string}, id: string): Observable<Message> {
        return  this.http.patch<Message>(`${environment.fbDbUrl}/posts/${id}/messages/${message.idmes}.json`, message)
            .pipe(map((responsemes: FbsaveNametextResponsemes) => {
                return {
                    ...message,
                    idmes: responsemes.name,
                    datemes: new Date(message.datemes),
                   textmes: message.textmes,
                    namemes: message.namemes,
                };
            }));
    }

}
