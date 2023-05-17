import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Domain {
  subdomains_aggregate: {
    aggregate: {
      count: number
    }
  }
  domain_name: String
}

interface Response {
  domains: Domain[]
}

const GET_DOMAINS_WITH_MINNOSUBDOMAINS = gql`
query MyQuery {
  domains {
    domain_name
    subdomains_aggregate {
      aggregate {
        count(columns: subdomain_name)
      }
    }
  }
}
`

@Component({
  selector: 'app-no-subdomains',
  templateUrl: './no-subdomains.component.html',
  styleUrls: ['./no-subdomains.component.css']
})
export class NoSubdomainsComponent {
  domains!: Observable<Domain[]>;
  constructor(private Apollo: Apollo) {

  }
  ngOnInit(): void {
    this.domains = this.Apollo.watchQuery<Response>({
      query: GET_DOMAINS_WITH_MINNOSUBDOMAINS,
    }).valueChanges.pipe(
      // map(result => result.data.domains),
      map((result) => result.data.domains.filter((domain) => domain.subdomains_aggregate.aggregate.count == 0))
      // filter(result => result?.subdomains.length >= 2)
    )
  }
}
