import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ADDDETAILS from "./Components/AddDetails";
import DETAILSLIST from "./Components/DetailsList";
import EDITDETAILS from "./Components/EditDetails";
import Navbar from "./Components/Navbar";
import SignIn from "./Components/SignIn";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<SignIn />} />

        {/* Protected Routes */}
        <Route
          path="/add-details"
          element={
            <PrivateRoute>
              <ADDDETAILS />
            </PrivateRoute>
          }
        />
        <Route
          path="/details"
          element={
            <PrivateRoute>
              <DETAILSLIST />
            </PrivateRoute>
          }
        />
        <Route
        path="/edit-details/:id"
        element={
          <PrivateRoute>
            <EDITDETAILS />
          </PrivateRoute>
        }
      />
      </Routes>
    </Router>
  );
}

export default App;
