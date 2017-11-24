import { TestBed, inject } from '@angular/core/testing';

import { ContactsService } from './contacts.service';

describe('ContatsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactsService]
    });
  });

  it('should be created', inject([ContactsService], (service: ContactsService) => {
    expect(service).toBeTruthy();
  }));
});
