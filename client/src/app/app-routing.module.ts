import { NgModule } from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';
import { HomeComponent } from './home';

// here is project component --- start
import { ASOverviewComponent } from './access-source/overview.component';
import { PGOverviewComponent } from './page-info/overview.component';
// here is project component --- end


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'access-source/overview', component: ASOverviewComponent },
    { path: 'page-info/overview', component: PGOverviewComponent }
    // { path: '**',    component: NoContent }
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
