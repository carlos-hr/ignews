import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { mocked } from "jest-mock";
import SignInButton from ".";

jest.mock("next-auth/react");

describe("SignInButton component", () => {
  test("SignInButton renders correctly when user not logged", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });
    render(<SignInButton />);

    expect(screen.getByText("Sign in with Github")).toBeInTheDocument();
  });

  test("SignInButton renders correctly when user logged", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: "John Doe",
          email: "john.doe@example.com",
        },
        expires: "fake-expires",
      },
      status: "authenticated",
    });
    render(<SignInButton />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});
