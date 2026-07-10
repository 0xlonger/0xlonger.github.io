fetch('/partials/nav-products.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('nav-products').innerHTML = data;
  })
  .catch(error => {
    console.error('Error loading nav-products:', error);
  })