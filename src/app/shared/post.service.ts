import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FbCreateResponse, Post} from './interface';
import {environment} from '../../environments/environment';
import { map} from 'rxjs/operators';
import {FormControl} from '@angular/forms';


@Injectable({providedIn: 'root'})
export class PostsService {
    err: string;
    constructor(private http: HttpClient) {}

    create(post: Post): Observable<Post> {
        return this.http.post(`${environment.fbDbUrl}/posts.json`, post)
            .pipe(map((response: FbCreateResponse) => {
                return {
                    ...post,
                    id: response.name,
                    date: new Date(post.date),
                    messages: post.messages
                        //обратить внимание правильно ли создано
                };
                     }));
    }

    getAll(): Observable<Post[]> {
        return this.http.get(`${environment.fbDbUrl}/posts.json`)
            .pipe(map((response: {[key: string]: any}) => {
                return Object
                    .keys(response)
                    .map(key => ({
                        ...response[key],
                        id: key,
                        date: new Date(response[key].date)
                    }));
            })
            );

    }


    getById(id: string): Observable<Post> {
     return    this.http.get<Post>(`${environment.fbDbUrl}/posts/${id}.json`)
            .pipe(map((post: Post) => {
                return {
                    ...post, id,
                    date: new Date(post.date)
                };
            }));
    }
    remove(id: string): Observable<void> {
      return   this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`);
    }
    update(post: { author: any | FormControl | string; id: string; text: any;
    title: string | FormControl | any | HTMLTitleElement }): Observable<Post> {
       return  this.http.patch<Post>(`${environment.fbDbUrl}/posts/${post.id}.json`, post);
    }
}
