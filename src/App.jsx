import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import MatchDetail from "./components/MatchDetail";
import Navbar from "./components/Navbar";
import PointsTable from "./components/PointsTable";
import News from "./components/News";
function App() {
  return (
    <div className=" max-w-screen  min-h-screen mx-auto">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/pointsTable" element={<PointsTable/>}></Route>
          <Route path="/matchdetail/:id" element={<MatchDetail />}></Route>
          <Route path="/news" element={<News />}></Route>
        </Route>

      </Routes>
    </div>
  );
}

export default App;
