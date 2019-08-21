/** @file CWLang.tsx
 *  @brief Types & Functions for interacting with language abbreviations
 *
 *  @author Mike Brazier
 */

/***************************************
 * Contants, Types
 ***************************************/
export const EN_LANG = 'en';
export const ES_LANG = 'es';
export type CWLang = typeof EN_LANG | typeof ES_LANG;

/***************************************
 * Functions
 ***************************************/
export function getLanguageString(cwLang: CWLang) {
  switch (cwLang) {
    case EN_LANG:
      return 'English';
    case ES_LANG:
      return 'Spanish';
  }
  return '';
}
