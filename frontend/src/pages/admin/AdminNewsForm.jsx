import { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { FiArrowLeft, FiUpload } from 'react-icons/fi'

const api = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` } })

const toSlug = str => str.toLowerCase()
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/đ/g, 'd').replace(/[^a-z0-9\s-]/g, '')
  .replace(/\s+/g, '-').replace(/-+/g, '-').trim()

export default function AdminNewsForm() {
  const { id } = useParams()
  const isNew = id === 'new'
  const navigate = useNavigate()
  const fileRef = useRef()

  const [form, setForm] = useState({
    title: '', slug: '', category: 'tin-cong-ty', summary: '', content: '', image: '', author: 'Admin'
  })
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isNew) {
      axios.get(`/api/admin/news`, api())
        .then(r => {
          const item = r.data.find(n => n.id === parseInt(id))
          if (item) setForm({ title: item.title, slug: item.slug, category: item.category, summary: item.summary || '', content: item.content || '', image: item.image || '', author: item.author || 'Admin' })
        })
        .catch(() => navigate('/admin/login'))
    }
  }, [id])

  const handleTitleChange = (e) => {
    const title = e.target.value
    setForm(f => ({ ...f, title, slug: isNew ? toSlug(title) : f.slug }))
  }

  const handleUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const fd = new FormData()
      fd.append('image', file)
      const { data } = await axios.post('/api/admin/upload', fd, {
        headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}`, 'Content-Type': 'multipart/form-data' }
      })
      setForm(f => ({ ...f, image: data.url }))
    } catch (err) {
      setError(err.response?.data?.error || 'Upload thất bại')
    }
    setUploading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      if (isNew) {
        await axios.post('/api/admin/news', form, api())
      } else {
        await axios.put(`/api/admin/news/${id}`, form, api())
      }
      navigate('/admin/news')
    } catch (err) {
      setError(err.response?.data?.error || 'Lưu thất bại')
    }
    setSaving(false)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/admin/news" className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
          <FiArrowLeft size={18} />
        </Link>
        <h1 className="text-xl font-black text-gray-900">{isNew ? 'Thêm bài viết mới' : 'Sửa bài viết'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Tiêu đề *</label>
          <input type="text" required value={form.title} onChange={handleTitleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B2200]"
            placeholder="Nhập tiêu đề bài viết" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Slug *</label>
            <input type="text" required value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B2200]"
              placeholder="tieu-de-bai-viet" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Danh mục</label>
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B2200] bg-white">
              <option value="tin-cong-ty">Tin công ty</option>
              <option value="thi-truong">Thị trường</option>
              <option value="su-kien">Sự kiện</option>
              <option value="tuyen-dung">Tuyển dụng</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Tác giả</label>
          <input type="text" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B2200]"
            placeholder="Admin" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Ảnh đại diện</label>
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <input type="text" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B2200]"
                placeholder="URL ảnh hoặc upload bên dưới" />
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
            <button type="button" onClick={() => fileRef.current.click()} disabled={uploading}
              className="flex items-center gap-1.5 bg-gray-100 border border-gray-300 text-gray-700 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200 disabled:opacity-60 whitespace-nowrap">
              <FiUpload size={14} /> {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          {form.image && (
            <img src={form.image} alt="" className="mt-2 h-28 w-auto rounded-lg object-cover border border-gray-200" />
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Tóm tắt</label>
          <textarea rows={2} value={form.summary} onChange={e => setForm({ ...form, summary: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B2200] resize-none"
            placeholder="Mô tả ngắn hiển thị trên danh sách tin" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Nội dung bài viết</label>
          <textarea rows={10} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B2200] resize-y font-mono"
            placeholder="Nhập nội dung bài viết (xuống dòng để tách đoạn)..." />
          <p className="text-xs text-gray-400 mt-1">Mỗi dòng trống sẽ tạo đoạn văn mới khi hiển thị</p>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving}
            className="bg-[#6B2200] text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-[#4A1800] transition-colors disabled:opacity-60">
            {saving ? 'Đang lưu...' : (isNew ? 'Tạo bài viết' : 'Lưu thay đổi')}
          </button>
          <Link to="/admin/news" className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors">
            Hủy
          </Link>
        </div>
      </form>
    </div>
  )
}
