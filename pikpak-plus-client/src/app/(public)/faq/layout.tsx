import { ReactNode } from "react";
import { Header } from "@/components/layout/header";

export default function FAQLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="td-topbar">
        <div className="td-wrap">
          <Header plainBrand />
        </div>
      </header>
      {children}
    </>
  );
}
