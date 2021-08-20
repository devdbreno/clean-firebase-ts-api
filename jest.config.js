module.exports = {
  roots: ['<rootDir>/src', '<rootDir>/test'],
  testMatch: ['**/*.spec.ts'],
  transform: {
    '\\.ts$': 'ts-jest'
  },
  setupFiles: ['dotenv/config'],
  clearMocks: true,
  coverageProvider: 'v8',
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  moduleNameMapper: {
    '@/(.+)': '<rootDir>/src/$1',
    '@/test/(.+)': '<rootDir>/test/$1'
  }
}
