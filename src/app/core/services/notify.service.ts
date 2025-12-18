import { Injectable, signal } from '@angular/core';
import { timer } from 'rxjs';

@Injectable({providedIn: 'root'})
export class  NotifyService {
    constructor() { }
    public visible = signal( false );
    public isSuccess = signal( false );
    public message = signal( "" );
    public error(message:string){
        this.handleNotify( message, false )
    }

    public success( message:string ){
        this.handleNotify( message, true )
    }

    handleNotify(message:string, isSuccess:boolean){
        this.isSuccess.set( isSuccess );
        this.message.set( message );
        this.visible.set( true );
        timer(4000).subscribe( ()=> {
            this.visible.set( false );
        })
    }
}