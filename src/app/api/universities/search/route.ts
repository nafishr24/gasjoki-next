import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  if (!name || name.length < 5) {
    return NextResponse.json(
      { is_success: false, message: "Nama minimal 5 karakter" },
      { status: 400 }
    );
  }

  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.error("API_KEY not found in environment variables");
    return NextResponse.json(
      { is_success: false, message: "Server configuration error" },
      { status: 500 }
    );
  }

  try {
    const url = new URL("https://use.api.co.id/regional/indonesia/universities");
    url.searchParams.append("name", name);
    url.searchParams.append("page", "1");
    url.searchParams.append("size", "20");

    const response = await fetch(url.toString(), {
      headers: { "x-api-co-id": apiKey },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { is_success: false, message: errorData.message || "Gagal mengambil data kampus" },
        { status: response.status }
      );
    }

    const result = await response.json();
    const universities = (result.data || []).slice(0, 15).map((u: any) => u.name);

    return NextResponse.json({ is_success: true, data: universities });
  } catch (error) {
    console.error("Error fetching universities:", error);
    return NextResponse.json(
      { is_success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
