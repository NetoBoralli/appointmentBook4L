import { MatDialogRef, MatDialog } from '@angular/material';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ConfirmationComponent } from './../confirmation.component';

@Injectable()
export class ConfirmationService{
    constructor(
        public dialog: MatDialog
    ){}
    
    public openDialog(): Observable<any> {
        let dialogRef: MatDialogRef<ConfirmationComponent>;
        dialogRef = this.dialog.open(ConfirmationComponent, {
            width: '300px'
        });
        return dialogRef.afterClosed();
    }
}