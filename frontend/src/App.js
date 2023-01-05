import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Books from "./components/Books";

function App() {
  return (
    <Router>
      <Routes>
      <Route exact path='/' element={<Books />} />
      {/* <Route exact path="book/:id" component= */}
      </Routes> 
    </Router>
  );
}

export default App;
