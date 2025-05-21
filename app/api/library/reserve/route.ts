import { NextRequest, NextResponse } from 'next/server';
import { Client } from 'pg';

export async function POST(request: NextRequest) {
  const { bookId } = await request.json();
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'university_portal',
    password: 'Azram143$',
    port: 5432,
  });

  try {
    await client.connect();

    // Start a transaction
    await client.query('BEGIN');

    // Check if book is available
    const bookResult = await client.query(
      'SELECT status FROM books WHERE id = $1',
      [bookId]
    );

    if (bookResult.rows.length === 0) {
      await client.query('ROLLBACK');
      await client.end();
      return NextResponse.json(
        { success: false, message: 'Book not found' },
        { status: 404 }
      );
    }

    if (bookResult.rows[0].status !== 'available') {
      await client.query('ROLLBACK');
      await client.end();
      return NextResponse.json(
        { success: false, message: 'Book is not available' },
        { status: 400 }
      );
    }

    // Calculate due date (14 days from now)
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);

    // Create reservation
    await client.query(
      `INSERT INTO book_reservations (book_id, student_id, due_date)
       VALUES ($1, $2, $3)`,
      [bookId, 'STUDENT_ID', dueDate] // Replace STUDENT_ID with actual student ID from session
    );

    // Update book status
    await client.query(
      'UPDATE books SET status = $1 WHERE id = $2',
      ['reserved', bookId]
    );

    await client.query('COMMIT');
    await client.end();

    return NextResponse.json({
      success: true,
      message: 'Book reserved successfully',
      dueDate: dueDate.toISOString(),
    });
  } catch (error) {
    await client.query('ROLLBACK');
    await client.end();
    return NextResponse.json(
      { success: false, message: 'Database error', error },
      { status: 500 }
    );
  }
} 