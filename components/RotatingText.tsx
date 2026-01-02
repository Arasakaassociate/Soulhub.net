"use client";

import { useEffect, useState } from "react";

const phrases = [
    { text: "Companionship that reflects your soul", font: "font-serif italic" },
    { text: "Where hearts meet minds", font: "font-sans" },
    { text: "Your perfect digital connection", font: "font-mono" },
    { text: "Intimacy reimagined", font: "font-serif" },
    { text: "Conversations that matter", font: "font-sans italic" },
];

export default function RotatingText() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(false);

            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % phrases.length);
                setIsVisible(true);
            }, 500);
        }, 3500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center justify-center min-w-[300px] h-full">
            <p
                className={`text-sm md:text-base text-gray-300 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                    } ${phrases[currentIndex].font}`}
            >
                {phrases[currentIndex].text}
            </p>
        </div>
    );
}
