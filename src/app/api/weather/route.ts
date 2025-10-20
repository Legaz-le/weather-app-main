export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");

  const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
  const data = await response.json();
  const { latitude, longitude, timezone, name, country } = data.results[0];

  const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode,sunrise,sunset&current_weather=true&timezone=${timezone}`);
  const weatherData = await weatherResponse.json();
  const current = weatherData.current_weather;

  return new Response(
    JSON.stringify({
      city: name,
      country,
      current: {
        temperature: current.temperature ?? null,
        windSpeed: current.windspeed ?? null,
        humidity: weatherData.hourly?.relative_humidity_2m?.[0]?? null,
        perception: weatherData.hourly?.precipitation?.[0] ?? null,
      },
      daily: weatherData.daily,
    }),
    { status: 200 }
  );
}
