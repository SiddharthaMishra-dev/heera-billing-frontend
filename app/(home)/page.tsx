import { PlusCircleIcon } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center space-y-5 py-3 px-2">
      <h1 className="text-3xl font-bold tracking-wide text-gray-400">Welcome to Heera Billing</h1>
      <div className="w-full max-w-3xl mx-auto text-center">
        <div className="w-full max-w-3xl bg-gray-900 rounded-lg">
          <div className="w-full p-2 grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-4 items-center ">
            <div className="h-56 w-full ring-1 ring-gray-600 rounded-lg flex flex-col gap-y-4 justify-center items-center text-gray-400 cursor-pointer hover:bg-gray-800 transition group">
              <PlusCircleIcon className="group-hover:text-white" />
              <span className="group-hover:text-white">Add Client</span>
            </div>
            <div className="h-56 w-full ring-1 ring-gray-600 rounded-lg flex flex-col gap-y-4 justify-center items-center text-gray-400 cursor-pointer hover:bg-gray-800 transition group">
              <PlusCircleIcon className="group-hover:text-white" />
              <span className="group-hover:text-white">Add Product</span>
            </div>
            <div className="h-56 w-full ring-1 ring-gray-600 rounded-lg flex flex-col gap-y-4  justify-center items-center text-gray-400 cursor-pointer hover:bg-gray-800 transition group">
              <PlusCircleIcon className="group-hover:text-white" />
              <span className="group-hover:text-white">Create Invoice</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
