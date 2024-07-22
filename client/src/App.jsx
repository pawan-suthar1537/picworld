import { BrowserRouter } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Gsap from "./components/Gsap";

import { Provider } from "react-redux";

import { store } from "../store/store.js";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Gsap />
          {/* <Footer /> */}
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
