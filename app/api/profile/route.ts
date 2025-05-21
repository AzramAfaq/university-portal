import { NextRequest, NextResponse } from 'next/server';
import { Client } from 'pg';

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'university_portal',
    password: 'Azram143$',
    port: 5432,
  });

  try {
    await client.connect();
    const res = await client.query(
      'SELECT * FROM students WHERE email = $1',
      [email]
    );
    if (res.rows.length === 0) {
      await client.end();
      return NextResponse.json({ success: false, message: 'Student not found' }, { status: 404 });
    }
    const student = res.rows[0];
    // Fetch latest semester result for academic progress
    const semRes = await client.query(
      'SELECT * FROM semester_results WHERE student_id = $1 ORDER BY semester DESC LIMIT 1',
      [student.student_id]
    );
    await client.end();
    let academic = null;
    if (semRes.rows.length > 0) {
      academic = semRes.rows[0];
    }
    return NextResponse.json({ success: true, student, academic });
  } catch (error) {
    await client.end();
    return NextResponse.json({ success: false, message: 'Database error', error }, { status: 500 });
  }
} 