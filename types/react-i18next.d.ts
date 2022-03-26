import { DEFAULT_NAMESPACE, ResourceType } from "../src/i18n";

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof DEFAULT_NAMESPACE;
    resources: ResourceType;
  }
}
