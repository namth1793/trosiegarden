import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { FiArrowRight, FiSearch } from 'react-icons/fi'

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

export default function SanPham() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const activeCategory = searchParams.get('category') || ''

  useEffect(() => {
    axios.get('/api/categories').then(r => setCategories(r.data)).catch(() => {})
  }, [])

  useEffect(() => {
    setLoading(true)
    const url = activeCategory ? `/api/products?category=${activeCategory}` : '/api/products'
    axios.get(url).then(r => { setProducts(r.data); setLoading(false) }).catch(() => setLoading(false))
  }, [activeCategory])

  const filtered = products.filter(p =>
    !search || p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="bg-[#6B2200] py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-black text-white mb-2">Sản Phẩm Xuất Khẩu</h1>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Link to="/" className="hover:text-white">Trang chủ</Link>
            <span>/</span>
            <span className="text-green-200">Sản phẩm</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-4">
              <div className="bg-[#6B2200] px-4 py-3">
                <h3 className="text-white font-bold text-sm uppercase tracking-wider">Danh mục sản phẩm</h3>
              </div>
              <div className="p-2">
                <button
                  onClick={() => setSearchParams({})}
                  className={`w-full text-left px-3 py-2.5 text-sm rounded transition-colors flex justify-between items-center ${!activeCategory ? 'bg-[#6B2200] text-white font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  Tất cả sản phẩm
                  <span className={`text-xs px-1.5 py-0.5 rounded ${!activeCategory ? 'bg-white/20 text-white' : 'bg-gray-100'}`}>
                    {products.length || ''}
                  </span>
                </button>
                {categories.map(cat => (
                  <button key={cat.category}
                    onClick={() => setSearchParams({ category: cat.category })}
                    className={`w-full text-left px-3 py-2.5 text-sm rounded transition-colors flex justify-between items-center ${activeCategory === cat.category ? 'bg-[#6B2200] text-white font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    {categoryLabels[cat.category] || cat.category}
                    <span className={`text-xs px-1.5 py-0.5 rounded ${activeCategory === cat.category ? 'bg-white/20 text-white' : 'bg-gray-100'}`}>
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#6B2200] rounded-lg p-5 text-white">
              <h4 className="font-bold mb-2">Cần tư vấn?</h4>
              <p className="text-gray-300 text-sm mb-4">Liên hệ ngay để được báo giá và tư vấn xuất khẩu</p>
              <a href="tel:+842438359937" className="block text-center bg-[#c41e3a] hover:bg-[#a5182f] text-white py-2.5 font-semibold text-sm transition-colors rounded">
                (024) 3835 9937
              </a>
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-500 text-sm">
                {activeCategory ? `${categoryLabels[activeCategory] || activeCategory} – ` : ''}{filtered.length} sản phẩm
              </p>
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input type="text" placeholder="Tìm sản phẩm..." value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="border border-gray-300 pl-9 pr-4 py-2 text-sm rounded focus:outline-none focus:border-[#6B2200] w-48" />
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-100 rounded-lg animate-pulse h-72"></div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <div className="text-5xl mb-4">📦</div>
                <p>Không tìm thấy sản phẩm phù hợp</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map(p => (
                  <Link key={p.id} to={`/san-pham/${p.slug}`}
                    className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg hover:border-[#6B2200]/30 transition-all duration-300">
                    <div className="overflow-hidden h-48">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-[#c41e3a] uppercase">{categoryLabels[p.category] || p.category}</span>
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{p.unit}</span>
                      </div>
                      <h3 className="font-bold text-gray-800 mb-1 group-hover:text-[#6B2200] transition-colors">{p.name}</h3>
                      <p className="text-gray-500 text-xs mb-2 line-clamp-2">{p.description}</p>
                      <div className="text-xs text-gray-400 mb-3">📍 {p.origin}</div>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <span className="text-[#6B2200] text-sm font-semibold">Xem chi tiết</span>
                        <FiArrowRight className="text-[#6B2200] group-hover:translate-x-1 transition-transform" size={16} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
