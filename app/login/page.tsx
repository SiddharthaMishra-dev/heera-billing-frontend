"use client";

import { Button } from "@/components/ui/button";
import { ApiSuffix, BaseUrl } from "@/lib/api-map";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const Login = () => {
  const [validating, setValidating] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();
  const schema = z.object({
    username: z.string().min(2, {
      message: "username must be at least 2 characters",
    }),
    password: z.string().min(2, {
      message: "password must be at least 2 characters",
    }),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(user);
    if (!result.success) {
      console.log("Invalid data: ", result.error);
      return;
    }
    setValidating(true);
    try {
      let url = BaseUrl + ApiSuffix.login;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      if (data.error === false) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        toast.success("Login Successful");
        router.push("/");
      } else {
        console.log("Error: ", data.msg);
        toast.error(data.msg);
      }
      setValidating(false);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <form
        className="w-full max-w-xl h-full max-h-[400px] bg-gray-900 rounded-lg p-2 flex flex-col justify-evenly"
        method="POST"
        onSubmit={handleLoginSubmit}
      >
        <h3 className="text-2xl text-gray-400 text-center">Sign in</h3>
        <div className="w-full ">
          <div className="w-[90%] mx-auto mb-10 flex flex-col space-y-2">
            <label className="text-xl text-gray-300">Username</label>
            <input
              required
              placeholder="username"
              className="text-2xl px-3 py-2 outline-none bg-gray-800 rounded-lg text-gray-500 selection:bg-gray-800 placeholder:text-lg placeholder:text-gray-600"
              name="username"
              value={user.username}
              onChange={handleChange}
            />
          </div>
          <div className="w-[90%] mx-auto mb-5 flex flex-col space-y-2">
            <label className="text-xl text-gray-300">Password</label>
            <input
              required
              placeholder="password"
              className="text-2xl px-3 py-2 outline-none bg-gray-800 rounded-lg text-gray-500 placeholder:text-lg placeholder:text-gray-600"
              name="password"
              value={user.password}
              onChange={handleChange}
              type="password"
            />
          </div>
        </div>
        <div className="w-full text-center">
          <Button
            variant={"outline"}
            type="submit"
            disabled={validating}
          >
            {validating ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Log in
          </Button>
        </div>
      </form>
    </main>
  );
};

export default Login;
