import { Component } from '@angular/core';

declare var Clipboard: any;

@Component({
  selector: 'my-app',
  template: `<h1>Email ID!</h1>
              <div class="table-container"> 
               <div class="cell input-cell">
                 <textarea id="input" #input> </textarea>
               </div>  
               <div class="cell" id="process-block">
                 <button id="process" class="btn"(click)="process(input.value, output)">process</button>
               </div>
               <div class="cell output-cell">
                 <textarea id="output" #output></textarea>
               </div>
               <div class="cell" id="process-block">
                 <button id="copy" class="btn" data-clipboard-target="#output">copy</button>
               </div>
              </div>
              <div *ngIf="duplicateCount > 0" class="error">
                <!-- Error message displayed when the errorCount property on the current context is greater
                      than 0. -->
                {{duplicateCount}} duplicates removed
              </div> 
             `
})
export class AppComponent {
  
  //no. of duplicate entries
  duplicateCount: number = 0; 

  process(input, output){
    console.log(input);
    //variable for holding each email
    var email;
    //emailArray
    var emailArray=[];    
    for(var i=0;i<input.length;i++){
      var ch = input[i];
      if( ch == '<' || ch == '('){
        email="";
      }else if(ch == '@'){
        console.log(email);
        if(emailArray.indexOf(email) == -1){
          emailArray.push(email);
          output.value += email + " \n";
        }else{
          this.duplicateCount++;
        }        
      }else{
        email+=ch;
      }
    }
    new Clipboard('#copy');
  }
}