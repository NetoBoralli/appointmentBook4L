import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatSidenav } from '@angular/material';

import { ContactsService } from './../shared/contacts.service';
import { Contact } from './../shared/contacts';

@Component({
  selector: 'app-contats',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('sidenav') sidenav: MatSidenav;

  displayedColumns = ['id', 'name', 'email', 'phone', 'address', 'obs', 'fav'];

  contacts: any[];
  elementData: any[] = [];
  dataSource = new MatTableDataSource(this.elementData);
  contact: Contact;

  constructor(
    private contactsService: ContactsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    let actualUser = JSON.parse(localStorage.getItem('currentUser'));
    this.contactsService.getContactsAPI(actualUser.id).subscribe((data)=>{
      this.elementData = data;
      this.dataSource = new MatTableDataSource(this.elementData);
    });
  }

  action(sidenav: MatSidenav) {
    if (sidenav.opened) {
      sidenav.close();
      this.router.navigate(['/contacts']);
    } else {
      sidenav.open();
      this.router.navigate(['/contacts', 'new']);
    }
  }

  // fav(id: number) {
  //   console.log('click works');
  //   // let actualUser = JSON.parse(localStorage.getItem('currentUser'));
  //   // let users = JSON.parse(localStorage.getItem(actualUser.username));
    
  //   // for(let i = 0; i < users.length; i++){
  //   //   if(id == users[i].id){
  //   //     users[i].fav = !users[i].fav;
  //   //   }
  //   // }
  //   // localStorage.setItem(actualUser.username, JSON.stringify(users))
  // }

  detail(sidenav, id) {
    sidenav.open();
    this.router.navigate(['/contacts', id, 'edit'])
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}



