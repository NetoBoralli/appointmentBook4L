import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LayoutComponent } from './layout/layout.component';
import { ContactFormComponent } from './contacts/contact-form/contact-form.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { SingupComponent } from './singup/singup.component';
import { AuthLoginService, AuthService } from './shared/auth.service';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
    { path: '', component: LoginComponent, canActivate: [AuthLoginService] },
    { path: 'singup', component: SingupComponent, canActivate: [AuthLoginService] },
    {
        path: 'contacts', component: LayoutComponent, canActivate: [AuthService], children: [
            {
                path: '', component: ContactListComponent, children: [
                    { path: 'new', component: ContactFormComponent },
                    { path: ':id', component: ContactFormComponent },
                    { path: ':id/edit', component: ContactFormComponent }
                ]
            }
        ]
    },

    { path: '**', redirectTo: '', pathMatch: 'full' }

];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRouting { }
