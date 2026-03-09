import type { StorybookConfig } from "@storybook/nextjs-vite";
import { readFileSync } from "fs";
import { join } from "path";

const managerHeadHtml = readFileSync(
  join(__dirname, "manager-head.html"),
  "utf-8"
);

const config: StorybookConfig = {
  managerHead: (head) => `${head}\n${managerHeadHtml}`,
  stories: [
    "../registry/**/*.mdx",
    "../registry/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  staticDirs: ["../public"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
    "storybook-addon-test-codegen",
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  docs: {},
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
};
export default config;
