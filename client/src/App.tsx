
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import GameDashboard from "./components/GameDashboard.tsx";

function App() {

  return (
   <BrowserRouter>
     <Routes>
       <Route path={"/"} element={<GameDashboard/>}></Route>
     </Routes>
   </BrowserRouter>
  )
}

export default App
