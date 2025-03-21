"use client";

import { uthmaniQuran } from "@/lib/fonts";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface AmalanSunnah {
    id: string;
    title: string;
    niat: string;
    maksud: string;
}

const AMALAN_JSON_URL = "/data/amalan.json";

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
            <h1 className="text-2xl font-bold mb-8 text-center">Amalan Sunnah 10 Hari Terakhir Ramadan</h1>

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
                                <p className={`text-right text-2xl mb-4 ${uthmaniQuran.className}`}>{amalan.niat}</p>
                                <p className="text-sm mb-2 italic">{amalan.maksud}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}