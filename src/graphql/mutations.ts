// eslint-disable-next-line import/no-extraneous-dependencies
import { graphql } from 'gql.tada';

export const LOGIN_BY_EMAIL = graphql(`
  mutation loginByEmail($authEmailLoginDto: AuthEmailLoginDto!) {
    loginByEmail(authEmailLoginDto: $authEmailLoginDto) {
      token
      refreshToken
      tokenExpires
      user {
        email
      }
    }
  }
`);
