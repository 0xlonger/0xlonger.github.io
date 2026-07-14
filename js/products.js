fetch('/partials/products.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('products').innerHTML = data;
  })
  .catch(error => {
    console.error('Error loading footer:', error);
  })