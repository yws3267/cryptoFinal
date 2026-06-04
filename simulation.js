/* ============================================================
   탭 전환
============================================================ */
document.querySelectorAll('.tab-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document
      .querySelectorAll('.tab-btn')
      .forEach((b) => b.classList.remove('active'));
    document
      .querySelectorAll('.panel')
      .forEach((p) => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

/* ============================================================
   고대 · 스키테일
============================================================ */
function encryptScytale() {
  const text = document.getElementById('scytale-text').value;
  const key = parseInt(document.getElementById('scytale-key').value);
  const out = document.getElementById('scytale-output');
  if (!text) {
    out.textContent = '';
    return;
  }
  if (key < 2) {
    out.textContent = '키는 2 이상이어야 합니다.';
    return;
  }
  const cols = key,
    rows = Math.ceil(text.length / cols);
  let result = '';
  for (let c = 0; c < cols; c++)
    for (let r = 0; r < rows; r++) {
      const idx = r * cols + c;
      result += idx < text.length ? text[idx] : ' ';
    }
  out.textContent = result;
}
function resetScytale() {
  document.getElementById('scytale-text').value = '';
  document.getElementById('scytale-key').value = '4';
  document.getElementById('scytale-output').textContent = '';
}

/* ============================================================
   고대 · 카이사르
============================================================ */
function encryptCaesar() {
  const text = document.getElementById('caesar-text').value;
  let key = parseInt(document.getElementById('caesar-key').value);
  const out = document.getElementById('caesar-output');
  if (!text) {
    out.textContent = '';
    return;
  }
  key = ((key % 26) + 26) % 26;
  out.textContent = text
    .split('')
    .map((c) => {
      if (c.match(/[A-Z]/))
        return String.fromCharCode(((c.charCodeAt(0) - 65 + key) % 26) + 65);
      if (c.match(/[a-z]/))
        return String.fromCharCode(((c.charCodeAt(0) - 97 + key) % 26) + 97);
      return c;
    })
    .join('');
}
function resetCaesar() {
  document.getElementById('caesar-text').value = '';
  document.getElementById('caesar-key').value = '3';
  document.getElementById('caesar-output').textContent = '';
}

/* ============================================================
   중세 · 알베르티
============================================================ */
const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
function renderDisk() {
  const outer = document.getElementById('outerDisk');
  const inner = document.getElementById('innerDisk');
  if (!outer || !inner) return;
  outer.innerHTML = inner.innerHTML = '';
  const shift = parseInt(document.getElementById('albertiShift').value);
  const OC = 140,
    OR = 122; // 바깥 고리: 중심 140, 반지름 122 (280px 디스크)
  const IC = 88,
    IR = 73; // 안쪽 고리: 중심 88, 반지름 73 (176px 디스크)
  for (let i = 0; i < 26; i++) {
    const a = (((i * 360) / 26 - 90) * Math.PI) / 180;
    const el = document.createElement('span');
    el.style.cssText = `position:absolute;font-size:13px;font-weight:600;font-family:'IBM Plex Mono',monospace;color:#92400e;
      left:${OC + OR * Math.cos(a) - 4}px;top:${OC + OR * Math.sin(a) - 9}px;`;
    el.textContent = ALPHA[i];
    outer.appendChild(el);
  }
  for (let i = 0; i < 26; i++) {
    const a = (((i * 360) / 26 - 90) * Math.PI) / 180;
    const el = document.createElement('span');
    el.style.cssText = `position:absolute;font-size:12px;font-weight:600;font-family:'IBM Plex Mono',monospace;color:#d97706;
      left:${IC + IR * Math.cos(a) - 4}px;top:${IC + IR * Math.sin(a) - 8}px;`;
    el.textContent = ALPHA[(i + shift) % 26];
    inner.appendChild(el);
  }
}
function updateDisk() {
  document.getElementById('albertiShiftVal').textContent =
    document.getElementById('albertiShift').value;
  renderDisk();
  encryptAlberti();
}
function encryptAlberti() {
  const text = document.getElementById('albertiInput').value.toUpperCase();
  const shift = parseInt(document.getElementById('albertiShift').value);
  document.getElementById('albertiOutput').textContent =
    text
      .split('')
      .map((c) =>
        c >= 'A' && c <= 'Z' ? ALPHA[(c.charCodeAt(0) - 65 + shift) % 26] : c,
      )
      .join('') || '—';
}

/* ============================================================
   중세 · 비즈네르
============================================================ */
function buildVigTable() {
  const wrap = document.getElementById('vigTable');
  if (!wrap) return;
  let html = '<table class="vtable"><tbody><tr><td class="header corner">+</td>';
  for (let c = 0; c < 26; c++)
    html += `<td class="header" data-colh="${c}">${ALPHA[c]}</td>`;
  html += '</tr>';
  for (let r = 0; r < 26; r++) {
    html += `<tr><td class="header" data-rowh="${r}">${ALPHA[r]}</td>`;
    for (let c = 0; c < 26; c++)
      html += `<td data-r="${r}" data-c="${c}">${ALPHA[(r + c) % 26]}</td>`;
    html += '</tr>';
  }
  html += '</tbody></table>';
  wrap.innerHTML = html;
}

function updateVigHighlight(text, key) {
  const wrap = document.getElementById('vigTable');
  if (!wrap) return;
  wrap
    .querySelectorAll('.row-hl, .col-hl, .highlight')
    .forEach((e) => e.classList.remove('row-hl', 'col-hl', 'highlight'));
  if (!text) return;
  const rows = new Set(),
    cols = new Set();
  for (let i = 0; i < text.length; i++) {
    rows.add(key[i % key.length].charCodeAt(0) - 65);
    cols.add(text[i].charCodeAt(0) - 65);
  }
  rows.forEach((r) => {
    wrap
      .querySelectorAll(`td[data-r="${r}"], td[data-rowh="${r}"]`)
      .forEach((e) => e.classList.add('row-hl'));
  });
  cols.forEach((c) => {
    wrap
      .querySelectorAll(`td[data-c="${c}"], td[data-colh="${c}"]`)
      .forEach((e) => e.classList.add('col-hl'));
  });
  for (let i = 0; i < text.length; i++) {
    const r = key[i % key.length].charCodeAt(0) - 65;
    const c = text[i].charCodeAt(0) - 65;
    const cell = wrap.querySelector(`td[data-r="${r}"][data-c="${c}"]`);
    if (cell) cell.classList.add('highlight');
  }
}

/* ── 중세 패널 빌더 (왼쪽 조정 · 오른쪽 시각화) ── */
function buildMedievalPanels() {
  const am = document.getElementById('albertiMount');
  if (am) {
    am.innerHTML = `
      <div class="panel-header">
        <span class="era-badge badge-medieval">중세</span>
        <div>
          <h2>알베르티 암호</h2>
          <span class="sub">1467 · 이탈리아 · 회전 원판</span>
        </div>
      </div>
      <div class="med-split">
        <div class="med-controls">
          <div class="demo-title">조정</div>
          <div>
            <div class="demo-label">디스크 회전 (키)</div>
            <div class="demo-slider-row">
              <input type="range" min="0" max="25" value="3" id="albertiShift" oninput="updateDisk()" />
              <span class="demo-slider-val" id="albertiShiftVal">3</span>
            </div>
          </div>
          <div>
            <div class="demo-label">입력 텍스트</div>
            <input class="demo-input" type="text" id="albertiInput" value="HELLO" oninput="encryptAlberti()" />
          </div>
          <div>
            <div class="demo-label">암호화 결과</div>
            <div class="demo-output-box" id="albertiOutput">KHOOR</div>
          </div>
          <button class="med-reset" onclick="resetAlberti()">초기화</button>
        </div>
        <div class="med-viz">
          <div class="alberti-disk">
            <div class="disk-wrap"><div id="outerDisk"></div><div id="innerDisk"></div></div>
          </div>
        </div>
      </div>`;
  }
  const vm = document.getElementById('vigMount');
  if (vm) {
    vm.innerHTML = `
      <div class="panel-header">
        <span class="era-badge badge-medieval">중세</span>
        <div>
          <h2>비즈네르 암호</h2>
          <span class="sub">1553 · 프랑스 · 타뷸라 렉타</span>
        </div>
      </div>
      <div class="med-split">
        <div class="med-controls">
          <div class="demo-title">시뮬레이터</div>
          <div>
            <div class="demo-label">평문 입력</div>
            <input class="demo-input" type="text" id="vigInput" value="HELLO" oninput="encryptVigenere()" />
          </div>
          <div>
            <div class="demo-label">키워드</div>
            <input class="demo-input" type="text" id="vigKey" value="KEY" oninput="encryptVigenere()" />
          </div>
          <div>
            <div class="demo-label">암호화 결과</div>
            <div class="demo-output-box" id="vigOutput">RIJVS</div>
          </div>
          <div class="vig-map" id="vigMapping"></div>
          <button class="med-reset" onclick="resetVigenere()">초기화</button>
        </div>
        <div class="med-viz med-viz-table">
          <div class="vigenere-table-wrap">
            <h3>타뷸라 렉타 — 키에 따른 상태 변화</h3>
            <div id="vigTable"></div>
          </div>
        </div>
      </div>`;
  }
}

function encryptVigenere() {
  const text = document
    .getElementById('vigInput')
    .value.toUpperCase()
    .replace(/[^A-Z]/g, '');
  const key =
    document
      .getElementById('vigKey')
      .value.toUpperCase()
      .replace(/[^A-Z]/g, '') || 'A';
  if (!text) {
    document.getElementById('vigOutput').textContent = '—';
    document.getElementById('vigMapping').textContent = '';
    updateVigHighlight('', key);
    return;
  }
  let result = '',
    kd = '';
  for (let i = 0; i < text.length; i++) {
    const k = key[i % key.length].charCodeAt(0) - 65;
    result += ALPHA[(text[i].charCodeAt(0) - 65 + k) % 26];
    kd += key[i % key.length];
  }
  document.getElementById('vigOutput').textContent = result;
  document.getElementById('vigMapping').textContent =
    '평문 ' + text + '   +   키 ' + kd + '   →   결과 ' + result;
  updateVigHighlight(text, key);
}

/* ============================================================
   DES
============================================================ */
function binToHex(bin) {
  return parseInt(bin, 2)
    .toString(16)
    .toUpperCase()
    .padStart(bin.length / 4, '0');
}
function simulateSBox(bit48) {
  let result = '';
  for (let i = 0; i < 48; i += 6) {
    let chunk = bit48.substr(i, 6);
    result += chunk.split('').reverse().join('').substr(1, 4);
  }
  return result;
}
function runDESRound() {
  const hexData = document.getElementById('des-data').value.trim();
  const hexKey = document.getElementById('des-key').value.trim();
  if (hexData.length !== 16 || hexKey.length !== 12) {
    alert('데이터 16자리, 키 12자리의 16진수를 입력해 주세요.');
    return;
  }
  const binData = hexData
    .split('')
    .map((h) => parseInt(h, 16).toString(2).padStart(4, '0'))
    .join('');
  const L0 = binData.slice(0, 32),
    R0 = binData.slice(32, 64);
  document.getElementById('des-l0').textContent =
    binToHex(L0) + ' (' + L0.slice(0, 8) + '...)';
  document.getElementById('des-r0').textContent =
    binToHex(R0) + ' (' + R0.slice(0, 8) + '...)';

  let exp = '';
  for (let i = 0; i < 32; i++) {
    exp += R0[i];
    if (i % 2 === 0) exp += R0[i];
  }
  exp = exp.slice(0, 48);
  document.getElementById('des-expand').textContent = exp;

  const binKey = hexKey
    .split('')
    .map((h) => parseInt(h, 16).toString(2).padStart(4, '0'))
    .join('');
  let xor = '';
  for (let i = 0; i < 48; i++)
    xor += (parseInt(exp[i]) ^ parseInt(binKey[i])).toString();
  document.getElementById('des-xor').textContent = xor;

  const sbox = simulateSBox(xor);
  document.getElementById('des-sbox').textContent =
    binToHex(sbox) + ' (' + sbox.slice(0, 8) + '...)';

  const L1 = R0;
  let R1 = '';
  for (let i = 0; i < 32; i++)
    R1 += (parseInt(L0[i]) ^ parseInt(sbox[i])).toString();
  document.getElementById('des-l1').textContent = binToHex(L1);
  document.getElementById('des-r1').textContent = binToHex(R1);
  document.getElementById('des-final').textContent = binToHex(L1 + R1);
}
function resetDES() {
  setHexValue('des-data', '0123456789ABCDEF');
  setHexValue('des-key', '132435465768');
  ['l0', 'r0', 'expand', 'xor', 'sbox', 'l1', 'r1', 'final'].forEach(
    (id) => (document.getElementById('des-' + id).textContent = '—'),
  );
}

/* ============================================================
   AES
============================================================ */
function sBoxSub(hexByte) {
  return ((parseInt(hexByte, 16) * 3 + 7) % 256)
    .toString(16)
    .toUpperCase()
    .padStart(2, '0');
}
function buildMatrix(hexStr) {
  const m = Array.from({ length: 4 }, () => Array(4).fill('00'));
  let k = 0;
  for (let c = 0; c < 4; c++)
    for (let r = 0; r < 4; r++) {
      m[r][c] = hexStr.substr(k, 2).toUpperCase();
      k += 2;
    }
  return m;
}
function renderMatrix(id, m, hl = false) {
  const el = document.getElementById(id);
  el.innerHTML = '';
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 4; c++) {
      const cell = document.createElement('div');
      cell.className = 'm-cell' + (hl ? ' hl' : '');
      cell.textContent = m[r][c];
      el.appendChild(cell);
    }
}
function renderEmptyAES() {
  const empty = Array.from({ length: 4 }, () => Array(4).fill('--'));
  [
    'aes-m-input',
    'aes-m-sub',
    'aes-m-shift',
    'aes-m-mix',
    'aes-m-roundkey',
  ].forEach((id) => renderMatrix(id, empty));
  document.getElementById('aes-final').textContent = '—';
}
function runAESRound() {
  const dh = document.getElementById('aes-data').value.trim();
  const kh = document.getElementById('aes-key').value.trim();
  if (dh.length !== 32 || kh.length !== 32) {
    alert('데이터와 키 모두 32자리(16바이트)이어야 합니다.');
    return;
  }
  let state = buildMatrix(dh),
    key = buildMatrix(kh);
  renderMatrix('aes-m-input', state);

  let sub = Array.from({ length: 4 }, () => Array(4).fill('00'));
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 4; c++) sub[r][c] = sBoxSub(state[r][c]);
  renderMatrix('aes-m-sub', sub, true);

  let shift = Array.from({ length: 4 }, () => Array(4).fill('00'));
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 4; c++) shift[r][c] = sub[r][(c + r) % 4];
  renderMatrix('aes-m-shift', shift, true);

  let mix = Array.from({ length: 4 }, () => Array(4).fill('00'));
  for (let c = 0; c < 4; c++)
    for (let r = 0; r < 4; r++) {
      const v1 = parseInt(shift[r][c], 16),
        v2 = parseInt(shift[(r + 1) % 4][c], 16);
      mix[r][c] = ((v1 ^ v2 ^ 0x3a) % 256)
        .toString(16)
        .toUpperCase()
        .padStart(2, '0');
    }
  renderMatrix('aes-m-mix', mix, true);

  let final = Array.from({ length: 4 }, () => Array(4).fill('00'));
  let fStr = '';
  for (let c = 0; c < 4; c++)
    for (let r = 0; r < 4; r++) {
      const v = (parseInt(mix[r][c], 16) ^ parseInt(key[r][c], 16))
        .toString(16)
        .toUpperCase()
        .padStart(2, '0');
      final[r][c] = v;
      fStr += v;
    }
  renderMatrix('aes-m-roundkey', final);
  document.getElementById('aes-final').textContent = fStr;
}
function resetAES() {
  setHexValue('aes-data', '00112233445566778899AABBCCDDEEFF');
  setHexValue('aes-key', '000102030405060708090A0B0C0D0E0F');
  renderEmptyAES();
}

