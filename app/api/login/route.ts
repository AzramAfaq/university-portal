import { NextRequest, NextResponse } from 'next/server';
import { Client } from 'pg';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  // Update these with your actual database credentials
  const client = new Client({
    user: 'postgres', // your postgres username
    host: 'localhost',
    database: 'university_portal', // your database name
    password: 'Azram143$', // your postgres password
    port: 5432,
  });

  try {
    await client.connect();
    const res = await client.query(
      'SELECT * FROM students WHERE email = $1 AND password = $2',
      [email, password]
    );
    await client.end();

    if (res.rows.length > 0) {
      // Login successful
      return NextResponse.json({ success: true, student: res.rows[0] });
    } else {
      // Invalid credentials
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    await client.end();
    return NextResponse.json({ success: false, message: 'Database error', error }, { status: 500 });
  }
} 