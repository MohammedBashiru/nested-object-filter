module.exports = {
 "roots": [
    "<rootDir>/tests"
  ],
  "testMatch": [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)?$": "ts-jest"
  },
  "notify": true,
  "notifyMode": "always",
  "collectCoverage": true,
  "collectCoverageFrom": [
    "lib/index.js",
    "!**/node_modules/**"
  ],
  "coverageThreshold": {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 80,
      "statements": -10
    }
  },
  "verbose": true
}