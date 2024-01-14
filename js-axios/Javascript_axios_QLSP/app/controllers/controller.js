/**
 * GET: lấy danh sách, lấy chi tiết
 * POST: tạo mới
 * PUT: cập nhật
 * DELETE: xoá
 */

function turnOnLoading() {
  document.getElementById("spinner").style.display = "block";
}
function turnOffLoading() {
  document.getElementById("spinner").style.display = "none";
}
function reset() {
  var listInput = document.querySelectorAll("input");
  for (var i = 0; i < listInput.length; i++) {
    listInput[i].value = "";
  }
}

var idEdited = null;


function renderProducts(productArray) {
  var contentHTML = "";
  for (var i = productArray.length - 1; i >= 0; i--) {
    var product = productArray[i];
    var trString = ` <tr>
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>${product.price}</td>
                        <td>${product.img}</td>
                        <td>${product.desc}</td>
                        <td>

                        <button
                        onclick=xoaSp(${product.id})

                        class="btn btn-info">Delete</button>
                        <button onclick=editproduct(${product.id}) class="btn btn-danger">Edit</button>
                        </td>
                    </tr>`;

    contentHTML = contentHTML + trString;
  }
  document.getElementById("tblDanhSachSP").innerHTML = contentHTML;
}
// gọi api lấy danh sách sản phẩm hiện có từ server
function fetchProductList() {
  turnOnLoading();
  axios({
    url: "https://6597f77e668d248edf23cf9c.mockapi.io/product",
    method: "GET",
  })
    .then(function (res) {
      console.log("😀 - res", res.data);
      // gọi hàm renderProducts sau khi lấy data từ server
      renderProducts(res.data);
      turnOffLoading();
    })
    .catch(function (err) {
      console.log("😀 - err", err);
      turnOffLoading();
    });
}
fetchProductList();

//   xoá 1 sp từ server
function xoaSp(id) {
  //   gọi api xoá sp
  turnOnLoading();
  axios({
    url: `https://6597f77e668d248edf23cf9c.mockapi.io/product/${id}`,
    method: "DELETE",
  })
    .then(function (res) {
      // xoá thành công , gọi lại api lấy dssp mới nhất từ server
      fetchProductList();
      console.log("😀 - res", res.data);
    })
    .catch(function (err) {
      // xoá thất bại
      turnOffLoading();
      console.log("😀 - err", err);
    });
}

// thêm 1 sp ( thêm trên server)

function createProduct() {
  var tenSp = document.getElementById("TenSP").value;
  var giaSP = document.getElementById("GiaSP").value;
  var hinhSP = document.getElementById("HinhSP").value;
  var motaSp = document.getElementById("MotaSP").value;
  var sp = {
    name: tenSp,
    price: giaSP,
    img: hinhSP,
    desc: motaSp,
  };
  console.log(sp);
  axios({
    url: "https://6597f77e668d248edf23cf9c.mockapi.io/product",
    method: "POST",
    data: sp,
  })
    .then(function (res) {
      console.log("createPruduct success", res);
      fetchProductList();
      $("#myModal").modal("hide");
      reset();
    })
    .catch(function (err) {
      console.log("createProduct err");
    });
}
function editproduct(id) {
  idEdited = id;

  axios({
    url: `https://6597f77e668d248edf23cf9c.mockapi.io/product/${id}`,
    method: "GET",
  })
    .then(function (res) {
      console.log("getdata success", res.data);
      $("#myModal").modal("show");
      var sp = res.data;
      document.getElementById("TenSP").value = sp.name;
      document.getElementById("GiaSP").value = sp.price;
      document.getElementById("HinhSP").value = sp.img;
      document.getElementById("MotaSP").value = sp.desc;
    })
    .catch(function (err) {
      console.log("getdata err");
    });
}
function updateProd() {
  var tenSp = document.getElementById("TenSP").value;
  var giaSP = document.getElementById("GiaSP").value;
  var hinhSP = document.getElementById("HinhSP").value;
  var motaSp = document.getElementById("MotaSP").value;
  var sp = {
    name: tenSp,
    price: giaSP,
    img: hinhSP,
    desc: motaSp,
  };
  turnOnLoading();
  axios({
    url: `https://6597f77e668d248edf23cf9c.mockapi.io/product/${idEdited}`,
    method: "PUT",
    data: sp,
  })
    .then(function (res) {
      $("#myModal").modal("hide");
      fetchProductList();
      reset();
    })
    .catch(function (err) {
      turnOffLoading();
    });
}
