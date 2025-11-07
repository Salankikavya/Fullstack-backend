async function loadProducts() {
  const res = await fetch("http://localhost:5000/api/products");
  const products = await res.json();

  const container = document.getElementById("product-list");
  container.innerHTML = products.map(p => `
    <div style="border:1px solid #ccc;padding:10px;margin:10px;border-radius:10px;width:200px;">
      <h3>${p.name}</h3>
      <p>💰 ${p.price} ₹</p>
      <p>${p.description}</p>
      <p>Stock: ${p.stock}</p>
      <button>Add to Cart</button>
    </div>
  `).join('');
}

loadProducts();
