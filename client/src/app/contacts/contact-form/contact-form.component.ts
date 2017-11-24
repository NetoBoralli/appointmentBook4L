import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs/Rx';

import { ContactsService } from './../shared/contacts.service';
import { ContactListComponent } from './../contact-list/contact-list.component';
import { Contact } from './../shared/contacts';
import { $ } from 'protractor';
import { ConfirmationService } from './../../confirmation/shared/confirmation.service';


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  id: number;
  inscription: Subscription;
  contact: Contact;
  contacts: Contact[] = [];
  currentUser;

  constructor(private route: ActivatedRoute,
    private contactsService: ContactsService,
    private contactListComponent: ContactListComponent,
    private router: Router,
    private http: Http,
    public confirm: ConfirmationService
  ) { }

  ngOnInit() {
    this.inscription = this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));

        this.contactsService.getContactsAPI(this.currentUser.id).subscribe((data) => {
          this.contacts = data;
          for (let i = 0; i < this.contacts.length; i++) {
            if (this.contacts[i].id == this.id)
              this.contact = this.contacts[i];
          }
        })

        if (this.contact == null) {
          this.contact = new Contact();

        }
      }
    );

  }

  // onSubmit(form) {
  //   if (form.value.id) {
  //     let u = 'username+' + form.value.id;
  //     this.contact = new Contact(form.value.id, form.value.username, form.value.email, form.value.phone, form.value.address, form.value.obs);
  //     localStorage.setItem(u, JSON.stringify(this.contact));
  //     this.router.navigate(['/contacts']);
  //     this.contactListComponent.sidenav.close();
  //     console.log("Editado")
  //   } else {
  //     let num: number = parseInt(localStorage.getItem('serial'));
  //     this.contact = new Contact(++num, form.value.username, form.value.email, form.value.phone, form.value.address, form.value.obs, 'false');
  //     let u = 'username+' + num;
  //     localStorage['serial'] = num;
  //     localStorage.setItem(u, JSON.stringify(this.contact));
  //     this.router.navigate(['/contacts']);
  //     this.contactListComponent.sidenav.close();
  //     console.log("Adicionado");
  //   }
  // }

  actionContact(form) {
    if (form.value.id) {
      this.contactsService.updateContactAPI(form.value.id, this.contact.fav, form.value.name, form.value.email, form.value.phone, form.value.address, form.value.obs)
        .then((data) => {
          if (data) {
            this.contactListComponent.refresh();
            this.contactListComponent.sidenav.close();
            this.router.navigate(['/contacts']);
          } else {
            console.log(data);
            form.reset();
          }
        })
    } else {
      this.contactsService.setContactAPI(this.currentUser.id, form.value.name, form.value.email, form.value.phone, false, form.value.address, form.value.obs)
        .then((data) => {
          if (data) {
            this.contactListComponent.refresh();
            this.contactListComponent.sidenav.close();
            this.router.navigate(['/contacts']);
          } else {
            console.log(data);
            form.reset();
          }
        })
    }
  }

  removeContact(id) {
    this.confirm.openDialog().subscribe((res) => {
      if (res) {
        this.contactsService.deleteContactAPI(id).then((data) => {
          if (data) {
            this.contactListComponent.refresh();
            this.contactListComponent.sidenav.close();
            this.router.navigate(['/contacts']);
          } else {
            console.log(data);
          }
        })
      }
    });
  }

  fav(id) {
    this.contact.fav = !this.contact.fav;
    this.contactsService.updateContactAPI(id, this.contact.fav)
      .then((data) => {
        if (data) {
          this.contactListComponent.refresh();
          this.contactListComponent.sidenav.close();
          this.router.navigate(['/contacts']);
        }
      })
  }

  ngOnDestroy() {
    this.inscription.unsubscribe();
  }

}

// if (res) {
//   let actualUser = JSON.parse(localStorage.getItem('currentUser'));
//   let users = JSON.parse(localStorage.getItem(actualUser.username));

//   for (let i = 0; i < users.length; i++) {
//     if (id == users[i].id) {
//       console.log(users[i].username + ' removed');
//       users.splice(i, 1);
//     }
//   }

//   localStorage.setItem(actualUser.username, JSON.stringify(users));
//   this.contactListComponent.sidenav.close();
//   this.router.navigate(['/contacts']);
// }