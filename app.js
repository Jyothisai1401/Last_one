/**
 * VOYAGR — Travel Web Application
 * app.js — Complete JavaScript Logic
 *
 * Covers:
 *  - Authentication (Login / Register / Logout) with full validation
 *  - Hero slider with auto-advance
 *  - Animated stat counters
 *  - Destination cards with wishlist & filter
 *  - Experiences & Deals dynamic rendering
 *  - Testimonial carousel
 *  - Search bar with swap & tab switching
 *  - Newsletter subscription
 *  - Toast notification system
 *  - Scroll animations (IntersectionObserver)
 *  - Navbar scroll state
 *  - Persistent localStorage session
 */

'use strict';

/* ============================================================
   DATA
   ============================================================ */

const DESTINATIONS = [
  { id:1, name:'Santorini',    country:'Greece',        category:'beach',     price:1299, rating:4.9, badge:'Popular', img:'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600' },
  { id:2, name:'Kyoto',        country:'Japan',         category:'cultural',  price:1650, rating:4.8, badge:'Trending', img:'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600' },
  { id:3, name:'Patagonia',    country:'Argentina',     category:'adventure', price:2100, rating:4.7, badge:'Remote',   img:'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600' },
  { id:4, name:'Maldives',     country:'Indian Ocean',  category:'beach',     price:3200, rating:5.0, badge:'Luxury',  img:'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600' },
  { id:5, name:'Tuscany',      country:'Italy',         category:'cultural',  price:1450, rating:4.8, badge:'Classic', img:'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=600' },
  { id:6, name:'Banff',        country:'Canada',        category:'mountain',  price:1800, rating:4.9, badge:'Nature',  img:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600' },
  { id:7, name:'New York',     country:'USA',           category:'city',      price:1100, rating:4.7, badge:'Iconic',  img:'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=600' },
  { id:8, name:'Bali',         country:'Indonesia',     category:'beach',     price:1350, rating:4.8, badge:'Serene', img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600' },
  { id:9, name:'Pamukkale',    country:'Türkiye',       category:'cultural',  price:890,  rating:4.6, badge:'Hidden',  img:'https://images.unsplash.com/photo-1589561454226-796a8aa89b05?w=600' },
  { id:10, name:'Swiss Alps',  country:'Switzerland',   category:'mountain',  price:2450, rating:4.9, badge:'Premium', img:'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600' },
  { id:11, name:'Dubai',       country:'UAE',           category:'city',      price:1750, rating:4.7, badge:'Modern',  img:'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600' },
  { id:12, name:'Amazon',      country:'Brazil',        category:'adventure', price:2200, rating:4.6, badge:'Wild',    img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600' },
];

const EXPERIENCES = [
  { id:1, name:'Private Sunset Sailing',   location:'Santorini, Greece',   tag:'Water',       price:189, desc:'Glide across the caldera as the sun melts into the Aegean on a private catamaran.', img:'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600' },
  { id:2, name:'Tea Ceremony Masterclass', location:'Kyoto, Japan',         tag:'Cultural',    price:75,  desc:'Learn the 1,000-year-old art of Japanese tea ceremony with a local sensei.', img:'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600' },
  { id:3, name:'Northern Lights Safari',   location:'Tromsø, Norway',       tag:'Adventure',   price:320, desc:'Chase the aurora borealis deep into the Arctic wilderness under expert guidance.', img:'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600' },
  { id:4, name:'Truffle Hunting in Dordogne', location:'Périgord, France',  tag:'Culinary',    price:145, desc:'Hunt black truffles with trained dogs then cook them in a Périgord farmhouse kitchen.', img:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600' },
  { id:5, name:'Volcano Trekking',         location:'Bromo, Indonesia',     tag:'Adventure',   price:95,  desc:'Summit the active crater of Mt. Bromo at dawn for an otherworldly sunrise spectacle.', img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600' },
  { id:6, name:'Desert Stargazing Camp',   location:'Sahara, Morocco',      tag:'Astronomy',   price:210, desc:'Sleep in a luxury Bedouin tent and stargaze in one of the darkest skies on Earth.', img:'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600' },
  { id:7, name:'Whale Watching Expedition',location:'Azores, Portugal',     tag:'Wildlife',    price:155, desc:'Encounter sperm and blue whales in their natural habitat with marine biologists.', img:'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600' },
  { id:8, name:'Flamenco Immersion',       location:'Seville, Spain',       tag:'Cultural',    price:90,  desc:'Train with a professional flamenco dancer in an intimate Sevillano studio.', img:'https://images.unsplash.com/photo-1552083375-1447ce886485?w=600' },
];

const DEALS = [
  { id:1,  name:'Bali Bliss Package',      desc:'7 nights villa stay with daily breakfast, sunset cruise & spa day included.', price:2499, oldPrice:3899, nights:7, tag:'38% OFF', expires:'2026-06-15', img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=700', includes:['Flights', 'Villa', 'Meals', 'Tours'] },
  { id:2,  name:'Swiss Grand Tour',         desc:'10-day iconic Swiss journey through Lucerne, Zermatt & St. Moritz with private transfers.', price:4199, oldPrice:5800, nights:10, tag:'28% OFF', expires:'2026-05-30', img:'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=700', includes:['Train Pass', 'Hotels', 'Breakfast'] },
  { id:3,  name:'Maldives Overwater Escape', desc:'5 nights in an overwater bungalow with snorkelling, dolphin cruise & all-inclusive dining.', price:5990, oldPrice:8500, nights:5, tag:'30% OFF', expires:'2026-07-01', img:'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=700', includes:['All-Inclusive', 'Bungalow', 'Watersports'] },
];

const TESTIMONIALS = [
  { name:'Sophia Laurent',   trip:'Paris & Côte d\'Azur',  stars:5, quote:'Every detail was perfection. The private chateau dinner arranged by VOYAGR was a memory I\'ll carry forever. Truly effortless luxury.', avatar:'https://i.pravatar.cc/80?img=1' },
  { name:'James Okonkwo',    trip:'Patagonia Expedition',   stars:5, quote:'The guides were extraordinary. Waking up to a glacier view after a day\'s trek — VOYAGR turned a dream trip into reality.', avatar:'https://i.pravatar.cc/80?img=3' },
  { name:'Priya Nair',       trip:'Kyoto & Tokyo',          stars:5, quote:'Seamless from start to finish. The cherry blossom timing was flawless — the team clearly knows Japan inside-out. Exceptional service.', avatar:'https://i.pravatar.cc/80?img=5' },
  { name:'Marco Ferreira',   trip:'Amalfi Coast Drive',     stars:5, quote:'Driving a vintage Ferrari along the Amalfi coast — only possible because of VOYAGR\'s connections. Absolutely surreal.', avatar:'https://i.pravatar.cc/80?img=7' },
  { name:'Aiko Tanaka',      trip:'Iceland Ring Road',      stars:5, quote:'The Northern Lights tour at midnight was breathtaking. Our guide found perfect viewing spots locals don\'t even know about.', avatar:'https://i.pravatar.cc/80?img=9' },
  { name:'Chloé Beaumont',   trip:'Morocco Desert Journey', stars:5, quote:'Sleeping under the Saharan stars in a luxury camp with VOYAGR was the most magical night of my life. Pure poetry.', avatar:'https://i.pravatar.cc/80?img=11' },
];

/* ============================================================
   STATE
   ============================================================ */

const state = {
  currentUser:   JSON.parse(localStorage.getItem('voyagr_user')) || null,
  wishlist:      JSON.parse(localStorage.getItem('voyagr_wishlist')) || [],
  heroIndex:     0,
  testimonialIdx: 0,
  destFilter:    'all',
  destShowAll:   false,
};

const DEST_INITIAL = 6;

/* ============================================================
   UTILITIES
   ============================================================ */

function $(id) { return document.getElementById(id); }

function showToast(msg, type = 'success', duration = 3000) {
  const t = $('toast');
  t.textContent = msg;
  t.className = `toast ${type}`;
  t.classList.remove('hidden');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.add('hidden'), duration);
}

function setLoading(btnId, loading) {
  const btn = $(btnId);
  if (!btn) return;
  const txt = btn.querySelector('span');
  const spin = btn.querySelector('.btn-spinner');
  if (loading) { txt.style.opacity = '0'; spin.classList.remove('hidden'); btn.disabled = true; }
  else          { txt.style.opacity = '1'; spin.classList.add('hidden');    btn.disabled = false; }
}

function clearErrors(...ids) {
  ids.forEach(id => { const el = $(id); if (el) { el.textContent = ''; } });
}

function setError(id, msg) {
  const el = $(id);
  if (el) el.textContent = msg;
}

function markInputError(inputId, hasError) {
  const el = $(inputId);
  if (el) el.classList.toggle('error', hasError);
}

function formatPrice(n) {
  return n.toLocaleString('en-US');
}

function daysUntil(dateStr) {
  const diff = new Date(dateStr) - new Date();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

/* ============================================================
   LOADER
   ============================================================ */

window.addEventListener('load', () => {
  setTimeout(() => {
    $('loader').classList.add('fade-out');
    initApp();
  }, 2000);
});

function initApp() {
  renderDestinations();
  renderExperiences();
  renderDeals();
  renderTestimonials();
  initHeroSlider();
  animateStats();
  initScrollAnimations();
  initNavbar();
  updateAuthUI();
  updateWishlistBadge();
  setDefaultDates();
}

/* ============================================================
   NAVBAR
   ============================================================ */

function initNavbar() {
  const nav = $('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
}

function toggleMenu() {
  const menu = $('mobileMenu');
  menu.classList.toggle('hidden');
}

/* ============================================================
   HERO SLIDER
   ============================================================ */

let heroTimer = null;

function initHeroSlider() {
  heroTimer = setInterval(() => {
    const slides = document.querySelectorAll('.hero-slide');
    const dots   = document.querySelectorAll('.dot');
    slides[state.heroIndex].classList.remove('active');
    dots[state.heroIndex].classList.remove('active');
    state.heroIndex = (state.heroIndex + 1) % slides.length;
    slides[state.heroIndex].classList.add('active');
    dots[state.heroIndex].classList.add('active');
  }, 5000);
}

function goSlide(index) {
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.dot');
  slides[state.heroIndex].classList.remove('active');
  dots[state.heroIndex].classList.remove('active');
  state.heroIndex = index;
  slides[state.heroIndex].classList.add('active');
  dots[state.heroIndex].classList.add('active');
  clearInterval(heroTimer);
  initHeroSlider();
}

/* ============================================================
   ANIMATED COUNTERS
   ============================================================ */

function animateStats() {
  const statNums = document.querySelectorAll('.stat-num[data-target]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => observer.observe(el));
}

function countUp(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current).toLocaleString();
    if (current >= target) clearInterval(timer);
  }, 16);
}

/* ============================================================
   SCROLL ANIMATIONS
   ============================================================ */

function initScrollAnimations() {
  document.querySelectorAll('.section-header, .dest-card, .exp-card, .deal-card, .t-card')
    .forEach(el => el.classList.add('fade-up'));

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => io.observe(el));
}

/* ============================================================
   DESTINATIONS
   ============================================================ */

function renderDestinations() {
  const grid = $('destGrid');
  grid.innerHTML = '';

  const filtered = state.destFilter === 'all'
    ? DESTINATIONS
    : DESTINATIONS.filter(d => d.category === state.destFilter);

  const visible = state.destShowAll ? filtered : filtered.slice(0, DEST_INITIAL);

  visible.forEach((dest, i) => {
    const inWish = state.wishlist.some(w => w.id === dest.id);
    const card = document.createElement('div');
    card.className = 'dest-card reveal';
    card.style.animationDelay = `${i * 0.07}s`;
    card.innerHTML = `
      <img src="${dest.img}" alt="${dest.name}" loading="lazy"/>
      <div class="dest-overlay">
        <div class="dest-name">${dest.name}</div>
        <div class="dest-meta">
          <span class="dest-country">${dest.country}</span>
          <span class="dest-rating">★ ${dest.rating}</span>
        </div>
        <div class="dest-meta" style="margin-top:0.3rem">
          <span class="dest-price">From <strong>$${formatPrice(dest.price)}</strong></span>
          <button class="btn-primary" style="font-size:0.75rem;padding:0.4rem 1rem"
            onclick="openBooking(event,${dest.id})">Book</button>
        </div>
      </div>
      ${dest.badge ? `<div class="dest-badge">${dest.badge}</div>` : ''}
      <button class="dest-wish ${inWish ? 'active' : ''}" onclick="toggleWish(event,${dest.id})"
        title="${inWish ? 'Remove from wishlist' : 'Save to wishlist'}">${inWish ? '♥' : '♡'}</button>
    `;
    grid.appendChild(card);
  });

  const cta = document.querySelector('.section-cta button');
  if (cta) {
    cta.innerHTML = state.destShowAll
      ? 'Show Less <span>↑</span>'
      : `View All ${DESTINATIONS.length} Destinations <span>→</span>`;
  }
}

function filterDest(btn, category) {
  document.querySelectorAll('#destFilters .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  state.destFilter = category;
  state.destShowAll = false;
  renderDestinations();
}

function loadMoreDest() {
  state.destShowAll = !state.destShowAll;
  renderDestinations();
}

/* ============================================================
   EXPERIENCES
   ============================================================ */

function renderExperiences() {
  const grid = $('expGrid');
  grid.innerHTML = EXPERIENCES.map(exp => `
    <div class="exp-card fade-up">
      <div class="exp-img-wrap">
        <img src="${exp.img}" alt="${exp.name}" loading="lazy"/>
        <span class="exp-tag">${exp.tag}</span>
      </div>
      <div class="exp-body">
        <h3 class="exp-name">${exp.name}</h3>
        <p class="exp-desc">${exp.desc}</p>
        <div class="exp-footer">
          <div class="exp-price">From <strong>$${exp.price}</strong><span style="font-size:0.75rem;color:var(--muted)"> / person</span></div>
          <button class="exp-cta" onclick="openBookingExp(${exp.id})">Book Now →</button>
        </div>
      </div>
    </div>
  `).join('');
}

/* ============================================================
   DEALS
   ============================================================ */

function renderDeals() {
  const grid = $('dealsGrid');
  grid.innerHTML = DEALS.map(deal => `
    <div class="deal-card fade-up">
      <div class="deal-img-wrap">
        <img src="${deal.img}" alt="${deal.name}" loading="lazy"/>
        <span class="deal-badge">${deal.tag}</span>
        <span class="deal-countdown">⏱ ${daysUntil(deal.expires)} days left</span>
      </div>
      <div class="deal-body">
        <h3 class="deal-name">${deal.name}</h3>
        <p class="deal-desc">${deal.desc}</p>
        <div class="deal-info">
          <span>🌙 ${deal.nights} Nights</span>
          ${deal.includes.map(i => `<span>✓ ${i}</span>`).join('')}
        </div>
      </div>
      <div class="deal-footer">
        <div class="deal-price">
          <div class="old">$${formatPrice(deal.oldPrice)}</div>
          <span class="new">$${formatPrice(deal.price)}</span>
          <span class="per"> /person</span>
        </div>
        <button class="btn-primary" onclick="openBookingDeal(${deal.id})">Book Deal</button>
      </div>
    </div>
  `).join('');
}

/* ============================================================
   TESTIMONIALS
   ============================================================ */

function renderTestimonials() {
  const track = $('testimonialTrack');
  track.innerHTML = TESTIMONIALS.map(t => `
    <div class="t-card fade-up">
      <div class="t-stars">${'★'.repeat(t.stars)}</div>
      <p class="t-quote">"${t.quote}"</p>
      <div class="t-author">
        <img src="${t.avatar}" alt="${t.name}" class="t-avatar"/>
        <div>
          <div class="t-name">${t.name}</div>
          <div class="t-trip">${t.trip}</div>
        </div>
      </div>
    </div>
  `).join('');
}

let tOffset = 0;

function nextTestimonial() {
  const cards = document.querySelectorAll('.t-card');
  const visible = window.innerWidth < 700 ? 1 : 3;
  tOffset = Math.min(tOffset + 1, cards.length - visible);
  scrollTestimonial();
}

function prevTestimonial() {
  tOffset = Math.max(tOffset - 1, 0);
  scrollTestimonial();
}

function scrollTestimonial() {
  const card = document.querySelector('.t-card');
  if (!card) return;
  const cardW = card.offsetWidth + 24;
  $('testimonialTrack').style.transform = `translateX(-${tOffset * cardW}px)`;
}

/* ============================================================
   SEARCH BAR
   ============================================================ */

function setDefaultDates() {
  const today = new Date();
  const next  = new Date(today); next.setDate(today.getDate() + 14);
  const fmt   = d => d.toISOString().split('T')[0];
  $('searchDepart').value = fmt(today);
  $('searchReturn').value = fmt(next);
}

function setSearchTab(btn, type) {
  document.querySelectorAll('.s-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const fromLabel = $('searchFrom').previousElementSibling;
  const toLabel   = $('searchTo').previousElementSibling;
  if (type === 'hotels')      { fromLabel.textContent = 'Location'; toLabel.closest('.s-input-wrap').style.display='none'; }
  else if (type === 'experiences') { fromLabel.textContent = 'Where'; toLabel.closest('.s-input-wrap').style.display='none'; }
  else { fromLabel.textContent = 'From'; toLabel.closest('.s-input-wrap').style.display='flex'; }
}

function swapLocations() {
  const a = $('searchFrom');
  const b = $('searchTo');
  [a.value, b.value] = [b.value, a.value];
  a.style.animation = 'none'; b.style.animation = 'none';
  setTimeout(() => { a.style.animation=''; b.style.animation=''; }, 50);
}

function handleSearch() {
  const from    = $('searchFrom').value.trim();
  const to      = $('searchTo').value.trim();
  const depart  = $('searchDepart').value;
  const returnD = $('searchReturn').value;
  const guests  = $('searchGuests').value;

  if (!from) { showToast('Please enter your departure location', 'error'); $('searchFrom').focus(); return; }

  const btn = document.querySelector('.search-btn');
  const orig = btn.textContent;
  btn.textContent = 'Searching...';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = orig;
    btn.disabled = false;
    showToast(`Found results for "${from}${to ? ' → ' + to : ''}" — ${guests}, ${depart}`, 'success');
  }, 1800);
}

/* ============================================================
   WISHLIST
   ============================================================ */

function toggleWish(e, id) {
  e.stopPropagation();
  if (!state.currentUser) {
    showToast('Sign in to save destinations to your wishlist', 'error');
    openAuth('login');
    return;
  }
  const dest = DESTINATIONS.find(d => d.id === id);
  const idx  = state.wishlist.findIndex(w => w.id === id);
  if (idx === -1) {
    state.wishlist.push(dest);
    showToast(`${dest.name} added to wishlist ♥`);
  } else {
    state.wishlist.splice(idx, 1);
    showToast(`${dest.name} removed from wishlist`);
  }
  saveWishlist();
  renderDestinations();
  renderWishlistPanel();
  updateWishlistBadge();
}

function saveWishlist() {
  localStorage.setItem('voyagr_wishlist', JSON.stringify(state.wishlist));
}

function updateWishlistBadge() {
  $('fabBadge').textContent = state.wishlist.length;
}

function toggleWishlist() {
  const panel = $('wishlistPanel');
  panel.classList.toggle('hidden');
  if (!panel.classList.contains('hidden')) renderWishlistPanel();
}

function renderWishlistPanel() {
  const body = $('wpBody');
  if (state.wishlist.length === 0) {
    body.innerHTML = '<p class="wp-empty">Your wishlist is empty.<br/>Start exploring and save your dream destinations!</p>';
    return;
  }
  body.innerHTML = state.wishlist.map(dest => `
    <div class="wp-item">
      <img src="${dest.img}" alt="${dest.name}"/>
      <div class="wp-item-info">
        <div class="wp-item-name">${dest.name}</div>
        <div class="wp-item-country">${dest.country}</div>
        <div class="wp-item-price">From $${formatPrice(dest.price)}</div>
      </div>
      <button class="wp-item-remove" onclick="removeWish(${dest.id})">✕</button>
    </div>
  `).join('');
}

function removeWish(id) {
  state.wishlist = state.wishlist.filter(w => w.id !== id);
  saveWishlist();
  renderWishlistPanel();
  updateWishlistBadge();
  renderDestinations();
}

/* ============================================================
   BOOKING (stub handlers)
   ============================================================ */

function openBooking(e, id) {
  e.stopPropagation();
  if (!state.currentUser) { openAuth('login'); return; }
  const dest = DESTINATIONS.find(d => d.id === id);
  showToast(`Opening booking for ${dest.name}…`);
  // Extend: open booking modal here
}

function openBookingExp(id) {
  if (!state.currentUser) { openAuth('login'); return; }
  const exp = EXPERIENCES.find(e => e.id === id);
  showToast(`Booking: ${exp.name}`);
}

function openBookingDeal(id) {
  if (!state.currentUser) { openAuth('login'); return; }
  const deal = DEALS.find(d => d.id === id);
  showToast(`Securing your deal: ${deal.name}`);
}

/* ============================================================
   AUTH — MODAL
   ============================================================ */

function openAuth(mode = 'login') {
  $('authModal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  switchTab(mode);
}

function closeAuth() {
  $('authModal').classList.add('hidden');
  document.body.style.overflow = '';
}

function switchTab(tab) {
  $('loginForm').classList.toggle('hidden',    tab !== 'login');
  $('registerForm').classList.toggle('hidden', tab !== 'register');
  $('loginTab').classList.toggle('active',    tab === 'login');
  $('registerTab').classList.toggle('active', tab === 'register');
}

$('authModal').addEventListener('click', e => {
  if (e.target === $('authModal')) closeAuth();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeAuth();
});

/* ============================================================
   VALIDATION HELPERS
   ============================================================ */

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getPasswordStrength(pwd) {
  let score = 0;
  if (pwd.length >= 8)                  score++;
  if (/[A-Z]/.test(pwd))               score++;
  if (/[0-9]/.test(pwd))               score++;
  if (/[^A-Za-z0-9]/.test(pwd))        score++;
  return score;
}

/* ============================================================
   AUTH — LOGIN
   ============================================================ */

function handleLogin() {
  const email    = $('loginEmail').value.trim();
  const password = $('loginPassword').value;

  clearErrors('loginEmailErr', 'loginPasswordErr');
  markInputError('loginEmail', false);
  markInputError('loginPassword', false);

  let valid = true;

  if (!email) {
    setError('loginEmailErr', 'Email is required.');
    markInputError('loginEmail', true);
    valid = false;
  } else if (!isValidEmail(email)) {
    setError('loginEmailErr', 'Please enter a valid email address.');
    markInputError('loginEmail', true);
    valid = false;
  }

  if (!password) {
    setError('loginPasswordErr', 'Password is required.');
    markInputError('loginPassword', true);
    valid = false;
  } else if (password.length < 6) {
    setError('loginPasswordErr', 'Password must be at least 6 characters.');
    markInputError('loginPassword', true);
    valid = false;
  }

  if (!valid) return;

  setLoading('loginBtn', true);

  // Simulate API call
  setTimeout(() => {
    setLoading('loginBtn', false);

    // Check localStorage for registered users
    const users = JSON.parse(localStorage.getItem('voyagr_users') || '[]');
    const user  = users.find(u => u.email === email && u.password === btoa(password));

    if (user || email === 'demo@voyagr.com') {
      const loggedIn = user || { email, firstName:'Demo', lastName:'User' };
      state.currentUser = loggedIn;
      localStorage.setItem('voyagr_user', JSON.stringify(loggedIn));
      closeAuth();
      updateAuthUI();
      showToast(`Welcome back, ${loggedIn.firstName}! 🌍`);
    } else {
      setError('loginPasswordErr', 'Incorrect email or password.');
      markInputError('loginPassword', true);
      markInputError('loginEmail', true);
    }
  }, 1400);
}

/* ============================================================
   AUTH — REGISTER
   ============================================================ */

$('regPassword').addEventListener('input', function() {
  const strength = getPasswordStrength(this.value);
  const bar = $('strengthBar');
  bar.dataset.strength = strength;
});

function handleRegister() {
  const first   = $('regFirst').value.trim();
  const last    = $('regLast').value.trim();
  const email   = $('regEmail').value.trim();
  const pwd     = $('regPassword').value;
  const confirm = $('regConfirm').value;
  const terms   = $('termsCheck').checked;

  clearErrors('regFirstErr','regLastErr','regEmailErr','regPasswordErr','regConfirmErr','termsErr');
  ['regFirst','regLast','regEmail','regPassword','regConfirm'].forEach(id => markInputError(id, false));

  let valid = true;

  if (!first) {
    setError('regFirstErr','First name is required.');
    markInputError('regFirst', true); valid = false;
  }
  if (!last) {
    setError('regLastErr','Last name is required.');
    markInputError('regLast', true); valid = false;
  }
  if (!email) {
    setError('regEmailErr','Email is required.');
    markInputError('regEmail', true); valid = false;
  } else if (!isValidEmail(email)) {
    setError('regEmailErr','Please enter a valid email address.');
    markInputError('regEmail', true); valid = false;
  }
  if (!pwd) {
    setError('regPasswordErr','Password is required.');
    markInputError('regPassword', true); valid = false;
  } else if (pwd.length < 8) {
    setError('regPasswordErr','Password must be at least 8 characters.');
    markInputError('regPassword', true); valid = false;
  } else if (getPasswordStrength(pwd) < 2) {
    setError('regPasswordErr','Password is too weak. Add uppercase, numbers or symbols.');
    markInputError('regPassword', true); valid = false;
  }
  if (!confirm) {
    setError('regConfirmErr','Please confirm your password.');
    markInputError('regConfirm', true); valid = false;
  } else if (pwd !== confirm) {
    setError('regConfirmErr','Passwords do not match.');
    markInputError('regConfirm', true); valid = false;
  }
  if (!terms) {
    setError('termsErr','You must accept the Terms of Service to continue.');
    valid = false;
  }

  if (!valid) return;

  setLoading('registerBtn', true);

  setTimeout(() => {
    setLoading('registerBtn', false);

    const users = JSON.parse(localStorage.getItem('voyagr_users') || '[]');
    if (users.find(u => u.email === email)) {
      setError('regEmailErr', 'An account with this email already exists.');
      markInputError('regEmail', true);
      return;
    }

    const newUser = { firstName:first, lastName:last, email, password:btoa(pwd), createdAt:new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem('voyagr_users', JSON.stringify(users));

    state.currentUser = newUser;
    localStorage.setItem('voyagr_user', JSON.stringify(newUser));
    closeAuth();
    updateAuthUI();
    showToast(`Welcome aboard, ${first}! Your journey begins now 🌍`);
  }, 1600);
}

/* ============================================================
   AUTH — SOCIAL (stub)
   ============================================================ */

function socialAuth(provider) {
  showToast(`Connecting to ${provider}…`);
  setTimeout(() => {
    const mockUser = { firstName: provider, lastName:'User', email:`user@${provider.toLowerCase()}.com` };
    state.currentUser = mockUser;
    localStorage.setItem('voyagr_user', JSON.stringify(mockUser));
    closeAuth();
    updateAuthUI();
    showToast(`Signed in with ${provider} ✓`);
  }, 1200);
}

/* ============================================================
   AUTH — LOGOUT
   ============================================================ */

function handleLogout() {
  state.currentUser = null;
  localStorage.removeItem('voyagr_user');
  updateAuthUI();
  showToast('You have been signed out. Safe travels! 👋');
}

function updateAuthUI() {
  const loggedIn = !!state.currentUser;
  $('signinBtn').classList.toggle('hidden', loggedIn);
  $('joinBtn').classList.toggle('hidden', loggedIn);
  $('userGreeting').classList.toggle('hidden', !loggedIn);
  if (loggedIn) {
    $('greetName').textContent = `Hello, ${state.currentUser.firstName} ✈`;
  }
}

/* ============================================================
   NEWSLETTER
   ============================================================ */

function handleNewsletter() {
  const email = $('nlEmail').value.trim();
  if (!email || !isValidEmail(email)) {
    showToast('Please enter a valid email address', 'error');
    $('nlEmail').focus();
    return;
  }
  const subs = JSON.parse(localStorage.getItem('voyagr_subscribers') || '[]');
  if (subs.includes(email)) {
    showToast('You\'re already subscribed! ✓');
    return;
  }
  subs.push(email);
  localStorage.setItem('voyagr_subscribers', JSON.stringify(subs));
  $('nlEmail').value = '';
  showToast('Subscribed! Inspiring destinations en route to your inbox 📬');
}

/* ============================================================
   SMOOTH SCROLL HELPER
   ============================================================ */

function scrollTo(selector) {
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior:'smooth', block:'start' });
}

/* ============================================================
   UNIT TEST SUITE
   (run in console: window.VOYAGR_TESTS.run())
   ============================================================ */

window.VOYAGR_TESTS = {
  results: [],

  assert(name, condition) {
    this.results.push({ name, pass: !!condition });
  },

  run() {
    this.results = [];
    const T = this;

    // --- Validation tests ---
    T.assert('isValidEmail: valid email',     isValidEmail('test@example.com'));
    T.assert('isValidEmail: invalid (no @)',  !isValidEmail('testexample.com'));
    T.assert('isValidEmail: invalid (empty)', !isValidEmail(''));
    T.assert('isValidEmail: invalid (no TLD)',!isValidEmail('test@example'));

    // --- Password strength tests ---
    T.assert('getPasswordStrength: weak',     getPasswordStrength('abc') === 0);
    T.assert('getPasswordStrength: medium',   getPasswordStrength('Abc12345') === 3);
    T.assert('getPasswordStrength: strong',   getPasswordStrength('Abc123!@') === 4);

    // --- Data integrity tests ---
    T.assert('DESTINATIONS: has 12 items',    DESTINATIONS.length === 12);
    T.assert('EXPERIENCES: has 8 items',      EXPERIENCES.length === 8);
    T.assert('DEALS: has 3 items',            DEALS.length === 3);
    T.assert('TESTIMONIALS: has 6 items',     TESTIMONIALS.length === 6);

    // --- Destination schema ---
    DESTINATIONS.forEach(d => {
      T.assert(`Dest ${d.name}: has id`,      typeof d.id === 'number');
      T.assert(`Dest ${d.name}: has price`,   typeof d.price === 'number');
      T.assert(`Dest ${d.name}: has rating`,  d.rating >= 0 && d.rating <= 5);
    });

    // --- State tests ---
    T.assert('state.wishlist: is array',      Array.isArray(state.wishlist));
    T.assert('state.heroIndex: default 0',    state.heroIndex === 0);
    T.assert('state.destFilter: default all', state.destFilter === 'all');

    // --- DOM tests ---
    T.assert('DOM: #hero exists',             !!document.getElementById('hero'));
    T.assert('DOM: #navbar exists',           !!document.getElementById('navbar'));
    T.assert('DOM: #authModal exists',        !!document.getElementById('authModal'));
    T.assert('DOM: #destGrid exists',         !!document.getElementById('destGrid'));
    T.assert('DOM: #expGrid exists',          !!document.getElementById('expGrid'));
    T.assert('DOM: #dealsGrid exists',        !!document.getElementById('dealsGrid'));
    T.assert('DOM: #loader exists',           !!document.getElementById('loader'));

    // --- daysUntil helper ---
    const future = new Date(); future.setDate(future.getDate() + 5);
    T.assert('daysUntil: 5 days from now',    daysUntil(future.toISOString().split('T')[0]) === 5);
    T.assert('daysUntil: past date returns 0',daysUntil('2020-01-01') === 0);

    // --- formatPrice ---
    T.assert('formatPrice: 1299 → "1,299"',  formatPrice(1299) === '1,299');
    T.assert('formatPrice: 1000 → "1,000"',  formatPrice(1000) === '1,000');

    // --- Auth state ---
    T.assert('No phantom user on fresh start',
      state.currentUser === null || typeof state.currentUser === 'object');

    // Report
    const passed = T.results.filter(r => r.pass).length;
    const total  = T.results.length;
    const failed = T.results.filter(r => !r.pass);

    console.group(`%c VOYAGR TEST SUITE — ${passed}/${total} passed`, 'font-weight:bold;color:' + (failed.length ? '#e04b4b' : '#2e7d32'));
    T.results.forEach(r => {
      console.log(`%c ${r.pass ? '✓' : '✕'} ${r.name}`,
        `color:${r.pass ? '#2e7d32' : '#e04b4b'}`);
    });
    if (failed.length) {
      console.warn('Failed tests:', failed.map(r => r.name));
    }
    console.groupEnd();

    return { passed, total, failed: failed.map(r => r.name) };
  }
};

console.log('%cVOYAGR loaded ✓ — Run VOYAGR_TESTS.run() to execute the test suite', 'color:#C8A96E;font-weight:bold;font-size:13px');
