import { Outlet } from "react-router-dom";
import Navbar from "./SharedComponents/Navbar";
import Footer from "./SharedComponents/Footer";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
}

export default App;
