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

/* ===== Loader & Entrance Animation ===== */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  
  /* ===== Loader ===== */
  if (loader) {
    // Tunggu 3 detik (sesuai permintaanmu)
    setTimeout(() => {
      // 1. Sembunyikan Loader
      loader.classList.add('hidden');

      // 2. Tambahkan kelas 'entrance-fade-up' ke elemen yang ingin dianimasikan
      const elementsToAnimate = document.querySelectorAll('.navbar, .hero-text, .hero-visual');
      elementsToAnimate.forEach(el => el.classList.add('entrance-fade-up'));

      // 3. Beri sedikit jeda agar browser merender kondisi awal (tersembunyi)
      setTimeout(() => {
        elementsToAnimate.forEach(el => el.classList.add('visible'));
      }, 100); // Jeda 100ms sebelum animasi mulai

    }, 3000); 
  }
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
  
  // Pastikan gambar kembali terlihat
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

    // Panggil gambar dan buka modal
  updateModalImage();
  certModal.classList.add('open');
  certModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function updateModalImage() {
  const modalLoader = document.getElementById('modalLoaderOverlay');
  const newImageSrc = currentImageArray[currentImageIndex];
  
  // 1. Tampilkan spinner (gambar lama TETAP terlihat)
  if (modalLoader) modalLoader.classList.add('active');
  
  // 2. Hapus fallback lama jika ada
  const oldFb = certModalImage.parentElement.querySelector('.img-fallback');
  if (oldFb) oldFb.remove();

  // 3. Preload gambar baru di memori
  const img = new Image();
  img.src = newImageSrc;
  
  img.onload = () => {
    // 4. Setelah gambar selesai dimuat, baru ganti src
    certModalImage.src = newImageSrc;
    certModalImage.alt = certModalTitle.textContent;
    certModalDownload.href = newImageSrc;
    
    // 5. Transisi halus (fade in)
    certModalImage.style.opacity = '1';
    certModalImage.style.transform = 'scale(1)';
    
    // 6. Hilangkan spinner
    if (modalLoader) modalLoader.classList.remove('active');
    
    const fb = certModalImage.parentElement.querySelector('.img-fallback');
    if (fb) fb.remove();
  };
  
  img.onerror = () => {
    if (modalLoader) modalLoader.classList.remove('active');
    certModalImage.style.display = 'none'; 
    const wrap = certModalImage.parentElement;
    if (!wrap.querySelector('.img-fallback')) {
      const fb = document.createElement('div');
      fb.className = 'img-fallback';
      fb.style.cssText = 'padding: 3rem; text-align: center; color: var(--text-muted); font-size: 0.95rem; z-index: 10;';
      fb.innerHTML = '⚠️ Gambar belum tersedia.<br>Pastikan nama file dan folder sudah benar.';
      wrap.appendChild(fb);
    }
  };
  
  if (modalIndicator) {
    modalIndicator.textContent = `${currentImageIndex + 1} / ${currentImageArray.length}`;
  }
}

// ===== EVENT PANAH MODAL (TAMBAHAN) =====
if (btnModalPrev && btnModalNext) {
  btnModalPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex - 1 + currentImageArray.length) % currentImageArray.length;
    updateModalImage();
  });
  btnModalNext.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % currentImageArray.length;
    updateModalImage();
  });
}

function closeCertModal() {
  certModal.classList.remove('open');
  certModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  const modalPdf = document.getElementById('certModalPdf');
  if (modalPdf) modalPdf.src = '';
}

