import { gql } from '@apollo/client';

export const GET_CLIENT_CONFIG = gql`
  query GetClientConfig {
    clientConfig {
      authProviders {
        google
        password
      }
      billing {
        isBillingEnabled
        billingUrl
      }
      signInPrefilled
      debugMode
      telemetry {
        enabled
        anonymizationEnabled
      }
      support {
        supportDriver
        supportFrontChatId
      }
      sentry {
        dsn
      }
    }
  }
`;
