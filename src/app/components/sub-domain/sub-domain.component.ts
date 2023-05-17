import { Component,Input } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms"
import { Apollo , gql} from 'apollo-angular';

const UPDATE_SUB_DOMAIN = gql`
mutation MyMutation($domain_name:String!, $sub_domain_name: String!, $new_sub_domain_name:String!) {
  update_subdomains(
    where: {
      domain: { domain_name: { _eq: $domain_name } }
      subdomain_name: { _eq: $sub_domain_name }
    }
    _set: { subdomain_name: $new_sub_domain_name }
  ) {
    affected_rows
    returning {
      subdomain_name
    }
  }
}`

@Component({
  selector: 'app-sub-domain',
  templateUrl: './sub-domain.component.html',
  styleUrls: ['./sub-domain.component.css']
})
export class SubDomainComponent {

  @Input() name!:String;
  @Input() domainName!: String;
  toogleForm:boolean = false;

  handleEdit(){
    this.toogleForm = !this.toogleForm;
    this.EditForm.reset();
    
  }

  constructor(private Apollo: Apollo) {
    
  }

  handleSave() {
    this.Apollo.mutate({
      mutation: UPDATE_SUB_DOMAIN,
      variables: {
        domain_name:this.domainName,
        sub_domain_name:this.name,
        new_sub_domain_name: this.EditForm.value.sub_domain_name!
      }
    }).subscribe(({data}) => {
      this.handleEdit();
      window.location.reload();
    })
  }

  EditForm = new FormGroup({
    sub_domain_name: new FormControl("")
  })
}
