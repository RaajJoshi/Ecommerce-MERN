import './App.css';
import Header from "./component/Header.js";
import Footer from "./component/Footer.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from './Pages/About.js';
import Home from './Pages/Home';
import RegisterF from './Pages/RegisterF';
// import { initialState, reducer } from './component/UseReducer';
// import { createContext, useReducer } from 'react';
// export const UserContext = createContext();

function App() {

  //const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
    {/*<UserContext.Provider value={{ state, dispatch }}>*/}
      <Router>
        <Header />
        <Routes>
          <Route extact path="/" element={<Home />} />
          <Route extact path="/about" element={<About />} />
          <Route extact path="/register" element={<RegisterF />} />
        </Routes>
        <Footer />
      </Router>
    {/*</UserContext.Provider>*/}
    </>
  );
}

export default App;
