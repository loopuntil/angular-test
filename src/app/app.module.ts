import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AccordionModule, DataTableModule, SharedModule, InputTextModule, ConfirmDialogModule, DialogModule } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, BrowserAnimationsModule, AccordionModule, DataTableModule, SharedModule,
    DataTableModule, SharedModule, InputTextModule, FormsModule, ConfirmDialogModule, DialogModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
