import { CWRawGameData } from '../types/CWGame';

export function parseResponse(dataString: string): CWRawGameData {
  return JSON.parse(dataString);
}
