import { NgModule } from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';
import { HomeComponent } from './home';

// here is project component --- start
import { ASOverviewComponent } from './access-source/overview.component';
import { PGOverviewComponent } from './page-info/overview.component';
// here is project component --- end

// pages
import { DashboardPage } from './pages/dashboard';
import { NoContentPage } from './pages/no-content';
import { PageIndexPage } from './pages/page.index';
import { PageEventPage } from './pages/page.event';
import { SourceEnginePage } from './pages/source.engine';
import { SourceAllPage } from './pages/source.all';
import { VisitDistrictPage } from './pages/visit.district';
import { VisitClientPage } from './pages/visit.client';


const routes: Routes = [
	{ path: '', component: DashboardPage },
	{ path: 'home', component: HomeComponent },
	{ path: 'access-source/overview', component: ASOverviewComponent },
	{ path: 'page-info/overview', component: PGOverviewComponent },
	
	
	
	
	///////////////////////////////////////////////////////// start
	{ path: 'dashboard', component: DashboardPage},     
	{ path: 'page/index', component: PageIndexPage},
	{ path: 'page/event', component: PageEventPage},
	{ path: 'source/engine', component: SourceEnginePage},
	{ path: 'source/all', component: SourceAllPage},
	{ path: 'visit/district', component: VisitDistrictPage},
	{ path: 'visit/client', component: VisitClientPage},
	// 该path一定要放在最后，否则导致其他path全被截获
	{ path: '**',    component: NoContentPage }
///////////////////////////////////////////////////////// end 
];

/**
 * { useHash: true } 设置的作用是避免与node服务的url冲突，
 * 导致刷新时候不走客户端路由而去请求服务端
 * 
 * @export
 * @class AppRoutingModule
 */
@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule],
	providers: [],
})
export class AppRoutingModule { }
