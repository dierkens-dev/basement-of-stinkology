import type { ComponentBindsConfig, GenericObject } from "vee-validate";

export const componentBindsConfig: Partial<
  ComponentBindsConfig<string, GenericObject, "value">
> = {
  model: "value",
  mapProps: ({ errors }) => ({ errors }),
};
