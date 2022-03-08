import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as Page from "pages";
import * as Comp from "components";

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Comp.NavBar />
        <Routes>
          <Route path="/" element={<Page.HomePage />} />
          <Route path="/tags" element={<Page.TagsPage />} />
          <Route path="/results" element={<Page.ResultsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
