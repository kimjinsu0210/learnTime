import Footer from "components/footer/Footer";
import Header from "components/header/Header";
import Category from "pages/Category";
import Details from "pages/Details";
import Home from "pages/Home";
import MyPage from "pages/MyPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="details/:id" element={<Details />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/category" element={<Category />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
