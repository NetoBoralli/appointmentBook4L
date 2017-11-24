import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Contact } from './contacts';

@Injectable()
export class ContactsService {

  private contacts: any[] = [];

  constructor(
    private http: Http
  ) { }

  // getContacts() {
  //   let actualUser = JSON.parse(localStorage.getItem('currentUser'));
  //   this.contacts = JSON.parse(localStorage.getItem(actualUser.username));
  //   return this.contacts;
  // }

  getContactsAPI(id?: number): Observable<any> {
    return this.http
      .get('http://localhost:21816/api' + '/contacts/' + (id ? id : ''))
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  setContactAPI(userId: number, name: string, email: string, phone: string, fav: boolean, address?: string, obs?: string) {
    if (!userId || !name || !email || !phone) {
      return null;
    }

    let url = 'http://localhost:21816/api/contacts/insert';
    let body = { id: userId, name: name, email: email, phone: phone, fav: fav, address: address, obs: obs };

    return this.http
      .post(url, body)
      .toPromise()
      .then((res: Response) => res.json())
      .catch((err: any) => err.json())
  }

  updateContactAPI(contactId: number, fav?: boolean, name?: string, email?: string, phone?: string, address?: string, obs?: string) {
    if ((!contactId) || (!name && !email && !phone && !address && !obs && fav == null)) {
      return null;
    }

    let url = 'http://localhost:21816/api/contacts/update';
    let body = { id: contactId, name: name, email: email, phone: phone, address: address, obs: obs, fav: fav};

    return this.http
      .put(url, body)
      .toPromise()
      .then((res: Response) => res.json())
      .catch((err: any) => err.json())
  }

  deleteContactAPI(contactId: number) {
    if (!contactId) {
      return null;
    }

    let url = "http://localhost:21816/api/contacts/delete";
    let body = new RequestOptions({body: {id: contactId}});

    return this.http
      .delete(url, body)
      .toPromise()
      .then((res: Response) => res.json())
      .catch((err: any) => err.json())
  }

  // getContact(id: number) {
  //   let contacts = this.getContacts();
  //   for (let i = 0; i < contacts.length; i++) {
  //     let contact = contacts[i];
  //     if (contact.id == id) {
  //       return contact;
  //     }
  //   }
  //   return null;
  // }


}
