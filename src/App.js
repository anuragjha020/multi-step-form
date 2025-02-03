import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import MultiStepForm from "./components/MultiStepForm";
import PageNotFound from "./components/PageNotFound";
import SuccessPage from "./components/SuccessPage";


function App() {
  return (
    <div>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user-form" element={<MultiStepForm />} />
            <Route path="/form-success" element={<SuccessPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
