export async function POST(req: Request) {
  const { text } = await req.json();

  if (!text?.trim()) return new Response(JSON.stringify({ translated: "" }), { status: 200 });

  const res = await fetch("https://libretranslate.com/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      q: text,
      source: "auto",
      target: "en",
      format: "text",
    }),
  });

  if (!res.ok) return new Response(JSON.stringify({ translated: text }), { status: res.status });

  const data = await res.json();
  return new Response(JSON.stringify({ translated: data.translatedText }), { status: 200 });
}