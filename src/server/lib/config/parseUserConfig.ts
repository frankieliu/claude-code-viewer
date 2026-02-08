import { userConfigSchema } from "./config";

export const parseUserConfig = (configJson: string | undefined) => {
  const parsed = (() => {
    try {
      const jsonObj = JSON.parse(configJson ?? "{}");
      return userConfigSchema.parse(jsonObj);
    } catch (error) {
      console.error("Error parsing user config:", error);
      console.error("Config JSON:", configJson);
      return userConfigSchema.parse({});
    }
  })();

  return parsed;
};
