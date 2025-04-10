export default {
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "\\.{css|less|scss|sass}$": "identity-obj-proxy",
        "\\.svg$": "<rootDir>/__mocks__/svgMock.js"
    },
    setupFilesAfterEnv: [
        "@testing-library/jest-dom"
    ],
    transform: {
        "^.+\\.[jt]sx?$": "babel-jest"
    }
}
