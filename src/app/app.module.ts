import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WebComponent } from './web/web.component';
import { LogComponent } from './log/log.component';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashempComponent } from './dashemp/dashemp.component';
import { DashadminComponent } from './dashadmin/dashadmin.component';
import { FormsModule } from '@angular/forms';
import * as firebase from "firebase";
import { LogmainComponent } from './logmain/logmain.component';
import { MealvoucherComponent } from './mealvoucher/mealvoucher.component';
import { DeptComponent } from './dept/dept.component';

export const config = {
  apiKey: "AIzaSyAxpN49RTnhMVVCYQuAIoRrEtg9-iipIA4",
  authDomain: "voucher-voucher.firebaseapp.com",
  databaseURL: "https://voucher-voucher.firebaseio.com",
  projectId: "voucher-voucher",
  storageBucket: "voucher-voucher.appspot.com",
  messagingSenderId: "253342514786"
  
  };
  
 firebase.initializeApp(config);

@NgModule({
  declarations: [
    AppComponent,
    WebComponent,
    LogComponent,
    DashboardComponent,
    DashempComponent,
    DashadminComponent,
    LogmainComponent,
    MealvoucherComponent,
    DeptComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
		RouterModule.forRoot([
			{path: '', component: WebComponent},
      {path: 'login/:fmno', component: LogComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'admin', component: DashadminComponent},
      {path: 'mealvoucher', component: MealvoucherComponent},
      {path: 'department', component: DeptComponent}
		
	])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
