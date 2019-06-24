import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { AlgorithmComponent } from "./algorithm/algorithm.component";
import { HistoryComponent } from "./history/history.component";
import { NewWarehouseComponent } from "./algorithm/new/newWarehouse.component";
import { ResultComponent } from "./algorithm/result/result.component";
import { LogoutComponent } from "./auth/logout.component";
import { SigninComponent } from "./auth/signin.component";
import { SignupComponent } from "./auth/signup.component";
import { AuthGuard } from "./auth/auth-guard.service";
import { ListComponent } from "./algorithm/list/list.component";

const appRoutes: Routes = [
    //{ path: '', redirectTo: '/signin', pathMatch: 'full'},
    { path: 'algorithm', canActivate: [AuthGuard], component: AlgorithmComponent, children: [
        { path: 'newWarehous', component: NewWarehouseComponent}
    ]},
    { path: 'history', canActivate: [AuthGuard], component: HistoryComponent},
    { path: 'result', canActivate: [AuthGuard], component: ResultComponent},
    { path: 'signup', canActivate: [AuthGuard], component: SignupComponent},
    { path: 'signin', component: SigninComponent},
    { path: 'logout', canActivate: [AuthGuard], component: LogoutComponent},
    { path: 'list', component: ListComponent},
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}