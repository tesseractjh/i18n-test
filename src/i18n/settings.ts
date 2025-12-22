export const fallbackLng = "en";
export const languages = ["ko", "en"] as const;
export type Locale = (typeof languages)[number];

export const namespaces = ["common", "docs"] as const;
export type Namespace = (typeof namespaces)[number];
export const defaultNS: Namespace = "common";

export const cookieName = "NEXT_LOCALE";

export function getOptions(
  lng: Locale = fallbackLng,
  ns: Namespace = defaultNS
) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
