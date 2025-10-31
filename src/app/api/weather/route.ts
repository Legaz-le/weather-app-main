import https from "https";
import axios from "axios";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");
  const httpsAgent = new https.Agent({ family: 4 });

  if (!city) {
    return new Response(JSON.stringify({ error: "City not provided" }), {
      status: 400,
    });
  }

  const geoResponse = await axios(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`,
    {
      params: { name: city, count: 1 },
      timeout: 8000,
      httpsAgent,
    }
  );

  const geoData = geoResponse.data;
  if (!geoData.results || geoData.results.length === 0) {
    return new Response(JSON.stringify({ error: "City not found" }), {
      status: 404,
    });
  }

  const { latitude, longitude, timezone, name, country } = geoData.results[0];

  const weatherResponse = await axios(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=${timezone}`,
    {
      params: { name: city, count: 1 },
      timeout: 8000,
      httpsAgent,
    }
  );
  const weatherData = weatherResponse.data;

  const current = weatherData.current_weather;

  const currentTime = current.time;
  const hourlyTimes = weatherData.hourly.time;
  const index = hourlyTimes.indexOf(currentTime);

  const humidity =
    index !== -1 ? weatherData.hourly.relative_humidity_2m[index] : null;
  const perception =
    index !== -1 ? weatherData.hourly.precipitation[index] : null;

  return new Response(
    JSON.stringify({
      city: name,
      country,
      current: {
        temperature: current.temperature ?? null,
        windSpeed: current.windspeed ?? null,
        humidity: humidity ?? null,
        perception: perception ?? null,
      },
      daily: weatherData.daily,
      hourly: weatherData.hourly,
    }),
    { status: 200 }
  );
}
