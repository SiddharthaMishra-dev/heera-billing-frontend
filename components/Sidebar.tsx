"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { nullable } from "zod";

const Sidebar = () => {
  const [active, setActive] = useState("");
  const router = useRouter();
  const pathName = usePathname();
  const handleRouteChange = (route: string) => {
    router.push(route);
  };

  useEffect(() => {
    if (localStorage.getItem("token") === null || localStorage.getItem("token") === undefined) {
      router.push("/login");
    } else {
      setActive(pathName);
    }
  }, [pathName]);
  return (
    <>
      <aside className="min-h-full w-full max-w-48 p-2 border-r border-gray-300">
        <div className="w-full h-full flex flex-col items-center">
          <h4 className="mt-5 mb-7 text-xl font-bold tracking-wide">Heera</h4>
          <div className="flex flex-col w-full gap-y-2">
            <Button
              variant="ghost"
              onMouseDown={() => handleRouteChange("/")}
              className={active === "/" ? "bg-blue-600 text-gray-50" : ""}
            >
              Home
            </Button>
            <Button
              variant="ghost"
              onMouseDown={() => handleRouteChange("/client")}
              className={active === "/client" ? "bg-blue-600 text-gray-50" : ""}
            >
              Clients
            </Button>
            <Button
              variant="ghost"
              onMouseDown={() => handleRouteChange("/product")}
              className={active === "/product" ? "bg-blue-600 text-gray-50" : ""}
            >
              Product
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
