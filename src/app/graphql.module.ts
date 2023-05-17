import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import {setContext} from '@apollo/client/link/context';
import {ApolloLink} from '@apollo/client/core'

const uri = 'https://hasura.interviewbuddy.xyz/v1/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const basic = setContext((operation, context) => ({
    headers: {
      'Accept': 'chars/et=utf-8',
      'content-type': 'application/json',
      'x-hasura-admin-secret': 'Admin123'
    },
  }));
  const link = ApolloLink.from([basic, httpLink.create({ uri })]); 
  return {
    link,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
