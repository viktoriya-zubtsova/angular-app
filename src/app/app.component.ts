import { Component } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import {formatDate} from '@angular/common';
     
@Component({
    selector: 'my-app',
    template: `<form>
                    <input 
                        class="input"
                        placeholder="Text"
                        type="text"
                        [(ngModel)]="textForm.text" 
                        required
                        name="text" 
                    />
                    <input 
                        class="input"
                        placeholder="Author"
                        type="text" 
                        [(ngModel)]="textForm.author" 
                        required
                        name="author" 
                    />
                    <button (click)="printForm()">Submit</button>
                    <p>Date: {{ myDate | date: 'dd.MM.yyyy' }}</p>
                </form>
                <div id="comments"></div>`, 
})
export class AppComponent { 
    state = {
        items: [],
        id: 0
    };

    textForm: any = {
        text: '',
        author: '',
        date: formatDate(new Date(), 'dd.MM.yyyy', 'en')
    };

    myDate = new Date();

    printForm(){
        this.state.items = [{
            id: (this.state.id + 1),
            text: this.textForm.text,
            author: this.textForm.author,
            date: this.textForm.date
        }, ...this.state.items];
        this.state.id = (this.state.id + 1);

        console.log(this.state.items);

        const commentsBlock = document.getElementById('comments');
        let newDiv = document.createElement('div');
        let itemID = this.state.items[0].id;
        newDiv.innerHTML = 
            `<p>${this.state.items[0].text}</p>
            <p>${this.state.items[0].author}</p>
            <p>${this.state.items[0].date}</p>

            <form id="${itemID}">
                <input 
                    placeholder="Comment"
                    type="text" 
                    required
                    name="commentText" 
                />
                <input 
                    placeholder="Author"
                    type="text" 
                    required 
                    name="commentAuthor" 
                />
                <input 
                    type="button" 
                    value="Ok" 
                    onclick="printComment(${itemID})"
                />
                </form>`; 
            commentsBlock.prepend(newDiv);   
    };
}