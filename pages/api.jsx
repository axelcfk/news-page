export async function fetchDataByCategory(category) {
  const myAPI_KEY = "pub_3900581ff98cc657ee844badca5975b771778";
  const res = await fetch(
    `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&country=us&language=en&category=${category}`
  );
  const data = await res.json();
  return data.results;
}
