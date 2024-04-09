document.addEventListener('DOMContentLoaded', function() {
  // Add sorting functionality
  const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

  const comparer = (idx, asc) => (a, b) => ((v1, v2) => 
      v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
      )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

  // Do the work...
  document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
      const table = th.closest('table');
      const tbody = table.querySelector('tbody');
      Array.from(tbody.querySelectorAll('tr'))
          .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
          .forEach(tr => tbody.appendChild(tr) );
  })));

  // Highlight high-price stocks
  const prices = document.querySelectorAll('.price');
  prices.forEach(price => {
      const value = parseFloat(price.textContent.replace('$', '').replace(',', ''));
      if(value > 1000) {
          price.classList.add('high-price');
      }
  });
});
