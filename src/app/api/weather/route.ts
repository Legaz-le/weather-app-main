export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");

  if (!city) {
    return new Response(JSON.stringify({ error: "City not provided" }), {
      status: 400,
    });
  }

  const geoResponse = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
  );

  if (!geoResponse.ok) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch geolocation data" }),
      {
        status: geoResponse.status,
      }
    );
  }
  const geoData = await geoResponse.json();

  if (!geoData.results || geoData.results.length === 0) {
    return new Response(JSON.stringify({ error: "city-not-found" }), {
      status: 404,
    });
  }

  const { latitude, longitude, timezone, name, country } = geoData.results[0];

  const weatherResponse = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=${timezone}`
  );

  if (!weatherResponse.ok) {
    return new Response(JSON.stringify({ error: "Failed to fetch weather" }), {
      status: weatherResponse.status,
    });
  }

  const weatherData = await weatherResponse.json();

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
