import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AgmCoreModule } from '@agm/core';

import { DataService } from './shared/data.service';
import { AppComponent } from "./app.component";
import { HeaderComponent } from './header/header.component';
import { AlgorithmComponent } from './algorithm/algorithm.component';
import { HistoryComponent } from './history/history.component';
import { NewWarehouseComponent } from './algorithm/new/newWarehouse.component';
import { ListComponent } from './algorithm/list/list.component';
import { ListItemComponent } from './algorithm/list/list-item/list-item.component';
import { ResultComponent } from './algorithm/result/result.component';
import { CalculationService } from './shared/calculation.service';
import { RotationService } from './shared/rotation.service';
import { HttpModule } from '@angular/http';
import { HistoryItemComponent } from './history/history-item/history-item.component';
import { ResultItemComponent } from './algorithm/result/result-item/result-item.component';
import { RotationItemComponent } from './algorithm/result/result-item/rotation-item/rotation-item.component';
import { LogoutComponent } from './auth/logout.component';
import { SigninComponent } from './auth/signin.component';
import { SignupComponent } from './auth/signup.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import  API_KEY  from './config'

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        AlgorithmComponent,
        HistoryComponent,
        NewWarehouseComponent,
        ListComponent,
        ListItemComponent,
        ResultComponent,
        HistoryItemComponent,
        ResultItemComponent,
        RotationItemComponent,
        LogoutComponent,
        SigninComponent,
        SignupComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        HttpModule,
        AgmCoreModule.forRoot({
            apiKey: API_KEY
        })
    ],
    providers: [
        DataService, 
        CalculationService, 
        RotationService, 
        AuthService,
        AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule {

}