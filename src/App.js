import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import About from "./pages/About";
import Images from "./pages/Images";
import Weather from "./pages/Weather";
import "./globalStyles.scss";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/About" />} />
        <Route path="/About" index element={<About />} />
        <Route path="/Images" element={<Images />} />
        <Route path="/Weather" element={<Weather />} />
      </Routes>
    </Router>
  );
}

export default App;
