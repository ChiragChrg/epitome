"use client";
import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";

import Input from "../CustomUI/Input";
import { Button } from "../ui/button";
import { Loader2Icon, LogInIcon } from "lucide-react";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const params = useSearchParams().get("callbackUrl");
  const callback = params ? (params as string) : "";

  const HandleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const LoginToastID = toast.loading("Logging in...");
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
        callbackUrl: callback || "/dashboard",
      });
      // console.log("LoginRes", res);

      if (!res?.error) {
        toast.success("Logged in Successfully!", {
          id: LoginToastID,
        });

        router.push(res?.url || "/dashboard");
      } else {
        throw new Error(res.error);
      }
    } catch (err) {
      toast.error("Invalid Email or Password", {
        id: LoginToastID,
      });
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const HandleOAuthLogin = async () => {
    const OAuthTostID = toast.loading(`Connecting to Google...`);
    setIsLoading(true);

    try {
      await signIn("google", {
        callbackUrl: callback || "/dashboard",
      });
      // console.log("LoginRes", res);
      // redirect: callback !== "" ? true : false,

      toast.success("Logged in Successfully!", {
        id: OAuthTostID,
      });
    } catch (err) {
      toast.error("Something went wrong!", {
        id: OAuthTostID,
      });
      console.log(err);
    } finally {
      setIsLoading(false);
      toast.dismiss();
    }
  };

  return (
    <div
      data-augmented-ui="tl-2-clip-x tr-clip br-2-clip-x bl-clip"
      className="relative flex_center flex-col gap-4 2xl:gap-8 w-fit p-4 py-10 sm:p-8 rounded-lg bg-background/30 z-10 backdrop-blur-md font-oxanium"
    >
      <div className="flex flex-col items-center">
        <h2 className="hidden lg:block text-3xl font-bold">Welcome to</h2>
        <h1 className="text-primary font-spaceAge text-5xl">EPITOME</h1>
      </div>

      <form onSubmit={HandleLogin} className="flex flex-col gap-4">
        <Input
          type="email"
          label="Email"
          placeholder="example@gmail.com"
          className="2xl:w-[500px]"
          setValue={setEmail}
        />

        <div className="flex flex-col gap-2">
          <Input
            type="password"
            label="Password"
            placeholder="Enter Password"
            className="2xl:w-[500px]"
            setValue={setPassword}
          />
          {/* <Link
            href="./forgot-password"
            className="text-[0.9em] sm:text-[0.8em] 2xl:text-[1em] text-primary self-end"
          >
            Forgot Password?
          </Link> */}
        </div>

        <Button
          type="submit"
          className="clip_Btn flex_center gap-4 text-white hover:bg-primary font-bold mt-4"
          disabled={isLoading}
        >
          {isLoading ? <Loader2Icon className="animate-spin" /> : <LogInIcon />}
          LOGIN
        </Button>
      </form>

      <div className="flex_center gap-2 text-[0.9em] sm:text-[0.8em] 2xl:text-[1em]">
        Don&apos;t have an account yet?
        <Link href="/register" className="text-primary">
          Register
        </Link>
      </div>

      <div className="w-full sm:px-2 flex_center gap-2 font-medium">
        <span className="flex w-full h-[2px] bg-slate-300"></span>
        <span>OR</span>
        <span className="flex w-full h-[2px] bg-slate-300"></span>
      </div>

      <div className="flex_center gap-4 w-full sm:px-4">
        {/* Google Login Button */}
        <button
          className="clip_Btn bg-foreground/10 sm:bg-background text-textClr w-full flex_center gap-4 p-2 rounded disabled:cursor-not-allowed"
          onClick={() => HandleOAuthLogin()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid"
            viewBox="-3 0 262 262"
            className="w-[30px] h-[30px]"
          >
            <path
              fill="#4285F4"
              d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
            ></path>
            <path
              fill="#34A853"
              d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
            ></path>
            <path
              fill="#FBBC05"
              d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
            ></path>
            <path
              fill="#EB4335"
              d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
            ></path>
          </svg>
          <span className="text-[1.2em]">Google</span>
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
