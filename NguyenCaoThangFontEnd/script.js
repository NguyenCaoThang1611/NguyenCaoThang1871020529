$(document).ready(function() {
    function loadProducts(category = 'all') {
        $.getJSON('http://localhost:3001/products', function(data) {
            let productHTML = '';
            data.forEach(product => {
                if (category === 'all' || product.category === category) {
                    productHTML += `
                        <div class="col-md-4 mb-4">
                            <div class="card h-100 shadow-sm">
                                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                                <div class="card-body">
                                    <h5 class="card-title">${product.name}</h5>
                                    <p class="card-text">${product.description}</p>
                                    <p class="fw-bold text-danger">Giá: ${product.price.toLocaleString()} VND</p>
                                    <button class="btn btn-success add-to-cart" data-id="${product.id}">Thêm vào Giỏ</button>
                                </div>
                            </div>
                        </div>
                    `;
                }
            });
            $('#product-list').html(productHTML);
        });
    }

    // Gọi API khi trang tải
    loadProducts();

    // Lọc sản phẩm theo danh mục
    $('#category-filter').change(function() {
        let selectedCategory = $(this).val();
        loadProducts(selectedCategory);
    });

    // Xử lý thêm vào giỏ hàng
    $(document).on('click', '.add-to-cart', function() {
        let productId = $(this).data('id');
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let existingProduct = cart.find(item => item.id === productId);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ id: productId, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert('Sản phẩm đã được thêm vào giỏ hàng!');
        updateCartCount();
    });

    // Cập nhật số lượng giỏ hàng
    function updateCartCount() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        $('#cart-count').text(totalCount);
    }

    updateCartCount();
});
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    $('#cart-count').text(totalCount);
}

// Gọi hàm này khi trang tải
updateCartCount();
$(document).on('click', '.add-to-cart', function() {
    let productId = $(this).data('id');

    if (!productId) {
        alert("Không thể thêm sản phẩm vào giỏ hàng!");
        return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let existingProduct = cart.find(item => item.id === productId);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert('Sản phẩm đã được thêm vào giỏ hàng!');
});
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    $('#cart-count').text(totalCount);
}

// Gọi hàm này khi trang tải
updateCartCount();

$(document).ready(function () {
    function updateCartCount() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        $("#cart-count").text(totalItems);
    }

    $(".add-to-cart").click(function () {
        let card = $(this).closest(".card");
        let product = {
            id: $(this).data("id"),
            name: card.find(".card-title").text(),
            price: parseInt(card.find(".fw-bold.text-danger").text().replace(/\D/g, "")),
            image: card.find(".card-img-top").attr("src"),
            quantity: 1,
        };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push(product);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Sản phẩm đã được thêm vào giỏ hàng!");
        updateCartCount();
    });

    updateCartCount(); // Cập nhật số lượng ngay khi tải trang
});
