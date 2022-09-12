import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Eula from "./pages/Eula";

const Routing = () => {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/eula" component={Eula} exact />
    </Switch>
  );
};

export default Routing;
