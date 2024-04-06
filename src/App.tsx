import "./App.css"; // Assuming you have an App.css for any additional styles
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import IngredientsPage from "./Pages/IngredientsPage/IngredientsPage";
import RecipesPage from "./Pages/RecipesPage/RecipesPage";
import ATHeader from "./components/ATHeader/ATHeader";
import Example from "./components/ATSidebar";

const App = () => {
  const LayoutRoute = () => {
    return (
      <Layout
        header={<ATHeader />}
        sidebar={<Example />}
        content={<Outlet />}
        footer={<div>Footer</div>}
      />
    );
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutRoute />}>
          <Route path="/ingredients" element={<IngredientsPage />} />
          <Route path="/recipes" element={<RecipesPage />} />
          {/* More child routes can be added here */}
        </Route>
        {/* More parent routes can be added here */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
