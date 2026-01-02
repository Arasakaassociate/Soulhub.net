import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';

// Pinecone
export const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
});

// OpenRouter (using OpenAI SDK)
export const openrouter = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY!,
    defaultHeaders: {
        "HTTP-Referer": "https://soulhub.net", // Optional, for including your app on openrouter.ai rankings
        "X-Title": "SoulHub", // Optional. Shows in rankings on openrouter.ai
    },
});

export const indexName = "soulhub-index"; // Assuming a default index or one named in Pinecone
