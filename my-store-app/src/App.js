import './App.css';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


// import { Routes, Route, } from "react-router-dom";
import ScrollToTop from './Components/scroll-to-top'
import Home from './containers/home'
import List from './containers/list'

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/list" element={<List />} />

      <Route
      path="*"
      element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      }
    />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
