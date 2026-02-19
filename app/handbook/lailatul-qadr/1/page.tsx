"use client";

import { uthmaniQuran } from "@/lib/fonts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface AmalanSunnah {
    id: string;
    title: string;
    text: string;
    rujukan: string;
    link: string;
}

const AMALAN_JSON_URL = "/data/hadith.json";

export default function ArticlePage() {
    const [amalanList, setAmalanList] = useState<AmalanSunnah[]>([]);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    useEffect(() => {
        const getAmalanList = async () => {
            const response = await fetch(AMALAN_JSON_URL);
            const data = await response.json();
            setAmalanList(data);
        };
        getAmalanList();
    }, []);
    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <Link href="/handbook/lailatul-qadr" className="flex items-center gap-2 mb-8">
                <ChevronLeft className="w-4 h-4" />
                Back to previous page
            </Link>
            <h1 className="text-2xl font-bold mb-8 text-center">Hadis-hadis yang berkaitan dengan Lailatul Qadr</h1>

            {/* Amalan List Section */}
            <div className="space-y-4">

                {amalanList.map((amalan) => (
                    <div
                        key={amalan.id}
                        className="bg-card rounded-md shadow-md overflow-hidden"
                    >
                        <div
                            className="p-4 cursor-pointer hover:bg-primary/10 flex justify-between items-center"
                            onClick={() => setExpandedId(expandedId === amalan.id ? null : amalan.id)}
                        >
                            <h3 className="font-semibold text-lg">{amalan.title}</h3>
                            <ChevronRight className={`transform transition-transform ${expandedId === amalan.id ? 'rotate-90' : ''
                                }`} />
                        </div>

                        {expandedId === amalan.id && (
                            <div className="p-4 border-t">
                                <p className="text-md text-bold mb-2 italic">{amalan.text}</p>
                                <a target="_blank" rel="noopener noreferrer" href={amalan.link} className="text-md underline text-bold mb-2 italic">{amalan.rujukan}</a>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}