import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FiPhone, FiMail, FiMapPin, FiSend } from 'react-icons/fi'
import { FaFacebook, FaYoutube, FaLinkedin } from 'react-icons/fa'

export default function LienHe() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setError('')
    try {
      await axios.post('/api/contacts', form)
      setSent(true)
      setForm({ name: '', email: '', phone: '', company: '', subject: '', message: '' })
    } catch {
      setError('Có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ trực tiếp.')
    }
    setSending(false)
  }

  return (
    <div>
      <div className="bg-[#6B2200] py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-black text-white mb-2">Liên Hệ Với Chúng Tôi</h1>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Link to="/" className="hover:text-white">Trang chủ</Link>
            <span>/</span>
            <span className="text-amber-200">Liên hệ</span>
          </div>
        </div>
      </div>

      {/* Contact info cards */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: <FiMapPin size={24} />, title: 'Trụ sở chính',
                lines: ['122-123 M2 Láng Trung', 'Phường Láng Hạ, Quận Đống Đa', 'Hà Nội, Việt Nam']
              },
              {
                icon: <FiPhone size={24} />, title: 'Điện thoại',
                lines: ['(024) 3835 9937', '(024) 3835 9936', 'Fax: (024) 3835 9935']
              },
              {
                icon: <FiMail size={24} />, title: 'Email',
                lines: ['huan20000@gmail.com', 'Giờ làm việc:', 'T2-T6: 8:00 – 17:30']
              },
              {
                icon: <FiMapPin size={24} />, title: 'Chi nhánh HCM',
                lines: ['TP. Hồ Chí Minh', 'Hưng Yên (Nhà máy)', 'KCN Phố Nối A']
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow text-center">
                <div className="w-12 h-12 bg-[#6B2200] rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                  {item.icon}
                </div>
                <h3 className="font-bold text-[#6B2200] mb-3">{item.title}</h3>
                {item.lines.map((line, j) => (
                  <p key={j} className="text-gray-600 text-sm">{line}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="section-title mb-6">Gửi Yêu Cầu Hợp Tác</h2>
              {sent ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-green-700 font-bold text-lg mb-2">Cảm ơn bạn đã liên hệ!</h3>
                  <p className="text-green-600 text-sm mb-4">Chúng tôi sẽ phản hồi trong vòng 24 giờ làm việc.</p>
                  <button onClick={() => setSent(false)} className="btn-primary text-sm">Gửi yêu cầu khác</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Họ và tên *</label>
                      <input type="text" required placeholder="Nguyễn Văn A" value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B2200] rounded" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Công ty</label>
                      <input type="text" placeholder="Tên công ty" value={form.company}
                        onChange={e => setForm({ ...form, company: e.target.value })}
                        className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B2200] rounded" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
                      <input type="email" required placeholder="email@company.com" value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B2200] rounded" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Điện thoại</label>
                      <input type="tel" placeholder="0900 000 000" value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B2200] rounded" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Chủ đề</label>
                    <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                      className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B2200] rounded bg-white">
                      <option value="">-- Chọn chủ đề --</option>
                      <option>Yêu cầu báo giá sản phẩm</option>
                      <option>Tìm hiểu về xuất khẩu cà phê</option>
                      <option>Hợp tác phân phối</option>
                      <option>Thông tin sản phẩm</option>
                      <option>Khác</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Nội dung *</label>
                    <textarea required rows={5} placeholder="Mô tả chi tiết yêu cầu của bạn..." value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B2200] rounded resize-none" />
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <button type="submit" disabled={sending}
                    className="btn-primary flex items-center gap-2 disabled:opacity-60">
                    <FiSend size={16} />
                    {sending ? 'Đang gửi...' : 'Gửi yêu cầu'}
                  </button>
                </form>
              )}
            </div>

            {/* Map + info */}
            <div>
              <h2 className="section-title mb-6">Vị Trí Văn Phòng</h2>
              <div className="rounded-lg overflow-hidden shadow-md border border-gray-200 mb-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.1522042836684!2d105.8175!3d21.0186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDAxJzA3LjAiTiAxMDXCsDQ5JzAzLjAiRQ!5e0!3m2!1svi!2svn!4v1234567890"
                  width="100%" height="300" style={{ border: 0 }} allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade" title="Trosie Garden location"
                ></iframe>
              </div>

              <div className="bg-[#3a1a00] rounded-lg p-6 text-white">
                <h3 className="font-bold text-lg mb-4">Thông tin liên hệ</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <FiMapPin className="text-amber-200 shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-white">Trụ sở chính – Hà Nội</p>
                      <p className="text-gray-300">122-123 M2 Láng Trung, Phường Láng Hạ, Quận Đống Đa, Hà Nội</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiPhone className="text-amber-200 shrink-0" />
                    <div>
                      <p className="text-gray-300">(024) 3835 9937 / (024) 3835 9936</p>
                      <p className="text-gray-400 text-xs">Fax: (024) 3835 9935</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiMail className="text-amber-200 shrink-0" />
                    <a href="mailto:huan20000@gmail.com" className="text-gray-300 hover:text-white">huan20000@gmail.com</a>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-white/10">
                  <p className="text-gray-400 text-xs mb-3">Theo dõi chúng tôi</p>
                  <div className="flex gap-3">
                    <a href="#" className="w-9 h-9 bg-[#1877f2] flex items-center justify-center rounded hover:opacity-80"><FaFacebook size={15} /></a>
                    <a href="#" className="w-9 h-9 bg-red-600 flex items-center justify-center rounded hover:opacity-80"><FaYoutube size={15} /></a>
                    <a href="#" className="w-9 h-9 bg-[#0a66c2] flex items-center justify-center rounded hover:opacity-80"><FaLinkedin size={15} /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-10 bg-[#6B2200]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white">
            <p className="font-black text-xl">Sẵn sàng hợp tác xuất khẩu?</p>
            <p className="text-gray-300 text-sm">Đội ngũ Trosie Garden luôn sẵn sàng hỗ trợ quý đối tác</p>
          </div>
          <a href="tel:+842438359937"
            className="btn-accent flex items-center gap-2 whitespace-nowrap">
            <FiPhone /> Gọi ngay: (024) 3835 9937
          </a>
        </div>
      </section>
    </div>
  )
}
