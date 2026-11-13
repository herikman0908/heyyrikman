/* ============================================
   MAIN JAVASCRIPT - FINAL
   Fresh Graduate Portfolio
   ============================================ */

/* ===== Theme Toggle ===== */
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = htmlElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  htmlElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

/* ===== Loader ===== */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 500);
});

/* ===== Navbar Scroll ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ===== Active Nav on Scroll ===== */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) current = section.getAttribute('id');
  });
  navItems.forEach(item => {
    item.classList.toggle('active', item.getAttribute('href') === `#${current}`);
  });
});

/* ===== Cursor Glow ===== */
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});

/* ===== Typewriter Effect ===== */
const typewriterEl = document.getElementById('typewriter');
const texts = [
  'Fresh Graduate S1 Manajemen',
  'Siap Berkontribusi, Berkembang',
  'Cepat Belajar, Mudah Beradaptasi',
  'Terbuka Peluang Kerja'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typewriter() {
  const currentText = texts[textIndex];
  
  if (isDeleting) {
    // Menghapus teks
    typewriterEl.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    // Mengetik teks
    typewriterEl.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  // KECEPATAN: 150ms saat mengetik, 50ms saat menghapus
  let typeSpeed = isDeleting ? 50 : 90;

  // Jika teks sudah selesai diketik semua
  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 1500; // Tahan selama 2 detik sebelum mulai menghapus
    isDeleting = true;
  } 
  // Jika teks sudah habis dihapus
  else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    typeSpeed = 500; // Jeda 0.5 detik sebelum mulai kalimat baru
  }

  setTimeout(typewriter, typeSpeed);
}

// Jalankan animasi
if (typewriterEl) {
  typewriter();
}

/* ===== Reveal on Scroll ===== */
const revealElements = document.querySelectorAll(
  '.section-header, .about-content, .about-illustration, .exp-card, .cert-card, .skills-overview, .skills-panel, .contact-card, .contact-form, .tools-section-header, .tool-chip'
);
revealElements.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealElements.forEach(el => observer.observe(el));

/* ===== Skill Bars Animation ===== */
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.width + '%';
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
skillBars.forEach(bar => skillObserver.observe(bar));

/* ===== EXPERIENCE: Collapse ===== */
document.querySelectorAll('.exp-card').forEach(card => {
  const header = card.querySelector('.exp-header');
  const toggleBtn = card.querySelector('.exp-toggle-btn');

  const toggle = (e) => {
    if (e) e.stopPropagation();
    card.classList.toggle('open');
  };

  header.addEventListener('click', toggle);
  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggle(e);
    });
  }
});

/* ===== CERTIFICATES: Collapse ===== */
document.querySelectorAll('.cert-card').forEach(card => {
  const header = card.querySelector('.cert-header');
  const collapseBtn = card.querySelector('.collapse-btn');
  const toggle = () => card.classList.toggle('open');

  header.addEventListener('click', toggle);
  collapseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggle();
  });
});

/* ===== MODAL SERTIFIKAT & PROJECT (SLIDER) ===== */
const certModal = document.getElementById('certModal');
const certModalImage = document.getElementById('certModalImage');
const certModalTitle = document.getElementById('certModalTitle');
const certModalDownload = document.getElementById('certModalDownload');

// Tambahan untuk Slider
let currentImageIndex = 0;
let currentImageArray = [];
const btnModalPrev = document.getElementById('modalPrevBtn');
const btnModalNext = document.getElementById('modalNextBtn');
const modalIndicator = document.getElementById('modalIndicator');

