import { Fragment, Suspense } from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import theme from "./theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routing from "./Routing";

const autoClose= 3000

function App() {
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<Fragment />}>
          <Switch>
            <Route>
              <ToastContainer
                position="top-right"
                autoClose={autoClose}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
              <Routing />
            </Route>
          </Switch>
        </Suspense>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;