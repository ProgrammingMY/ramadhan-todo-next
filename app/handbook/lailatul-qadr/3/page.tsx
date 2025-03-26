"use client";

import { uthmaniQuran } from "@/lib/fonts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
interface AmalanSunnah {
    id: string;
    doa: string;
    arab: string[];
    makna: string[];
    rujukan: string;
    link: string;
}

const AMALAN_JSON_URL = "/data/qiam.json";

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
                            <h3 className="font-semibold text-lg">{amalan.doa}</h3>
                            <ChevronRight className={`transform transition-transform ${expandedId === amalan.id ? 'rotate-90' : ''
                                }`} />
                        </div>

                        {expandedId === amalan.id && (
                            <div className="p-4 border-t">
                                <p className={`text-right text-2xl mb-4 ${uthmaniQuran.className}`}>{amalan.arab}</p>
                                <p className="text-md text-bold mb-2 italic">{amalan.makna}</p>
                                <p className="text-sm mb-2 italic">{amalan.rujukan}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}