'use client';

import { useEffect } from 'react';

export default function FoldexPage() {
  useEffect(() => {
    // Set current year in footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear().toString();
    }
  }, []);

  return (
    <div dangerouslySetInnerHTML={{
      __html: `
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Foldex â€” File Manager for Android</title>
<meta name="description" content="Foldex is a fast, private file manager for Android. Browse local storage, SD cards and USB drives, connect to SMB/FTP/SFTP/WebDAV and Google Drive, and send files directly between devices â€” all without your files ever leaving your control.">
<link rel="icon" href="data:image/webp;base64,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" alt="">
    <h1>Foldex â€” File Manager for Android</h1>
    <p>Browse local storage, SD cards and USB drives, connect to SMB/FTP/SFTP/WebDAV and Google Drive, and send files directly between devices â€” all without your files ever leaving your control.</p>
    <div class="cta">
      <a class="btn btn-primary" href="https://play.google.com/store/apps/details?id=com.yantrixlab.foldex">Get it on Google Play</a>
      <a class="btn btn-secondary" href="/privacy">Privacy Policy</a>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <h2>Everything a file manager should do</h2>
    <p class="lede">No clutter, no upsells â€” just fast, reliable file management.</p>
    <div class="grid">
      <div class="card"><span class="emoji">ðŸ“</span><h3>Local &amp; removable storage</h3><p>Browse internal storage, SD cards and USB/OTG drives, with live updates the moment a drive is connected.</p></div>
      <div class="card"><span class="emoji">ðŸŒ</span><h3>Remote storage</h3><p>Connect to SMB, FTP, SFTP and WebDAV servers to browse and transfer files over your network.</p></div>
      <div class="card"><span class="emoji">â˜ï¸</span><h3>Cloud storage</h3><p>Connect Google Drive and other cloud providers to browse and manage your cloud files alongside local ones.</p></div>
      <div class="card"><span class="emoji">ðŸ“¶</span><h3>Nearby file transfer</h3><p>Send files directly to another Foldex device, no cables or cloud upload required.</p></div>
      <div class="card"><span class="emoji">ðŸ“Š</span><h3>Storage analyzer</h3><p>See what's actually using your storage, broken down by file type and app.</p></div>
      <div class="card"><span class="emoji">ðŸ§¹</span><h3>Cleanup tools</h3><p>Find large files, duplicate files and empty folders in a couple of taps.</p></div>
      <div class="card"><span class="emoji">ðŸ”’</span><h3>Private folder</h3><p>Lock away sensitive files behind an extra layer of protection.</p></div>
      <div class="card"><span class="emoji">ðŸ–¥ï¸</span><h3>Access from a PC</h3><p>Browse this device from a computer over FTP, no extra software needed.</p></div>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="privacy">
      <span class="emoji">ðŸ›¡ï¸</span>
      <div>
        <h2>Built to respect your files</h2>
        <p>Foldex never uploads or shares your files. Everything it does â€” copying, moving, organizing, connecting to a server or cloud account you set up yourself â€” happens directly between your device and the destination you choose.</p>
        <ul>
          <li>No ads, no file scanning for advertising or analytics purposes.</li>
          <li>Remote and cloud connections you add (SMB/FTP/SFTP/WebDAV/Google Drive) are used only to do what you asked â€” browse, open, or transfer files you choose.</li>
          <li>Credentials for connections you add are stored encrypted, on-device.</li>
        </ul>
        <p style="margin-top:14px"><a href="/privacy">Read the full Privacy Policy â†’</a></p>
      </div>
    </div>
  </div>
</section>

<footer>
  <div class="wrap row">
    <span>Â© <span id="year"></span> YantrixLab. All rights reserved.</span>
    <span class="links">
      <a href="/privacy">Privacy Policy</a>
      <a href="mailto:subhojitdp@gmail.com">Contact</a>
    </span>
  </div>
</footer>

<style>
  :root{
    --bg:#0d1117; --panel:#151b23; --panel-2:#1c232d; --border:#262e3a;
    --text:#eef2f6; --text-dim:#9aa7b5; --accent:#f5a623; --accent-2:#ffb84d;
  }
  *{box-sizing:border-box}
  body{margin:0;background:var(--bg);color:var(--text);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;line-height:1.5}
  a{color:var(--accent)}
  .wrap{max-width:1040px;margin:0 auto;padding:0 20px}

  header.top{padding:20px 0;border-bottom:1px solid var(--border)}
  .brand{display:flex;align-items:center;gap:12px}
  .brand img{width:40px;height:40px;border-radius:10px}
  .brand span{font-size:20px;font-weight:700;letter-spacing:.2px}

  .hero{padding:100px 0 80px;text-align:center}
  .hero img.icon{width:100px;height:100px;border-radius:24px;margin-bottom:40px;box-shadow:0 12px 40px rgba(245,166,35,.2)}
  .hero h1{font-size:clamp(36px,7vw,56px);margin:0 0 24px;font-weight:900;letter-spacing:-1.5px}
  .hero p{color:var(--text-dim);font-size:clamp(16px,2vw,18px);max-width:680px;margin:0 auto 48px;line-height:1.7;font-weight:400}
  .cta{display:flex;gap:16px;justify-content:center;flex-wrap:wrap}
  .btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:14px 36px;border-radius:10px;font-weight:700;text-decoration:none;font-size:16px;border:none;cursor:pointer;transition:opacity 0.2s ease}
  .btn-primary{background:var(--accent);color:#1a1305}
  .btn-primary:hover{opacity:0.9}
  .btn-secondary{background:var(--panel-2);color:var(--text);border:1px solid var(--border)}
  .btn-secondary:hover{opacity:0.9;border-color:var(--accent)}

  section{padding:56px 0}
  section h2{font-size:clamp(26px,4vw,34px);margin:0 0 12px;text-align:center;font-weight:800;letter-spacing:-0.5px}
  section .lede{color:var(--text-dim);text-align:center;max-width:580px;margin:0 auto 40px;font-size:16px;line-height:1.6}

  .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:16px}
  .card{background:var(--panel);border:1px solid var(--border);border-radius:14px;padding:24px;transition:all 0.2s ease}
  .card:hover{border-color:var(--accent);box-shadow:0 8px 24px rgba(245,166,35,.1)}
  .card .emoji{font-size:28px;display:block;margin-bottom:12px}
  .card h3{margin:0 0 8px;font-size:16px;font-weight:700}
  .card p{margin:0;color:var(--text-dim);font-size:14px;line-height:1.5}

  .privacy{background:var(--panel);border:1px solid var(--border);border-radius:16px;padding:40px;display:flex;gap:28px;align-items:flex-start;flex-wrap:wrap}
  .privacy .emoji{font-size:40px;flex-shrink:0;margin-top:2px}
  .privacy h2{text-align:left;margin:0 0 12px;font-weight:800;font-size:24px}
  .privacy p{color:var(--text-dim);margin:0 0 10px;line-height:1.6;font-size:15px}
  .privacy ul{color:var(--text-dim);margin:12px 0 0;padding-left:22px}
  .privacy ul li{margin-bottom:10px;line-height:1.5;font-size:14px}

  footer{border-top:1px solid var(--border);padding:28px 0;color:var(--text-dim);font-size:13px}
  footer .row{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px}
  footer a{color:var(--text-dim);text-decoration:none;margin-left:18px}
  footer a:hover{color:var(--accent)}
  footer .links{white-space:nowrap}

  @media (max-width:520px){
    footer .row{flex-direction:column;align-items:flex-start}
    footer .links{margin-left:0}
    footer a{margin-left:0;margin-right:16px}
  }
</style>
      `
    }} />
  );
}

