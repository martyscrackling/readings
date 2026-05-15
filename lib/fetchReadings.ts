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

  const jsonText = text
    .replace("universalisCallback(", "")
    .replace(");", "");

  const data = JSON.parse(jsonText);

  return data;
}