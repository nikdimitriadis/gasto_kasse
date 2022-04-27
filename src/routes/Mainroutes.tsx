import { Routes, Route } from "react-router";
import Barista from "../pages/Barista";
import AdminLog from "../pages/AdminLog";
import AllCat from '../pages/AllCat'
import DetailsCat from "../pages/DetailsCat";
import EmpLog from "../pages/EmpLog";
import History from "../pages/History";
import MainPage from "../pages/MainPage";


export default function Mainroutes() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} >
        <Route path="/" element={<AllCat />} />
        <Route path="/home/:cat" element={<DetailsCat />} />
      </Route>
      <Route path="/history" element={<History />} />
      <Route path="/employe" element={<EmpLog />} />
      <Route path="/admin" element={<AdminLog />} />
      <Route path="/barista" element={<Barista />} />
    </Routes>
  )
}