function openModal(imageSource, title) {
  certModalTitle.textContent = title;

  // 1. BERSIHKAN SISA KONTEN YOUTUBE / VIDEO (JIKA ADA)
  const modalWrap = certModalImage.parentElement;
  const oldVideoContent = modalWrap.querySelector('.youtube-channel-content');
  if (oldVideoContent) oldVideoContent.remove();
  
  // Pastikan gambar kembali terlihat (jika sebelumnya disembunyikan oleh video)
  certModalImage.style.display = '';

  // 2. LOGIKA SLIDER GAMBAR
  if (imageSource.includes(',')) {
    // Jika banyak gambar
    currentImageArray = imageSource.split(',').map(url => url.trim());
    currentImageIndex = 0;
    
    if (btnModalPrev) btnModalPrev.style.display = 'grid';
    if (btnModalNext) btnModalNext.style.display = 'grid';
    if (modalIndicator) modalIndicator.style.display = 'block';
  } else {
    // Jika cuma 1 gambar
    currentImageArray = [imageSource];
    currentImageIndex = 0;
    
    if (btnModalPrev) btnModalPrev.style.display = 'none';
    if (btnModalNext) btnModalNext.style.display = 'none';
    if (modalIndicator) modalIndicator.style.display = 'none';
  }

  updateModalImage();
  certModal.classList.add('open');
  certModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function updateModalImage() {
  // Sembunyikan error lama jika ada
  certModalImage.style.display = '';
  const oldFb = certModalImage.parentElement.querySelector('.img-fallback');
  if (oldFb) oldFb.remove();

  certModalImage.src = currentImageArray[currentImageIndex];
  certModalImage.alt = certModalTitle.textContent;
  certModalDownload.href = currentImageArray[currentImageIndex];
  
  if (modalIndicator) {
    modalIndicator.textContent = `${currentImageIndex + 1} / ${currentImageArray.length}`;
  }
}

// Event Panah Modal
if (btnModalPrev && btnModalNext) {
  btnModalPrev.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + currentImageArray.length) % currentImageArray.length;
    updateModalImage();
  });
  btnModalNext.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % currentImageArray.length;
    updateModalImage();
  });
}

function closeCertModal() {
  certModal.classList.remove('open');
  certModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.cert-view-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    openModal(btn.dataset.image, btn.dataset.title);
  });
});

document.querySelectorAll('[data-modal-close]').forEach(el => {
  el.addEventListener('click', closeCertModal);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && certModal.classList.contains('open')) {
    closeCertModal();
  }
});

certModalImage.addEventListener('error', () => {
  certModalImage.style.display = 'none';
  const wrap = certModalImage.parentElement;
  if (!wrap.querySelector('.img-fallback')) {
    const fb = document.createElement('div');
    fb.className = 'img-fallback';
    fb.style.cssText = 'padding: 3rem; text-align: center; color: var(--text-muted); font-size: 0.95rem;';
    // Teks error yang lebih umum
    fb.innerHTML = '⚠️ Gambar belum tersedia.<br>Pastikan nama file dan folder sudah benar.';
    wrap.appendChild(fb);
  }
});
certModalImage.addEventListener('load', () => {
  certModalImage.style.display = '';
  const fb = certModalImage.parentElement.querySelector('.img-fallback');
  if (fb) fb.remove();
});

/* ===== SKILLS: Panel Collapse ===== */
document.querySelectorAll('[data-panel-toggle]').forEach(btn => {
  btn.addEventListener('click', () => {
    const panel = btn.closest('.skills-panel');
    panel.classList.toggle('open');

    if (panel.classList.contains('open')) {
      panel.querySelectorAll('.skill-progress').forEach(bar => {
        bar.style.width = '0';
        setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 100);
      });
    }
  });
});

/* ===== SKILLS: Sub-collapse per item ===== */
document.querySelectorAll('[data-skill-toggle]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const item = btn.closest('.skill-item-collapse');
    item.classList.toggle('open');

    if (item.classList.contains('open')) {
      item.querySelectorAll('.skill-progress').forEach(bar => {
        bar.style.width = '0';
        setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 100);
      });
    }
  });
});

/* ===== Default: Buka Hard Skills ===== */
const firstPanel = document.querySelector('.skills-panel');
if (firstPanel) {
  firstPanel.classList.add('open');
  setTimeout(() => {
    firstPanel.querySelectorAll('.skill-progress').forEach(bar => {
      bar.style.width = bar.dataset.width + '%';
    });
  }, 400);
}

