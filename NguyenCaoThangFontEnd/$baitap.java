$(document).ready(function () {
  $.get("http://localhost:3001/products", function (data) {
    let productList = $("#product-list");
    data.forEach(product => {
      productList.append(`
        <div class="col-md-4 mb-4">
          <div class="card">
            <img src="${product.image}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.price.toLocaleString()} VNĐ</p>
              <button class="btn btn-primary">Thêm vào giỏ hàng</button>
            </div>
          </div>
        </div>
      `);
    });
  });
});

$(document).on("click", ".btn-primary", function () {
  let productName = $(this).siblings(".card-title").text();
  alert(`Đã thêm ${productName} vào giỏ hàng!`);
});

$("#add-product-form").submit(function (e) {
  e.preventDefault();
  let newProduct = {
    name: $("#product-name").val(),
    price: parseInt($("#product-price").val()),
    image: $("#product-image").val()
  };
  $.post("http://localhost:3001/products", newProduct, function () {
    alert("Sản phẩm đã được thêm!");
  });
});