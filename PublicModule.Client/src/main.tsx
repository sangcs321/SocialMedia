import "./index.scss";
import { App } from "./App";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "store/configureStore";

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}
