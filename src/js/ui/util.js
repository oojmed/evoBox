let windowPadding = 50;

export function getWindowPosition(thing) {
  return { x: ((document.getElementById('sandbox').offsetWidth - 2 * windowPadding) / 100 * ((thing.x + 100) / 2)) + windowPadding,
    y: ((document.getElementById('sandbox').offsetHeight - 2 * windowPadding) / 100 * ((thing.y + 100) / 2)) + windowPadding };
}

export function getRelativePosition(posX, posY) {
  return { x: 100 * (document.getElementById('sandbox').offsetWidth - 2 * posX) / (2 * windowPadding - document.getElementById('sandbox').offsetWidth),
    y: 100 * (document.getElementById('sandbox').offsetHeight - 2 * posY) / (2 * windowPadding - document.getElementById('sandbox').offsetHeight) };
}

export function sizeFactor() {
  return sizeAmount() / 2000;
}

export function sizeAmount() {
  let width = sandbox.style.width ? sandbox.style.width : '2000px';
  return parseFloat(width.replace('px', ''))
}

export function showNumber(n) {
  return parseFloat(n.toPrecision(3));
}

export function makeID(n) {
  return n.replace(' ', '_');
}

export function hslToRgb(h, s, l) { // https://stackoverflow.com/a/9493060
  let r, g, b;

  if (s == 0) {
      r = g = b = l; // achromatic
  } else {
    let hue2rgb = function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;

    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

let logLeft = 0;

export function addLog(msg, type) {
  let log = document.getElementById('log');

  let lineSplit = log.innerText.split('\n')
  if (lineSplit.length >= 10) {
    log.innerText = lineSplit.splice(1).join('\n');
  }

  let el = document.createElement('div');
  el.innerText = msg;

  if (type !== undefined) {
    el.className = `log-type-${type}`;
  }

  log.appendChild(el);
  // log.innerText += `${msg}\n`;

  log.classList.add('show');

  logLeft++;

  setTimeout(function() {
    let child = [...log.children].find((c) => c.innerText === msg);

    if (child === undefined) { return; }

    if (log.children.length === 1) {
      log.classList.remove('show');
    }

    log.removeChild(child);
  }, 2500);
}