/* ============================================================
   RSA
============================================================ */
function powerMod(base, exp, mod) {
  if (mod === 1n) return 0n;
  let r = 1n;
  base = base % mod;
  while (exp > 0n) {
    if (exp % 2n === 1n) r = (r * base) % mod;
    exp = exp / 2n;
    base = (base * base) % mod;
  }
  return r;
}
function modInverse(e, phi) {
  let m0 = phi,
    t,
    q,
    x0 = 0n,
    x1 = 1n;
  if (phi === 1n) return 0n;
  while (e > 1n) {
    q = e / phi;
    t = phi;
    phi = e % phi;
    e = t;
    t = x0;
    x0 = x1 - q * x0;
    x1 = t;
  }
  return x1 < 0n ? x1 + m0 : x1;
}
const RSA_p = 61n,
  RSA_q = 53n,
  RSA_N = RSA_p * RSA_q;
const RSA_phi = (RSA_p - 1n) * (RSA_q - 1n),
  RSA_e = 17n;
const RSA_d = modInverse(RSA_e, RSA_phi);

function initRSA() {
  document.getElementById('rsa-pub-N').textContent = RSA_N.toString();
  document.getElementById('rsa-pub-e').textContent = RSA_e.toString();
  document.getElementById('rsa-priv-N').textContent = RSA_N.toString();
  document.getElementById('rsa-priv-d').textContent = RSA_d.toString();
}
function runRSA() {
  const plain = document.getElementById('rsa-plain').value;
  if (!plain) {
    alert('평문을 입력해 주세요!');
    return;
  }
  const ascii = Array.from(plain).map((c) => BigInt(c.charCodeAt(0)));
  document.getElementById('rsa-step-ascii').textContent = ascii.join(', ');
  const enc = ascii.map((m) => powerMod(m, RSA_e, RSA_N));
  document.getElementById('rsa-step-enc').textContent = enc.join(', ');
  const dec = enc.map((c) => powerMod(c, RSA_d, RSA_N));
  document.getElementById('rsa-step-dec').textContent = dec.join(', ');
  document.getElementById('rsa-final').textContent = dec
    .map((m) => String.fromCharCode(Number(m)))
    .join('');
}
function resetRSA() {
  document.getElementById('rsa-plain').value = 'Hello RSA';
  ['rsa-step-ascii', 'rsa-step-enc', 'rsa-step-dec', 'rsa-final'].forEach(
    (id) => (document.getElementById(id).textContent = '—'),
  );
}

