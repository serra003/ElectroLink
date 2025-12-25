document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById('productModal');
    const modalMain = document.getElementById('modalMainImage');
    const modalThumbs = document.getElementById('modalThumbnails');
    const modalName = document.getElementById('modalName');
    const modalCode = document.getElementById('modalCode');
    const modalPrice = document.getElementById('modalPrice');
    const modalStock = document.getElementById('modalStock');
    const modalDescription = document.getElementById('modalDescription');
    const modalHighlights = document.getElementById('modalHighlights');
    const modalQty = document.getElementById('modalQty');

    let currentIndex = 0;

    // Close modal on X or outside click
    document.querySelector(".close")?.addEventListener("click", () => modal.style.display = 'none');
    modal.addEventListener("click", e => { if(e.target === modal) modal.style.display='none'; });

    // Render products grid
    const grid = document.getElementById("productGrid");
    products.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${p.images[0]}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>${p.price} AZN</p>
        `;
        card.addEventListener("click", () => openModal(p));
        grid.appendChild(card);
    });

    function openModal(product){
        modal.style.display = 'flex';
        modalName.textContent = product.name;
        modalCode.textContent = 'Kod: ' + product.code;
        modalPrice.textContent = product.price + ' AZN';
        modalStock.textContent = product.stock>0?'Stokda mövcuddur':'Stokda yoxdur';
        modalDescription.textContent = product.description;
        modalHighlights.innerHTML = product.highlights.map(h => `<li><i class="fas fa-check"></i>${h}</li>`).join('');
        modalQty.value = 1;

        currentIndex = 0;
        modalMain.src = product.images[0];
        modalThumbs.innerHTML = '';
        product.images.forEach((img, i) => {
            const thumb = document.createElement('img');
            thumb.src = img;
            if(i===0) thumb.classList.add('active');
            thumb.addEventListener('click', () => {
                currentIndex = i;
                modalMain.src = img;
                modalThumbs.querySelectorAll('img').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
            modalThumbs.appendChild(thumb);
        });
    }

    // Quantity buttons
    window.increaseQtyModal = () => { modalQty.value = parseInt(modalQty.value)+1; };
    window.decreaseQtyModal = () => { if(modalQty.value>1) modalQty.value = parseInt(modalQty.value)-1; };

    window.orderNowModal = () => {
        const qty = parseInt(modalQty.value);
        const name = modalName.textContent;
        const code = modalCode.textContent.split(': ')[1];
        const price = parseFloat(modalPrice.textContent);
        const msg = `Salam! Aşağıdakı məhsulu sifariş etmək istəyirəm:\n\n${name}\nKod: ${code}\nQiymət: ${price} AZN\nMiqdar: ${qty}\nToplam: ${price*qty} AZN`;
        window.open('https://wa.me/994105051615?text=' + encodeURIComponent(msg));
    };

    window.addToCartModal = () => alert('Səbətə əlavə edildi!');
});
