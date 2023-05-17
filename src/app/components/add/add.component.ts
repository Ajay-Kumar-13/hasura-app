import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';
import {Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';


const ADD_TASK = gql`
mutation AddTask($domain_name: String!) {
  insert_domains(objects: {domain_name: $domain_name, organization_id: "5de622d6-710b-4243-a53f-940b0af87b51"}) {
    returning {
      domain_name
    }
  }
}
`

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent {

  constructor(private Apollo:Apollo) {

  }
  
  newDomainForm = new FormGroup({
    domain_name: new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z]*')])
  })

  handleClick() {
    this.Apollo.mutate({
      mutation: ADD_TASK,
      variables: this.newDomainForm.value!
     }).subscribe(({data}) => {
        console.log(data);
        
    })
  }
  

}
