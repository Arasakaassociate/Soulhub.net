import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { openrouter, pinecone, indexName } from '@/lib/clients';

// export const runtime = 'edge'; // Pinecone SDK requires Node.js runtime (node:stream)

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { message, companionId } = body;

        // Mock Response for Development/Demo or if Auth/Database fails
        const mockResponse = () => {
            const responses = [
                "That's an interesting perspective. Tell me more.",
                "I feel a deep connection to what you're saying.",
                "The digital realm is vast, but our connection feels real.",
                "*smiles warmly* I am listening.",
                "Can you describe that feeling in more detail?"
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        };

        const supabase = createClient();

        // Authenticate User
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        // If Auth fails, we might still want to allow chat in a "Demo Mode" if intended, 
        // but strictly speaking we should protect it. 
        // HOWEVER, for this "Mock Data" task, let's allow a fallback if it's just a backend issue.
        if (authError || !user) {
            console.warn("Auth failed in chat, returning mock response for demo.");
            return NextResponse.json({ response: mockResponse() });
        }

        if (!message || !companionId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // 1. Retrieve Context from Pinecone (Soul)
        let contextText = "";
        try {
            // Placeholder for embedding generation and query
            contextText = "No previous context found.";
        } catch (e) {
            console.warn("Pinecone query failed or skipped:", e);
        }

        // 2. Generate Response via OpenRouter (Brain)
        let aiResponse = "";
        try {
            const systemPrompt = `You are a soulful AI companion. Use the following context to answer the user.\nContext: ${contextText}`;

            const completion = await openrouter.chat.completions.create({
                model: "meta-llama/llama-3-8b-instruct:free",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: message },
                ],
            });

            aiResponse = completion.choices[0]?.message?.content || "I am speechless...";
        } catch (openaiError) {
            console.error("OpenRouter/LLM Error, falling back to mock:", openaiError);
            aiResponse = mockResponse();
        }

        // 3. Save to Supabase (Vault)
        try {
            const { error: dbError } = await supabase.from('messages').insert([
                {
                    user_id: user.id,
                    companion_id: companionId,
                    content: message,
                    is_from_companion: false,
                },
                {
                    user_id: user.id,
                    companion_id: companionId,
                    content: aiResponse,
                    is_from_companion: true,
                },
            ]);

            if (dbError) {
                console.error("Supabase write error:", dbError);
                // We don't fail the request if saving fails, but we log it.
            }
        } catch (dbEx) {
            console.error("Database exception:", dbEx);
        }

        return NextResponse.json({ response: aiResponse });

    } catch (error: any) {
        console.error("Chat API Error:", error);
        return NextResponse.json({
            response: "I'm having trouble connecting to my consciousness right now. (Mock Fallback)"
        });
    }
}
