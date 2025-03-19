import { User } from "@/lib/types";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const avatars = [
    "/avatars/1.png",
    "/avatars/2.png",
    "/avatars/3.png",
    "/avatars/4.png",
    "/avatars/5.png",
    "/avatars/6.png",
    "/avatars/7.png",
    "/avatars/8.png",
];

export default function PictureEdit({
    user
}: {
    user: User
}) {
    const [selectedPicture, setSelectedPicture] = useState(user?.picture || "/avatars/1.png");

    const handlePictureSelect = (picture: string) => {
        // Here you would typically save the selected picture to your backend/storage
        const updateUser = async (user: any) => {
            await fetch("/api/user", {
                method: "PUT",
                body: JSON.stringify(user)
            });
        }

        // save picture to in user object
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        user.picture = picture;
        localStorage.setItem("user", JSON.stringify(user));

        if (user) {
            updateUser(user);
        }
        setSelectedPicture(picture);
    };
    return (
        <div className="bg-card border border-slate-200 dark:border-slate-700 rounded-md shadow-md overflow-hidden">
            <div className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Image
                        src={selectedPicture}
                        alt="Selected profile picture"
                        width={32}
                        height={32}
                        className="rounded-full"
                        sizes="32px"
                    />
                    <h3 className="font-semibold text-lg">Profile Picture</h3>
                </div>
                <ChevronRight className={`transform transition-transform`} />
            </div>
            <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative w-32 h-32">
                        <Image
                            src={selectedPicture}
                            alt="Selected profile picture"
                            fill
                            className="rounded-full object-cover"
                            sizes="80px"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {avatars.map((picture, index) => (
                            <button
                                key={index}
                                onClick={() => handlePictureSelect(picture)}
                                className={`p-2 border rounded-lg transition-all hover:scale-105 ${selectedPicture === picture
                                    ? "border-primary ring-2 ring-primary/50"
                                    : "border-border hover:border-primary"
                                    }`}
                            >
                                <Image
                                    src={picture}
                                    alt={`Avatar option ${index + 1}`}
                                    width={64}
                                    height={64}
                                    className="rounded-full"
                                    sizes="64px"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}