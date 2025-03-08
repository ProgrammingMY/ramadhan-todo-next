import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/libs/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function NameForm({
    user
}: {
    user: User
}) {
    const [isEditingName, setIsEditingName] = useState(false);
    const [name, setName] = useState(user?.username || "");
    const router = useRouter();

    const handleNameSave = async () => {
        if (isEditingName) {
            const response = await fetch("/api/user", {
                method: "PUT",
                body: JSON.stringify({
                    name: name,
                    id: user?.id
                })
            });

            if (!response.ok) {
                toast.error("Failed to change name");
                return;
            }

            localStorage.setItem("user", JSON.stringify({
                ...user,
                username: name
            }));

            setIsEditingName(false);
            toast.success("Name changed successfully");
            router.refresh();
        } else {
            setIsEditingName(true);
        }
    };
    return (
        <div className="flex flex-col gap-2">
            <Label className="text-md font-bold" htmlFor="name">Name</Label>
            <div className={`grid ${isEditingName ? "grid-cols-4" : "grid-cols-3"} gap-2`}>
                <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`${isEditingName ? "col-span-2" : "col-span-2"}`}
                    disabled={!isEditingName}
                />
                {
                    isEditingName && (
                        <Button
                            onClick={() => setIsEditingName(false)}
                            variant="ghost"
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                    )
                }
                <Button
                    onClick={handleNameSave}
                    className="flex-1"
                >
                    {isEditingName ? "Save" : "Edit"}
                </Button>
            </div>
        </div>
    )
}