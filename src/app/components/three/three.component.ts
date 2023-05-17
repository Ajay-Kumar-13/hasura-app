import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import {Observable} from 'rxjs';
import {map} from "rxjs/operators";

interface Domain {
  domain_name: String
}

interface Response {
  domains: Domain[]
}


const GET_THREECHAR_DOMAIN = gql`
query MyQuery {
  domains(where: {domain_name: {_gte: "abc"}}) {
    domain_name
  }
}
`

@Component({
  selector: 'app-three',
  templateUrl: './three.component.html',
  styleUrls: ['./three.component.css']
})
export class ThreeComponent implements OnInit{

  constructor(private Apollo: Apollo) {

  }
  domains!:Observable<Domain[]>;
  ngOnInit(): void {
    this.domains = this.Apollo.watchQuery<Response>({
      query: GET_THREECHAR_DOMAIN
    }).valueChanges.pipe(
      map(result => result.data.domains)
    )
  }
}
