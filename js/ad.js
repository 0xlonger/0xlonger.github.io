fetch('/partials/ad.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('ad').innerHTML = data;
  })
  .catch(error => {
    console.error('Error loading ad:', error);
  })