import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router';   
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';

// import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
// import { ContactsRoutingModule } from './contacts.routing.module';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactsService } from './shared/contacts.service';
import { AuthService } from './../shared/auth.service';
import { ConfirmationComponent } from './../confirmation/confirmation.component';
import { ConfirmationService } from './../confirmation/shared/confirmation.service';
import { MaterialModule } from './../shared/material.module';

@NgModule({
    imports:[ 
        CommonModule,
        RouterModule,
        FormsModule,
        HttpModule,
        MaterialModule,
        FlexLayoutModule
    ],
    declarations: [
        ContactListComponent,
        // ContactDetailComponent,
        ContactFormComponent,
        ConfirmationComponent
    ],
    providers: [
        ContactsService,
        ConfirmationService,
        AuthService
    ],
    entryComponents: [
        ConfirmationComponent
    ]
})

export class ContactsModule {}