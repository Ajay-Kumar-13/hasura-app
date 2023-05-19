import { Component, Input } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

interface Response {
  subdomains: Domain[]
}

interface Domain {
  subdomain_name: String
}


const GET_SUB_DOMAINS = gql`
query MyQuery ($domain_id:uuid!){
  subdomains(where: {domain_id: {_eq: $domain_id}}) {
    subdomain_name
  }
}
`

const ADD_SUBDOMAIN = gql`
mutation MyMutation($domain_id: uuid!, $subdomain_name: String!) {
  insert_subdomains(objects: {domain_id: $domain_id, subdomain_name: $subdomain_name}) {
    returning {
      subdomain_name
    }
  }
}
`

@Component({
  selector: 'app-sub-domains',
  templateUrl: './sub-domains.component.html',
  styleUrls: ['./sub-domains.component.css']
})
export class SubDomainsComponent {
  @Input() name!: String;
  @Input() domainName!: String;
  toogleAddForm: boolean = false;
  toogleForm: boolean = false;
  domains!: Observable<Domain[]>;
  domain_id!: String;

  handleEdit() {
    this.toogleForm = !this.toogleForm;
    this.EditForm.reset();
  }

  addSubDomain() {
    this.toogleAddForm = !this.toogleAddForm;
  }

  handleSave() {
    // console.log(this.EditForm.value.sub_domain_name);
    this.Apollo.mutate({
      mutation: ADD_SUBDOMAIN,
      variables: {
        domain_id: this.domain_id,
        subdomain_name: this.EditForm.value.sub_domain_name
      }
    }).subscribe(({data}) => {
      window.location.reload();
      
    })
  }



  constructor(private Apollo: Apollo, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.domain_id = params['domain-id']
      console.log(this.domain_id);

    })
    this.domains = this.Apollo.watchQuery<Response>({
      query: GET_SUB_DOMAINS,
      variables: { domain_id: this.domain_id }
    }).valueChanges.pipe(
      map(result => result.data.subdomains || []),
      // filter(result => result?.subdomains.length >= 2)
    )
  }

  EditForm = new FormGroup({
    sub_domain_name: new FormControl("")
  })
}
