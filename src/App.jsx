import { Outlet } from "react-router-dom";
import Navbar from "./SharedComponents/Navbar";
import Footer from "./SharedComponents/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
      <ToastContainer />
    </>
  );
}

export default App;
