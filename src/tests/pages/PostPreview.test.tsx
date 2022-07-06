import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import { getPrismicClient } from "../../services/prismic";
import Post, { getStaticProps } from "../../pages/posts/preview/[slug]";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const post = {
  slug: "fake-slug",
  title: "fake-title",
  content: "<p>fake-content</p>",
  updatedAt: "04-02-2022",
};

jest.mock("next/router");
jest.mock("next-auth/react");
jest.mock("../../services/prismic");

describe("Post page", () => {
  test("renders correctly", () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });

    render(<Post post={post} />);

    expect(screen.getByText("fake-title")).toBeInTheDocument();
    expect(screen.getByText("fake-content")).toBeInTheDocument();
    expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument();
  });

  test("shows post if user is subscribed", () => {
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

    render(<Post post={post} />);

    expect(pushMock).toHaveBeenCalledWith("/posts/fake-slug");
  });

  test("loads initial data", async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockReturnValueOnce({
        data: {
          Title: [
            {
              type: "heading",
              text: "fake-title",
            },
          ],
          Content: [
            {
              type: "paragraph",
              text: "fake-content",
            },
          ],
        },
        last_publication_date: "04-02-2022",
      }),
    } as any);

    const response = await getStaticProps({
      params: { slug: "fake-slug" },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: "fake-slug",
            title: "fake-title",
            content: "<p>fake-content</p>",
            updatedAt: "02 de abril de 2022",
          },
        },
      })
    );
  });
});
