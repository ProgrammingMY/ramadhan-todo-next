import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

export default function Zikir() {
    return (
        <Drawer>
            <DrawerTrigger>Zikir</DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Zikir</DrawerTitle>
                    <DrawerDescription>Zikir</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}