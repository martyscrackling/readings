export async function fetchCatholicReadings() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const url = `https://universalis.com/Europe.England.Westminster/${year}${month}${day}/jsonpmass.js`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  const text = await response.text();

  // 🚨 SAFETY CHECK (important in production)
  if (!text || text.trim().startsWith("<")) {
    throw new Error("Invalid response from Universalis API");
  }

  // Extract JSON safely (handles variations)
  const match = text.match(/\(([\s\S]*)\)/);

  if (!match) {
    throw new Error("Failed to parse JSONP response");
  }

  const data = JSON.parse(match[1]);

  return data;
}
