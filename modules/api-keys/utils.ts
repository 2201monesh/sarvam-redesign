export function generateApiKey() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  // Build a 40-char random suffix, then prepend the vendor prefix
  const rand = Array.from({ length: 40 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `sarvam_api_${rand}`;
}

export function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
