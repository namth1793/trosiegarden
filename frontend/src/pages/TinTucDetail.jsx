import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { FiCalendar, FiUser, FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa'

const catLabels = {
  'tin-cong-ty': 'Tin Công Ty',
  'thi-truong': 'Thị Trường',
  'su-kien': 'Sự Kiện',
}

export default function TinTucDetail() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios.get(`/api/news/${slug}`).then(r => {
      setArticle(r.data)
      axios.get('/api/news?limit=4').then(res => {
        setRelated(res.data.filter(n => n.slug !== slug).slice(0, 3))
      })
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [slug])

  const formatDate = (d) => new Date(d).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })

  if (loading) return <div className="flex justify-center items-center h-64"><div className="w-10 h-10 border-4 border-[#6B2200] border-t-transparent rounded-full animate-spin"></div></div>
  if (!article) return <div className="text-center py-20 text-gray-400">Không tìm thấy bài viết</div>

  return (
    <div>
      <div className="bg-[#6B2200] py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-300 mb-2">
            <Link to="/" className="hover:text-white">Trang chủ</Link>
            <span>/</span>
            <Link to="/tin-tuc" className="hover:text-white">Tin tức</Link>
            <span>/</span>
            <span className="text-amber-200 line-clamp-1">{article.title}</span>
          </div>
          <span className={`text-xs font-semibold px-2 py-1 rounded ${
            article.category === 'tin-cong-ty' ? 'bg-blue-500/20 text-blue-200' :
            article.category === 'thi-truong' ? 'bg-green-500/20 text-amber-200' :
            'bg-orange-500/20 text-orange-200'
          }`}>
            {catLabels[article.category] || article.category}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <article className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <img src={article.image} alt={article.title} className="w-full h-64 md:h-96 object-cover" />
              <div className="p-6 md:p-8">
                <h1 className="text-2xl md:text-3xl font-black text-[#6B2200] leading-tight mb-4">{article.title}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-6 pb-6 border-b border-gray-100">
                  <span className="flex items-center gap-1.5"><FiCalendar size={13} />{formatDate(article.created_at)}</span>
                  <span className="flex items-center gap-1.5"><FiUser size={13} />{article.author}</span>
                </div>

                {article.summary && (
                  <p className="text-gray-600 italic text-base mb-6 p-4 bg-blue-50 border-l-4 border-[#6B2200] rounded-r">{article.summary}</p>
                )}

                <div
                  className="text-gray-700 leading-relaxed text-[15px]"
                  style={{ lineHeight: '1.9' }}
                  dangerouslySetInnerHTML={{
                    __html: (article.content || '')
                      .replace(/<h3>/g, '<h3 style="color:#6B2200;font-weight:700;font-size:1.1rem;margin-top:1.5rem;margin-bottom:0.5rem;">')
                      .replace(/<ul>/g, '<ul style="list-style-type:disc;padding-left:1.5rem;margin-bottom:1rem;">')
                      .replace(/<li>/g, '<li style="margin-bottom:0.5rem;">')
                      .replace(/<strong>/g, '<strong style="color:#1a1a1a;">')
                  }}
                />

                {/* Share */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-3">
                  <span className="text-sm text-gray-500 font-semibold">Chia sẻ:</span>
                  <a href="#" className="w-8 h-8 bg-[#1877f2] flex items-center justify-center rounded text-white hover:opacity-80"><FaFacebook size={14} /></a>
                  <a href="#" className="w-8 h-8 bg-[#1da1f2] flex items-center justify-center rounded text-white hover:opacity-80"><FaTwitter size={14} /></a>
                  <a href="#" className="w-8 h-8 bg-[#0a66c2] flex items-center justify-center rounded text-white hover:opacity-80"><FaLinkedin size={14} /></a>
                </div>
              </div>
            </article>

            <div className="mt-4 flex justify-between">
              <Link to="/tin-tuc" className="flex items-center gap-2 text-[#6B2200] font-semibold text-sm hover:gap-3 transition-all">
                <FiArrowLeft /> Quay lại tin tức
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {related.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-[#6B2200] px-4 py-3">
                  <h3 className="text-white font-bold text-sm">Tin tức liên quan</h3>
                </div>
                <div className="p-4 space-y-4">
                  {related.map(item => (
                    <Link key={item.id} to={`/tin-tuc/${item.slug}`}
                      className="flex gap-3 group hover:bg-gray-50 p-2 rounded -mx-2 transition-colors">
                      <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-700 group-hover:text-[#6B2200] transition-colors line-clamp-2 leading-snug">{item.title}</p>
                        <p className="text-xs text-gray-400 mt-1">{formatDate(item.created_at)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-[#6B2200] rounded-lg p-5 text-white">
              <h4 className="font-bold mb-2">Liên hệ tư vấn</h4>
              <p className="text-gray-300 text-sm mb-4">Có câu hỏi về sản phẩm xuất khẩu? Liên hệ ngay với chúng tôi.</p>
              <a href="tel:+842438359937" className="block text-center bg-[#c41e3a] hover:bg-[#a5182f] text-white py-2.5 font-semibold text-sm transition-colors rounded">
                Gọi: (024) 3835 9937
              </a>
              <Link to="/san-pham" className="block text-center mt-2 border border-white/30 text-white py-2.5 text-sm hover:bg-white/10 transition-colors rounded">
                Xem sản phẩm <FiArrowRight className="inline ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
