"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./auth/login-form";
import SignUpForm from "./auth/signup-form";

export default function LoginModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button
        onClick={() => setIsOpen(true)}
        variant={"default"}
        className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/80"
      >
        Login
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogDescription className="hidden">
          Login to your account to continue
        </DialogDescription>
        <DialogContent className="sm:max-w-[425px] bg-slate-200 dark:border-slate-700 dark:bg-slate-950">
          <DialogTitle className="hidden">Login</DialogTitle>
          <DialogHeader>
            <Tabs defaultValue="login" >
              <TabsList className="grid w-full grid-cols-2 px-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <LoginForm onSuccess={() => setIsOpen(false)} />
              </TabsContent>
              <TabsContent value="signup">
                <SignUpForm onSuccess={() => setIsOpen(false)} />
              </TabsContent>
            </Tabs>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}