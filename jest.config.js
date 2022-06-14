module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
  modulePaths: ['<rootDir>/src/', '<rootDir>/.jest']
};
