import { Component, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';
import {Observable, of} from 'rxjs';
import { map,filter } from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';

interface Domain {
  subdomains: Subdomain[]
  domain_name: String
}

interface Subdomain {
  subdomain_name: String
}

interface Response {
  domains: Domain[]
}


  const GET_DOMAINS_WITH_MINTWOSUBDOMAINS = gql`
query MyQuery($domain_name:String!) {
  domains(where: {domain_name: {_eq: $domain_name}}) {
    subdomains {
      subdomain_name
    }
  }
}
`
const UPDATE_DOMAIN = gql`
mutation MyMutation($domain_name: String, $new_domain_name: String) {
  update_domains(where: {domain_name: {_eq: $domain_name}}, _set: {domain_name: $new_domain_name}) {
    returning {
      domain_name
    }
  }
}`

const GET_DOMAINS = gql`
query MyQuery {
  domains {
    domain_name
  }
}`

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css']
})
export class DomainComponent {
  @Input() name!: String;
  toogleDomains:boolean = false;
  showEditForm:boolean = false;
  domains!:Observable<Subdomain[]>;

  constructor(private Apollo: Apollo) {
    
  }

  ngOnInit(): void {
    
  }

  handleClick() {
    this.showEditForm = !this.showEditForm;
    this.EditForm.reset();
  }

  handleSave() {
    this.Apollo.mutate({
      mutation: UPDATE_DOMAIN,
      variables: {
        domain_name:this.name,
        new_domain_name: this.EditForm.value.domain_name!
      }
    }).subscribe(({data}) => {
      this.handleClick();
      window.location.reload();
    })
  }

  toogleSubDomains() {
    this.toogleDomains = !this.toogleDomains
    this.domains = this.Apollo.watchQuery<Response>({
      query: GET_DOMAINS_WITH_MINTWOSUBDOMAINS,
      variables: {domain_name: this.name}
    }).valueChanges.pipe(
      map(result => result.data.domains[0]?.subdomains || []),
      // filter(result => result?.subdomains.length >= 2)
    )
  }

  EditForm = new FormGroup({
    domain_name: new FormControl("")
  })
}
