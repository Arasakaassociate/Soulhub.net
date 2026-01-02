"use client";

import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { X, Sparkles, User, FileText, Loader2 } from "lucide-react";
import Image from "next/image";
import { createCompanion } from "@/app/dashboard/actions";
// Note: We'll need to wrap the server action to use it easily in client or use useFormState, 
// but for simplicity calling it directly or wrapping in a handler here changes slightly depending on Next.js version.
// We will use a standard submit handler.

interface CreateCompanionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CreateCompanionModal({ isOpen, onClose }: CreateCompanionModalProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleGenerateImage = async () => {
        if (!description) return;
        setIsGenerating(true);
        try {
            const res = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: description }),
            });
            const data = await res.json();
            if (data.url) {
                setGeneratedImage(data.url);
            }
        } catch (error) {
            console.error("Failed to generate image", error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !description || !generatedImage) return;

        setIsSaving(true);
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("avatar_url", generatedImage);
            formData.append("tags", "Custom,New"); // Default tags

            const result = await createCompanion(null, formData);
            if (result.message === 'success') {
                onClose();
                // Reset form
                setName("");
                setDescription("");
                setGeneratedImage(null);
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Save failed", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-pepsi-surface border border-pepsi-blue/20 p-6 text-left align-middle shadow-xl transition-all">
                                <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-2xl font-bold leading-6 text-white"
                                    >
                                        Summon a Companion
                                    </Dialog.Title>
                                    <button
                                        onClick={onClose}
                                        className="rounded-full p-2 text-gray-400 hover:bg-white/10 hover:text-white transition-all"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Left: Input Form */}
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                                Name
                                            </label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                                                <input
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="w-full bg-[#1A1A1A] rounded-xl pl-10 pr-4 py-3 text-white border border-transparent focus:border-pepsi-blue focus:ring-1 focus:ring-pepsi-blue focus:outline-none transition-all"
                                                    placeholder="e.g. Seraphina"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                                Persona & Appearance
                                            </label>
                                            <div className="relative">
                                                <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                                                <textarea
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    rows={4}
                                                    className="w-full bg-[#1A1A1A] rounded-xl pl-10 pr-4 py-3 text-white border border-transparent focus:border-pepsi-blue focus:ring-1 focus:ring-pepsi-blue focus:outline-none transition-all resize-none"
                                                    placeholder="Describe their look and personality. This will be used to generate their avatar."
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={handleGenerateImage}
                                            disabled={isGenerating || !description}
                                            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#252525] px-4 py-3 text-sm font-medium text-pepsi-blue hover:bg-pepsi-blue/10 hover:shadow-[0_0_15px_rgba(0,112,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                        >
                                            {isGenerating ? (
                                                <Loader2 className="h-5 w-5 animate-spin" />
                                            ) : (
                                                <Sparkles className="h-5 w-5" />
                                            )}
                                            Generate Appearance
                                        </button>
                                    </div>

                                    {/* Right: Preview */}
                                    <div className="flex flex-col items-center justify-center space-y-4">
                                        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl bg-[#151515] border-2 border-dashed border-gray-700 flex items-center justify-center group">
                                            {generatedImage ? (
                                                <>
                                                    <Image
                                                        src={generatedImage}
                                                        alt="Generated Preview"
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                                    <div className="absolute bottom-4 left-4">
                                                        <p className="font-bold text-white text-lg">{name || "Name"}</p>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="text-center p-6">
                                                    <User className="h-16 w-16 text-gray-700 mx-auto mb-4" />
                                                    <p className="text-gray-500 text-sm">
                                                        Enter a description and click &quot;Generate Appearance&quot; to visualize your companion.
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <button
                                            onClick={handleSubmit}
                                            disabled={isSaving || !name || !description || !generatedImage}
                                            className="w-full rounded-xl bg-pepsi-blue px-6 py-4 text-center text-sm font-bold text-white shadow-[0_0_20px_rgba(0,112,255,0.4)] hover:shadow-[0_0_30px_rgba(0,112,255,0.6)] hover:bg-[#0060df] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all"
                                        >
                                            {isSaving ? "Creating Soul..." : "Breathe Life"}
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
