import { BrowserRouter } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Gsap from "./components/Gsap";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Gsap />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
