import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components//login/login.component';
import { RegisterComponent } from './components//register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthGoogleComponent } from './components//auth-google/auth-google.component';
import { NavbarComponent } from './components//navbar/navbar.component';
import { LeftbarComponent } from './components//leftbar/leftbar.component';
import { MainHeaderComponent } from './components//main-header/main-header.component';
import { TasksComponent } from './components//tasks/tasks.component';
import { LeftbarAllComponent } from './components//leftbar-all/leftbar-all.component';
import { TasksLeftbarComponent } from './components//tasks-leftbar/tasks-leftbar.component';
import { GroupsLeftbarComponent } from './components//groups-leftbar/groups-leftbar.component';
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
