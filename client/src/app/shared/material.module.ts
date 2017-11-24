import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule,
        MatInputModule, 
        MatListModule, 
        MatToolbarModule, 
        MatSortModule, 
        MatTableModule, 
        MatIconModule, 
        MatButtonModule, 
        MatSidenavModule, 
        MatCheckboxModule,
        MatCardModule
} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        MatInputModule,
        MatListModule,
        MatToolbarModule,
        MatTableModule,
        MatSortModule,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule,
        MatCheckboxModule,
        MatCardModule
    ],
    exports: [
        MatDialogModule,
        MatInputModule,
        MatListModule,
        MatToolbarModule,
        MatTableModule,
        MatSortModule,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule,
        MatCheckboxModule,
        MatCardModule
    ]
})

export class MaterialModule{}