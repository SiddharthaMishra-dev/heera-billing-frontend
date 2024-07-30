import { Button } from "@/components/ui/button";
import { Cog, PlusCircleIcon, Receipt, UserRound } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center space-y-5 py-3 px-2">
      <h1 className="text-3xl font-bold tracking-wide text-gray-400">Welcome to Heera Billing</h1>
      <div className="w-full max-w-3xl mx-auto text-center">
        <div className="w-full max-w-3xl bg-gray-900 rounded-lg">
          <div className="w-full p-2 grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-4 items-center ">
            <div className="h-56 w-full ring-1 ring-gray-600 rounded-lg flex flex-col gap-y-4 justify-center items-center text-gray-400 cursor-pointer transition group">
              <UserRound className="group-hover:text-white" />
              <Button
                className="group-hover:text-white"
                variant="link"
              >
                Client
              </Button>
            </div>
            <div className="h-56 w-full ring-1 ring-gray-600 rounded-lg flex flex-col gap-y-4 justify-center items-center text-gray-400 cursor-pointer transition group">
              <Cog className="group-hover:text-white" />
              <Button className="group-hover:text-white">Product</Button>
            </div>
            <div className="h-56 w-full ring-1 ring-gray-600 rounded-lg flex flex-col gap-y-4  justify-center items-center text-gray-400 cursor-pointer transition group">
              <Receipt className="group-hover:text-white" />
              <Button className="group-hover:text-white">Invoice</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
