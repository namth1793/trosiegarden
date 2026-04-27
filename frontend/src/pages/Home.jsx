import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { FiArrowRight, FiCheck } from 'react-icons/fi'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const bannersFallback = [
  { image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1600&q=80', link: '/gang-tay-y-te' },
  { image: 'https://images.unsplash.com/photo-1663125365404-e274869480f6?w=1600&q=80', link: '/ca-phe' },
  { image: 'https://images.unsplash.com/photo-1770124129809-fe1fe6b7c23e?w=1600&q=80', link: '/nong-san' },
]

const productCategories = [
  {
    name: 'Găng Tay Y Tế',
    desc: 'Giải pháp bảo hộ cho y tế, thực phẩm và công nghiệp',
    image: 'https://images.unsplash.com/photo-1599412227383-b7d4751c8765?w=600&q=80',
    to: '/gang-tay-y-te',
    icon: '🧤',
  },
  {
    name: 'Cà Phê',
    desc: 'Arabica & Robusta từ Khe Sanh',
    image: 'https://images.unsplash.com/photo-1672570050756-4f1953bde478?w=600&q=80',
    to: '/ca-phe',
    icon: '☕',
  },
  {
    name: 'Nông Sản',
    desc: 'Trái cây tươi & sấy xuất khẩu',
    image: 'https://images.unsplash.com/photo-1762884601729-0eeeafbdfb8a?w=600&q=80',
    to: '/nong-san',
    icon: '🌿',
  },
  {
    name: 'Than Không Khói',
    desc: 'Cháy lâu 2–4h, phù hợp BBQ, shisha & nhà hàng',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    to: '/than-khong-khoi',
    icon: '🔥',
  },
  {
    name: 'Hoa Hồng Sấy Lạnh',
    desc: 'Giữ màu tự nhiên, phù hợp quà tặng, decor & OEM',
    image: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=600&q=80',
    to: '/hoa-hong-say-lanh',
    icon: '🌹',
  },
]

const whyChooseUs = [
  { icon: '🏭', label: 'Nguồn hàng trực tiếp' },
  { icon: '💰', label: 'Giá cạnh tranh' },
  { icon: '📦', label: 'Cung ứng ổn định' },
  { icon: '🏷️', label: 'OEM / thương hiệu riêng' },
  { icon: '⚡', label: 'Phản hồi trong 24h' },
]

const activityImages = [
  { label: 'Tin tức', image: 'https://images.unsplash.com/photo-1663125365404-e274869480f6?w=400&q=80', link: '/tin-tuc' },
  { label: 'Nhà Máy & Nông Trại', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80', link: '/gioi-thieu' },
  { label: 'Sản phẩm', image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&q=80', link: '/gang-tay-y-te' },
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
      {/* ===== HERO SLIDER WITH TEXT OVERLAY ===== */}
      <section className="w-full relative">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          loop
          className="w-full"
          style={{ height: '520px' }}
        >
          {banners.map((b, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-full">
                <img
                  src={b.image}
                  alt={`Banner ${i + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                  <h1 className="hero-title text-white text-3xl md:text-5xl mb-5 max-w-4xl">
                    Xuất khẩu găng tay y tế, cà phê &amp; nông sản Việt Nam ra toàn cầu
                  </h1>
                  <p className="hero-desc text-gray-200 text-base md:text-lg max-w-2xl mb-8">
                    Trosie Global là đối tác xuất khẩu uy tín từ Việt Nam, cung cấp sản phẩm chất lượng cao với giá cạnh tranh và giao hàng nhanh chóng đến thị trường quốc tế.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Link
                      to="/lien-he"
                      className="bg-[#6B2200] hover:bg-[#4A1800] text-white font-bold px-8 py-3 transition-colors inline-flex items-center gap-2"
                    >
                      Nhận báo giá ngay <FiArrowRight />
                    </Link>
                    <Link
                      to="/lien-he"
                      className="bg-white hover:bg-gray-100 text-[#6B2200] font-bold px-8 py-3 border-2 border-white transition-colors"
                    >
                      Liên hệ ngay
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ===== GIỚI THIỆU NHANH ===== */}
      <section className="bg-[#6B2200] py-8">
        <div className="max-w-[1200px] mx-auto px-4 text-center">
          <p className="text-white text-lg leading-relaxed max-w-3xl mx-auto">
            Chúng tôi chuyên cung cấp <strong>găng tay y tế, cà phê và nông sản Việt Nam</strong>, kết nối trực tiếp nhà máy và nông trại với khách hàng toàn cầu.
          </p>
        </div>
      </section>

      {/* ===== DANH MỤC SẢN PHẨM ===== */}
      <section className="max-w-[1200px] mx-auto px-4 py-12">
        <h2 className="section-heading center text-center mb-8">DANH MỤC SẢN PHẨM</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          {productCategories.slice(0, 3).map((cat) => (
            <Link
              key={cat.to}
              to={cat.to}
              className="group block overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="relative overflow-hidden" style={{ height: '220px' }}>
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
                <div className="absolute top-4 left-4 text-4xl">{cat.icon}</div>
              </div>
              <div className="p-5 bg-white">
                <h3 className="font-black text-[#6B2200] text-xl mb-2">{cat.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{cat.desc}</p>
                <span className="text-[#6B2200] text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Xem chi tiết <FiArrowRight />
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:w-2/3 md:mx-auto">
          {productCategories.slice(3).map((cat) => (
            <Link
              key={cat.to}
              to={cat.to}
              className="group block overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="relative overflow-hidden" style={{ height: '220px' }}>
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
                <div className="absolute top-4 left-4 text-4xl">{cat.icon}</div>
              </div>
              <div className="p-5 bg-white">
                <h3 className="font-black text-[#6B2200] text-xl mb-2">{cat.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{cat.desc}</p>
                <span className="text-[#6B2200] text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Xem chi tiết <FiArrowRight />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== LÝ DO CHỌN CHÚNG TÔI ===== */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-[1200px] mx-auto px-4">
          <h2 className="section-heading center text-center mb-8">TẠI SAO CHỌN TROSIE GLOBAL?</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {whyChooseUs.map((item, i) => (
              <div key={i} className="bg-white border border-gray-200 p-5 text-center hover:border-[#6B2200] hover:shadow-md transition-all">
                <div className="text-4xl mb-3">{item.icon}</div>
                <p className="font-bold text-gray-800 text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TIN TỨC + VIDEO ===== */}
      <section className="max-w-[1200px] mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tin tức */}
          <div>
            <h2 className="section-heading">TIN TỨC</h2>
            <div className="mb-3">
              <Link to="/tin-tuc">
                <img
                  src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80"
                  alt="Tin tức"
                  className="w-full h-44 object-cover hover:opacity-90 transition-opacity"
                />
              </Link>
            </div>
            <ul className="space-y-2">
              {news.slice(0, 4).map((item) => (
                <li key={item.id} className="flex items-start gap-2">
                  <FiCheck className="text-[#6B2200] shrink-0 mt-0.5" size={14} />
                  <Link to={`/tin-tuc/${item.slug}`} className="news-link text-gray-700 hover:text-[#6B2200] text-sm transition-colors line-clamp-1">
                    {item.title}
                  </Link>
                </li>
              ))}
              {news.length === 0 && (
                <>
                  <li className="flex items-start gap-2"><FiCheck className="text-[#6B2200] shrink-0 mt-0.5" size={14} /><span className="text-gray-500 text-sm">Trosie Global mở rộng xuất khẩu sang EU</span></li>
                  <li className="flex items-start gap-2"><FiCheck className="text-[#6B2200] shrink-0 mt-0.5" size={14} /><span className="text-gray-500 text-sm">Cà phê Arabica Khe Sanh được thị trường Nhật ưa chuộng</span></li>
                  <li className="flex items-start gap-2"><FiCheck className="text-[#6B2200] shrink-0 mt-0.5" size={14} /><span className="text-gray-500 text-sm">Găng tay Nitrile Việt Nam đạt chứng nhận FDA</span></li>
                </>
              )}
              <li className="mt-2">
                <Link to="/tin-tuc" className="text-[#6B2200] text-xs font-semibold hover:underline inline-flex items-center gap-1">
                  Xem tất cả tin tức <FiArrowRight size={12} />
                </Link>
              </li>
            </ul>
          </div>

          {/* Video */}
          <div>
            <h2 className="section-heading">VIDEO</h2>
            <div className="relative bg-black" style={{ aspectRatio: '16/9' }}>
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0"
                title="Trosie Global Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
              <span className="text-red-600 font-semibold">▶</span>
              <span>Phóng Sự: Xuất khẩu nông sản Việt Nam ra thế giới</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HÌNH ẢNH HOẠT ĐỘNG ===== */}
      <section className="max-w-[1200px] mx-auto px-4 pb-10">
        <h2 className="section-heading">HÌNH ẢNH HOẠT ĐỘNG</h2>
        <div className="grid grid-cols-3 gap-3">
          {activityImages.map((img) => (
            <Link key={img.label} to={img.link} className="group block text-center">
              <div className="overflow-hidden mb-1">
                <img
                  src={img.image}
                  alt={img.label}
                  className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-xs text-gray-600 group-hover:text-[#6B2200] transition-colors font-semibold">{img.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== CTA STRIP ===== */}
      <section className="bg-[#6B2200] py-10">
        <div className="max-w-[1200px] mx-auto px-4 text-center">
          <h2 className="text-white font-black text-2xl mb-3">Sẵn sàng hợp tác xuất khẩu?</h2>
          <p className="text-red-200 mb-6 text-sm">Liên hệ ngay để nhận báo giá tốt nhất từ Trosie Global</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/lien-he" className="bg-white text-[#6B2200] font-bold px-8 py-3 hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
              Nhận báo giá <FiArrowRight />
            </Link>
            <a href="tel:+84961393370" className="border-2 border-white text-white font-bold px-8 py-3 hover:bg-white/10 transition-colors">
              📞 +84 961 393 370
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
