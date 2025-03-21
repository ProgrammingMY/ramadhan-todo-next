import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

// This would typically come from a database or API
const articlesData = [
    {
        id: 1,
        title: "Understanding the Significance of Lailatul Qadr",
        videoId: "0H55jGCixb0", // Replace with actual YouTube video ID
        summary: "This video explains the importance of Lailatul Qadr in Islam, why it's considered better than a thousand months, and how the Quran was first revealed on this blessed night."
    },
    {
        id: 2,
        title: "Signs of Lailatul Qadr",
        videoId: "lBQp6P--4aU", // Replace with actual YouTube video ID
        summary: "Learn about the possible signs of Lailatul Qadr as mentioned in authentic hadith, including the weather conditions, the appearance of the sun, and spiritual feelings that may indicate this blessed night."
    },
    {
        id: 3,
        title: "Panduan Qiamulail oleh JAKIM",
        videoId: "ghi789rst",
        summary: "A comprehensive guide to the most powerful and recommended duas to recite during Lailatul Qadr, including the famous dua taught by the Prophet Muhammad (PBUH) to Aisha (RA)."
    },
];

export default function ArticlePage({ params }: { params: { id: string } }) {
    const articleId = parseInt(params.id);
    const article = articlesData.find(a => a.id === articleId);

    if (!article) {
        notFound();
    }

    return (
        <div className="p-6 max-w-2xl mx-auto flex flex-col gap-6">
            <Link href="/handbook/lailatul-qadr" className="text-muted-foreground hover:underline mb-4 flex items-center">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to articles
            </Link>

            <h1 className="text-2xl font-bold mb-6">{article.title}</h1>

            {/* YouTube embed */}
            <div className="relative pb-[56.25%] h-0 overflow-hidden mb-6">
                <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${article.videoId}`}
                    title={article.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>

            {/* Summary */}
            <div className="mt-4">
                <h2 className="text-xl font-medium mb-3">Summary</h2>
                <p className="text-gray-700">{article.summary}</p>
            </div>
        </div>
    );
}