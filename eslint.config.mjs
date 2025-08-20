import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // Allow `any` types
      "@typescript-eslint/no-unused-vars": "warn", // Show unused vars as warnings, not errors
      "import/no-anonymous-default-export": "off", // Ignore anonymous exports
      "prefer-const": "off", // Disable prefer-const rule
    },
  },
];

export default eslintConfig;
