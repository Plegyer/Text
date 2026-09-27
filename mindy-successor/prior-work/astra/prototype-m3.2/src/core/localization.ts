import {z} from 'zod';

export const locales=['ru','en'] as const;
export type Locale=typeof locales[number];

const localizedEntrySchema=z.object({
  ru:z.string().min(1),
  en:z.string().min(1).optional()
}).strict();

export const localizationSchema=z.object({
  version:z.literal(1),
  defaultLocale:z.literal('ru'),
  strings:z.record(z.string().min(1),localizedEntrySchema)
}).strict();

export type LocalizationBundle=z.infer<typeof localizationSchema>;

export const emptyLocalization=():LocalizationBundle=>({
  version:1,
  defaultLocale:'ru',
  strings:{}
});

export function normalizeLocale(value:string|null|undefined):Locale{
  return value==='en'?'en':'ru';
}

export function resolveLocalizedText(
  bundle:LocalizationBundle,
  key:string,
  locale:Locale,
  fallback=''
):string{
  const entry=bundle.strings[key];
  return entry?.[locale]??entry?.ru??fallback??key;
}

export function missingEnglishKeys(bundle:LocalizationBundle):string[]{
  return Object.entries(bundle.strings)
    .filter(([,entry])=>!entry.en)
    .map(([key])=>key)
    .sort();
}
