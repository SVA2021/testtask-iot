import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './components/auth/auth.component';
import {ErrorComponent} from './components/error/error.component';
import {HomeComponent} from './components/home/home.component';
import {TableComponent} from './components/table/table.component';
import {AuthGuard} from './services/auth.guard';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
  },
  {
    path: 'table', component: TableComponent, canActivate: [AuthGuard],
  },
  {
    path: 'admin', component: AuthComponent,
  },
  {
    path: '**', component: ErrorComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
