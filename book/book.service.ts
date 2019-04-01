import {Http,Response, RequestOptions,Headers} from '@angular/http';
import  {Injectable} from '@angular/core'
import { Observable } from 'rxjs/Observable';
import { Book } from './book';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ThrowStmt } from '@angular/compiler';


@Injectable()
export class BookService{

    // it is nothing but dependency injection
    constructor(private _httpService:Http){}

    getAllBooks(): Observable<Book[]>{
        return this._httpService.get("http://localhost:8080/Dynamic_Maven/api/book")
        .map((response:Response) => response.json())
        .catch(this.handleErrors);
    }

    addBooks(book:Book){
        let body = JSON.stringify(book);
        let header = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:header});
        return this._httpService.post("http://localhost:8080/Dynamic_Maven/api/saveBook",body,options);
    }

    deleteBooks(bookId:string){
        return this._httpService.delete("http://localhost:8080/Dynamic_Maven/api/delete/"+bookId);
    }

    getBookByIds(bookId:string): Observable<Book>{
        return this._httpService.get("http://localhost:8080/Dynamic_Maven/api/get/"+bookId)
            .map((response:Response) => response.json())
            .catch(this.handleErrors);
    }

    updateBooks(book:Book){
        let body = JSON.stringify(book);
        let header = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:header});
        return this._httpService.put("http://localhost:8080/Dynamic_Maven/api/update/"+book.id,body,options);
    }


    // to handle errors
    private handleErrors(error:Response){
        return Observable.throw(error);
    }
}