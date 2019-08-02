import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from '../auth.guard';
import { AuthGoogleComponent } from './auth-google/auth-google.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LeftbarComponent } from './leftbar/leftbar.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { TasksComponent } from './tasks/tasks.component';
import { LeftbarAllComponent } from './leftbar-all/leftbar-all.component';
import { TasksLeftbarComponent } from './tasks-leftbar/tasks-leftbar.component';
import { GroupsLeftbarComponent } from './groups-leftbar/groups-leftbar.component';
const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'authGoogle',
        component: AuthGoogleComponent
    },
    {
        path: 'home',
        component: HomeComponent,
        children: [
            {
                path: 'leftbar',
                component: LeftbarComponent,
                outlet: 'leftbar',
                 children: [
                {
                    path: 'all', component: LeftbarAllComponent, outlet: 'leftbarOptions'
                },
                {
                    path: 'tasks', component: TasksLeftbarComponent, outlet: 'leftbarOptions'
                },
                {
                    path: 'groups', component: GroupsLeftbarComponent, outlet: 'leftbarOptions'
                }
            ]},
            {path: '', component: TasksComponent, outlet: 'tasks'},
            {path: '', component: MainHeaderComponent, outlet: 'main-header'},
            {path: '', component: NavbarComponent, outlet: 'navbar'},
        ],
        canActivate: [AuthGuard],
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
