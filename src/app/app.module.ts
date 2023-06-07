import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarModule } from './shared/components/sidebar/sidebar.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpService } from './shared/interceptors/http.service';
import { ErrorService } from './shared/interceptors/error.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SharedsModule } from './shared/components/shareds/shareds.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    SidebarModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
    SharedsModule
  ],
  providers: [{
    provide : HTTP_INTERCEPTORS,
    useClass : HttpService,
    multi:true
  },
  {
    provide : HTTP_INTERCEPTORS,
    useClass : ErrorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
