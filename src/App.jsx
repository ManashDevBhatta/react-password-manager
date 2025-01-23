import "./App.css";
import Footer from "./components/Footer";
import Manager from "./components/Manager";
import Navbar from "./components/Navbar";
function App() {
  return (
    <>
      <Navbar />
      <div className="bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
        <Manager />
      </div>
      <Footer />
    </>
  );
}

export default App;
