const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(path.join(dataDir, 'xnk.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    detail TEXT,
    image TEXT,
    unit TEXT,
    origin TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    summary TEXT,
    content TEXT,
    image TEXT,
    author TEXT DEFAULT 'TROSIE GARDEN',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS banners (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    subtitle TEXT,
    image TEXT,
    link TEXT,
    sort_order INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS page_content (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    page TEXT NOT NULL,
    key TEXT NOT NULL,
    value TEXT DEFAULT '',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(page, key)
  );
`);

// Seed default admin only if none exists
const adminExists = db.prepare('SELECT id FROM admins WHERE username = ?').get('admin');
if (!adminExists) {
  const hash = bcrypt.hashSync('admin123', 10);
  db.prepare('INSERT INTO admins (username, password) VALUES (?, ?)').run('admin', hash);
}

db.exec(`DELETE FROM products; DELETE FROM news; DELETE FROM banners;`);

const insertProduct = db.prepare(`
  INSERT INTO products (name, slug, category, description, detail, image, unit, origin)
  VALUES (@name, @slug, @category, @description, @detail, @image, @unit, @origin)
`);

const products = [
  {
    name: 'Cà phê Arabica',
    slug: 'ca-phe-arabica',
    category: 'arabica',
    description: 'Cà phê Arabica Việt Nam từ vùng cao Cầu Đất – Đà Lạt, độ cao 1.500m. Hương thơm tinh tế, vị chua thanh đặc trưng, hàm lượng caffeine thấp. Sản phẩm đạt chứng nhận Rainforest Alliance và SCA.',
    detail: `<h3>Thông tin sản phẩm</h3>
<p>Arabica Trosie Garden được trồng tại vùng cao nguyên Lâm Đồng và các vùng núi phía Bắc như Sơn La, Điện Biên. Độ cao trồng từ 1.000–1.800m giúp tạo nên hương vị đặc trưng không thể nhầm lẫn.</p>
<h3>Thông số kỹ thuật</h3>
<ul>
<li>Độ ẩm: ≤ 12.5%</li>
<li>Hạt đen vỡ: ≤ 0.5%</li>
<li>Kích cỡ sàng: 16, 18, 20</li>
<li>Quy trình chế biến: Ướt (Washed), Honey, Natural</li>
</ul>
<h3>Đóng gói</h3>
<ul>
<li>Bao jute 60kg (GrainPro liner tùy chọn)</li>
<li>Container 20ft: ~275–280 bao</li>
</ul>
<h3>Thị trường xuất khẩu</h3>
<p>EU (Đức, Ý, Pháp), Mỹ, Nhật Bản, Hàn Quốc, Úc, Singapore</p>`,
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80',
    unit: 'Tấn',
    origin: 'Cầu Đất – Đà Lạt, Lâm Đồng'
  },
  {
    name: 'Cà phê Robusta',
    slug: 'ca-phe-robusta',
    category: 'robusta',
    description: 'Cà phê Robusta Buôn Ma Thuột – Đắk Lắk, vùng cà phê lớn nhất Đông Nam Á. Vị đậm đà, đắng nhẹ, crema dày lý tưởng cho espresso và cà phê hòa tan.',
    detail: `<h3>Thông tin sản phẩm</h3>
<p>Robusta Trosie Garden xuất xứ từ Đắk Lắk, Đắk Nông, Gia Lai – tam giác cà phê Tây Nguyên. Robusta Việt Nam chiếm gần 40% sản lượng xuất khẩu Robusta toàn cầu.</p>
<h3>Thông số kỹ thuật</h3>
<ul>
<li>Độ ẩm: ≤ 12.5%</li>
<li>Hạt đen vỡ: ≤ 1%</li>
<li>Screen 13, 16 (Size 18 tùy chọn)</li>
<li>Chế biến: Khô (Natural/Dry Process)</li>
</ul>
<h3>Đóng gói</h3>
<ul>
<li>Bao PP 60kg hoặc bulk container</li>
<li>Container 20ft: ~320 bao 60kg</li>
</ul>
<h3>Thị trường xuất khẩu</h3>
<p>Đức, Ý, Bỉ, Tây Ban Nha, Nga, Trung Đông, Philippines</p>`,
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80',
    unit: 'Tấn',
    origin: 'Buôn Ma Thuột, Đắk Lắk'
  },
  {
    name: 'Cà phê đặc sản',
    slug: 'ca-phe-dac-san',
    category: 'specialty',
    description: 'Specialty Coffee Trosie Garden đạt điểm SCA ≥ 82. Trồng theo quy trình canh tác bền vững, chế biến thủ công, truy xuất nguồn gốc đến từng lô đất.',
    detail: `<h3>Thông tin sản phẩm</h3>
<p>Cà phê đặc sản (Specialty Coffee) là phân khúc cao cấp nhất, đòi hỏi điểm số SCA ≥ 80. Trosie Garden cung cấp các lô Single Origin với hồ sơ hương vị chi tiết.</p>
<h3>Phân loại</h3>
<ul>
<li>Cầu Đất Washed: cam, đào, floral</li>
<li>Sơn La Natural: berry, chocolate</li>
<li>Điện Biên Honey: caramel, stone fruit</li>
</ul>
<h3>Tiêu chuẩn</h3>
<ul>
<li>SCA Cupping Score: 82–88+</li>
<li>Rainforest Alliance / Organic certified</li>
<li>Full traceability (farm-to-cup)</li>
</ul>`,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80',
    unit: 'Kg / Tấn',
    origin: 'Cầu Đất, Sơn La, Điện Biên'
  },
  {
    name: 'Cà phê xay',
    slug: 'ca-phe-xay',
    category: 'xay',
    description: 'Cà phê xay sẵn Trosie Garden – rang đậm và rang vừa, xay theo độ mịn phù hợp cho phin, drip, espresso. Đóng gói hút chân không giữ nguyên hương thơm.',
    detail: `<h3>Thông tin sản phẩm</h3>
<p>Cà phê xay Trosie Garden được rang và xay tại nhà máy hiện đại, đảm bảo độ tươi và hương thơm tối ưu. Có thể tùy chỉnh blend theo yêu cầu khách hàng.</p>
<h3>Các dòng sản phẩm</h3>
<ul>
<li>Phin Vietnamese Blend (Robusta 70% + Arabica 30%)</li>
<li>Espresso Blend (Robusta 60% + Arabica 40%)</li>
<li>100% Arabica Single Origin</li>
</ul>
<h3>Đóng gói</h3>
<ul>
<li>Túi giấy valve 250g, 500g, 1kg</li>
<li>Hút chân không hoặc khí N2</li>
<li>OEM/private label theo yêu cầu</li>
</ul>`,
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&q=80',
    unit: 'Kg / Thùng',
    origin: 'Nhà máy Trosie Garden, Hà Nội'
  },
  {
    name: 'Cà phê hòa tan',
    slug: 'ca-phe-hoa-tan',
    category: 'hoa-tan',
    description: 'Cà phê hòa tan nguyên chất Trosie Garden – công nghệ sấy phun Spray Dry và Freeze Dry, giữ nguyên hương thơm tự nhiên. Tiện lợi, phù hợp xuất khẩu đại trà.',
    detail: `<h3>Thông tin sản phẩm</h3>
<p>Cà phê hòa tan Trosie Garden sản xuất theo hai công nghệ chính: Spray Dry (SD) và Freeze Dry (FD), đáp ứng đa dạng phân khúc thị trường.</p>
<h3>Phân loại</h3>
<ul>
<li>Spray Dry (SD): màu nâu, tan nhanh, giá cạnh tranh</li>
<li>Freeze Dry (FD): hạt/vụn thô, giữ hương tốt hơn</li>
<li>3-in-1 blend: cà phê + đường + creamer</li>
</ul>
<h3>Đóng gói xuất khẩu</h3>
<ul>
<li>Thùng carton 25kg (túi PE bên trong)</li>
<li>Túi sachet 2g–20g theo yêu cầu</li>
<li>Private label & OEM</li>
</ul>`,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
    unit: 'Tấn',
    origin: 'Việt Nam'
  },
  {
    name: 'Nhân xanh (Green Bean)',
    slug: 'ca-phe-nhan-xanh',
    category: 'xanh',
    description: 'Cà phê nhân xanh chưa rang – cung cấp cho các nhà rang xay chuyên nghiệp trên toàn thế giới. Đạt tiêu chuẩn ICO Grade 1 và Grade 2.',
    detail: `<h3>Thông tin sản phẩm</h3>
<p>Green Coffee Beans Trosie Garden cung cấp cho roasters quốc tế. Nhân xanh được phân loại bằng máy quang học (optical sorter) đảm bảo đồng đều màu sắc và kích thước.</p>
<h3>Chủng loại</h3>
<ul>
<li>Arabica Green Bean: Cầu Đất, Sơn La (nhiều grades)</li>
<li>Robusta Green Bean: Đắk Lắk, Đắk Nông, Gia Lai</li>
</ul>
<h3>Tiêu chuẩn</h3>
<ul>
<li>ICO Grade 1 / Grade 2</li>
<li>TCVN 4193:2014</li>
<li>Độ ẩm: ≤ 12.5%</li>
</ul>
<h3>Đóng gói</h3>
<ul>
<li>Bao jute 60kg (có GrainPro liner)</li>
<li>Bulk container tùy yêu cầu</li>
</ul>`,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80',
    unit: 'Tấn',
    origin: 'Tây Nguyên & Lâm Đồng, Việt Nam'
  },
  {
    name: 'Cascara',
    slug: 'cascara',
    category: 'cascara',
    description: 'Cascara – trà vỏ quả cà phê phơi khô, thức uống đang trở thành xu hướng toàn cầu. Hương vị trái cây tự nhiên, caffeine nhẹ, giàu chất chống oxy hóa.',
    detail: `<h3>Thông tin sản phẩm</h3>
<p>Cascara là vỏ quả cà phê sau khi tách hạt, phơi khô theo phương pháp truyền thống. Trosie Garden cung cấp cascara từ vùng Arabica Cầu Đất và Sơn La.</p>
<h3>Đặc điểm</h3>
<ul>
<li>Màu sắc: đỏ nâu, khô đều</li>
<li>Hương: hoa quả, hibiscus, tamarind</li>
<li>Độ ẩm: ≤ 12%</li>
<li>Caffeine: ~100mg/l (thấp hơn cà phê thông thường)</li>
</ul>
<h3>Đóng gói</h3>
<ul>
<li>Túi PE 5kg, 10kg, 25kg</li>
<li>Bao kraft cao cấp cho bán lẻ</li>
<li>Private label theo yêu cầu</li>
</ul>`,
    image: 'https://images.unsplash.com/photo-1518057111178-44a106bad636?w=600&q=80',
    unit: 'Kg / Tấn',
    origin: 'Cầu Đất – Đà Lạt & Sơn La'
  },
  {
    name: 'Cà phê chồn',
    slug: 'ca-phe-chon',
    category: 'chon',
    description: 'Cà phê chồn Trosie Garden – một trong những loại cà phê đắt giá nhất thế giới, được tuyển chọn từ trang trại chăn nuôi chồn hương đạt tiêu chuẩn phúc lợi động vật.',
    detail: `<h3>Thông tin sản phẩm</h3>
<p>Cà phê chồn (Weasel Coffee) là sản phẩm cao cấp được sản xuất từ hạt cà phê qua hệ tiêu hóa của chồn hương. Quá trình lên men tự nhiên tạo nên hương vị đặc biệt không lẫn vào đâu được.</p>
<h3>Đặc điểm</h3>
<ul>
<li>Vị: êm, ít đắng, hậu vị caramel kéo dài</li>
<li>Hương: earthy, musty, dark chocolate</li>
<li>Sản lượng giới hạn: 50–100kg/tháng</li>
</ul>
<h3>Đóng gói</h3>
<ul>
<li>Hộp quà cao cấp 100g, 250g</li>
<li>Giấy chứng nhận nguồn gốc kèm theo</li>
<li>Phù hợp thị trường quà biếu, luxury retail</li>
</ul>`,
    image: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?w=600&q=80',
    unit: 'Kg',
    origin: 'Lâm Đồng & Đắk Lắk, Việt Nam'
  }
];

const insertMany = db.transaction((items) => {
  for (const item of items) insertProduct.run(item);
});
insertMany(products);

const insertNews = db.prepare(`
  INSERT INTO news (title, slug, category, summary, content, image, author)
  VALUES (@title, @slug, @category, @summary, @content, @image, @author)
`);

const newsItems = [
  {
    title: 'Trosie Garden ký kết xuất khẩu 200 tấn Arabica sang thị trường EU',
    slug: 'trosie-garden-ky-ket-xuat-khau-arabica-sang-eu',
    category: 'tin-cong-ty',
    summary: 'Công ty TNHH XNK và Thương mại Trosie vừa ký kết hợp đồng cung cấp 200 tấn cà phê Arabica Cầu Đất sang thị trường Đức và Hà Lan, đánh dấu bước phát triển mới.',
    content: `<p>Ngày 10/03/2024, Trosie Garden chính thức ký kết hợp đồng cung cấp 200 tấn cà phê Arabica Grade 1 xuất xứ Cầu Đất – Đà Lạt với hai đối tác tại Đức và Hà Lan.</p>
<p>Đây là hợp đồng có giá trị lớn nhất từ trước đến nay của Trosie Garden với thị trường EU, khẳng định chất lượng cà phê Arabica Việt Nam ngày càng được công nhận tại châu Âu.</p>
<p>Lô hàng đầu tiên dự kiến xuất khẩu vào tháng 5/2024 và hoàn thành trong quý III/2024.</p>`,
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
    author: 'Ban Truyền Thông Trosie Garden'
  },
  {
    title: 'Giá cà phê Robusta tăng lên mức cao kỷ lục trong 30 năm',
    slug: 'gia-ca-phe-robusta-tang-ky-luc',
    category: 'thi-truong',
    summary: 'Giá cà phê Robusta trên sàn ICE London vượt mốc 4.000 USD/tấn lần đầu tiên trong 30 năm, tạo cơ hội vàng cho các nhà xuất khẩu Việt Nam.',
    content: `<p>Giá cà phê Robusta trên sàn ICE Futures Europe (London) đã vượt mốc 4.000 USD/tấn, mức cao nhất trong 30 năm qua, do nguồn cung toàn cầu thắt chặt và nhu cầu từ thị trường châu Á tăng mạnh.</p>
<p>Việt Nam là nước xuất khẩu Robusta lớn nhất thế giới, chiếm khoảng 35–40% sản lượng toàn cầu. Đây là cơ hội lớn cho các doanh nghiệp như Trosie Garden đẩy mạnh xuất khẩu.</p>`,
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80',
    author: 'Phòng Nghiên cứu thị trường'
  },
  {
    title: 'Specialty Coffee Việt Nam ngày càng được ưa chuộng tại Nhật Bản',
    slug: 'specialty-coffee-viet-nam-tai-nhat-ban',
    category: 'thi-truong',
    summary: 'Cà phê đặc sản Việt Nam, đặc biệt là Arabica từ Cầu Đất và Sơn La, đang thu hút sự chú ý mạnh mẽ từ cộng đồng third-wave coffee tại Nhật Bản.',
    content: `<p>Nhật Bản, một trong những thị trường cà phê chất lượng cao khó tính nhất thế giới, đang đón nhận ngày càng nhiều cà phê đặc sản Việt Nam từ các vùng cao như Cầu Đất (Lâm Đồng) và Sơn La.</p>
<p>Theo số liệu từ Japan Coffee Association, lượng nhập khẩu Specialty Coffee từ Việt Nam tăng 45% trong năm 2023, với mức giá trung bình 8–15 USD/kg – cao gấp 3–5 lần Robusta thông thường.</p>`,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80',
    author: 'Phòng Xuất khẩu'
  },
  {
    title: 'Trosie Garden ra mắt dòng cà phê Cascara xuất khẩu',
    slug: 'trosie-garden-ra-mat-cascara-xuat-khau',
    category: 'tin-cong-ty',
    summary: 'Trosie Garden chính thức giới thiệu sản phẩm Cascara – trà vỏ quả cà phê phơi khô – vào danh mục xuất khẩu, hướng tới thị trường niche tại EU và Mỹ.',
    content: `<p>Trosie Garden vừa chính thức bổ sung sản phẩm Cascara vào danh mục xuất khẩu, đánh dấu bước chuyển mình sang các mặt hàng cà phê giá trị gia tăng cao.</p>
<p>Cascara (vỏ quả cà phê phơi khô) đang trở thành xu hướng toàn cầu trong cộng đồng wellness và cà phê đặc sản. Trosie Garden sử dụng nguồn cascara từ vùng Arabica Cầu Đất, đảm bảo chất lượng tối ưu.</p>`,
    image: 'https://images.unsplash.com/photo-1518057111178-44a106bad636?w=800&q=80',
    author: 'Ban Truyền Thông Trosie Garden'
  },
  {
    title: 'Trosie Garden tham dự SCA Expo 2024 tại Chicago',
    slug: 'trosie-garden-sca-expo-2024',
    category: 'su-kien',
    summary: 'Trosie Garden mang đến SCA Expo 2024 tại Chicago bộ sưu tập cà phê đặc sản Single Origin từ Cầu Đất, Sơn La, Điện Biên, thu hút sự chú ý của hàng trăm nhà rang xay quốc tế.',
    content: `<p>Từ ngày 18–21/04/2024, Trosie Garden tham dự Specialty Coffee Association Expo 2024 tại McCormick Place Convention Center, Chicago, Mỹ.</p>
<p>Tại gian hàng, Trosie Garden trưng bày bộ sưu tập Single Origin Arabica gồm 6 lô từ Cầu Đất (Washed, Natural, Honey), Sơn La và Điện Biên. Sản phẩm nhận được phản hồi tích cực từ cộng đồng roasters và buyers quốc tế.</p>`,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    author: 'Ban Truyền Thông Trosie Garden'
  },
  {
    title: 'Chứng nhận Rainforest Alliance cho vùng nguyên liệu Arabica Trosie Garden',
    slug: 'chung-nhan-rainforest-alliance-arabica',
    category: 'tin-cong-ty',
    summary: 'Vùng trồng Arabica liên kết của Trosie Garden tại Cầu Đất – Đà Lạt chính thức đạt chứng nhận Rainforest Alliance, mở cơ hội xuất khẩu sang các thị trường cao cấp EU và Bắc Mỹ.',
    content: `<p>Sau 18 tháng triển khai chương trình canh tác bền vững, vùng trồng Arabica liên kết của Trosie Garden tại huyện Đơn Dương, Lâm Đồng chính thức được cấp chứng nhận Rainforest Alliance 2024.</p>
<p>Trosie Garden là một trong số ít doanh nghiệp xuất khẩu cà phê Việt Nam đạt chứng nhận này, tạo lợi thế cạnh tranh rõ rệt khi tiếp cận các chuỗi bán lẻ cao cấp tại EU và Bắc Mỹ như Starbucks, Lavazza, Illy.</p>`,
    image: 'https://images.unsplash.com/photo-1542601906897-ecd92d0d52f5?w=800&q=80',
    author: 'Phòng Kiểm soát chất lượng'
  }
];

const insertNewsMany = db.transaction((items) => {
  for (const item of items) insertNews.run(item);
});
insertNewsMany(newsItems);

const insertBanner = db.prepare(`
  INSERT INTO banners (title, subtitle, image, link, sort_order)
  VALUES (@title, @subtitle, @image, @link, @sort_order)
`);

const banners = [
  {
    title: '',
    subtitle: '',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&q=80',
    link: '/san-pham',
    sort_order: 1
  },
  {
    title: '',
    subtitle: '',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1600&q=80',
    link: '/san-pham/ca-phe-arabica',
    sort_order: 2
  },
  {
    title: '',
    subtitle: '',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1600&q=80',
    link: '/san-pham/ca-phe-dac-san',
    sort_order: 3
  },
  {
    title: '',
    subtitle: '',
    image: 'https://images.unsplash.com/photo-1518057111178-44a106bad636?w=1600&q=80',
    link: '/san-pham/cascara',
    sort_order: 4
  },
  {
    title: '',
    subtitle: '',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=1600&q=80',
    link: '/san-pham/ca-phe-nhan-xanh',
    sort_order: 5
  }
];

const insertBannersMany = db.transaction((items) => {
  for (const item of items) insertBanner.run(item);
});
insertBannersMany(banners);

console.log('✅ Database seeded successfully!');
console.log(`   - ${products.length} products (Arabica, Robusta, Đặc Sản, Xay, Hòa Tan, Nhân Xanh, Cascara, Chồn)`);
console.log(`   - ${newsItems.length} news articles`);
console.log(`   - ${banners.length} banners`);

db.close();
