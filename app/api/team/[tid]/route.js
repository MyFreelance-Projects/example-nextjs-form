import { pool } from "@/services/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const db = await pool.getConnection();
    const [rows] = await db.query("SELECT * FROM Teams WHERE id = ?", [
      params.tid,
    ]);
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

export async function DELETE(request, { params }) {
  console.log(typeof params.tid);
  try {
    const db = await pool.getConnection();
    const [result, fields] = await db.query("DELETE FROM Teams WHERE id = ?", [
      params.tid,
    ]);
    db.release();

    return NextResponse.json({ message: `deleted => id :${params.tid}` });
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const req = await request.json();
  console.log(req);
  const { school, province, region } = req;
  try {
    const db = await pool.getConnection();
    await db.query(
      "UPDATE Teams SET schools = ?, provinces = ?, regions = ? WHERE id = ?",
      [school, province, region, params.tid]
    );
    db.release();

    return NextResponse.json({
      id: params.tid,
      schools: school,
      provinces: province,
      regions: region,
    });
  } catch (error) {
    return { message: error.message };
  }
}
