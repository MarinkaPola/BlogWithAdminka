import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FbCreateResponsemes, Message} from '../shared/interface';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class ChatService {
    constructor(private http: HttpClient) {}

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
            .pipe(map((responsemes: {[key: string]: any}) => {
                return Object
                    .keys(responsemes)
                    .map(key => ({
                        ...responsemes[key],
                        idmes: key,
                        datemes: new Date(responsemes[key].date)
                    }));
            }));
    }

    remove(idmes: string): Observable<void> {
            return   this.http.delete<void>(`${environment.fbDbUrl}/messages/${idmes}.json`);
    }
}

