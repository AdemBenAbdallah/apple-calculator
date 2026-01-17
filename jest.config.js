module.exports = {
	testEnvironment: "jsdom",
	roots: ["<rootDir>/tests", "<rootDir>/src"],
	testMatch: ["**/*.test.js", "**/*.test.ts"],
	moduleFileExtensions: ["js", "ts", "json"],
	collectCoverageFrom: ["src/**/*.{js,ts}"],
	coverageDirectory: "coverage",
	verbose: true,
	passWithNoTests: true,
};
