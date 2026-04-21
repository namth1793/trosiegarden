import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import GioiThieu from './pages/GioiThieu'
import SanPham from './pages/SanPham'
import SanPhamDetail from './pages/SanPhamDetail'
import TinTuc from './pages/TinTuc'
import TinTucDetail from './pages/TinTucDetail'
import LienHe from './pages/LienHe'
import CongNghe from './pages/CongNghe'
import QuanHeCoDong from './pages/QuanHeCoDong'
import CacToChucTaiChinh from './pages/CacToChucTaiChinh'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gioi-thieu" element={<GioiThieu />} />
            <Route path="/san-pham" element={<SanPham />} />
            <Route path="/san-pham/:slug" element={<SanPhamDetail />} />
            <Route path="/cong-nghe" element={<CongNghe />} />
            <Route path="/cac-to-chuc-tai-chinh" element={<CacToChucTaiChinh />} />
            <Route path="/quan-he-co-dong" element={<QuanHeCoDong />} />
            <Route path="/tin-tuc" element={<TinTuc />} />
            <Route path="/tin-tuc/:slug" element={<TinTucDetail />} />
            <Route path="/lien-he" element={<LienHe />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
