const http = require('http');

const port = process.env.PORT || 3000;

const html = String.raw`<!DOCTYPE html>
<html lang="ms">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Fixer Retail | Ecommerce Portal</title>
  <meta
    name="description"
    content="Fixer Retail membantu perniagaan berkembang dengan portal ecommerce yang pantas, moden, dan mudah diurus."
  />
  <style>
    :root {
      --bg: #f7f3eb;
      --surface: rgba(255, 255, 255, 0.76);
      --surface-strong: #fffaf2;
      --text: #1f1a17;
      --muted: #64584d;
      --accent: #c55a11;
      --accent-dark: #9a4308;
      --line: rgba(31, 26, 23, 0.1);
      --shadow: 0 24px 70px rgba(80, 45, 18, 0.16);
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: Georgia, "Times New Roman", serif;
      color: var(--text);
      background:
        radial-gradient(circle at top left, rgba(197, 90, 17, 0.18), transparent 32%),
        radial-gradient(circle at 85% 10%, rgba(129, 72, 33, 0.2), transparent 28%),
        linear-gradient(180deg, #f8f4ec 0%, #efe3d0 100%);
      min-height: 100vh;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    .page {
      width: min(1120px, calc(100% - 32px));
      margin: 0 auto;
      padding: 28px 0 56px;
    }

    .topbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      margin-bottom: 40px;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 14px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    .brand-mark {
      width: 44px;
      height: 44px;
      display: grid;
      place-items: center;
      border-radius: 14px;
      background: linear-gradient(135deg, var(--accent), #f3af62);
      color: white;
      box-shadow: var(--shadow);
      font-size: 1.1rem;
    }

    .nav {
      display: flex;
      gap: 20px;
      color: var(--muted);
      font-size: 0.95rem;
    }

    .hero {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 28px;
      align-items: stretch;
    }

    .hero-copy,
    .hero-panel,
    .feature,
    .cta {
      background: var(--surface);
      border: 1px solid var(--line);
      backdrop-filter: blur(12px);
      border-radius: 28px;
      box-shadow: var(--shadow);
    }

    .hero-copy {
      padding: 56px;
    }

    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 10px 16px;
      border-radius: 999px;
      background: rgba(197, 90, 17, 0.09);
      color: var(--accent-dark);
      font-size: 0.85rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    h1 {
      margin: 22px 0 18px;
      font-size: clamp(2.7rem, 6vw, 5.4rem);
      line-height: 0.95;
      letter-spacing: -0.04em;
    }

    .lead {
      max-width: 610px;
      margin: 0 0 30px;
      font-size: 1.1rem;
      line-height: 1.8;
      color: var(--muted);
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
      margin-bottom: 34px;
    }

    .btn {
      padding: 14px 22px;
      border-radius: 999px;
      font-weight: 700;
      font-size: 0.98rem;
      transition: transform 0.2s ease, background 0.2s ease;
    }

    .btn:hover {
      transform: translateY(-2px);
    }

    .btn-primary {
      background: var(--accent);
      color: #fff;
    }

    .btn-secondary {
      background: rgba(255, 255, 255, 0.72);
      border: 1px solid var(--line);
      color: var(--text);
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 14px;
    }

    .stat {
      padding: 16px 18px;
      border-radius: 20px;
      background: rgba(255, 250, 242, 0.9);
      border: 1px solid rgba(31, 26, 23, 0.08);
    }

    .stat strong {
      display: block;
      font-size: 1.45rem;
      margin-bottom: 6px;
    }

    .stat span {
      color: var(--muted);
      font-size: 0.92rem;
    }

    .hero-panel {
      padding: 28px;
      display: grid;
      gap: 18px;
      background:
        linear-gradient(180deg, rgba(255, 250, 242, 0.92), rgba(247, 238, 225, 0.88));
    }

    .mini-card,
    .chart-card {
      padding: 22px;
      border-radius: 22px;
      background: var(--surface-strong);
      border: 1px solid rgba(31, 26, 23, 0.08);
    }

    .mini-card h2,
    .chart-card h2 {
      margin: 0 0 10px;
      font-size: 1.1rem;
    }

    .mini-card p,
    .chart-card p,
    .bullet {
      margin: 0;
      color: var(--muted);
      line-height: 1.7;
    }

    .list {
      display: grid;
      gap: 12px;
      margin-top: 18px;
    }

    .bullet {
      display: flex;
      gap: 12px;
      align-items: flex-start;
    }

    .bullet strong {
      color: var(--text);
      min-width: 20px;
    }

    .chart {
      margin-top: 20px;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      align-items: end;
      gap: 12px;
      height: 160px;
    }

    .bar {
      border-radius: 18px 18px 8px 8px;
      background: linear-gradient(180deg, #efb16c 0%, #c55a11 100%);
      position: relative;
      overflow: hidden;
    }

    .bar::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(255,255,255,0.32), transparent);
    }

    .bar:nth-child(1) { height: 42%; }
    .bar:nth-child(2) { height: 58%; }
    .bar:nth-child(3) { height: 68%; }
    .bar:nth-child(4) { height: 82%; }
    .bar:nth-child(5) { height: 96%; }

    .features {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 22px;
      margin-top: 28px;
    }

    .feature {
      padding: 28px;
    }

    .feature h3 {
      margin: 0 0 12px;
      font-size: 1.2rem;
    }

    .feature p {
      margin: 0;
      color: var(--muted);
      line-height: 1.8;
    }

    .cta {
      margin-top: 28px;
      padding: 34px 36px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
    }

    .cta h2 {
      margin: 0 0 8px;
      font-size: clamp(1.8rem, 4vw, 2.7rem);
    }

    .cta p {
      margin: 0;
      color: var(--muted);
      line-height: 1.7;
    }

    .footer {
      margin-top: 24px;
      color: var(--muted);
      font-size: 0.95rem;
      text-align: center;
    }

    @media (max-width: 920px) {
      .hero,
      .features,
      .cta {
        grid-template-columns: 1fr;
      }

      .hero-copy {
        padding: 34px 28px;
      }

      .cta {
        display: grid;
      }
    }

    @media (max-width: 640px) {
      .page {
        width: min(100% - 20px, 1120px);
        padding-top: 18px;
      }

      .topbar {
        flex-direction: column;
        align-items: flex-start;
      }

      .nav {
        flex-wrap: wrap;
        gap: 12px;
      }

      .stats {
        grid-template-columns: 1fr;
      }

      .hero-panel,
      .feature,
      .cta {
        padding: 22px;
      }
    }
  </style>
</head>
<body>
  <main class="page">
    <header class="topbar">
      <div class="brand">
        <div class="brand-mark">FR</div>
        <span>Fixer Retail</span>
      </div>
      <nav class="nav">
        <a href="#kelebihan">Kelebihan</a>
        <a href="#fungsi">Fungsi</a>
        <a href="#hubungi">Hubungi</a>
      </nav>
    </header>

    <section class="hero">
      <div class="hero-copy">
        <div class="eyebrow">Portal Ecommerce Untuk Bisnes Moden</div>
        <h1>Jual lebih mudah. Urus lebih pantas. Kembangkan jenama dengan yakin.</h1>
        <p class="lead">
          Fixer Retail ialah portal ecommerce yang direka untuk membantu perniagaan
          mempamerkan produk, mengurus pesanan, dan membina pengalaman beli-belah
          yang kemas, laju, dan meyakinkan pelanggan.
        </p>
        <div class="actions">
          <a class="btn btn-primary" href="#hubungi">Minta Demo</a>
          <a class="btn btn-secondary" href="#fungsi">Lihat Fungsi</a>
        </div>
        <div class="stats" id="kelebihan">
          <div class="stat">
            <strong>24/7</strong>
            <span>Kedai anda sentiasa dibuka untuk pelanggan.</span>
          </div>
          <div class="stat">
            <strong>1 Dashboard</strong>
            <span>Urus stok, pesanan, dan promosi di satu tempat.</span>
          </div>
          <div class="stat">
            <strong>Fast Launch</strong>
            <span>Siap mula berniaga dengan pengalaman yang profesional.</span>
          </div>
        </div>
      </div>

      <aside class="hero-panel">
        <section class="mini-card">
          <h2>Kenapa Fixer Retail?</h2>
          <p>
            Dibina untuk perniagaan yang mahu portal jualan yang nampak premium,
            mudah digunakan, dan boleh berkembang bersama kempen pemasaran anda.
          </p>
          <div class="list">
            <div class="bullet"><strong>01</strong><span>Susun katalog produk dengan kemas dan jelas.</span></div>
            <div class="bullet"><strong>02</strong><span>Permudahkan proses checkout dan pengurusan order.</span></div>
            <div class="bullet"><strong>03</strong><span>Tingkatkan keyakinan pelanggan dengan pengalaman moden.</span></div>
          </div>
        </section>

        <section class="chart-card">
          <h2>Pertumbuhan Yang Lebih Tersusun</h2>
          <p>
            Portal yang baik bukan sekadar cantik. Ia membantu pasukan anda
            bergerak lebih pantas dari kempen pertama hingga jualan berulang.
          </p>
          <div class="chart" aria-hidden="true">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
          </div>
        </section>
      </aside>
    </section>

    <section class="features" id="fungsi">
      <article class="feature">
        <h3>Showcase Produk</h3>
        <p>
          Tonjolkan produk dengan visual yang menarik, penerangan yang jelas,
          dan susunan kategori yang mudah diteroka oleh pelanggan.
        </p>
      </article>
      <article class="feature">
        <h3>Order Management</h3>
        <p>
          Pantau pesanan, stok, dan status penghantaran dengan aliran kerja
          yang lebih kemas untuk pasukan jualan dan operasi.
        </p>
      </article>
      <article class="feature">
        <h3>Growth Ready</h3>
        <p>
          Sesuai untuk promosi, kempen bermusim, dan pengembangan jenama
          apabila bisnes anda semakin berkembang.
        </p>
      </article>
    </section>

    <section class="cta" id="hubungi">
      <div>
        <h2>Bina portal ecommerce anda bersama Fixer Retail.</h2>
        <p>
          Sesuai untuk startup, SME, dan jenama yang mahu pengalaman jualan
          digital yang nampak mantap dan mudah diurus setiap hari.
        </p>
      </div>
      <a class="btn btn-primary" href="mailto:hello@fixerretail.com">hello@fixerretail.com</a>
    </section>

    <footer class="footer">
      Fixer Retail © 2026. Ecommerce portal yang dibina untuk jualan yang lebih tersusun.
    </footer>
  </main>
</body>
</html>`;

const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  response.end(html);
});

server.listen(port, () => {
  console.log(`Fixer Retail app running at http://localhost:${port}`);
});
