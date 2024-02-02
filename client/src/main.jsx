import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./index.css";

const cache = new InMemoryCache({});

const client = new ApolloClient({
  cache,
  uri: "http://localhost:3001/graphql",

  resolvers: {},
});

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>

);
