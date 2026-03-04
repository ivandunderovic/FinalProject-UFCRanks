document.addEventListener('DOMContentLoaded', function () {

  //aktivna stranica u nav 
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(function (link) {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // scroll to top button
  const btn = document.getElementById('scrollToTop');
  if (btn) {
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 80) btn.classList.add('show');
      else btn.classList.remove('show');
    });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  //godina u footeru 
  // (Ako nema <span id="year"> u HTML-u, samo doda novi <p>)
  const footer = document.querySelector('footer');
  if (footer) {
    const p = document.createElement('p');
    p.textContent = "© " + new Date().getFullYear() + " UFC Rankings";
    footer.appendChild(p);
  }

});
