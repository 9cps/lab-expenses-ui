export async function GET(req) {
    const url = new URL(req.url);
  
    // ตรวจสอบว่า path เป็น /api/auth/session
    if (url.pathname.endsWith('/session')) {
      return new Response(
        JSON.stringify({
          user: {
            name: 'Mock User',
            email: 'mock@example.com',
          },
          expires: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 ชั่วโมง
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  
    // ตอบ default response สำหรับ route อื่น ๆ
    return new Response(JSON.stringify({ ok: true, message: 'Bypassed auth route' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  export async function POST() {
    return new Response(JSON.stringify({ ok: true, message: 'Bypassed POST' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  export async function OPTIONS() {
    return new Response(null, { status: 204 });
  }
  