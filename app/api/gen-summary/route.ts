import { NextRequest, NextResponse } from "next/server";
import { GCalEventSchema } from "@/validations/GCalEventSchema";
import { generateSummary, getEmbedding } from "@/lib/ai/actions";

export async function POST(req: NextRequest) {
  try {
    const { event } = await req.json();
    if (!event)
      return NextResponse.json({ error: "Missing event data" }, { status: 400 });

    const { data, error, success } = GCalEventSchema.safeParse(event);
    if (!success)
        return NextResponse.json({ error: error.message }, { status: 400 });

    const summary = await generateSummary(data);

    const embedding = await getEmbedding(summary!);

    return NextResponse.json({ summary, embedding });
  } catch (error: any) {
    console.error("Error generating summary:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
