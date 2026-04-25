import { Link } from 'react-router-dom'
import { FaFacebook, FaYoutube, FaLinkedin } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer>
      {/* Main footer – dark bg */}
      <div className="bg-[#2a2a2a] text-gray-300">
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            {/* Col 1: Logo + info */}
            <div className="col-span-2 md:col-span-1">
              <img src="/logo.png" alt="Trosie Global" className="w-[80px] h-auto mb-3" />
              <p className="text-xs text-gray-400 leading-relaxed">
                Công ty TNHH Xuất Nhập Khẩu và Thương Mại Trosie – xuất khẩu găng tay y tế, cà phê & nông sản Việt Nam.
              </p>
              <div className="flex gap-2 mt-4">
                <a href="#" className="w-8 h-8 bg-[#1877f2] rounded flex items-center justify-center hover:opacity-80 transition-opacity">
                  <FaFacebook size={14} color="white" />
                </a>
                <a href="#" className="w-8 h-8 bg-[#ff0000] rounded flex items-center justify-center hover:opacity-80 transition-opacity">
                  <FaYoutube size={14} color="white" />
                </a>
                <a href="#" className="w-8 h-8 bg-[#0a66c2] rounded flex items-center justify-center hover:opacity-80 transition-opacity">
                  <FaLinkedin size={14} color="white" />
                </a>
              </div>
            </div>

            {/* Col 2: Sản phẩm */}
            <div>
              <h4 className="text-white font-bold mb-3 text-sm uppercase">SẢN PHẨM</h4>
              <ul className="space-y-1.5 text-xs">
                {[
                  ['Găng Tay Y Tế', '/gang-tay-y-te'],
                  ['Cà Phê', '/ca-phe'],
                  ['Nông Sản', '/nong-san'],
                  ['OEM / Thương Hiệu Riêng', '/oem'],
                  ['Chuỗi Cung Ứng', '/chuoi-cung-ung'],
                  ['Chứng Nhận', '/chung-nhan'],
                ].map(([label, to]) => (
                  <li key={to}>
                    <Link to={to} className="text-gray-400 hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Giới thiệu */}
            <div>
              <h4 className="text-white font-bold mb-3 text-sm uppercase">CÔNG TY</h4>
              <ul className="space-y-1.5 text-xs">
                {[
                  ['Giới Thiệu', '/gioi-thieu'],
                  ['Tin Tức', '/tin-tuc'],
                  ['Liên Hệ', '/lien-he'],
                ].map(([label, to]) => (
                  <li key={to}>
                    <Link to={to} className="text-gray-400 hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Liên hệ */}
            <div>
              <h4 className="text-white font-bold mb-3 text-sm uppercase">LIÊN HỆ</h4>
              <div className="space-y-2 text-xs text-gray-400">
                <p>📍 Km số 2, đường Hồ Chí Minh, Xã Khe Sanh, Tỉnh Quảng Trị</p>
                <p>📞 <a href="tel:+84961393370" className="hover:text-white">+84 961 393 370</a></p>
                <p>✉️ <a href="mailto:trosiegardenks@gmail.com" className="hover:text-white">trosiegardenks@gmail.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar – darker */}
      <div className="bg-[#1a1a1a] py-3">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-xs text-gray-400 space-y-0.5">
            <div className="font-semibold text-gray-300">
              CÔNG TY TNHH XUẤT NHẬP KHẨU VÀ THƯƠNG MẠI TROSIE
            </div>
            <div>
              Địa chỉ: Km số 2, đường Hồ Chí Minh, Xã Khe Sanh, Tỉnh Quảng Trị
            </div>
            <div>
              Tel: +84 961 393 370 &nbsp;–&nbsp; Email: trosiegardenks@gmail.com
            </div>
          </div>
          <div className="text-xs text-gray-600 mt-2">
            Copyright © 2024. Trosie Global All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
