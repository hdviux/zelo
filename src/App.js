import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn/SignIn";
import Home from "./components/Home/Home";
import Cookies from "./components/config/cookie";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={Cookies.get("token") ? <Home /> : <SignIn />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