/* ===== TOOLS POP-UP ===== */
const toolsModal = document.getElementById('toolsModal');
const toolsModalTitle = document.getElementById('toolsModalTitle');
const toolsModalDesc = document.getElementById('toolsModalDesc');
const toolsModalBar = document.getElementById('toolsModalBar');
const toolsModalPercent = document.getElementById('toolsModalPercent');
const toolsModalIcon = document.getElementById('toolsModalIcon');

function openToolsModal(name, desc, percent, iconSvg) {
  toolsModalTitle.textContent = name;
  toolsModalDesc.textContent = desc;
  toolsModalIcon.innerHTML = iconSvg;
  
  // Reset bar
  toolsModalBar.style.transition = 'none';
  toolsModalBar.style.width = '0';
  toolsModalPercent.textContent = '0%';

  // Buka modal
  toolsModal.classList.add('open');
  toolsModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Animasi bar
  setTimeout(() => {
    toolsModalBar.style.transition = 'width 1s cubic-bezier(0.4, 0, 0.2, 1)';
    toolsModalBar.style.width = percent + '%';
    
    // Animasi persentase
    let count = 0;
    const interval = setInterval(() => {
      count++;
      toolsModalPercent.textContent = count + '%';
      if (count >= parseInt(percent)) clearInterval(interval);
    }, 1000 / parseInt(percent));
  }, 100);
}

function closeToolsModal() {
  toolsModal.classList.remove('open');
  toolsModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.tool-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    const name = chip.dataset.name || 'Tools';
    const desc = chip.dataset.desc || 'Deskripsi belum ditambahkan.';
    const percent = chip.dataset.percent || '0';
    const iconSvg = chip.querySelector('.tool-chip-icon').innerHTML;
    openToolsModal(name, desc, percent, iconSvg);
  });
});

document.querySelectorAll('[data-tools-close]').forEach(el => {
  el.addEventListener('click', closeToolsModal);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && toolsModal.classList.contains('open')) {
    closeToolsModal();
  }
});

/* ===== Contact Form ===== */
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');

function showToast(message, type = 'success') {
  if (!toast) return;
  toast.textContent = message;
  toast.className = `toast show ${type}`;
  setTimeout(() => toast.classList.remove('show'), 3500);
}

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Mencegah halaman reload

    const btn = contactForm.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;

    // Ubah tombol jadi loading
    btn.innerHTML = 'Mengirim...';
    btn.disabled = true;

    // Ambil semua data dari form
    const formData = new FormData(contactForm);

    try {
      // Proses pengiriman ke Formspree
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // JIKA BERHASIL
        contactForm.reset();
        showToast('✅ Pesan berhasil dikirim! Saya akan segera membalas.', 'success');
      } else {
        // JIKA GAGAL DARI SERVER FORMSPREE
        showToast('❌ Gagal mengirim pesan. Silakan coba lagi.', 'error');
      }
    } catch (error) {
      // JIKA GAGAL KARENA KONEKSI INTERNET DLL
      showToast('❌ Terjadi kesalahan jaringan.', 'error');
    } finally {
      // Kembalikan tombol ke keadaan semula
      btn.innerHTML = originalHTML;
      btn.disabled = false;
    }
  });
}

  /* ===== 18. Download CV ===== */
  // const downloadCV = document.getElementById('downloadCV');
  // if (downloadCV) {
  //   downloadCV.addEventListener('click', (e) => {
  //     e.preventDefault();
  //     showToast('📄 Ganti link ini dengan file CV Anda di folder assets/');
  //   });
  // }

/* ===== Year ===== */
document.getElementById('year').textContent = new Date().getFullYear();
/* ============================================
   TAMBAHAN: PROJECTS & ACTIVITIES COLLAPSE + ZOOM
   (Blok baru — tidak mengubah yang lama)
   ============================================ */

/* ===== PROJECTS: Collapse ===== */
document.querySelectorAll('.project-card').forEach(card => {
  const header = card.querySelector('.project-header');
  const collapseBtn = card.querySelector('.project-collapse-btn');
  const toggle = () => card.classList.toggle('open');

  if (header) header.addEventListener('click', toggle);
  if (collapseBtn) {
    collapseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggle();
    });
  }
});

