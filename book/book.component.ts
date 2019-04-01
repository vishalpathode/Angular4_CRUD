import {Component, OnInit} from '@angular/core';
import {Book} from './book';
import { BookService } from './book.service';

@Component({
    selector:'app-book',
    templateUrl:'./book.component.html',
    styleUrls:['./book.component.css']
})

export class BookComponent implements OnInit{

    ngOnInit():void{
        this.getBooks();

    }
    
    books:Book[]; //variable 'books' type of 'Book' array.
    book = new Book();

    // it is a dependency injection
    constructor(private _bookService:BookService){}

    getBooks():void{
        this._bookService.getAllBooks()
        .subscribe((bookData) => {
            this.books = bookData,
            console.log(bookData)
        },(error) => {
            console.log(error);
        });
    }

    addBook():void{
        if(this.book.title && this.book.author){

            console.log("in AddBook: "+this.book.title);
            this._bookService.addBooks(this.book)
            .subscribe((response) =>{
                console.log(response);
                this.reset();
                this.getBooks();
            },(error) =>{
                console.log(error);
            })

        }else{
            console.log("Author/Title is Empty.")
        }
        
    }

    deleteBook(bookId:string){
        if(bookId){
        this._bookService.deleteBooks(bookId)
            .subscribe((response) =>{
                console.log(response);
                this.getBooks();
            }, (error) => {
                console.log(error);
            })
        }else{
            console.log("id is null.");
        }
    }

    getBookById(bookId:string){
        if(bookId){
        this._bookService.getBookByIds(bookId)
            .subscribe((bookData) =>{
                this.book = bookData; 
                //this.getBooks();
            },(error) =>{
                console.log(error);
            }) 
        }else{
            console.log("id is null.");
        }
    }

    updateBook(){
        if(this.book.id){
            this._bookService.updateBooks(this.book)
            .subscribe((response) =>{
                console.log(response);
                this.getBooks();
                this.reset();
            },(error) =>{
                console.log(error);
            })
        }
        else{
            console.log("id was null...");
        }
    }

    private reset(){
        this.book.id = null;
        this.book.title = null;
        this.book.author = null;
    }

}