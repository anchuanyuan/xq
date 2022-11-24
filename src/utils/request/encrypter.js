import cryptoJss from "crypto-js";
import {
  base64decode
} from "strman";
let aesKey = process.env.VUE_APP_API_AES_KEY;
aesKey = base64decode(aesKey.substr(8, aesKey.length - 16));

function hash(kqDY1, SkO2) {
  return cryptoJss.HmacSHA256(
    kqDY1 + SkO2,
    aesKey
  ).toString();
}

function validPayload(Xbcii$F3) {
  return (typeof Xbcii$F3 === "object" &&
    "iv" in Xbcii$F3 &&
    "mac" in Xbcii$F3 &&
    "value" in Xbcii$F3 &&
    cryptoJss.enc.Base64.parse(Xbcii$F3.iv).sigBytes === 16);
}

function random() {
  return window.Math.random().toString(36).substr(2);
}

function randomBytes() {
  return cryptoJss.enc.Utf8.parse(
    cryptoJss.MD5(random()).toString().substr(9, 16)
  );
}

function calculateMac(iyrmEa4, RDX5) {
  return cryptoJss.HmacSHA256(
    hash(iyrmEa4.iv, iyrmEa4.value),
    RDX5
  );
}

function hashEquals(UScFcLEp6, Dlrevd7) {
  const len = UScFcLEp6.length;
  let result = 0;
  for (let i = 0; i < len; ++i) {
    result |=
      UScFcLEp6.charCodeAt(i) ^
      Dlrevd7.charCodeAt(i);
  }
  return result === 0;
}

function validMac(a) {
  const bytes = randomBytes();
  const calculated = calculateMac(a, bytes);
  return hashEquals(cryptoJss.HmacSHA256(a.mac, bytes), calculated);
}

function getJsonPayload(aEAbEUasi8) {
  aEAbEUasi8 = cryptoJss.enc.Base64.parse(aEAbEUasi8).toString(cryptoJss.enc.Utf8);
  aEAbEUasi8 = JSON.parse(aEAbEUasi8);
  if (!validPayload(aEAbEUasi8)) {
    throw new window.Error("The payload is invalid.");
  }
  if (!validMac(aEAbEUasi8)) {
    throw new window.Error("The MAC is invalid.");
  }
  return aEAbEUasi8;
}
export function aesEncrypt(imb9) {
  const key = cryptoJss.enc.Utf8.parse(aesKey);
  let iv = randomBytes();
  const param = {
    iv: iv,
    mode: cryptoJss.mode.CBC,
    padding: cryptoJss.pad.Pkcs7
  };
  const plaintext = JSON.stringify(imb9);
  const ciphertext = cryptoJss.AES.encrypt(plaintext, key, param).toString();
  const mac = hash(
    (iv = cryptoJss.enc.Base64.stringify(iv).toString()),
    ciphertext
  );
  const json = JSON.stringify({
    iv: iv,
    mac: mac,
    value: ciphertext
  });
  return cryptoJss.enc.Base64.stringify(cryptoJss.enc.Utf8.parse(json));
}
export function aesDecrypt(HTrZAqKQ10) {
  const payload = getJsonPayload(HTrZAqKQ10);
  const key = cryptoJss.enc.Utf8.parse(aesKey);
  const iv = cryptoJss.enc.Base64.parse(payload.iv);
  const param = {
    iv: iv,
    mode: cryptoJss.mode.CBC,
    padding: cryptoJss.pad.Pkcs7
  };
  let plaintext = cryptoJss.AES.decrypt(
    payload.value,
    key,
    param
  );
  plaintext = plaintext.toString(cryptoJss.enc.Utf8);
  return JSON.parse(plaintext);
}