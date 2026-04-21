import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaYoutube, FaGoogle } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer>
      {/* Main footer – dark bg */}
      <div className="bg-[#2a2a2a] text-gray-300">
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

            {/* Col 1: Logo + certs */}
            <div className="col-span-2 md:col-span-1">
              <img src="/logo.png" alt="Trosie Garden" className="w-[80px] h-auto mb-3" />
              {/* Cert badges */}
              <div className="flex items-center gap-2 mt-2">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <span className="text-[#6B2200] font-black text-[7px] text-center leading-tight">RAIN<br/>FOREST</span>
                </div>
                <div className="w-12 h-12 bg-[#6B2200] rounded-full flex items-center justify-center">
                  <span className="text-white font-black text-[7px] text-center leading-tight">SCA<br/>CERT</span>
                </div>
              </div>
            </div>

            {/* Col 2: Giới thiệu */}
            <div>
              <h4 className="text-white font-bold mb-3 text-sm uppercase">GIỚI THIỆU</h4>
              <ul className="space-y-1.5 text-xs">
                {[
                  ['Giấy Chứng Nhận', '/gioi-thieu#chung-nhan'],
                  ['Lịch sử phát triển', '/gioi-thieu#lich-su'],
                  ['Ngành nghề kinh doanh', '/gioi-thieu#nganh-nghe'],
                  ['Phương châm hoạt động', '/gioi-thieu#phuong-cham'],
                ].map(([label, to]) => (
                  <li key={to}>
                    <Link to={to} className="text-gray-400 hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Quan hệ cổ đông */}
            <div>
              <h4 className="text-white font-bold mb-3 text-sm uppercase">QUAN HỆ CỔ ĐÔNG</h4>
              <ul className="space-y-1.5 text-xs">
                {[
                  ['Thông báo', '/quan-he-co-dong#thong-bao'],
                  ['Báo cáo tài chính', '/quan-he-co-dong#bao-cao'],
                  ['Đại hội cổ đông', '/quan-he-co-dong#dai-hoi'],
                ].map(([label, to]) => (
                  <li key={to}>
                    <Link to={to} className="text-gray-400 hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Tin tức */}
            <div>
              <h4 className="text-white font-bold mb-3 text-sm uppercase">TIN TỨC</h4>
              <ul className="space-y-1.5 text-xs">
                {[
                  ['Tin tức sự kiện', '/tin-tuc?category=tin-cong-ty'],
                  ['Tin tuyển dụng', '/tin-tuc?category=tuyen-dung'],
                ].map(([label, to]) => (
                  <li key={to}>
                    <Link to={to} className="text-gray-400 hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 5: Kết nối */}
            <div>
              <h4 className="text-white font-bold mb-3 text-sm uppercase">KẾT NỐI VỚI CHÚNG TÔI</h4>
              <div className="flex gap-2 mb-3">
                <a href="#" className="w-8 h-8 bg-[#1877f2] rounded flex items-center justify-center hover:opacity-80 transition-opacity">
                  <FaFacebook size={14} color="white" />
                </a>
                <a href="#" className="w-8 h-8 bg-[#1da1f2] rounded flex items-center justify-center hover:opacity-80 transition-opacity">
                  <FaTwitter size={14} color="white" />
                </a>
                <a href="#" className="w-8 h-8 bg-[#ff0000] rounded flex items-center justify-center hover:opacity-80 transition-opacity">
                  <FaYoutube size={14} color="white" />
                </a>
                <a href="#" className="w-8 h-8 bg-[#dd4b39] rounded flex items-center justify-center hover:opacity-80 transition-opacity">
                  <FaGoogle size={14} color="white" />
                </a>
              </div>
              <div className="text-xs text-gray-500 space-y-0.5">
                <div>Lượt truy cập : <span className="text-gray-300">347904</span></div>
                <div>Online : <span className="text-gray-300">32</span></div>
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
              Add: 122 - 123 M2 Láng Trung - Phường Láng Hạ - Quận Đống Đa - Hà Nội
            </div>
            <div>
              Tel: +84 24 38359937 / 38359936 &nbsp;-&nbsp; Fax: +84 24 38359935
            </div>
            <div>
              Email: huan20000@gmail.com &nbsp;-&nbsp; Website: trosiegarden.com.vn
            </div>
          </div>
          <div className="text-xs text-gray-600 mt-2">
            Copyright © 2024. Trosie Garden All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
