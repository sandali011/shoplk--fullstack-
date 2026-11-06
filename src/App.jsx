import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto py-8">
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;