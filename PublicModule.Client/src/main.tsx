import "./index.scss";
import { App } from "./App";
import ReactDOM from "react-dom/client";

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
