import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { FiArrowRight, FiCalendar, FiUser } from 'react-icons/fi'

const catLabels = {
  'tin-cong-ty': 'Tin Công Ty',
  'thi-truong': 'Thị Trường',
  'su-kien': 'Sự Kiện',
}

export default function TinTuc() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const activeCategory = searchParams.get('category') || ''

  useEffect(() => {
    setLoading(true)
    const url = activeCategory ? `/api/news?category=${activeCategory}` : '/api/news'
    axios.get(url).then(r => { setNews(r.data); setLoading(false) }).catch(() => setLoading(false))
  }, [activeCategory])

  const formatDate = (d) => new Date(d).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })

  return (
    <div>
      <div className="bg-[#6B2200] py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-black text-white mb-2">Tin Tức & Sự Kiện</h1>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Link to="/" className="hover:text-white">Trang chủ</Link>
            <span>/</span>
            <span className="text-amber-200">Tin tức</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSearchParams({})}
            className={`px-4 py-2 text-sm font-semibold border transition-colors ${!activeCategory ? 'bg-[#6B2200] text-white border-[#6B2200]' : 'text-gray-600 border-gray-300 hover:border-[#6B2200] hover:text-[#6B2200]'}`}
          >Tất cả</button>
          {Object.entries(catLabels).map(([key, label]) => (
            <button key={key}
              onClick={() => setSearchParams({ category: key })}
              className={`px-4 py-2 text-sm font-semibold border transition-colors ${activeCategory === key ? 'bg-[#6B2200] text-white border-[#6B2200]' : 'text-gray-600 border-gray-300 hover:border-[#6B2200] hover:text-[#6B2200]'}`}
            >{label}</button>
          ))}
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-lg animate-pulse h-80"></div>
            ))}
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-4">📰</div>
            <p>Chưa có tin tức</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <Link key={item.id} to={`/tin-tuc/${item.slug}`}
                className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="overflow-hidden h-48">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                    item.category === 'tin-cong-ty' ? 'bg-blue-100 text-blue-700' :
                    item.category === 'thi-truong' ? 'bg-green-100 text-green-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {catLabels[item.category] || item.category}
                  </span>
                  <h3 className="font-bold text-gray-800 mt-2 mb-2 leading-snug group-hover:text-[#6B2200] transition-colors line-clamp-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-3">{item.summary}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><FiCalendar size={11} />{formatDate(item.created_at)}</span>
                      <span className="flex items-center gap-1"><FiUser size={11} />{item.author}</span>
                    </div>
                    <FiArrowRight className="text-[#6B2200] group-hover:translate-x-1 transition-transform" size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
