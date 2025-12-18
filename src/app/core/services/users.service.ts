import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, pipe, shareReplay, single, tap } from 'rxjs';
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
        .pipe( shareReplay(1), tap( data => console.log(data)), tap( ( response )=> this.saveLocalStorage( response  ) ) )

    }

    private saveLocalStorage( data: UserResult ){
        if(localStorage.getItem( this.usersKey() )) return;
        localStorage.setItem( this.usersKey(), JSON.stringify( data ) );
    }


}