import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "pages/Home";
import Details from "pages/Details";
import MyPage from "pages/MyPage";
import Category from "pages/Category";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";


const Router: React.FC = () => {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="details/:id" element={<Details />} />
    <Route path="/mypage" element={<MyPage />} />
    <Route path="/:category" element={<Category />} />
    </Routes>
    <Footer />
    </BrowserRouter>
  )
}

export default Router