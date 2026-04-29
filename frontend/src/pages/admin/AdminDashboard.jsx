import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FiFileText, FiImage, FiMail, FiEdit3 } from 'react-icons/fi'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    axios.get('/api/admin/stats', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => setStats(r.data))
      .catch(() => {})
  }, [])

  const cards = [
    { label: 'Bài tin tức', value: stats?.newsCount ?? '...', icon: <FiFileText size={20} />, to: '/admin/news', color: 'bg-blue-500' },
    { label: 'Banners', value: stats?.bannerCount ?? '...', icon: <FiImage size={20} />, to: '/admin/banners', color: 'bg-purple-500' },
    { label: 'Liên hệ mới', value: stats?.newContacts ?? '...', icon: <FiMail size={20} />, to: '/admin/contacts', color: 'bg-[#c41e3a]' },
    { label: 'Tổng liên hệ', value: stats?.contactCount ?? '...', icon: <FiMail size={20} />, to: '/admin/contacts', color: 'bg-gray-500' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-black text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {cards.map((c, i) => (
          <Link key={i} to={c.to} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 ${c.color} rounded-lg flex items-center justify-center text-white mb-3`}>{c.icon}</div>
            <p className="text-2xl font-black text-gray-900">{c.value}</p>
            <p className="text-sm text-gray-500">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-bold text-gray-900 mb-3">Quản lý nhanh</h2>
          <div className="space-y-2">
            {[
              { to: '/admin/news', label: '+ Thêm tin tức mới', icon: '📝' },
              { to: '/admin/banners', label: '+ Thêm banner mới', icon: '🖼️' },
              { to: '/admin/content', label: '✏️ Sửa nội dung trang', icon: '✏️' },
              { to: '/admin/contacts', label: '📬 Xem hộp thư', icon: '📬' },
            ].map((item, i) => (
              <Link key={i} to={item.to}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 text-sm text-gray-700 hover:text-[#6B2200] transition-colors">
                <span>{item.icon}</span> {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-bold text-gray-900 mb-3">Hướng dẫn</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2"><span className="text-[#6B2200] shrink-0">•</span> <strong>Nội dung trang:</strong> sửa text, upload ảnh cho mỗi trang sản phẩm</li>
            <li className="flex items-start gap-2"><span className="text-[#6B2200] shrink-0">•</span> <strong>Banners:</strong> quản lý slider ảnh trên trang chủ</li>
            <li className="flex items-start gap-2"><span className="text-[#6B2200] shrink-0">•</span> <strong>Tin tức:</strong> thêm/sửa/xóa bài đăng</li>
            <li className="flex items-start gap-2"><span className="text-[#6B2200] shrink-0">•</span> Cấu hình Cloudinary trong file <code className="bg-gray-100 px-1 rounded">.env</code> để upload ảnh</li>
            <li className="flex items-start gap-2"><span className="text-[#6B2200] shrink-0">•</span> Dữ liệu lưu trong SQLite, <strong>không mất sau khi redeploy</strong></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
