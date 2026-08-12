const crypto = require("crypto");

// PayFast requires every field (excluding SIGNATURE itself) sorted alphabetically
// by field name, joined with '&', prefixed with the Secured Key, then HMAC-SHA256'd
// with that same key as the secret. The result is uppercased hex. This must only
// ever run server-side — the Secured Key is a secret.
//
// This follows the commonly documented PayFast Pakistan Checkout API signature
// scheme. Confirm exact field names/signature format against the live PayFast
// merchant-dashboard integration guide before going live — gateway wire formats
// occasionally change between account/API versions.
const buildHashString = (fields, securedKey) => {
  const values = Object.keys(fields)
    .filter((key) => key !== "SIGNATURE")
    .sort()
    .map((key) => fields[key]);

  return [securedKey, ...values].join("&");
};

const generateSignature = (fields, securedKey) => {
  const hashString = buildHashString(fields, securedKey);
  return crypto
    .createHmac("sha256", securedKey)
    .update(hashString)
    .digest("hex")
    .toUpperCase();
};

const verifySignature = (fields, securedKey) => {
  const receivedSignature = fields.SIGNATURE;
  if (!receivedSignature) return false;

  const expectedSignature = generateSignature(fields, securedKey);

  const receivedBuffer = Buffer.from(receivedSignature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (receivedBuffer.length !== expectedBuffer.length) return false;

  return crypto.timingSafeEqual(receivedBuffer, expectedBuffer);
};

module.exports = { generateSignature, verifySignature };
