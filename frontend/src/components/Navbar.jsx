import { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { FiPhone, FiSearch, FiMenu, FiX, FiChevronDown } from 'react-icons/fi'

const navLinks = [
  { label: 'TRANG CHỦ', to: '/' },
  {
    label: 'GIỚI THIỆU', to: '/gioi-thieu',
    children: [
      { label: 'Tổng quan công ty', to: '/gioi-thieu' },
      { label: 'Sứ mệnh & Tầm nhìn', to: '/gioi-thieu#su-menh' },
      { label: 'Thế mạnh', to: '/gioi-thieu#the-manh' },
      { label: 'Chứng nhận', to: '/chung-nhan' },
    ]
  },
  {
    label: 'SẢN PHẨM', to: '/san-pham',
    children: [
      { label: '🧤 Găng Tay Y Tế', to: '/gang-tay-y-te' },
      { label: '☕ Cà Phê', to: '/ca-phe' },
      { label: '🌿 Nông Sản', to: '/nong-san' },
      { label: '🔥 Than Không Khói', to: '/than-khong-khoi' },
      { label: '🌹 Hoa Hồng Sấy Lạnh', to: '/hoa-hong-say-lanh' },
    ]
  },
  { label: 'OEM', to: '/oem' },
  { label: 'CHUỖI CUNG ỨNG', to: '/chuoi-cung-ung' },
  {
    label: 'TIN TỨC', to: '/tin-tuc',
    children: [
      { label: 'Tin tức sự kiện', to: '/tin-tuc?category=tin-cong-ty' },
      { label: 'Tin tuyển dụng', to: '/tin-tuc?category=tuyen-dung' },
    ]
  },
  { label: 'LIÊN HỆ', to: '/lien-he' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [dropdown, setDropdown] = useState(null)
  const [search, setSearch] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const dropdownTimer = useRef(null)

  useEffect(() => { setOpen(false); setDropdown(null) }, [location])

  const handleMouseEnter = (label) => {
    clearTimeout(dropdownTimer.current)
    setDropdown(label)
  }
  const handleMouseLeave = () => {
    dropdownTimer.current = setTimeout(() => setDropdown(null), 150)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/san-pham?q=${encodeURIComponent(search.trim())}`)
      setSearch('')
    }
  }

  return (
    <header>
      {/* Top bar: logo + company name + hotline + flags + search */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 py-2 flex items-center justify-between gap-4">
          {/* Logo + company name */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img src="/logo.png" alt="Trosie Global" className="w-[70px] h-auto shrink-0" />
            <div className="hidden sm:block">
              <div className="text-[#6B2200] font-bold text-base leading-tight uppercase">CÔNG TY TNHH XUẤT NHẬP KHẨU</div>
              <div className="text-[#6B2200] font-bold text-base leading-tight uppercase">VÀ THƯƠNG MẠI TROSIE</div>
              <div className="text-gray-500 text-xs">TROSIE GLOBAL</div>
            </div>
          </Link>

          {/* Right: hotline + flags + search */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Hotline */}
            <div className="hidden md:flex items-center gap-2 text-[#6B2200]">
              <div className="w-8 h-8 rounded-full border-2 border-[#6B2200] flex items-center justify-center shrink-0">
                <FiPhone size={14} />
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase font-semibold tracking-wider leading-none">HOTLINE</div>
                <div className="font-bold text-base leading-tight">+84 961 393 370</div>
              </div>
            </div>

            {/* Flags VI / EN */}
            <div className="hidden md:flex items-center gap-1">
              <button className="flex items-center gap-1 px-1 py-0.5 border border-transparent hover:border-gray-300 rounded">
                <span className="text-base">🇻🇳</span>
              </button>
              <button className="flex items-center gap-1 px-1 py-0.5 border border-transparent hover:border-gray-300 rounded">
                <span className="text-base">🇬🇧</span>
              </button>
            </div>

            {/* Search */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center border border-gray-300 rounded overflow-hidden">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Tìm kiếm"
                className="px-2 py-1.5 text-xs outline-none w-28"
              />
              <button type="submit" className="bg-gray-100 border-l border-gray-300 px-2 py-1.5 hover:bg-gray-200">
                <FiSearch size={14} className="text-gray-600" />
              </button>
            </form>

            {/* Mobile toggle */}
            <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-gray-700">
              {open ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Brown Navigation Bar */}
      <nav className="bg-[#6B2200] sticky top-0 z-50 shadow-md">
        <div className="max-w-[1200px] mx-auto px-4">
          {/* Desktop menu */}
          <div className="hidden lg:flex items-center">
            {navLinks.map((link) => (
              <div
                key={link.to}
                className="relative"
                onMouseEnter={() => link.children && handleMouseEnter(link.label)}
                onMouseLeave={link.children ? handleMouseLeave : undefined}
              >
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `nav-link flex items-center gap-0.5 text-[13px] ${isActive ? 'bg-[#4A1800]' : ''}`
                  }
                >
                  {link.label}
                  {link.children && <FiChevronDown size={12} className="ml-0.5 opacity-80" />}
                </NavLink>

                {link.children && dropdown === link.label && (
                  <div
                    className="absolute top-full left-0 bg-white shadow-lg border-t-2 border-[#6B2200] min-w-[210px] z-50"
                    onMouseEnter={() => handleMouseEnter(link.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {link.children.map(child => (
                      <Link
                        key={child.to}
                        to={child.to}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#6B2200] hover:text-white transition-colors border-b border-gray-100 last:border-0"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu */}
          {open && (
            <div className="lg:hidden bg-[#6B2200] border-t border-[#4A1800]">
              {navLinks.map((link) => (
                <div key={link.to}>
                  <Link
                    to={link.to}
                    className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-white hover:bg-[#4A1800] border-b border-[#4A1800]"
                    onClick={() => !link.children && setOpen(false)}
                  >
                    {link.label}
                    {link.children && <FiChevronDown size={14} />}
                  </Link>
                  {link.children && (
                    <div className="bg-[#4A1800]">
                      {link.children.map(child => (
                        <Link
                          key={child.to}
                          to={child.to}
                          className="block px-8 py-2.5 text-sm text-amber-100 hover:text-white border-b border-[#6B2200] last:border-0"
                          onClick={() => setOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
