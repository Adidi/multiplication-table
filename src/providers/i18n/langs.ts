import en from '@/providers/i18n/en.json';
import he from '@/providers/i18n/he.json';

export type Dir = 'ltr' | 'rtl';
export type Strings = typeof en;
export type StringKey = keyof Strings;

// To add a language: drop a <code>.json next to en.json, then register it here.
export const LANGS = {
	he: { name: 'עברית', dir: 'rtl', strings: he },
	en: { name: 'English', dir: 'ltr', strings: en }
} as const satisfies Record<string, { name: string; dir: Dir; strings: Strings }>;

export type Lang = keyof typeof LANGS;

export const DEFAULT_LANG: Lang = 'he';

export function isLang(v: unknown): v is Lang {
	return typeof v === 'string' && v in LANGS;
}
