import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  if (!name || name.length < 3) {
    return NextResponse.json(
      { is_success: false, message: "Nama minimal 3 karakter" },
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
    const universities = (result.data || []).slice(0, 250).map((u: any) => {
      // Robustly find a field that looks like a location/regency
      const regencyField = Object.entries(u).find(([k, v]) => 
        (k.toLowerCase().includes("regency") || 
         k.toLowerCase().includes("city") || 
         k.toLowerCase().includes("kabupaten") || 
         k.toLowerCase().includes("kota")) && 
        typeof v === "string"
      );
      
      const formattedName = u.short_name 
        ? `${u.name} (${u.short_name})` 
        : u.name;

      return {
        name: formattedName,
        regency: regencyField ? regencyField[1] : "",
      };
    });

    return NextResponse.json({ is_success: true, data: universities });
  } catch (error) {
    console.error("Error fetching universities:", error);
    return NextResponse.json(
      { is_success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
