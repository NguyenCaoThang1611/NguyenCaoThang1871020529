$(document).ready(function () {
    // Cập nhật số lượng giỏ hàng
    function updateCartCount() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let count = cart.reduce((total, item) => total + item.quantity, 0);
        $("#cart-count").text(count);
    }

    // Hiển thị giỏ hàng
    function loadCart() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let cartHTML = "";

        if (cart.length === 0) {
            cartHTML = "<p class='text-center text-danger'>Giỏ hàng trống</p>";
        } else {
            cart.forEach((item, index) => {
                cartHTML += `
                <tr>
                    <td><img src="${item.image}" width="50"></td>
                    <td>${item.name}</td>
                    <td>${item.price.toLocaleString()} VND</td>
                    <td>${item.quantity}</td>
                    <td>
                        <button class="btn btn-danger btn-sm remove-item" data-index="${index}">🗑 Xóa</button>
                    </td>
                </tr>`;
            });
        }
        $("#cart-table tbody").html(cartHTML);
    }

    // Xóa sản phẩm khỏi giỏ hàng
    $(document).on("click", ".remove-item", function () {
        let index = $(this).data("index");
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
        updateCartCount();
    });

    // Xóa toàn bộ giỏ hàng khi mua hàng
    $("#checkout").click(function () {
        localStorage.removeItem("cart");
        loadCart();
        updateCartCount();
        alert("🎉 Cảm ơn bạn đã mua hàng! Đơn hàng sẽ sớm được xử lý.");
    });

    // Khởi động
    loadCart();
    updateCartCount();
});
