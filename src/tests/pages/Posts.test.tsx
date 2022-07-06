import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import { getPrismicClient } from "../../services/prismic";
import Posts, { getStaticProps } from "../../pages/posts";

const posts = [
  {
    slug: "fake-slug",
    title: "fake-title",
    excerpt: "fake-excerpt",
    updatedAt: "fake-date",
  },
];

jest.mock("next-auth/react", () => {
  return {
    useSession: () => [null, false],
  };
});
jest.mock("../../services/prismic");

describe("Posts page", () => {
  test("renders correctly", () => {
    render(<Posts posts={posts} />);

    expect(screen.getByText("fake-title")).toBeInTheDocument();
  });

  test("loads initial data", async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: "fake-slug",
            data: {
              Title: [
                {
                  type: "heading",
                  text: "my text",
                },
              ],
              Content: [
                {
                  type: "paragraph",
                  text: "my content",
                },
              ],
            },
            last_publication_date: "04-02-2022",
          },
        ],
      }),
    } as any);

    const response = await getStaticProps({});
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: "fake-slug",
              title: "my text",
              excerpt: "my content",
              updatedAt: "02 de abril de 2022",
            },
          ],
        },
      })
    );
  });
});
