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
    const studentRes = await client.query('SELECT student_id FROM students WHERE email = $1', [email]);
    if (studentRes.rows.length === 0) {
      await client.end();
      return NextResponse.json({ success: false, message: 'Student not found' }, { status: 404 });
    }
    const studentId = studentRes.rows[0].student_id;
    const resultsRes = await client.query(
      'SELECT * FROM semester_results WHERE student_id = $1',
      [studentId]
    );
    await client.end();
    return NextResponse.json({ success: true, results: resultsRes.rows });
  } catch (error) {
    await client.end();
    return NextResponse.json({ success: false, message: 'Database error', error }, { status: 500 });
  }
} 