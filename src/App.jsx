import Header from "./Header";
import Footer from "./Footer";
import {Outlet} from "react-router-dom"

import "./styles/App.css";

function App() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
