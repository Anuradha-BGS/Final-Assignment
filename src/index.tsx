import ReactDOM from "react-dom";
import { Provider } from "./shared/config/context";

import App from "./App";

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById("root")
);


