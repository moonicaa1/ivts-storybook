import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import storybook from "eslint-plugin-storybook";

const eslintConfig = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  ...nextCoreWebVitals,
  ...storybook.configs["flat/recommended"],
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "react-hooks/purity": "warn",
    },
  },
  // registry/docs, registry/page: 허용된 컴포넌트·토큰만 사용
  {
    files: ["registry/docs/**/*.tsx", "registry/page/**/*.tsx"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["radix-ui", "@radix-ui/*"],
              message:
                "Use @/bases/radix/components/ui/* instead of direct Radix imports",
            },
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
