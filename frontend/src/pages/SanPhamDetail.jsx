import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { FiArrowRight, FiPhone, FiMail, FiMapPin } from 'react-icons/fi'

const categoryLabels = {
  'arabica': 'Arabica',
  'robusta': 'Robusta',
  'specialty': 'Đặc Sản',
  'xay': 'Cà Phê Xay',
  'hoa-tan': 'Hòa Tan',
  'xanh': 'Nhân Xanh',
  'cascara': 'Cascara',
  'chon': 'Cà Phê Chồn',
}

export default function SanPhamDetail() {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [contact, setContact] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios.get(`/api/products/${slug}`).then(r => {
      setProduct(r.data)
      axios.get(`/api/products?category=${r.data.category}&limit=4`).then(res => {
        setRelated(res.data.filter(p => p.slug !== slug).slice(0, 3))
      })
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [slug])

  const handleContact = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/contacts', { ...contact, subject: `Hỏi về sản phẩm: ${product?.name}`, message: contact.message })
      setSent(true)
    } catch {}
  }

  if (loading) return <div className="flex justify-center items-center h-64"><div className="w-10 h-10 border-4 border-[#6B2200] border-t-transparent rounded-full animate-spin"></div></div>
  if (!product) return <div className="text-center py-20 text-gray-400">Không tìm thấy sản phẩm</div>

  return (
    <div>
      <div className="bg-[#6B2200] py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-black text-white mb-2">{product.name}</h1>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Link to="/" className="hover:text-white">Trang chủ</Link>
            <span>/</span>
            <Link to="/san-pham" className="hover:text-white">Sản phẩm</Link>
            <span>/</span>
            <span className="text-amber-200">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            {/* Main content */}
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div>
                <img src={product.image} alt={product.name} className="w-full rounded-lg shadow-md" />
              </div>
              <div>
                <span className="text-xs font-semibold text-[#c41e3a] uppercase tracking-wider bg-red-50 px-2 py-1 rounded">
                  {categoryLabels[product.category] || product.category}
                </span>
                <h2 className="text-2xl font-black text-[#6B2200] mt-3 mb-3">{product.name}</h2>
                <p className="text-gray-600 leading-relaxed mb-4">{product.description}</p>

                <div className="space-y-2.5 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-semibold text-gray-700 w-20 shrink-0">Xuất xứ:</span>
                    <span className="text-gray-600">{product.origin}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-semibold text-gray-700 w-20 shrink-0">Đơn vị:</span>
                    <span className="text-gray-600">{product.unit}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a href="tel:+842438359937"
                    className="btn-primary flex items-center gap-2 text-sm">
                    <FiPhone size={14} /> Gọi đặt hàng
                  </a>
                  <a href="mailto:huan20000@gmail.com"
                    className="border-2 border-[#6B2200] text-[#6B2200] px-4 py-2.5 font-semibold hover:bg-[#6B2200] hover:text-white transition-colors flex items-center gap-2 text-sm">
                    <FiMail size={14} /> Gửi email
                  </a>
                </div>
              </div>
            </div>

            {/* Detail */}
            {product.detail && (
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
                <h3 className="font-black text-[#6B2200] text-xl mb-4 pb-3 border-b border-gray-200">Thông Tin Chi Tiết</h3>
                <div
                  className="prose prose-sm max-w-none text-gray-700"
                  style={{ lineHeight: '1.8' }}
                  dangerouslySetInnerHTML={{ __html: product.detail.replace(/<h3>/g, '<h3 style="color:#6B2200;font-weight:700;font-size:1rem;margin-top:1.25rem;margin-bottom:0.5rem;">').replace(/<ul>/g, '<ul style="list-style-type:disc;padding-left:1.5rem;margin-bottom:1rem;">').replace(/<li>/g, '<li style="margin-bottom:0.25rem;">') }}
                />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Contact form */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-[#6B2200] px-4 py-3">
                <h3 className="text-white font-bold text-sm">Yêu cầu báo giá</h3>
              </div>
              <div className="p-4">
                {sent ? (
                  <div className="text-center py-6">
                    <div className="text-4xl mb-2">✅</div>
                    <p className="text-green-600 font-semibold text-sm">Đã gửi yêu cầu!</p>
                    <p className="text-gray-400 text-xs mt-1">Chúng tôi sẽ liên hệ sớm</p>
                  </div>
                ) : (
                  <form onSubmit={handleContact} className="space-y-3">
                    <input type="text" placeholder="Họ tên *" required value={contact.name}
                      onChange={e => setContact({ ...contact, name: e.target.value })}
                      className="w-full border border-gray-300 px-3 py-2 text-sm rounded focus:outline-none focus:border-[#6B2200]" />
                    <input type="email" placeholder="Email *" required value={contact.email}
                      onChange={e => setContact({ ...contact, email: e.target.value })}
                      className="w-full border border-gray-300 px-3 py-2 text-sm rounded focus:outline-none focus:border-[#6B2200]" />
                    <input type="tel" placeholder="Điện thoại" value={contact.phone}
                      onChange={e => setContact({ ...contact, phone: e.target.value })}
                      className="w-full border border-gray-300 px-3 py-2 text-sm rounded focus:outline-none focus:border-[#6B2200]" />
                    <textarea placeholder="Số lượng, yêu cầu cụ thể..." rows={3} value={contact.message}
                      onChange={e => setContact({ ...contact, message: e.target.value })}
                      className="w-full border border-gray-300 px-3 py-2 text-sm rounded focus:outline-none focus:border-[#6B2200] resize-none" />
                    <button type="submit" className="btn-primary w-full text-center text-sm">Gửi yêu cầu</button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact info */}
            <div className="bg-[#6B2200] rounded-lg p-5 text-white space-y-3">
              <h4 className="font-bold mb-3">Thông tin liên hệ</h4>
              <div className="flex items-start gap-2.5 text-sm">
                <FiMapPin className="text-amber-200 shrink-0 mt-0.5" size={14} />
                <span className="text-gray-300 text-xs">122-123 M2 Láng Trung, Quận Đống Đa, Hà Nội</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <FiPhone className="text-amber-200 shrink-0" size={14} />
                <a href="tel:+842438359937" className="text-gray-300 text-xs hover:text-white">(024) 3835 9937 / 9936</a>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <FiMail className="text-amber-200 shrink-0" size={14} />
                <a href="mailto:huan20000@gmail.com" className="text-gray-300 text-xs hover:text-white">huan20000@gmail.com</a>
              </div>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h3 className="font-bold text-gray-800 text-sm">Sản phẩm liên quan</h3>
                </div>
                <div className="p-3 space-y-3">
                  {related.map(p => (
                    <Link key={p.id} to={`/san-pham/${p.slug}`}
                      className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded group transition-colors">
                      <img src={p.image} alt={p.name} className="w-14 h-14 object-cover rounded" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-700 group-hover:text-[#6B2200] transition-colors truncate">{p.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{p.origin}</p>
                      </div>
                      <FiArrowRight className="text-gray-400 group-hover:text-[#6B2200] shrink-0" size={14} />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
