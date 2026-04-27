import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import GioiThieu from './pages/GioiThieu'
import GangTayYTe from './pages/GangTayYTe'
import CaPheDetail from './pages/CaPheDetail'
import NongSan from './pages/NongSan'
import OEM from './pages/OEM'
import ChuoiCungUng from './pages/ChuoiCungUng'
import ChungNhan from './pages/ChungNhan'
import SanPham from './pages/SanPham'
import SanPhamDetail from './pages/SanPhamDetail'
import TinTuc from './pages/TinTuc'
import TinTucDetail from './pages/TinTucDetail'
import ThanKhongKhoi from './pages/ThanKhongKhoi'
import HoaHongSayLanh from './pages/HoaHongSayLanh'
import LienHe from './pages/LienHe'

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
            <Route path="/gang-tay-y-te" element={<GangTayYTe />} />
            <Route path="/ca-phe" element={<CaPheDetail />} />
            <Route path="/nong-san" element={<NongSan />} />
            <Route path="/oem" element={<OEM />} />
            <Route path="/chuoi-cung-ung" element={<ChuoiCungUng />} />
            <Route path="/chung-nhan" element={<ChungNhan />} />
            <Route path="/san-pham" element={<SanPham />} />
            <Route path="/san-pham/:slug" element={<SanPhamDetail />} />
            <Route path="/tin-tuc" element={<TinTuc />} />
            <Route path="/tin-tuc/:slug" element={<TinTucDetail />} />
            <Route path="/than-khong-khoi" element={<ThanKhongKhoi />} />
            <Route path="/hoa-hong-say-lanh" element={<HoaHongSayLanh />} />
            <Route path="/lien-he" element={<LienHe />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
