//Language keywords
export const EN_LANG = 'en';
export const ES_LANG = 'es';
export type CWLang = typeof EN_LANG | typeof ES_LANG;

export function getLanguageString(cwLang: CWLang) {
  switch (cwLang) {
    case EN_LANG:
      return 'English';
    case ES_LANG:
      return 'Spanish';
  }
  return '';
}
