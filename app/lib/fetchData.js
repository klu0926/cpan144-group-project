export async function fetchData(query) {
  const apiKey = process.env.API_KEY;

  const res = await fetch(`https://api.apilayer.com/spoonacular/recipes/complexSearch?query=${query}`, {
    headers: {
      'apikey': apiKey
    }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
