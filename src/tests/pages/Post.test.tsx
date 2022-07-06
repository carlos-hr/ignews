import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import { getPrismicClient } from "../../services/prismic";
import Post, { getServerSideProps } from "../../pages/posts/[slug]";
import { getSession } from "next-auth/react";

const post = {
  slug: "fake-slug",
  title: "fake-title",
  content: "fake-content",
  updatedAt: "04-02-2022",
};

jest.mock("next/router");
jest.mock("next-auth/react");
jest.mock("../../services/prismic");

describe("Post page", () => {
  test("renders correctly", () => {
    render(<Post post={post} />);

    expect(screen.getByText("fake-title")).toBeInTheDocument();
    expect(screen.getByText("fake-content")).toBeInTheDocument();
  });

  test("redirects user if no subscription is found", async () => {
    const getSessionMocked = mocked(getSession);

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: null,
    } as any);

    const response = await getServerSideProps({
      params: { slug: "fake-slug" },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: "/",
          permanent: false,
        }),
      })
    );
  });

  test("loads initial data", async () => {
    const getSessionMocked = mocked(getSession);
    const getPrismicClientMocked = mocked(getPrismicClient);

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: "fake-subscription",
    } as any);

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
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

    const response = await getServerSideProps({
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
