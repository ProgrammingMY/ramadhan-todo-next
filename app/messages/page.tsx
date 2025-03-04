"use client";

import { notoNaskhArabic } from "@/lib/fonts";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface Dua {
  id: string;
  doa: string;
  tag: string[];
  arab: string[];
  rumi: string[];
  makna: string[];
  rujukan?: string;
}

const DOA_JSON_URL = "/data/doa.json";

export default function DuaList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [duas, setDuas] = useState<Dua[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const getDuas = async () => {
      const response = await fetch(DOA_JSON_URL);
      const data = await response.json();
      setDuas(data);
    };
    getDuas();
  }, []);

  const filteredDuas = duas.filter((dua) =>
    dua.doa.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dua.tag.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-8 text-center">Daily Duas</h1>

      {/* Search Section */}
      <div className="bg-card rounded-lg p-6 mb-8">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search duas..."
          className="w-full p-2 rounded-md border"
        />
      </div>

      {/* Duas List Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Collection of Dua</h2>
        </div>

        {filteredDuas.map((dua) => (
          <div
            key={dua.id}
            className="bg-card rounded-md shadow-md overflow-hidden"
          >
            <div
              className="p-4 cursor-pointer hover:bg-primary/10 flex justify-between items-center"
              onClick={() => setExpandedId(expandedId === dua.id ? null : dua.id)}
            >
              <h3 className="font-semibold text-lg">{dua.doa}</h3>
              <ChevronRight className={`transform transition-transform ${expandedId === dua.id ? 'rotate-90' : ''
                }`} />
            </div>

            {expandedId === dua.id && (
              <div key={dua.id} className="p-4 border-t">
                {dua.arab.map((arab) => (
                  <p className={`text-right text-2xl mb-4 ${notoNaskhArabic.className}`}>{arab}</p>
                ))}
                {dua.rumi.map((rumi) => (
                  <p className="text-sm mb-2 italic">{rumi}</p>
                ))}
                {dua.makna.map((makna) => (
                  <p className="text-muted-foreground mb-2">{makna}</p>
                ))}
                {dua.rujukan && (
                  <p className="text-xs text-muted-foreground">{dua.rujukan}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}