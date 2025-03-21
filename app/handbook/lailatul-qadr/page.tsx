import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function LailatulQadr() {
    // Array of articles about Lailatul Qadr
    const articles = [
        {
            id: 1,
            title: "Cara Untuk Mudah Bangun untuk Qiamulail",
            href: "/handbook/lailatul-qadr/1",
        },
        {
            id: 2,
            title: "Zikir untuk Qiamulail",
            href: "/handbook/zikir",
        },
        {
            id: 3,
            title: "Doa-doa Yang Digalakkan",
            href: "/handbook/lailatul-qadr/3",
        },
        {
            id: 4,
            title: "Amalan yang Digalakkan",
            href: "/handbook/lailatul-qadr/4",
        },
    ];

    return (
        <div className="p-6 max-w-2xl mx-auto flex flex-col gap-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Persiapan untuk Lailatul Qadr</h1>
            </div>

            <p className="text-lg">
                Lailatul Qadr merupakan satu malam yang khusus terjadi pada bulan Ramadan dimana ia lebih baik dari seribu bulan.
                Berikut adalah beberapa panduan yang dapat membantu anda untuk mempersiapkan diri.
            </p>

            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Panduan</h2>
                <ul className="flex flex-col gap-3">
                    {articles.map(article => (
                        <li key={article.id} className="bg-card border border-slate-200 dark:border-slate-700 rounded-md shadow-md overflow-hidden">
                            <Link href={article.href} className="block p-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-medium">{article.title}</h3>
                                    <ChevronRight className="w-4 h-4" />
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}