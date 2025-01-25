import { render, screen } from "@testing-library/react";
import App from "./App";

// Mocking the Header and RegistrationForm components with simple div elements
jest.mock("./components/common/head/Header", () => () => (
  <div data-testid="header">Header Component</div>
));

jest.mock("./components/register/RegistrationForm", () => () => (
  <div data-testid="registration-form">RegistrationForm Component</div>
));

describe("App Component", () => {
  test("renders Header and RegistrationForm components", () => {
    render(<App />);
    
    // Check if Header component is rendered
    expect(screen.getByTestId("header")).toBeInTheDocument();
    
    // Check if RegistrationForm component is rendered
    expect(screen.getByTestId("registration-form")).toBeInTheDocument();
  });
});