document.querySelectorAll('.cert-view-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    // Cek apakah ini PDF atau Gambar
    const source = btn.dataset.pdf || btn.dataset.image;
    openModal(source, btn.dataset.title);
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

// Saat gambar gagal dimuat (Error/404)
certModalImage.addEventListener('error', () => {
  const modalLoader = document.getElementById('modalLoaderOverlay');
  if (modalLoader) modalLoader.classList.remove('active');
  certModalImage.style.display = 'none'; 
  const wrap = certModalImage.parentElement;
  if (!wrap.querySelector('.img-fallback')) {
    const fb = document.createElement('div');
    fb.className = 'img-fallback';
    fb.style.cssText = 'padding: 3rem; text-align: center; color: var(--text-muted); font-size: 0.95rem; z-index: 10;';
    fb.innerHTML = '⚠️ Gambar belum tersedia.<br>Pastikan nama file dan folder sudah benar.';
    wrap.appendChild(fb);
  }
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
/* ============================================
   TAMBAHAN: SLIDER SERTIFIKAT DI CARD (FINANCE 8.0)
   ============================================ */
const cert9Data = {
  // Daftar file gambar
  images: [
    "assets/certificates/sertif_7.png", 
    "assets/certificates/sertif_7_kelas2.png", 
    "assets/certificates/sertif_7_kelas3.png", 
    "assets/certificates/sertif_7_kelas4.png"
  ],
  // TAMBAHKAN ARRAY TITLES DI SINI
  titles: [
    "Investment Banking",
    "Finance & Accounting",
    "Audit",
    "Risk Management"
  ],
  // Deskripsi per kelas (dipisah dengan urutan yang sama)
  descs: [
    "Materi Kelas 1: Mempelajari konsep dasar Investment Banking, meliputi peran dan fungsi investment banker dalam membantu perusahaan memperoleh pendanaan, melakukan merger dan akuisisi (M&A), serta mengelola transaksi keuangan. Memahami proses valuasi perusahaan, analisis laporan keuangan, serta metode penilaian bisnis seperti Discounted Cash Flow (DCF) dan Comparable Company Analysis. Materi ini memberikan pemahaman mengenai aktivitas investment banking, analisis investasi, dan strategi keuangan dalam mendukung pengambilan keputusan bisnis.",
    "Materi Kelas 2: Mempelajari konsep dasar Finance & Accounting, meliputi proses pencatatan transaksi keuangan, pengelolaan dan analisis keuangan, serta penyusunan laporan keuangan. Memahami siklus akuntansi, pengelolaan jurnal umum dan buku besar, serta penyusunan laporan laba rugi, neraca, laporan arus kas, dan laporan perubahan ekuitas. Selain itu, mempelajari analisis keuangan menggunakan metode Horizontal Analysis dan Vertical Analysis untuk mengevaluasi kondisi serta kinerja keuangan perusahaan. Materi ini memberikan pemahaman mengenai penerapan prinsip keuangan dan akuntansi dalam mendukung pengelolaan serta pengambilan keputusan bisnis.",
    "Materi Kelas 3: Mempelajari konsep dasar auditing, meliputi tujuan, fungsi, dan jenis-jenis audit dalam memastikan kewajaran laporan keuangan perusahaan. Memahami proses pemeriksaan laporan keuangan, pengumpulan dan evaluasi bukti audit, identifikasi risiko serta potensi kesalahan pencatatan, dan penerapan prosedur audit. Selain itu, mempelajari konsep internal control, audit evidence, serta penyusunan temuan dan laporan audit. Materi ini memberikan pemahaman mengenai proses audit dalam menilai keakuratan informasi keuangan, kepatuhan terhadap standar akuntansi, dan efektivitas pengendalian internal perusahaan.",
    "Materi Kelas 4: Mempelajari konsep dasar Risk Management (Manajemen Risiko), meliputi identifikasi, analisis, evaluasi, dan pengendalian risiko yang dapat memengaruhi operasional serta kinerja keuangan perusahaan. Memahami berbagai jenis risiko, seperti risiko keuangan, operasional, pasar, dan kredit, serta teknik penilaian risiko berdasarkan kemungkinan terjadinya dan dampak yang ditimbulkan. Selain itu, mempelajari strategi mitigasi risiko dan penerapan pengendalian internal untuk meminimalkan potensi kerugian. Materi ini memberikan pemahaman mengenai pentingnya manajemen risiko dalam menjaga stabilitas perusahaan dan mendukung pengambilan keputusan bisnis."
  ],
  // Tanggal per kelas
  dates: [
    "16 November 2026", 
    "17 November 2026", 
    "18 November 2026", 
    "19 November 2026"
  ],
  // Durasi per kelas
  durations: [
    "2 jam", 
    "2 jam", 
    "2 jam", 
    "2 jam"
  ]
};

let cert9CurrentIndex = 0;

const certImg9 = document.getElementById('certImg9');
const certPrev9 = document.getElementById('certPrev9');
const certNext9 = document.getElementById('certNext9');
const certDynamicDesc = document.getElementById('certDynamicDesc');
const certDynamicDate = document.getElementById('certDynamicDate');
const certDynamicDuration = document.getElementById('certDynamicDuration');
// TAMBAHKAN VARIABEL UNTUK JUDUL
const certDynamicTitle = document.getElementById('certDynamicTitle');

function updateCert9() {
  if (!certImg9) return;

  // Efek transisi halus (fade out)
  certImg9.style.opacity = '0.5';
  
  setTimeout(() => {
    // Ganti Gambar & Teks
    certImg9.src = cert9Data.images[cert9CurrentIndex];
    
    // GANTI JUDUL DI SINI
    if (certDynamicTitle) {
      certDynamicTitle.textContent = cert9Data.titles[cert9CurrentIndex];
    }
    
    certDynamicDesc.textContent = cert9Data.descs[cert9CurrentIndex];
    certDynamicDate.textContent = cert9Data.dates[cert9CurrentIndex];
    certDynamicDuration.textContent = cert9Data.durations[cert9CurrentIndex];
    
    // Kembalikan opacity (fade in)
    certImg9.style.opacity = '1';
  }, 200); // Jeda 200ms untuk efek transisi
}

if (certImg9 && certPrev9 && certNext9) {
  // Tombol Kiri (Kembali ke akhir jika di awal)
  certPrev9.addEventListener('click', (e) => {
    e.stopPropagation(); 
    cert9CurrentIndex = (cert9CurrentIndex - 1 + cert9Data.images.length) % cert9Data.images.length;
    updateCert9();
  });

  // Tombol Kanan (Kembali ke awal jika di akhir)
  certNext9.addEventListener('click', (e) => {
    e.stopPropagation();
    cert9CurrentIndex = (cert9CurrentIndex + 1) % cert9Data.images.length;
    updateCert9();
  });
}

// Event Listener untuk tombol Lihat Sertifikat di Finance 8.0
const certViewBtn9 = document.getElementById('certViewBtn9');
if (certViewBtn9) {
  certViewBtn9.addEventListener('click', (e) => {
    e.stopPropagation(); // Mencegah card ikut tertutup
    // Ambil gambar yang sedang aktif berdasarkan index slider
    const currentImage = cert9Data.images[cert9CurrentIndex];
    openModal(currentImage, cert9Data.titles[cert9CurrentIndex] + " - " + cert9Data.dates[cert9CurrentIndex]);
  });
}
/* ===== TAMPILKAN CV DI MODAL ===== */
const viewCV = document.getElementById('viewCV');
if (viewCV) {
  viewCV.addEventListener('click', (e) => {
    e.preventDefault(); // Mencegah download/buka tab baru
    
    const pdfUrl = viewCV.getAttribute('href');
    const modalPdf = document.getElementById('certModalPdf');
    const modalImage = document.getElementById('certModalImage');
    const modalTitle = document.getElementById('certModalTitle');
    
    // Sembunyikan gambar, tampilkan iframe PDF
    modalImage.style.display = 'none';
    modalPdf.style.display = 'block';
    modalPdf.src = `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`;
    
    modalTitle.textContent = 'CV Herikman';
    
    // Sembunyikan tombol panah & indikator
    document.getElementById('modalPrevBtn').style.display = 'none';
    document.getElementById('modalNextBtn').style.display = 'none';
    document.getElementById('modalIndicator').style.display = 'none';
    
    // Buka modal
    document.getElementById('certModal').classList.add('open');
    document.getElementById('certModal').setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
}