import { Component, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';
import {Observable, of} from 'rxjs';
import { map,filter } from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { RouteService } from 'src/app/services/route.service';


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

interface DID {
  domain_id:String
}

interface DomainId {
  domains: DID[]
}

const GET_DOMAIN_ID = gql`
query MyQuery ($domain_name:String){
  domains(where: {domain_name: {_eq: $domain_name}}) {
    domain_id
  }
}

`

  const GET_SUBDOMAINS = gql`
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

// const GET_DOMAINS = gql`
// query MyQuery {
//   domains {
//     domain_name
//   }
// }`

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
  domain_id:String = "";

  constructor(private Apollo: Apollo, private route: Router, private service: RouteService) {
    
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

  get_domain_id() {
    this.Apollo.watchQuery<DomainId>({
      query: GET_DOMAIN_ID,
      variables: {domain_name: this.name}
    }).valueChanges.pipe(
      map(result => result.data.domains),
      
      // filter(result => result?.subdomains.length >= 2)
    ).subscribe(data => {
      this.domain_id = data[0].domain_id
      this.service.current_domain_id = this.domain_id;
    })
  }

  toogleSubDomains() {
    this.toogleDomains = !this.toogleDomains
    this.domains = this.Apollo.watchQuery<Response>({
      query: GET_SUBDOMAINS,
      variables: {domain_name: this.name}
    }).valueChanges.pipe(
      map(result => result.data.domains[0]?.subdomains || []),
      
      // filter(result => result?.subdomains.length >= 2)
    )
    this.get_domain_id();
  }

  handleAdd() {
    this.route.navigate([`/domains/${this.domain_id}/subdomains`])
  }

  EditForm = new FormGroup({
    domain_name: new FormControl("")
  })
}
