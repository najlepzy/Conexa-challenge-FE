module.exports = {
  preset: "jest-expo",

  setupFiles: ["<rootDir>/jest.setup.js"],
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],

  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
    "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "\\.(png|jpe?g|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  moduleDirectories: ["node_modules", "src"],

  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|" +
      "@react-native(-community)?|" +
      "expo(nent)?|" +
      "@expo(nent)?|" +
      "@reduxjs/toolkit|" +
      "react-redux" +
      ")",
  ],

  testPathIgnorePatterns: ["/node_modules/", "/android/"],

  collectCoverage: true,
  coverageProvider: "v8",
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*{types,interfaces,constants}.ts",
    "!src/**/index.{ts,tsx}",
    "!src/utils/translate/**",
  ],
};
