import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="grid min-h-[100svh] place-items-center bg-bg px-5 text-center">
      <div>
        <span className="chip">Error 404</span>
        <h1 className="mt-5 text-[clamp(5rem,18vw,10rem)] leading-none font-extrabold">404</h1>
        <p className="mt-4 font-heading text-lg font-medium">This page doesn&rsquo;t exist or was moved.</p>
        <Link href="/" className="btn btn-solid mt-10">
          <ArrowLeft size={18} aria-hidden /> Back to home
        </Link>
      </div>
    </main>
  );
}