/* ===== ACTIVITIES: Collapse ===== */
document.querySelectorAll('.activity-card').forEach(card => {
  const header = card.querySelector('.activity-header');
  const collapseBtn = card.querySelector('.activity-collapse-btn');
  const toggle = () => card.classList.toggle('open');

  if (header) header.addEventListener('click', toggle);
  if (collapseBtn) {
    collapseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggle();
    });
  }
});

/* ===== PROJECT IMAGE ZOOM (MULTI GAMBAR) ===== */
document.querySelectorAll('.project-zoom').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    // Baca data-images (jamak), kalau tidak ada baru baca data-image (tunggal)
    const imageData = btn.dataset.images || btn.dataset.image; 
    openModal(imageData, btn.dataset.title);
  });
});

/* ===== ACTIVITY IMAGE ZOOM (MULTI GAMBAR) ===== */
document.querySelectorAll('.activity-zoom').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const imageData = btn.dataset.images || btn.dataset.image;
    openModal(imageData, btn.dataset.title);
  });
});

/* ===== Reveal animation untuk card baru ===== */
document.querySelectorAll('.project-card, .activity-card').forEach(el => {
  el.classList.add('reveal');
  if (typeof observer !== 'undefined') observer.observe(el);
});
/* ============================================
   TAMBAHAN: ZOOM KE CHANNEL YOUTUBE
   ============================================ */
document.querySelectorAll('.project-channel-zoom').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const channelUrl = btn.dataset.channel;
    const title = btn.dataset.title;

    // Ambil elemen modal
    const modalImage = document.getElementById('certModalImage');
    const modalWrap = modalImage.parentElement;
    const modalTitle = document.getElementById('certModalTitle');

    // Sembunyikan gambar
    modalImage.style.display = 'none';
    modalTitle.textContent = title;
    
    // Hapus konten lama jika ada
    const oldContent = modalWrap.querySelector('.youtube-channel-content');
    if (oldContent) oldContent.remove();

    // Buat konten YouTube
    const content = document.createElement('div');
    content.className = 'youtube-channel-content';
    content.innerHTML = `
      <div class="yt-icon">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="#FF0000">
          <path d="M21.58 7.19a2.62 2.62 0 0 0-1.84-1.84C18.1 5 12 5 12 5s-6.1 0-7.74.35a2.62 2.62 0 0 0-1.84 1.84A27.5 27.5 0 0 0 2 12a27.5 27.5 0 0 0 .42 4.81 2.62 2.62 0 0 0 1.84 1.84C5.9 19 12 19 12 19s6.1 0 7.74-.35a2.62 2.62 0 0 0 1.84-1.84A27.5 27.5 0 0 0 22 12a27.5 27.5 0 0 0-.42-4.81zM10 15V9l5.2 3-5.2 3z"/>
        </svg>
      </div>
      <h3>Tonton 4 Video Dokumenter KKN</h3>
      <p>Seluruh video dapat ditonton langsung melalui channel YouTube berikut.</p>
      <a href="${channelUrl}" target="_blank" rel="noopener noreferrer" class="yt-channel-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.58 7.19a2.62 2.62 0 0 0-1.84-1.84C18.1 5 12 5 12 5s-6.1 0-7.74.35a2.62 2.62 0 0 0-1.84 1.84A27.5 27.5 0 0 0 2 12a27.5 27.5 0 0 0 .42 4.81 2.62 2.62 0 0 0 1.84 1.84C5.9 19 12 19 12 19s6.1 0 7.74-.35a2.62 2.62 0 0 0 1.84-1.84A27.5 27.5 0 0 0 22 12a27.5 27.5 0 0 0-.42-4.81zM10 15V9l5.2 3-5.2 3z"/>
        </svg>
        Buka Channel YouTube
      </a>
    `;

    modalWrap.appendChild(content);

    // Sembunyikan tombol panah & indikator
    document.getElementById('modalPrevBtn').style.display = 'none';
    document.getElementById('modalNextBtn').style.display = 'none';
    document.getElementById('modalIndicator').style.display = 'none';

    // Buka modal
    document.getElementById('certModal').classList.add('open');
    document.getElementById('certModal').setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});