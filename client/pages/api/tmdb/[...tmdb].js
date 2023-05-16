import needle from 'needle'
import url from 'url';
import cache from "memory-cache";

export default async function handler(req, res) {
  const api_key_name = process.env.NEXT_PUBLIC_TMDB_API_KEY_NAME;
  const api_key_value = process.env.NEXT_PUBLIC_TMDB_API_KEY_VALUE;
  const api_base_url = process.env.NEXT_PUBLIC_TMDB_API_BASE_URL;
  try {
    const parsedUrl = url.parse(req.url);
    const path = parsedUrl.pathname.replace('/api/tmdb', '');
    const params = new URLSearchParams({
      [api_key_name]: api_key_value,
      ...url.parse(req.url, true, false).query
    });

    const url_complete = `${api_base_url}${path}?${params}`;
    console.log(url_complete)
    if (cache.get(url_complete)) {
      res.setHeader('Cache-Control', 'public, max-age=120');
      res.status(200).json(cache.get(url_complete));
      console.log("is in cache")
    } else {
      const apiRes = await needle('get', url_complete);
      const data = apiRes.body;
      res.setHeader('Cache-Control', 'public, max-age=120'); // Přidání Cache-Control hlavičky
      res.status(200).json(data);
      cache.put(url_complete, data, 120000)
      console.log("not in cache")
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
}