/* ============================================================
   SHA-256
============================================================ */
function rightRotate(v, a) {
  return (v >>> a) | (v << (32 - a));
}
function toHex32(n) {
  return (n >>> 0).toString(16).padStart(8, '0').toUpperCase();
}
const SHA_K = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1,
  0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
  0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786,
  0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
  0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
  0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b,
  0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a,
  0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
  0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
];
function runSHA256() {
  const inp = document.getElementById('sha-input').value;
  let words = [];
  for (let i = 0; i < inp.length; i++)
    words[i >>> 2] |= (inp.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
  let binStr = '';
  for (let i = 0; i < inp.length; i++)
    binStr += inp.charCodeAt(i).toString(2).padStart(8, '0');
  document.getElementById('sha-bin').textContent = binStr + '1...';

  const bl = inp.length * 8;
  words[bl >>> 5] |= 0x80 << (24 - (bl % 32));
  words[(((bl + 64) >>> 9) << 4) + 15] = bl;
  let vp = binStr + '1';
  while (vp.length % 512 !== 448) vp += '0';
  vp += bl.toString(2).padStart(64, '0');
  document.getElementById('sha-padding').textContent = vp;

  let h0 = 0x6a09e667,
    h1 = 0xbb67ae85,
    h2 = 0x3c6ef372,
    h3 = 0xa54ff53a;
  let h4 = 0x510e527f,
    h5 = 0x9b05688c,
    h6 = 0x1f83d9ab,
    h7 = 0x5be0cd19;
  const W = new Array(64);
  for (let i = 0; i < 16; i++) W[i] = words[i] || 0;
  for (let i = 16; i < 64; i++) {
    const s0 =
      rightRotate(W[i - 15], 7) ^
      rightRotate(W[i - 15], 18) ^
      (W[i - 14] >>> 3);
    const s1 =
      rightRotate(W[i - 2], 17) ^
      rightRotate(W[i - 2], 19) ^
      (W[i - 11] >>> 10);
    W[i] = (W[i - 16] + s0 + W[i - 7] + s1) | 0;
  }
  let a = h0,
    b = h1,
    c = h2,
    d = h3,
    e = h4,
    f = h5,
    g = h6,
    h = h7;
  for (let j = 0; j < 64; j++) {
    const S1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
    const ch = (e & f) ^ (~e & g);
    const t1 = (h + S1 + ch + SHA_K[j] + W[j]) | 0;
    const S0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
    const maj = (a & b) ^ (a & c) ^ (b & c);
    const t2 = (S0 + maj) | 0;
    h = g;
    g = f;
    f = e;
    e = (d + t1) | 0;
    d = c;
    c = b;
    b = a;
    a = (t1 + t2) | 0;
    if (j === 0) {
      ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].forEach(
        (id, i) =>
          (document.getElementById('sha-' + id).textContent = toHex32(
            [a, b, c, d, e, f, g, h][i],
          )),
      );
    }
  }
  h0 = (h0 + a) | 0;
  h1 = (h1 + b) | 0;
  h2 = (h2 + c) | 0;
  h3 = (h3 + d) | 0;
  h4 = (h4 + e) | 0;
  h5 = (h5 + f) | 0;
  h6 = (h6 + g) | 0;
  h7 = (h7 + h) | 0;
  document.getElementById('sha-final').textContent = [
    h0,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    h7,
  ]
    .map(toHex32)
    .join('');
}
function resetSHA() {
  document.getElementById('sha-input').value = 'Hello SHA';
  document.getElementById('sha-bin').textContent = '—';
  document.getElementById('sha-padding').textContent = '—';
  ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].forEach(
    (id) => (document.getElementById('sha-' + id).textContent = '—'),
  );
  document.getElementById('sha-final').textContent = '—';
}

