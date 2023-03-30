import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { WorkOrders } from "../pages/WorkOrders";

export const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/workorders" element={<WorkOrders />} />
    </Routes>
  );
};
