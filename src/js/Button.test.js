import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Button } from "./GlobalStyledComponents";

describe("Testing for Button rendering", () => {
    it("Rendering Button without any parameter", () => {
        render(<Button>This is a button</Button>);

        const button = screen.getByText("This is a button");

        expect(button).toHaveStyle("background-color: white");
        expect(button).toHaveStyle("color: black");
    });
    it("Rendering Button with only background-color parameter", () => {
        render(<Button $background="#5AD07A">This is a button</Button>);

        const button = screen.getByText("This is a button");

        expect(button).toHaveStyle("background-color: #5AD07A");
        expect(button).toHaveStyle("color: black");
    });
    it("Rendering Button with only color parameter", () => {
        render(<Button $color="#5AD07A">This is a button</Button>);

        const button = screen.getByText("This is a button");

        expect(button).toHaveStyle("background-color: white");
        expect(button).toHaveStyle("color: #5AD07A");
    });
    it("Rendering Button with both background-color and color parameter", () => {
        render(<Button $background="tomato" $color="#5AD07A">This is a button</Button>);

        const button = screen.getByText("This is a button");

        expect(button).toHaveStyle("background-color: tomato");
        expect(button).toHaveStyle("color: #5AD07A");
    });
    it("Rendering Button with invalid value (undefined) for background-color", () => {
        render(<Button $background={undefined}>This is a button</Button>);

        const button = screen.getByText("This is a button");

        expect(button).toHaveStyle("background-color: white");
    });
    it("Rendering Button with invalid value (null) for background-color", () => {
        render(<Button $background={null}>This is a button</Button>);

        const button = screen.getByText("This is a button");

        expect(button).toHaveStyle("background-color: white");
    });
    it("Rendering Button with invalid value (boolean) for background-color", () => {
        render(<Button $background={true}>This is a button</Button>);

        const button = screen.getByText("This is a button");

        expect(button).toHaveStyle("background-color: white");
    });
    it("Rendering Button with invalid value (integer) for background-color", () => {
        render(<Button $background={1234}>This is a button</Button>);

        const button = screen.getByText("This is a button");

        expect(button).toHaveStyle("background-color: white");
    });
    it("Rendering Button with invalid value (string) for background-color", () => {
        render(<Button $background={"This is a color"}>This is a button</Button>);

        const button = screen.getByText("This is a button");

        expect(button).toHaveStyle("background-color: ButtonFace");
    });
});