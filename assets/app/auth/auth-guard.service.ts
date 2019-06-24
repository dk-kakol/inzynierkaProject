import { 
    CanActivate, 
    ActivatedRouteSnapshot, 
    RouterStateSnapshot, 
    Router	
} from "@angular/router";
import { Observable } from "rxjs/Observable";

import { AuthService } from './auth.service';
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate{ //musimy zaimplementować CanActivate
    constructor(private authService: AuthService, private router: Router){}
    canActivate(route:ActivatedRouteSnapshot, 
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean { //ta metoda przyjmuje 2 parametry i też coś zwraca (to po dwukropku)
        return this.authService.isLoggedIn();
    }
}