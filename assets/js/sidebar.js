document.addEventListener('DOMContentLoaded', function () {

  // ── 1. Sidebar collapse / expand ────────────────────────
  var sidebar    = document.getElementById('sidebar');
  var toggleBtn  = document.getElementById('sidebarToggle');
  var STORE_KEY  = 'nb-sidebar-collapsed';

  if (!sidebar || !toggleBtn) return;

  // Restore last saved state
  if (localStorage.getItem(STORE_KEY) === 'true') {
    sidebar.classList.add('collapsed');
  }

  toggleBtn.addEventListener('click', function () {
    var collapsed = sidebar.classList.toggle('collapsed');
    localStorage.setItem(STORE_KEY, String(collapsed));
  });

  // ── 2. Section headers (Archive / Labels) ───────────────
  document.querySelectorAll('.section-header').forEach(function (btn) {
    var targetId = btn.getAttribute('data-target');
    var body     = document.getElementById(targetId);
    if (!body) return;

    btn.addEventListener('click', function () {
      var isOpen = body.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  });

  // ── 3. Year toggles ─────────────────────────────────────
  document.querySelectorAll('.year-toggle').forEach(function (btn) {
    var targetId = btn.getAttribute('data-target');
    var list     = document.getElementById(targetId);
    if (!list) return;

    btn.addEventListener('click', function () {
      var isOpen = list.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  });

  // ── 4. Highlight active month ───────────────────────────
  var path = window.location.pathname;
  document.querySelectorAll('.month-item').forEach(function (link) {
    if (link.getAttribute('href') === path) {
      link.classList.add('active');
      // Auto-expand parent year
      var parentList = link.closest('.month-list');
      if (parentList) {
        parentList.classList.add('open');
        var yearBtn = document.querySelector('[data-target="' + parentList.id + '"]');
        if (yearBtn) yearBtn.setAttribute('aria-expanded', 'true');
      }
    }
  });

});
