import { Link } from 'react-router-dom'
import { FiArrowRight, FiCheck } from 'react-icons/fi'

export default function GioiThieu() {
  return (
    <div>
      {/* Page header */}
      <div className="bg-[#6B2200] py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-black text-white mb-2">Giới Thiệu Công Ty</h1>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Link to="/" className="hover:text-white">Trang chủ</Link>
            <span>/</span>
            <span className="text-amber-200">Giới thiệu</span>
          </div>
        </div>
      </div>

      {/* Intro */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-heading">TROSIE GARDEN – Cà Phê Việt Nam Ra Thế Giới</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong>Công ty TNHH Xuất nhập khẩu và Thương mại Trosie</strong> (thương hiệu Trosie Garden) được thành lập năm 2010, là doanh nghiệp chuyên xuất khẩu cà phê Việt Nam chất lượng cao sang các thị trường quốc tế khó tính như EU, Mỹ, Nhật Bản và Hàn Quốc.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Trosie Garden tập trung vào hai chủng loại cà phê chủ lực: <strong>Arabica</strong> từ vùng cao Lâm Đồng, Sơn La, Điện Biên và <strong>Robusta</strong> từ Tây Nguyên – Buôn Ma Thuột. Bên cạnh đó, chúng tôi phát triển các sản phẩm giá trị gia tăng như Specialty Coffee, cà phê rang xay, hòa tan và Cascara.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Với đội ngũ hơn 50 chuyên gia có kinh nghiệm trong ngành cà phê, Trosie Garden đã xây dựng mạng lưới đối tác tại Đức, Ý, Hà Lan, Mỹ, Nhật Bản, Hàn Quốc, Singapore và nhiều thị trường khác.
              </p>
              <ul className="space-y-2.5">
                {[
                  'Thành lập năm 2010 tại Hà Nội',
                  'Chứng nhận Rainforest Alliance, SCA',
                  'Kim ngạch xuất khẩu ~20 triệu USD/năm',
                  'Xuất khẩu sang 25+ quốc gia',
                  '50+ cán bộ nhân viên',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <FiCheck className="text-[#6B2200] shrink-0" size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&q=80" alt="Trosie Garden" className="rounded-lg shadow-lg w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="section-heading center inline-block">Tầm Nhìn & Sứ Mệnh</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '🎯', title: 'Sứ Mệnh',
                desc: 'Kết nối nông sản Việt Nam với thị trường quốc tế, mang lại giá trị cao nhất cho nông dân và đối tác, góp phần vào sự phát triển bền vững của nền nông nghiệp Việt Nam.'
              },
              {
                icon: '🔭', title: 'Tầm Nhìn',
                desc: 'Trở thành doanh nghiệp xuất nhập khẩu nông sản và gia vị hàng đầu Đông Nam Á, được công nhận về chất lượng sản phẩm và tính chuyên nghiệp trong dịch vụ.'
              },
              {
                icon: '💎', title: 'Giá Trị Cốt Lõi',
                desc: 'Uy tín – Chất lượng – Đổi mới – Bền vững. Mỗi sản phẩm Trosie Garden đều đại diện cho cam kết về chất lượng và lòng tự hào của người Việt.'
              },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-[#6B2200] mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="section-heading center inline-block">Lịch Sử Phát Triển</h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-gray-200"></div>
            {[
              { year: '2010', title: 'Thành lập công ty', desc: 'Công ty TNHH XNK và Thương mại Trosie được thành lập tại Hà Nội, bắt đầu thu mua và xuất khẩu cà phê Robusta Tây Nguyên.' },
              { year: '2013', title: 'Mở rộng sang thị trường EU', desc: 'Ký kết hợp đồng dài hạn với các đối tác tại Đức, Ý, Hà Lan – thị trường tiêu thụ cà phê lớn nhất thế giới.' },
              { year: '2016', title: 'Ra mắt thương hiệu Trosie Garden', desc: 'Chính thức định vị thương hiệu Trosie Garden, tập trung vào cà phê chất lượng cao và Specialty Coffee.' },
              { year: '2019', title: 'Mở vùng nguyên liệu Arabica', desc: 'Liên kết với nông dân tại Cầu Đất (Lâm Đồng) và Sơn La để phát triển vùng Arabica theo tiêu chuẩn bền vững.' },
              { year: '2022', title: 'Chứng nhận Rainforest Alliance', desc: 'Vùng nguyên liệu Arabica Cầu Đất đạt chứng nhận Rainforest Alliance, mở cơ hội tiếp cận chuỗi cao cấp EU.' },
              { year: '2024', title: 'Ra mắt dòng Specialty & Cascara', desc: 'Bổ sung Specialty Coffee Single Origin và Cascara vào danh mục xuất khẩu, hướng tới thị trường premium.' },
            ].map((item, i) => (
              <div key={i} className={`flex items-start gap-8 mb-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block bg-white border-2 border-[#6B2200] rounded-lg p-4 shadow-sm max-w-xs ${i % 2 === 0 ? 'ml-auto' : ''}`}>
                    <h3 className="font-bold text-[#6B2200] mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
                <div className="relative z-10 w-14 h-14 bg-[#6B2200] rounded-full flex items-center justify-center shrink-0">
                  <span className="text-white font-black text-xs">{item.year}</span>
                </div>
                <div className="flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="section-heading center inline-block">Ban Lãnh Đạo</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { name: 'Ông Nguyễn Văn Huấn', title: 'Tổng Giám Đốc', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' },
              { name: 'Bà Trần Thị Lan', title: 'Phó Tổng Giám Đốc Kinh Doanh', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
              { name: 'Ông Lê Minh Đức', title: 'Giám Đốc Tài Chính', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
            ].map((person, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 text-center p-6">
                <img src={person.img} alt={person.name} className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-[#6B2200]/20" />
                <h3 className="font-bold text-[#6B2200]">{person.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{person.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-[#c41e3a]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-black text-white mb-3">Sẵn sàng hợp tác với Trosie Garden?</h2>
          <p className="text-red-200 mb-6">Liên hệ ngay để được tư vấn và báo giá sản phẩm</p>
          <div className="flex justify-center gap-4">
            <Link to="/lien-he" className="bg-white text-[#c41e3a] px-8 py-3 font-bold hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
              Liên hệ ngay <FiArrowRight />
            </Link>
            <Link to="/san-pham" className="border-2 border-white text-white px-8 py-3 font-bold hover:bg-white/10 transition-colors">
              Xem sản phẩm
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
