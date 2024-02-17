import { NextResponse } from "next/server";
import { pool } from "@/services/db";

export async function GET() {
  try {
    const db = await pool.getConnection();
    const [rows] = await db.query("SELECT * FROM Teams");
    db.release();

    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const req = await request.json();
  const { school, province, region } = req;
  try {
    const db = await pool.getConnection();
    const [result, fields] = await db.query("INSERT INTO Teams SET ?", {
      schools: school,
      provinces: province,
      regions: region,
    });

    db.release();

    return NextResponse.json({ id: result.insertId, school, province, region });
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 }
    );
  }
}
