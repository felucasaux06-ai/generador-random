export async function GET() {
  try {
    const res = await fetch('https://srv.adstxtmanager.com/19390/generadorrandom.com', {
      next: { revalidate: 86400 },
    })
    const text = await res.text()
    return new Response(text, {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=86400',
      },
    })
  } catch {
    return new Response('google.com, pub-3677895061975967, DIRECT, f08c47fec0942fa0\n', {
      headers: { 'Content-Type': 'text/plain' },
    })
  }
}
