import { Route, Routes } from "react-router-dom";
import CustomersPage from "../pages/CustomersPage/CustomersPage";
import LotsPage from "../pages/LotsPage/LotsPage";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/lots" element={<LotsPage />} />
      </Routes>
    </>
  );
};

export default AppRouter;
