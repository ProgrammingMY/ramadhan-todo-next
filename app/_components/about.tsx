export default function About() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold mb-2">Developer</h2>
                <p>Created by Hakim - Hakim Tech Services</p>
                <div className="flex gap-4 mt-2">
                    <a
                        href="https://hakimtech.my"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                    >
                        Website
                    </a>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Credits</h2>
                <p>Avatar illustrations by <a
                    href="https://www.canva.com/p/fildzahnandya/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                >
                    @fildzahnandya
                </a></p>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Questions?</h2>
                <p>For support or feedback, dm me on:</p>
                <ul className="list-disc list-inside mt-2">
                    <li>TikTok: <a
                        href="https://www.tiktok.com/@programmingmy"
                        className="text-primary hover:underline"
                    >
                        @programmingmy
                    </a></li>
                </ul>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Notes</h2>
                <ul className="list-disc list-inside space-y-1">
                    <li>This app is only a companion for you to help you keep consistent with your sunnah.</li>
                    <li>Keep your intention for Allah SWT and only use this app for the sake of Allah SWT</li>
                    <li>This app is free and will always be free. If possible, please keep me in your du'a</li>
                </ul>
            </div>
        </div>
    );
}