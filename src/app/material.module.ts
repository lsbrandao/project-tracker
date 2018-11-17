import { NgModule } from '@angular/core';
import { MatButtonModule,
         MatCheckboxModule,
         MatFormFieldModule,
         MatInputModule,
         MatIconModule,
         MatSidenavModule,
         MatToolbarModule,
         MatListModule,
         MatTabsModule,
         MatCardModule,
         MatDatepickerModule,
         MatNativeDateModule,
         MatSelectModule,
         MatExpansionModule,
         MatTableModule,
         MatDialogModule,
         MatSortModule,
         MatMenuModule} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatTabsModule,
        MatCardModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatExpansionModule,
        MatTableModule,
        MatDialogModule,
        MatSortModule,
        MatMenuModule
    ],
    exports: [
        MatButtonModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatTabsModule,
        MatCardModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatExpansionModule,
        MatTableModule,
        MatDialogModule,
        MatSortModule,
        MatMenuModule
    ]
})
export class MaterialModule { }

