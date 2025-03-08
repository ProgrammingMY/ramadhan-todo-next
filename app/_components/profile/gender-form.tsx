import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { User } from "@/libs/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function GenderForm({
    user
}: {
    user: User
}) {
    const [isEditingGender, setIsEditingGender] = useState(false);
    const [gender, setGender] = useState(user?.gender || "male");
    const router = useRouter();

    const handleGenderSave = async (value: string) => {
        if (isEditingGender) {
            const response = await fetch("/api/user", {
                method: "PUT",
                body: JSON.stringify({
                    gender: value,
                    id: user?.id
                })
            });

            if (!response.ok) {
                toast.error("Failed to change gender");
                return;
            }

            localStorage.setItem("user", JSON.stringify({
                ...user,
                gender: value
            }));

            setIsEditingGender(false);
            toast.success("Gender changed successfully");
            router.refresh();
        } else {
            setIsEditingGender(true);
        }
    }

    const handleCancel = () => {
        setIsEditingGender(false);
        setGender(user?.gender || "male");
    }

    return (
        <div className="flex flex-col gap-2">
            <Label className="text-md font-bold" htmlFor="gender">Gender</Label>
            <div className={`grid ${isEditingGender ? "grid-cols-4" : "grid-cols-3"} gap-2`}>
                <div className={`flex items-center gap-2 ${isEditingGender ? "col-span-2" : "col-span-2"}`}>
                    <span className="text-sm">Female</span>
                    <Switch
                        variant="gender"
                        id="gender"
                        checked={gender === "male"}
                        onCheckedChange={() => setGender((prev) => prev === "male" ? "female" : "male")}
                        disabled={!isEditingGender}
                    />
                    <span className="text-sm">Male</span>
                </div>
                {isEditingGender && (
                    <Button
                        onClick={handleCancel}
                        variant="ghost"
                        className="flex-1"
                    >
                        Cancel
                    </Button>
                )}
                <Button
                    onClick={() => handleGenderSave(gender)}
                    className="flex-1"
                >
                    {isEditingGender ? "Save" : "Edit"}
                </Button>
            </div>
        </div>
    )
}