function resetAlberti() {
  document.getElementById('albertiShift').value = '3';
  document.getElementById('albertiInput').value = 'HELLO';
  updateDisk(); // 슬라이더 값 + 원판 + 암호화 결과 갱신
}

function resetVigenere() {
  document.getElementById('vigInput').value = 'HELLO';
  document.getElementById('vigKey').value = 'KEY';
  encryptVigenere(); // 결과 + 매핑 + 타뷸라 렉타 갱신
}

/* ============================================================
   Hex 입력 가이드 — 필요 글자수만큼 회색 중간점을 깔고,
   입력한 글자가 왼쪽부터 그 자리를 채운다.
============================================================ */
function setupHexGuide(id) {
  const input = document.getElementById(id);
  if (!input) return;
  const ghost = document.getElementById(id + '-ghost');
  if (!ghost) return;
  const len = parseInt(input.getAttribute('maxlength'), 10) || 0;

  function render() {
    const value = input.value;
    let html = '';
    for (let i = 0; i < len; i++) {
      if (i < value.length) {
        const ch = value[i]
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
        html += '<span class="hx-c">' + ch + '</span>';
      } else {
        html += '<span class="hx-d">·</span>';
      }
    }
    ghost.innerHTML = html;
  }

  input.addEventListener('input', render);
  render(); // 기본값 / 빈 상태를 즉시 반영
}

// 프로그램적으로 값을 바꿀 때도 가이드가 갱신되도록 input 이벤트를 발생시킨다.
function setHexValue(id, value) {
  const el = document.getElementById(id);
  el.value = value;
  el.dispatchEvent(new Event('input'));
}

/* ── 초기화 ── */
buildMedievalPanels();
renderDisk();
encryptAlberti();
buildVigTable();
encryptVigenere();
renderEmptyAES();
initRSA();
['des-data', 'des-key', 'aes-data', 'aes-key'].forEach(setupHexGuide);
