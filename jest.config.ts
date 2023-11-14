module.exports = {
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest", // Transform JavaScript and TypeScript files
  },
  moduleNameMapper: {
    "\\.(svg)$": "<rootDir>/__mocks__/fileMock.ts",
  },
  testEnvironment: "jsdom",
};
