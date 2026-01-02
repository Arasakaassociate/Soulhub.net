import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
    try {
        const { prompt } = await req.json();

        if (!prompt) {
            return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
        }

        try {
            const response = await fetch("https://api.together.xyz/v1/images/generations", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.TOGETHER_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "black-forest-labs/FLUX.1-schnell", // High fidelity, fast
                    prompt: `Hyper-realistic portrait, luxury style, ${prompt}, 8k resolution, cinematic lighting`,
                    steps: 4,
                    n: 1,
                }),
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error.message || "Failed to generate image");
            }

            // Together returns data: [{ url: "..." }]
            const imageUrl = data.data?.[0]?.url;
            return NextResponse.json({ url: imageUrl });

        } catch (apiError) {
            console.error("Image Generation API failed, using fallback:", apiError);
            // Fallback placeholder
            return NextResponse.json({
                url: 'https://images.unsplash.com/photo-1642396974246-9524fa9c9c34?q=80&w=600&auto=format&fit=crop'
            });
        }

    } catch (error) {
        console.error("Generate API Error:", error);
        return NextResponse.json({ error: (error as Error).message || String(error) }, { status: 500 });
    }
}
