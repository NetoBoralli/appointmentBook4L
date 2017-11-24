import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
    selector: 'confirmation.component',
    templateUrl: 'confirmation.component.html',
  })
export class ConfirmationComponent {

    constructor(
        public confirmRef: MatDialogRef<ConfirmationComponent>
    ) { }

    public confirmMessage: string;
}