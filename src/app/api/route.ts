import { NextResponse } from 'next/server';

const HOUR_MS = 60 * 60 * 1000;

export async function GET(req: Request) {
  const url = new URL(req.url);

  // Mock the next-auth session endpoint so the UI can run without a real provider.
  if (url.pathname.endsWith('/session')) {
    return NextResponse.json({
      user: { name: 'Mock User', email: 'mock@example.com' },
      expires: new Date(Date.now() + HOUR_MS).toISOString(),
    });
  }

  return NextResponse.json({ ok: true, message: 'Bypassed auth route' });
}

export async function POST() {
  return NextResponse.json({ ok: true, message: 'Bypassed POST' });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
