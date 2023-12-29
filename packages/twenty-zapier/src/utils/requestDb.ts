import { Bundle, HttpRequestOptions, ZObject } from 'zapier-platform-core';

export const requestSchema = async (z: ZObject, bundle: Bundle) => {
  const options = {
      url: `${process.env.SERVER_BASE_URL}/open-api`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${bundle.authData.apiKey}`,
        },
  } satisfies HttpRequestOptions;

    return z.request(options)
      .then((response) => response.json)
}

const requestDb = async (z: ZObject, bundle: Bundle, query: string) => {
  const options = {
    url: `${process.env.SERVER_BASE_URL}/graphql`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${bundle.authData.apiKey}`,
    },
    body: {
      query,
    },
  } satisfies HttpRequestOptions;

  return z
    .request(options)
    .then((response) => {
      const results = response.json;
      if (results.errors) {
        throw new z.errors.Error(
          `query: ${query}, error: ${JSON.stringify(results.errors)}`,
          'ApiError',
          response.status
        );
      }
      response.throwForStatus();
      return results;
    })
    .catch((err) => {
      throw new z.errors.Error(
        `query: ${query}, error: ${err.message}`,
        'Error',
        err.status
      );
    });
};

export default requestDb;
