import "i18next";
import common from "./locales/ko/common.json";
import docs from "./locales/ko/docs.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: typeof common;
      docs: typeof docs;
    };
  }
}
