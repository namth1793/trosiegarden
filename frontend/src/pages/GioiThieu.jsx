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

      {/* Tổng quan */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-heading">TROSIE GLOBAL – Xuất Khẩu Việt Nam Ra Thế Giới</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong>Công ty TNHH Xuất Nhập Khẩu và Thương Mại Trosie</strong> là doanh nghiệp chuyên xuất khẩu các sản phẩm từ Việt Nam ra thị trường quốc tế, bao gồm găng tay y tế, cà phê và nông sản.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Chúng tôi kết nối trực tiếp nhà máy và nông trại với khách hàng toàn cầu, đảm bảo chất lượng sản phẩm ổn định, giá cạnh tranh và khả năng cung ứng linh hoạt.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Với đội ngũ giàu kinh nghiệm trong lĩnh vực xuất nhập khẩu, Trosie Global đang từng bước mở rộng mạng lưới đối tác tại EU, Mỹ, Nhật Bản, Hàn Quốc và nhiều thị trường tiềm năng khác.
              </p>
              <ul className="space-y-2.5">
                {[
                  'Kết nối trực tiếp nhà máy & nông trại',
                  'Linh hoạt đơn hàng, không yêu cầu MOQ cao',
                  'Hiểu thị trường quốc tế',
                  'Hỗ trợ OEM / thương hiệu riêng',
                  'Phản hồi trong 24 giờ',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <FiCheck className="text-[#6B2200] shrink-0" size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=700&q=80"
                alt="Trosie Global"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sứ mệnh – Tầm nhìn – Giá trị */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="section-heading center inline-block">Tầm Nhìn & Sứ Mệnh</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '🎯', title: 'Sứ Mệnh',
                desc: 'Đưa sản phẩm chất lượng của Việt Nam đến khách hàng toàn cầu một cách bền vững, tạo giá trị lâu dài cho cả nhà sản xuất và đối tác quốc tế.'
              },
              {
                icon: '🔭', title: 'Tầm Nhìn',
                desc: 'Trở thành thương hiệu xuất khẩu uy tín của Việt Nam, được khách hàng quốc tế tin tưởng lựa chọn nhờ chất lượng ổn định và dịch vụ chuyên nghiệp.'
              },
              {
                icon: '💎', title: 'Giá Trị Cốt Lõi',
                desc: 'Uy tín – Chất lượng – Linh hoạt – Bền vững. Mỗi sản phẩm Trosie đều đại diện cho cam kết về chất lượng và lòng tự hào của người Việt Nam.'
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

      {/* Thế mạnh */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="section-heading center inline-block">Thế Mạnh Của Chúng Tôi</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '🏭',
                title: 'Kết nối trực tiếp nhà máy & nông trại',
                desc: 'Chúng tôi làm việc trực tiếp với nhà sản xuất và nông trại tại Việt Nam, loại bỏ trung gian để mang lại giá tốt nhất cho khách hàng.'
              },
              {
                icon: '🔄',
                title: 'Linh hoạt đơn hàng',
                desc: 'Không ràng buộc MOQ quá cao. Chúng tôi hỗ trợ cả đơn hàng nhỏ cho khách mới lẫn hợp đồng dài hạn khối lượng lớn.'
              },
              {
                icon: '🌍',
                title: 'Hiểu thị trường quốc tế',
                desc: 'Đội ngũ có kinh nghiệm xuất khẩu sang EU, Mỹ, Nhật Bản – am hiểu quy định, chứng nhận và thị hiếu từng thị trường.'
              },
            ].map((item, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-6 hover:border-[#6B2200] hover:shadow-md transition-all">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-[#6B2200] text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lĩnh vực kinh doanh */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="section-heading center inline-block">Lĩnh Vực Kinh Doanh</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                img: 'https://images.unsplash.com/photo-1599412227383-b7d4751c8765?w=500&q=80',
                title: 'Găng Tay Y Tế',
                desc: 'Nitrile, Latex, Vinyl – đủ loại cho y tế, thực phẩm, công nghiệp. OEM theo yêu cầu.',
                to: '/gang-tay-y-te'
              },
              {
                img: 'https://images.unsplash.com/photo-1663125365404-e274869480f6?w=500&q=80',
                title: 'Cà Phê',
                desc: 'Arabica & Robusta từ Khe Sanh – nhân xanh, rang, và cà phê chế biến đặc sản.',
                to: '/ca-phe'
              },
              {
                img: 'https://images.unsplash.com/photo-1762884601729-0eeeafbdfb8a?w=500&q=80',
                title: 'Nông Sản',
                desc: 'Trái cây sấy (chuối, mít, xoài) và trái cây tươi theo mùa xuất khẩu.',
                to: '/nong-san'
              },
            ].map((item, i) => (
              <Link key={i} to={item.to} className="group block bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="overflow-hidden" style={{ height: '180px' }}>
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[#6B2200] text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-[#c41e3a]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-black text-white mb-3">Sẵn sàng hợp tác với Trosie Global?</h2>
          <p className="text-red-200 mb-6">Liên hệ ngay để được tư vấn và báo giá sản phẩm</p>
          <div className="flex justify-center gap-4">
            <Link to="/lien-he" className="bg-white text-[#c41e3a] px-8 py-3 font-bold hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
              Liên hệ ngay <FiArrowRight />
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
