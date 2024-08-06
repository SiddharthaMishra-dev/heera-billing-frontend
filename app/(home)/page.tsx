"use client";

import { Button } from "@/components/ui/button";
import { Cog, PlusCircleIcon, Receipt, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center space-y-5 py-3 px-2">
      <h1 className="text-3xl font-bold tracking-wide text-gray-900">Welcome to Heera Billing</h1>
      <div className="w-full max-w-3xl mx-auto text-center">
        <div className="w-full max-w-3xl  rounded-lg">
          <div className="w-full p-2 grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-4 items-center ">
            <div
              className="h-56 w-full ring-1 ring-gray-300 rounded-lg flex flex-col gap-y-4 justify-center items-center text-gray-400 cursor-pointer transition group hover:ring-gray-600"
              onMouseDown={() => router.push("/client")}
            >
              <UserRound className="group-hover:text-gray-600 h-10 w-10" />
              <Button
                className="text-gray-800"
                variant="link"
              >
                Client
              </Button>
            </div>
            <div
              className="h-56 w-full ring-1 ring-gray-300 rounded-lg flex flex-col gap-y-4 justify-center items-center text-gray-400 cursor-pointer transition group hover:ring-gray-600"
              onMouseDown={() => router.push("/product")}
            >
              <Cog className="group-hover:text-gray-600 h-10 w-10" />
              <Button
                className="text-gray-800"
                variant="link"
              >
                Products
              </Button>
            </div>
            <div
              className="h-56 w-full ring-1 ring-gray-300 rounded-lg flex flex-col gap-y-4  justify-center items-center text-gray-400 cursor-pointer transition group hover:ring-gray-600"
              onMouseDown={() => router.push("/invoice")}
            >
              <Receipt className="group-hover:text-gray-600 h-10 w-10" />
              <Button
                className="text-gray-800"
                variant="link"
              >
                Invoice
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
