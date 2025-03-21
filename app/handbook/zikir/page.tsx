"use client";

import { useRef, useState } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle } from "@/components/ui/drawer";
import { uthmaniQuran } from "@/lib/fonts";
import { motion, useAnimation } from "motion/react";

// Define the structure for dhikir items
interface DhikirItem {
    id: string;
    title: string;
    arabic?: string;
    transliteration?: string;
    translation: string;
    count?: number;
}

// Sample dhikir data
const dhikirList: DhikirItem[] = [
    {
        id: "subhanallah",
        title: "Subhanallah",
        arabic: "سُبْحَانَ اللهِ",
        transliteration: "Subhanallah",
        translation: "Maha Suci Allah",
        count: 33
    },
    {
        id: "alhamdulillah",
        title: "Alhamdulillah",
        arabic: "الْحَمْدُ لِلَّهِ",
        transliteration: "Alhamdulillah",
        translation: "Segala Puji Hanya Bagi Allah",
        count: 33
    },
    {
        id: "allahuakbar",
        title: "Allahu Akbar",
        arabic: "اللهُ أَكْبَرُ",
        transliteration: "Allahu Akbar",
        translation: "Allah Maha Besar",
        count: 34
    },
    {
        id: "istighfar",
        title: "Istighfar",
        arabic: "أَسْتَغْفِرُ اللهَ",
        transliteration: "Astaghfirullah",
        translation: "Aku Memohon Keampunan Allah",
    },
    {
        id: "39",
        title: "Selawat",
        arabic: "اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِهِ وَصَحْبِهِ وَسَلِم",
        transliteration: "Allahumma solli 'ala Muhammad wa 'ala alihi wasallim",
        translation: "Ya Allah limpahkanlah kesejahteraan dan keselamatan atas Nabi Muhammad dan keluarganya.",
    }
];

export default function Zikir() {
    const [open, setOpen] = useState(false);
    const [selectedDhikir, setSelectedDhikir] = useState<DhikirItem | null>(null);
    const [counter, setCounter] = useState(0);
    const arabicTextControls = useAnimation();
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleDhikirClick = (dhikir: DhikirItem) => {
        setSelectedDhikir(dhikir);
        setCounter(0); // Reset counter when selecting a new dhikir
        setOpen(true);
    };

    const handleCounterClick = async () => {
        // For dhikir with count, limit to the specified count
        // For dhikir without count, allow unlimited counting
        if (!selectedDhikir?.count || counter < selectedDhikir.count) {
            setCounter(prev => prev + 1);

            // Animate the Arabic text
            await arabicTextControls.start({
                scale: [1, 1.1, 1],
                opacity: [1, 0.8, 1],
                transition: { duration: 0.5 }
            });

            // Optionally scroll to keep the counter button in view
            if (scrollRef.current) {
                scrollRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    // Determine if the counter is complete (only for dhikir with count)
    const isCountComplete = selectedDhikir?.count ? counter >= selectedDhikir.count : false;

    return (
        <div className="p-6 max-w-2xl mx-auto flex flex-col gap-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Dhikir & Selawat</h1>
            </div>

            <div className="grid gap-4">
                {dhikirList.map((dhikir) => (
                    <div
                        key={dhikir.id}
                        onClick={() => handleDhikirClick(dhikir)}
                        className="p-4 bg-card border border-slate-200 dark:border-slate-700 rounded-md shadow-md overflow-hidden"
                    >
                        <h3 className="text-xl font-semibold">{dhikir.title}</h3>
                        {dhikir.arabic && (
                            <p className={`text-right mt-2 text-xl ${uthmaniQuran.className}`}>{dhikir.arabic}</p>
                        )}
                        <p className="text-sm text-muted-foreground mt-1">{dhikir.translation}</p>
                    </div>
                ))}
            </div>

            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerContent className="max-h-[85vh] bg-background max-w-2xl mx-auto">
                    <DrawerTitle className="text-2xl hidden">{selectedDhikir?.title}</DrawerTitle>
                    <div className="h-full max-h-[80vh]">
                        {selectedDhikir && (
                            <div className="px-4 py-6">
                                <DrawerHeader className="text-center">
                                    <div className="text-center">
                                        <motion.p
                                            className={`text-3xl leading-relaxed ${uthmaniQuran.className}`}
                                            animate={arabicTextControls}
                                            initial={{ scale: 1, opacity: 1 }}
                                        >
                                            {selectedDhikir.arabic}
                                        </motion.p>
                                    </div>
                                </DrawerHeader>

                                <div className="flex flex-col gap-6 p-4">
                                    <div className="space-y-2 text-center">
                                        <h4 className="font-semibold">Translation:</h4>
                                        <p>{selectedDhikir.translation}</p>
                                    </div>
                                </div>
                                <div ref={scrollRef}></div>
                            </div>
                        )}
                    </div>

                    <DrawerFooter className="flex items-center justify-center pb-8">
                        <div className="flex flex-col items-center gap-4">
                            <motion.button
                                onClick={handleCounterClick}
                                className={`w-32 h-32 rounded-full flex items-center justify-center text-2xl font-bold transition-all ${isCountComplete
                                    ? "bg-green-500 text-white"
                                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                                    }`}
                                disabled={isCountComplete}
                                whileTap={{ scale: 0.95 }}
                            >
                                {selectedDhikir?.count
                                    ? `${counter}/${selectedDhikir.count}`
                                    : counter}
                            </motion.button>
                            <p className="text-sm text-muted-foreground">
                                {isCountComplete
                                    ? "Completed! Tap outside to close"
                                    : "Tap to count"}
                            </p>
                        </div>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    );
}