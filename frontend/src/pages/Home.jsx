import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const productGrid = [
  {
    name: 'ARABICA',
    slug: 'ca-phe-arabica',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&q=80',
  },
  {
    name: 'ROBUSTA',
    slug: 'ca-phe-robusta',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&q=80',
  },
  {
    name: 'ĐẶC SẢN',
    slug: 'ca-phe-dac-san',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80',
  },
  {
    name: 'CÀ PHÊ XAY',
    slug: 'ca-phe-xay',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&q=80',
  },
  {
    name: 'HÒA TAN',
    slug: 'ca-phe-hoa-tan',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80',
  },
  {
    name: 'NHÂN XANH',
    slug: 'ca-phe-nhan-xanh',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&q=80',
  },
  {
    name: 'CASCARA',
    slug: 'cascara',
    image: 'https://images.unsplash.com/photo-1518057111178-44a106bad636?w=400&q=80',
  },
  {
    name: 'CÀ PHÊ CHỒN',
    slug: 'ca-phe-chon',
    image: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?w=400&q=80',
  },
]

const congNgheLinks = [
  { label: 'Công nghệ chế biến ướt (Washed)', to: '/cong-nghe#che-bien-uot' },
  { label: 'Công nghệ chế biến khô (Natural)', to: '/cong-nghe#che-bien-kho' },
  { label: 'Công nghệ rang xay cà phê', to: '/cong-nghe#rang-xay' },
]

const banksLogos = [
  { name: 'TP Bank', color: '#9e1b32', abbr: 'TP\nBank' },
  { name: 'Techcombank', color: '#e31837', abbr: 'TECH\nCOM' },
  { name: 'Vietcombank', color: '#007a3d', abbr: 'VCB' },
  { name: 'Ocean Bank', color: '#003087', abbr: 'OCEAN\nBANK' },
  { name: 'BIDV', color: '#005bac', abbr: 'BIDV' },
  { name: 'Agribank', color: '#e31837', abbr: 'AGRI\nBANK' },
  { name: 'Viettin Bank', color: '#005bac', abbr: 'Viettin' },
  { name: 'inBank', color: '#333', abbr: 'in\nBank' },
]

const activityImages = [
  {
    label: 'Tin tức',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&q=80',
    link: '/tin-tuc'
  },
  {
    label: 'Nhà Máy',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80',
    link: '/gioi-thieu'
  },
  {
    label: 'Sản phẩm',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&q=80',
    link: '/san-pham'
  },
]

