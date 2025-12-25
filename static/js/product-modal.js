const products = [
  {
    id: 1,
    name: "RAF Fan qızdırıcı 3000W — Model R.1407",
    code: "EL-HT001",
    price: 49.99,
    images: [
      "/static/images/RAF qizdirici main.png",
      "/static/images/raf fan dayan.png",
      "/static/images/raf fan guc.png",
      "/static/images/Raf fan ust.png",
      "/static/images/raf fan.png"
    ],
    highlights: [
      "3000W güclü fan qızdırıcı",
      "Adjustable termostat ilə temperatur tənzimlənməsi",
      "Qızmadan qorunma sistemi",
      "Aşağı səs səviyyəsi"
    ],
    description: "RAF R.1407 3000W fan qızdırıcı geniş məkanların daha sürətli isidilməsi üçün nəzərdə tutulmuşdur."
  },
  {
    id: 2,
    name: "Xiaomi TV Box S (3-cü nəsil) — 4K Ultra-HD",
    code: "EL-TVB002",
    price: 149.99,
    images: [
      "/static/images/xiaotv0.png",
      "/static/images/xiaotv1.png",
      "/static/images/xiaotv2.png"
    ],
    highlights: [
      "4K Ultra-HD görüntü",
      "Google TV platforması",
      "Səsli idarəetmə",
      "Kompakt və rahat"
    ],
    description: "Xiaomi TV Box S adi televizoru smart TV-ə çevirir və Google TV tətbiqlərini dəstəkləyir."
  },
  {
    id: 3,
    name: "Mini simsiz klaviatura + touchpad (Backlit)",
    code: "EL-ACC003",
    price: 13.99,
    images: [
      "/static/images/kb0.png",
      "/static/images/kb1.png"
    ],
    highlights: [
      "Backlit işıqlandırma",
      "Daxili touchpad",
      "Multimedia düymələri",
      "Touchpad həssaslığı tənzimlənir"
    ],
    description: "Mini simsiz klaviatura TV Box və PC üçün idealdır."
  }
];

function showProductDetail(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  document.getElementById('modalProductName').textContent = product.name;
  document.getElementById('modalProductCode').textContent = "Kod: " + product.code;
  document.getElementById('modalProductPrice').textContent = product.price + " AZN";
  document.getElementById('modalMainImage').src = product.images[0];
  document.getElementById('modalDescription').textContent = product.description;

  // Highlights
  const highlights = document.getElementById('modalHighlights');
  highlights.innerHTML = '';
  product.highlights.forEach(h => {
    const li = document.createElement('li');
    li.textContent = "✔ " + h;
    highlights.appendChild(li);
  });

  // Thumbnails
  const thumbContainer = document.getElementById('modalThumbnails');
  thumbContainer.innerHTML = '';
  product.images.forEach((img, index) => {
    const imageEl = document.createElement('img');
    imageEl.src = img;
    if (index === 0) imageEl.classList.add('active');
    imageEl.onclick = () => {
      document.getElementById('modalMainImage').src = img;
      document.querySelectorAll('#modalThumbnails img').forEach(t => t.classList.remove('active'));
      imageEl.classList.add('active');
    };
    thumbContainer.appendChild(imageEl);
  });

  document.getElementById('productModal').classList.remove('hidden');
}

function closeProductModal() {
  document.getElementById('productModal').classList.add('hidden');
}
