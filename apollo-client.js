import { split, HttpLink } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
import cookie from "cookie";

const wsLink = process.browser
  ? new WebSocketLink({
      // if you instantiate in the server, the error will be thrown
      uri: process.env.SUB_URL,
      options: {
        reconnect: true,
      },
    })
  : null;

const httpLink = new HttpLink({
  uri: process.env.API_URL,
  credentials: "same-origin",
});

const splitLink = process.browser
  ? split(
      //only create the split in the browser
      // split based on operation type
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === "OperationDefinition" && operation === "subscription";
      },
      wsLink,
      httpLink
    )
  : httpLink;

const authLink = setContext((_, { headers }) => {
  let cookies;

  //Server side
  if (headers) {
    cookies = cookie.parse(headers.cookie || "");
  }

  //Client side
  if (typeof window !== "undefined") {
    cookies = cookie.parse(document.cookie || "");
  }
  // const token = localStorage.getItem("token");
  const token = cookies && (cookies.token || "");

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  link: authLink.concat(splitLink),
  cache: new InMemoryCache(),
});

export default client;
