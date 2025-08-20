import type { BackendModule, ResourceKey } from "i18next";

import type { AssertAllEqual } from "~/utils/types";

// (*)
import type defaultEn from "../../public/locales/en/default.json";
import type defaultKa from "../../public/locales/ka/default.json";
import type defaultRu from "../../public/locales/ru/default.json";

// To add a language add code in the list, namespace jsons, import at (*) and verification at (**)
export type Language = "en" | "ru" | "ka";
export const baseLanguage = "en";
export const languages: Record<Language, true> = {
  en: true,
  ru: true,
  ka: true,
};

// To add a namespace add name in the list, namespace json, import at (*) and verification at (**)
export type Namespace = "default";
export const defaultNamespace: Namespace = "default";
export const namespaces: Record<Namespace, true> = {
  default: true,
};

export type Resources = {
  default: typeof defaultEn;
};

type ValidatedResources = AssertAllEqual<
  // (**)
  [
    Resources,
    {
      default: typeof defaultRu;
    },
    {
      default: typeof defaultKa;
    },
  ]
>;

declare module "i18next" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface CustomTypeOptions {
    defaultNS: "default";
    resources: ValidatedResources extends never ? never : Resources;
  }
}

export const getBackendModule = (): BackendModule => ({
  type: "backend",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init: () => {},
  read: async (language, namespace) => {
    try {
      const response = await fetch(`/locales/${language}/${namespace}.json`);
      return await (response.json() as Promise<ResourceKey>);
    } catch (e) {
      console.error(`Failed to load ${language}/${namespace} i18n translation`);
      throw e;
    }
  },
});
