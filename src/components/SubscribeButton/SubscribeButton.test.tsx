import { render, screen, fireEvent } from "@testing-library/react";
import { signIn, useSession } from "next-auth/react";
import { mocked } from "jest-mock";
import { useRouter } from "next/router";
import SubscribeButton from ".";

jest.mock("next-auth/react");

jest.mock("next/router");

describe("SubscribeButton component", () => {
  test("SubscribeButton renders correctly", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });

    render(<SubscribeButton />);
    expect(screen.getByText("Subscribe now")).toBeInTheDocument();
  });

  test("SubscribeButton renders correctly when user not logged", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });

    render(<SubscribeButton />);

    const signInMocked = mocked(signIn);
    const subscribeButton = screen.getByText("Subscribe now");

    fireEvent.click(subscribeButton);

    expect(signInMocked).toHaveBeenCalled();
  });

  test("redirects to post when user already has subscription", () => {
    const useSessionMocked = mocked(useSession);
    const useRouterMocked = mocked(useRouter);

    const pushMock = jest.fn();
    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: "John Doe",
          email: "john.doe@example.com",
        },
        activeSubscription: "fake-teste",
        expires: "fake-expires",
      },
      status: "authenticated",
    });

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe now");

    fireEvent.click(subscribeButton);
    expect(pushMock).toHaveBeenCalledWith("/posts");
  });
});
