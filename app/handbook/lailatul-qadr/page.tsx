import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function LailatulQadr() {
    // Array of articles about Lailatul Qadr
    const articles = [
        {
            id: 1,
            title: "10 Ways to Maximize Worship in the Last 10 Nights",
        },
        {
            id: 2,
            title: "Signs of Lailatul Qadr",
        },
        {
            id: 3,
            title: "Panduan Qiamulail oleh JAKIM",
        },
    ];

    return (
        <div className="p-6 max-w-2xl mx-auto flex flex-col gap-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Preparation for Lailatul Qadr</h1>
            </div>

            <p className="text-lg">
                Lailatul Qadr (The Night of Decree) is one of the most blessed nights in the Islamic calendar.
                Below are valuable talks and advice on how to prepare for and maximize this blessed night.
            </p>

            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Articles</h2>
                <ul className="flex flex-col gap-3">
                    {articles.map(article => (
                        <li key={article.id} className="border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <Link href={`/handbook/lailatul-qadr/${article.id}`} className="block p-4">
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