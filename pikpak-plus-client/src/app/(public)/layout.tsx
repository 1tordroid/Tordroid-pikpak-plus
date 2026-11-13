import { ReactNode } from "react";
import { Mona_Sans } from "next/font/google";
import "./td-public.css";

// Public pages only (sign in, sign up, password reset, FAQ). The signed-in
// app keeps its own font and colours; everything here is scoped to .td-public.
const monaSans = Mona_Sans({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-td-sans",
});

export default function PublicLayout({ children }: { children: ReactNode }) {
  return <div className={`td-public ${monaSans.variable}`}>{children}</div>;
}
