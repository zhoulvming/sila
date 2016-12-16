import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';

import { AppState, InteralStateType, Global } from './shared/services/app.service';
import { SidebarComponent } from './sidebar/sidebar.component';

// here is project component --- start
import { ASOverviewComponent } from './access-source/overview.component';
import { PGOverviewComponent } from './page-info/overview.component';
// here is project component --- end

// ag-grid component
import {AgGridModule} from 'ag-grid-ng2/main';


// ========================================================= Pages start
import { NoContentPage } from './pages/no-content';
import { DashboardPage } from './pages/dashboard';
import { PageIndexPage } from './pages/page.index';
import { PageEventPage } from './pages/page.event';
import { SourceEnginePage } from './pages/source.engine';
import { SourceAllPage } from './pages/source.all';
import { VisitClientPage } from './pages/visit.client';
import { VisitDistrictPage } from './pages/visit.district';
// ========================================================= Pages end

// ========================================================= Components start
import { DaterangeComponent } from './components/daterange.component';
import { DateRangePicker } from './directives/daterangepicker.directive';
// ========================================================= Components end


import { NgSemanticModule } from 'ng-semantic';



// Application wide providers
const APP_PROVIDERS = [
  AppState, Global
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    ASOverviewComponent,
    PGOverviewComponent,

    ////////////////////////////// Pages start
    DashboardPage,
    NoContentPage,
    PageIndexPage,
    PageEventPage,
    SourceEnginePage,
    SourceAllPage,
    VisitClientPage,
    VisitDistrictPage,
    ////////////////////////////// Pages end

    ////////////////////////////// Components start
    DaterangeComponent,
    DateRangePicker
    ////////////////////////////// Components end


  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgSemanticModule
  ],
  providers: [APP_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
