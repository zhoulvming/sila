import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';

import { AppState, InteralStateType, AppUtil } from './shared/services/app.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FlowComponent } from './flow/flow.component';
import { FlowOverviewComponent } from './flowoverview/flowoverview.component';
import { PageOverviewComponent } from './pageoverview/pageoverview.component';

// here is project component --- start
import { ASOverviewComponent } from './access-source/overview.component';
// here is project component --- end



// Application wide providers
const APP_PROVIDERS = [
  AppState, AppUtil
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    FlowComponent,
    FlowOverviewComponent,
    ASOverviewComponent,
    PageOverviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    DatepickerModule
  ],
  providers: [APP_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
