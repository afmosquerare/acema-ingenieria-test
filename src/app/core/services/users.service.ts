import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, pipe, shareReplay, single, tap } from 'rxjs';
import { User, UserResult } from '../interfaces/user';
import { environment } from '../../../environments/environment.development';
@Injectable({providedIn: 'root'})
export class UsersService {
    private readonly http = inject( HttpClient );
    private readonly url = signal( environment.baseUrl );
    private usersKey = signal( 'users' )
    // private usersResource = rxResource({
    //     request: (()=> {}),
    //     loader: (()=>{
    //         return this.getUsers();
    //     })
    // })

    public getUsers( limit: number = 100  ): Observable<UserResult>{
        return this.http.get<UserResult>( `${this.url()}/?results=${limit}`  )
        .pipe( 
            shareReplay(1),
            map((response)=> this.loadDataLocalStorage( response )), 
            tap( ( response )=> this.saveLocalStorage( response  ) ) )

    }
    public getUsersForTable( limit: number = 100  ): Observable<UserResult>{
        return this.http.get<UserResult>( `${this.url()}/?results=${limit}`  )

    }

    private saveLocalStorage( data: UserResult ){
        if(localStorage.getItem( this.usersKey() )) return;
        localStorage.setItem( this.usersKey(), JSON.stringify( data ) );
    }

    private loadDataLocalStorage( temp: UserResult ){
        const data = localStorage.getItem( this.usersKey() ) 
        return data ? JSON.parse( data ) : temp;
    }


}