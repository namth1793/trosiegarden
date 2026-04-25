import { Link } from 'react-router-dom'
import { FiArrowRight, FiCheck } from 'react-icons/fi'

const products = [
  {
    name: 'Arabica',
    features: ['Hương thơm nhẹ', 'Vị chua thanh', 'Độ axit cao', 'Hàm lượng caffeine thấp hơn'],
    image: 'https://images.unsplash.com/photo-1672570050756-4f1953bde478?w=500&q=80',
  },
  {
    name: 'Robusta',
    features: ['Vị đậm', 'Hàm lượng caffeine cao', 'Độ đắng đặc trưng', 'Phù hợp espresso'],
    image: 'https://images.unsplash.com/photo-1442550528053-c431ecb55509?w=500&q=80',
  },
]

const forms = ['Cà phê nhân xanh', 'Cà phê rang']
const processing = ['Natural (chế biến khô)', 'Washed (chế biến ướt)', 'Honey (chế biến mật ong)']
const advantages = ['Nguồn nguyên liệu ổn định', 'Chất lượng đồng đều', 'Phù hợp xuất khẩu', 'Trồng tại Khe Sanh – vùng khí hậu lý tưởng']

export default function CaPheDetail() {
  return (
    <div>
      {/* Page header */}
      <div className="bg-[#6B2200] py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-black text-white mb-2">☕ Cà Phê Xuất Khẩu</h1>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Link to="/" className="hover:text-white">Trang chủ</Link>
            <span>/</span>
            <span className="text-amber-200">Cà phê</span>
          </div>
        </div>
      </div>

      {/* Tổng quan */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-heading">Cà Phê Từ Khe Sanh</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Cà phê Trosie được trồng tại <strong>Khe Sanh – vùng có khí hậu lý tưởng</strong> cho chất lượng hạt cao cấp, với độ cao, nhiệt độ và lượng mưa phù hợp tạo ra hương vị đặc trưng.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Chúng tôi cung cấp cà phê nhân xanh và cà phê rang với các phương pháp chế biến đa dạng, phù hợp cho thị trường châu Á, châu Âu và Bắc Mỹ.
              </p>
              <Link to="/lien-he" className="btn-primary inline-flex items-center gap-2">
                Nhận báo giá ngay <FiArrowRight />
              </Link>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1663125365404-e274869480f6?w=700&q=80"
                alt="Cà phê Khe Sanh"
                className="rounded-lg shadow-lg w-full object-cover"
                style={{ height: '320px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Arabica & Robusta */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading center text-center mb-8">CHỦNG LOẠI CÀ PHÊ</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {products.map((p, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow flex">
                <div className="w-48 shrink-0">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="font-black text-[#6B2200] text-xl mb-3">{p.name}</h3>
                  <ul className="space-y-1.5">
                    {p.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                        <FiCheck className="text-[#6B2200] shrink-0" size={14} /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dạng sản phẩm + Phương pháp + Ưu điểm */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-black text-[#6B2200] text-lg mb-4 border-b-2 border-[#6B2200] pb-2">Dạng Sản Phẩm</h3>
              <ul className="space-y-2">
                {forms.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700">
                    <span className="w-2 h-2 bg-[#6B2200] rounded-full shrink-0"></span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-black text-[#6B2200] text-lg mb-4 border-b-2 border-[#6B2200] pb-2">Phương Pháp Chế Biến</h3>
              <ul className="space-y-2">
                {processing.map((p, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700">
                    <span className="w-2 h-2 bg-[#6B2200] rounded-full shrink-0"></span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-black text-[#6B2200] text-lg mb-4 border-b-2 border-[#6B2200] pb-2">Ưu Điểm</h3>
              <ul className="space-y-2">
                {advantages.map((a, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700">
                    <FiCheck className="text-[#6B2200] shrink-0" size={14} /> {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              'https://images.unsplash.com/photo-1588317303094-d859b315ce70?w=400&q=80',
              'https://images.unsplash.com/photo-1588317283112-f4d3a381e065?w=400&q=80',
              'https://images.unsplash.com/photo-1663125365422-dab15325277a?w=400&q=80',
              'https://images.unsplash.com/photo-1672570050756-4f1953bde478?w=400&q=80',
            ].map((src, i) => (
              <div key={i} className="overflow-hidden rounded">
                <img src={src} alt={`Cà phê ${i + 1}`} className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-[#6B2200]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-black text-white mb-3">Quan tâm đến cà phê Khe Sanh?</h2>
          <p className="text-red-200 mb-6">Liên hệ để nhận mẫu và báo giá xuất khẩu</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/lien-he" className="bg-white text-[#6B2200] px-8 py-3 font-bold hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
              Nhận báo giá <FiArrowRight />
            </Link>
            <a href="tel:+84961393370" className="border-2 border-white text-white px-8 py-3 font-bold hover:bg-white/10 transition-colors">
              📞 +84 961 393 370
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
