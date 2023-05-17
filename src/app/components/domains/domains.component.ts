import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';
import {Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';

interface Domain {
  domain_name: String
}

interface Response {
  domains: Domain[]
}

const GET_DOMAINS = gql`
query MyQuery {
  domains {
    domain_name
  }
}`

@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.css']
})
export class DomainsComponent implements OnInit {

  domains!:Observable<Domain[]>;
  EditForm:boolean = false;

  constructor(private Apollo: Apollo) {
    
  }

  ngOnInit(): void {
    this.domains = this.Apollo.watchQuery<Response>({
      query: GET_DOMAINS,
    }).valueChanges.pipe(
      map(result => result.data.domains)
    )
    
  }

  handleClick() {
    this.EditForm = true;
  } 
}
