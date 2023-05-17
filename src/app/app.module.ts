import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from "@angular/forms";
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { DomainsComponent } from './components/domains/domains.component';
import { ThreeComponent } from './components/three/three.component';
import { TwoSubdomainsComponent } from './components/two-subdomains/two-subdomains.component';
import { AddComponent } from './components/add/add.component';
import { NoSubdomainsComponent } from './components/no-subdomains/no-subdomains.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { DomainComponent } from './components/domain/domain.component';
import { SubDomainComponent } from './components/sub-domain/sub-domain.component';

const appRoutes: Routes = [
  {path:"domains", component: DomainsComponent },
  {path:"domains/three", component: ThreeComponent},
  {path:"domains/two-subdomains", component: TwoSubdomainsComponent},
  {path:"domains/add", component: AddComponent},
  {path:"domains/no-subdomains", component: NoSubdomainsComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    DomainsComponent,
    ThreeComponent,
    TwoSubdomainsComponent,
    AddComponent,
    NoSubdomainsComponent,
    DomainComponent,
    SubDomainComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    GraphQLModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