const bannersFallback = [
  { image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&q=80', link: '/san-pham' },
  { image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1600&q=80', link: '/san-pham/ca-phe-arabica' },
  { image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1600&q=80', link: '/san-pham/ca-phe-dac-san' },
  { image: 'https://images.unsplash.com/photo-1518057111178-44a106bad636?w=1600&q=80', link: '/san-pham/cascara' },
  { image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=1600&q=80', link: '/san-pham/ca-phe-nhan-xanh' },
]

export default function Home() {
  const [banners, setBanners] = useState(bannersFallback)
  const [news, setNews] = useState([])

  useEffect(() => {
    axios.get('/api/banners').then(r => r.data.length && setBanners(r.data)).catch(() => {})
    axios.get('/api/news?limit=3').then(r => setNews(r.data)).catch(() => {})
  }, [])

  const formatDate = (d) => new Date(d).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })

  return (
    <div className="bg-white">
      {/* ===== HERO SLIDER ===== */}
      <section className="w-full">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          loop
          className="w-full"
          style={{ height: '420px' }}
        >
          {banners.map((b, i) => (
            <SwiperSlide key={i}>
              <Link to={b.link || '/san-pham'} className="block w-full h-full">
                <img
                  src={b.image}
                  alt={`Banner ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ===== PRODUCT GRID 4×2 ===== */}
      <section className="max-w-[1200px] mx-auto px-4 py-6">
        <div className="grid grid-cols-4 gap-1">
          {productGrid.map((p) => (
            <Link
              key={p.slug}
              to={`/san-pham/${p.slug}`}
              className="product-card relative overflow-hidden group block"
              style={{ aspectRatio: '1/0.75' }}
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
              />
              <div className="product-overlay absolute inset-0 bg-black/30 transition-colors duration-300 flex items-end">
                <span className="text-white font-bold text-sm px-3 py-2 w-full bg-gradient-to-t from-black/60 to-transparent">
                  {p.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== 3-COLUMN: CÔNG NGHỆ | TIN TỨC | VIDEO ===== */}
      <section className="max-w-[1200px] mx-auto px-4 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Công nghệ */}
          <div>
            <h2 className="section-heading">CÔNG NGHỆ</h2>
            <div className="mb-3">
              <Link to="/cong-nghe">
                <img
                  src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&q=80"
                  alt="Công nghệ"
                  className="w-full h-40 object-cover hover:opacity-90 transition-opacity"
                />
              </Link>
            </div>
            <ul className="space-y-2">
              {congNgheLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="news-link text-gray-700 hover:text-[#6B2200] text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tin tức */}
          <div>
            <h2 className="section-heading">TIN TỨC</h2>
            <div className="mb-3">
              <Link to="/tin-tuc">
                <img
                  src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&q=80"
                  alt="Tin tức"
                  className="w-full h-40 object-cover hover:opacity-90 transition-opacity"
                />
              </Link>
            </div>
            <ul className="space-y-2">
              {news.slice(0, 3).map((item) => (
                <li key={item.id}>
                  <Link to={`/tin-tuc/${item.slug}`} className="news-link text-gray-700 hover:text-[#6B2200] text-sm transition-colors line-clamp-1">
                    {item.title}
                  </Link>
                </li>
              ))}
              {news.length === 0 && (
                <>
                  <li><span className="news-link text-gray-500 text-sm">Giá cà phê Robusta tăng kỷ lục 30 năm</span></li>
                  <li><span className="news-link text-gray-500 text-sm">Specialty Coffee Việt Nam tại Nhật Bản</span></li>
                  <li><span className="news-link text-gray-500 text-sm">Trosie Garden tại SCA Expo 2024</span></li>
                </>
              )}
            </ul>
          </div>

          {/* Video */}
          <div>
            <h2 className="section-heading">VIDEO</h2>
            <div className="relative bg-black" style={{ aspectRatio: '16/9' }}>
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0"
                title="Trosie Garden Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
              <span className="text-red-600 font-semibold">▶</span>
              <span>Phóng Sự: Cà phê Specialty Việt Nam ra thế giới</span>
            </div>
            <div className="text-xs text-gray-400">Báo Nhân Dân</div>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-2 text-xs text-gray-600 hover:text-red-600 transition-colors"
            >
              <span>Xem trên</span>
              <span className="font-bold text-red-600">▶ YouTube</span>
            </a>
          </div>
        </div>
      </section>

      {/* ===== HÌNH ẢNH HOẠT ĐỘNG + KẾT NỐI ===== */}
      <section className="max-w-[1200px] mx-auto px-4 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Hình ảnh hoạt động */}
          <div>
            <h2 className="section-heading">HÌNH ẢNH HOẠT ĐỘNG</h2>
            <div className="grid grid-cols-3 gap-2">
              {activityImages.map((img) => (
                <Link key={img.label} to={img.link} className="group block text-center">
                  <div className="overflow-hidden mb-1">
                    <img
                      src={img.image}
                      alt={img.label}
                      className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-xs text-gray-600 group-hover:text-[#6B2200] transition-colors">{img.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Kết nối với chúng tôi */}
          <div>
            <h2 className="section-heading">KẾT NỐI VỚI CHÚNG TÔI</h2>
            <div className="bg-gray-50 border border-gray-200 p-4 h-36 flex items-center justify-center">
              <p className="text-[#6B2200] font-bold text-center text-base leading-relaxed">
                CÔNG TY TNHH XUẤT NHẬP KHẨU VÀ THƯƠNG MẠI TROSIE
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BANK LOGOS ===== */}
      <section className="border-t border-b border-gray-200 py-5 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {/* TP Bank */}
            <div className="flex items-center gap-1">
              <div className="w-8 h-8 bg-[#9e1b32] rounded flex items-center justify-center">
                <span className="text-white text-[8px] font-black leading-none text-center">TP</span>
              </div>
              <span className="text-[#9e1b32] font-black text-sm">Bank</span>
            </div>

            {/* Techcombank */}
            <div className="flex items-center gap-1">
              <div className="w-8 h-5 bg-[#e31837] flex items-center justify-center rounded-sm">
                <span className="text-white text-[7px] font-black leading-none">TECH</span>
              </div>
              <span className="text-[#e31837] font-bold text-xs">COMBANK</span>
              <span className="text-gray-400 text-[8px]">◆◆</span>
            </div>

            {/* Vietcombank */}
            <div className="flex items-center gap-1">
              <div className="w-7 h-7 bg-[#007a3d] rounded-full flex items-center justify-center">
                <span className="text-white text-[7px] font-bold">VCB</span>
              </div>
              <span className="text-[#007a3d] font-bold text-xs">Vietcombank</span>
            </div>

            {/* Ocean Bank */}
            <div className="flex items-center gap-1">
              <div className="w-7 h-7 bg-[#003087] rounded-full flex items-center justify-center">
                <span className="text-white text-[6px] font-bold leading-none text-center">OB</span>
              </div>
              <span className="text-[#003087] font-bold text-xs">OCEAN BANK</span>
            </div>

            {/* BIDV */}
            <div className="flex items-center gap-1">
              <div className="w-7 h-7 bg-[#005bac] rounded flex items-center justify-center">
                <span className="text-white text-[7px] font-black">B</span>
              </div>
              <span className="text-[#e31837] font-black text-sm">BIDV</span>
              <span className="text-blue-600 text-[8px]">◆</span>
            </div>

            {/* Agribank */}
            <div className="flex items-center gap-1">
              <div className="w-7 h-7 bg-[#e31837] rounded flex items-center justify-center">
                <span className="text-white text-[6px] font-bold">AGR</span>
              </div>
              <span className="text-[#e31837] font-bold text-xs">Agribank</span>
            </div>

            {/* Viettin */}
            <div className="flex items-center gap-1">
              <div className="w-7 h-7 bg-[#005bac] rounded flex items-center justify-center">
                <span className="text-white text-[6px] font-bold">VTB</span>
              </div>
              <span className="text-[#005bac] font-bold text-xs">Viettin</span>
            </div>

            {/* inBank */}
            <div className="flex items-center gap-1 bg-gray-800 px-2 py-1 rounded">
              <span className="text-white font-bold text-xs">in</span>
              <span className="text-white font-bold text-xs">Bank</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
