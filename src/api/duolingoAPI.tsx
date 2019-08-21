/** @file duolingoAPI.tsx
 *  @brief Function for fetching data from Duolingo API & parsing into GameData JSON array
 *
 *  During development, the Duolingo API is accessed via a proxy set in package.json
 *  This proxy points all requests to the baseURL: http://s3.amazonaws.com/duolingo-data/s3/js
 *  The full URL where game data is hosted is: http://s3.amazonaws.com/duolingo-data/s3/js/find_challenges.txt
 *
 *  @author Mike Brazier
 */

import { CWRawGameData, CWGameData, parseCWRawGameData } from '../types/CWGame';

/***************************************
 * Constants
 ***************************************/

const challengesEndpoint = '/find_challenges.txt';

/***************************************
 * Helper functions
 ***************************************/

function parseResponse(dataString: string): CWRawGameData {
  return JSON.parse(dataString);
}

function handleErrors(response: Response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

/***************************************
 * Fetch exports
 ***************************************/

export function fetchGames(): Promise<Array<CWGameData>> {
  let headers = new Headers();

  headers.append('Content-Type', 'text/plain');
  let fetchRequest = new Request(challengesEndpoint, {
    method: 'GET',
    headers: headers
  });

  return fetch(fetchRequest)
    .then(handleErrors)
    .then(response => {
      return response
        .text()
        .then(ndJson =>
          ndJson.split('\n').map(l => parseCWRawGameData(parseResponse(l)))
        );
    });
}
