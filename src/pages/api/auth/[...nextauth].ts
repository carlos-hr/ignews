import { query as q } from "faunadb";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { fauna } from "../../../services/fauna";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "read:user",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const { email } = user;

      try {
        await fauna
          .query(
            q.Create(q.Collection("users"), {
              data: {
                email,
              },
            })
          )
          .then((ret) => console.log(ret))
          .catch((err) =>
            console.error(
              "Error: [%s] %s: %s",
              err.name,
              err.message,
              err.errors()[0].description
            )
          );

        return true;
      } catch (error) {
        return false;
      }
    },
  },
});
