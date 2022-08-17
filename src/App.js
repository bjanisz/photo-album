import { Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AllPhotos from "./pages/AllPhotos";
import Favourites from "./pages/Favourites";
import NewPhoto from "./pages/NewPhoto";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <AllPhotos />
        </Route>
        <Route path="/new-photo">
          <NewPhoto />
        </Route>
        <Route path="/favourites">
          <Favourites />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
  