"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Image as ImageIcon, Loader2 } from "lucide-react";

interface ChatProps {
    companion: {
        id: number | string;
        name: string;
        description: string;
        imageUrl: string;
    };
    onClose: () => void;
}

const ChatOverlay = ({ companion, onClose }: ChatProps) => {
    const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg = input;
        setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
        setInput("");
        setIsLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                body: JSON.stringify({
                    message: userMsg,
                    companionId: companion.id,
                }),
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await res.json();

            if (data.response) {
                setMessages((prev) => [...prev, { role: 'ai', content: data.response }]);
            } else {
                console.error("No response", data);
            }
        } catch (error) {
            console.error("Chat error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const generateImage = async () => {
        setIsLoading(true);
        setMessages((prev) => [...prev, { role: 'user', content: "Generate a photo of yourself." }]);
        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                body: JSON.stringify({ prompt: companion.description }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();
            if (data.url) {
                setMessages((prev) => [...prev, { role: 'ai', content: `![Generated Image](${data.url})` }]);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="flex h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-pepsi-surface shadow-2xl border border-pepsi-blue/20">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 p-4 bg-pepsi-dark">
                    <div className="flex items-center gap-3">
                        <img src={companion.imageUrl} alt={companion.name} className="h-10 w-10 rounded-full object-cover" />
                        <div>
                            <h3 className="font-bold text-white">{companion.name}</h3>
                            <p className="text-xs text-green-400 flex items-center gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span> Online
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="rounded-full p-2 text-gray-400 hover:bg-white/10 hover:text-white">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
                    {messages.length === 0 && (
                        <div className="flex h-full items-center justify-center text-gray-500 text-sm">
                            Safe space with {companion.name}.
                        </div>
                    )}
                    {messages.map((m, i) => (
                        <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${m.role === 'user'
                                ? 'bg-pepsi-blue text-white rounded-br-sm'
                                : 'bg-[#252525] text-gray-100 rounded-bl-sm border border-white/5'
                                }`}>
                                {m.content.startsWith('![') ? (
                                    <img src={m.content.match(/\((.*?)\)/)?.[1]} alt="Generated" className="rounded-lg max-w-full" />
                                ) : (
                                    <p className="whitespace-pre-wrap text-sm">{m.content}</p>
                                )}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-[#252525] text-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm">
                                <Loader2 className="h-4 w-4 animate-spin text-pepsi-blue" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Input */}
                <div className="bg-pepsi-dark p-4 border-t border-white/10">
                    <div className="flex items-center gap-2">
                        <button onClick={generateImage} className="p-3 text-pepsi-blue hover:bg-pepsi-blue/10 rounded-xl transition-colors" title="Generate Photo">
                            <ImageIcon className="h-5 w-5" />
                        </button>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            placeholder={`Message ${companion.name}...`}
                            className="flex-1 bg-[#1A1A1A] text-white placeholder-gray-500 rounded-xl px-4 py-3 border border-transparent focus:border-pepsi-blue focus:outline-none focus:ring-1 focus:ring-pepsi-blue transition-all"
                        />
                        <button
                            onClick={sendMessage}
                            disabled={isLoading || !input.trim()}
                            className="bg-pepsi-blue text-white p-3 rounded-xl hover:bg-[#0060df] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(0,112,255,0.3)] transition-all"
                        >
                            <Send className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatOverlay;
