import { CWRawGameData, CWGameData, parseCWRawGameData } from '../types/CWGame';

const challengesEndpoint = '/find_challenges.txt';

export function parseResponse(dataString: string): CWRawGameData {
  return JSON.parse(dataString);
}

function handleErrors(response: Response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

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
