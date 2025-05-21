import { NextRequest, NextResponse } from 'next/server';
import { Client } from 'pg';

export async function GET() {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'university_portal',
    password: 'Azram143$',
    port: 5432,
  });

  try {
    await client.connect();
    const coursesRes = await client.query('SELECT * FROM courses');
    await client.end();
    return NextResponse.json({ success: true, courses: coursesRes.rows });
  } catch (error) {
    await client.end();
    return NextResponse.json({ success: false, message: 'Database error', error }, { status: 500 });
  }
} 