"use client";

import { LuArrowRight, LuPhone } from "react-icons/lu";
import { track } from "../track";

const phoneNumber = "+919892811033";

export function MobileActionBar() {
  return (
    <aside
      aria-label="Quick contact actions"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-[#eadfe0] bg-white/95 px-3 pt-2.5 shadow-[0_-10px_30px_rgba(35,31,32,0.10)] backdrop-blur-xl lg:hidden"
      style={{ paddingBottom: "calc(10px + env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto grid w-full max-w-xl grid-cols-2 gap-2.5">
        <a
          href={`tel:${phoneNumber}`}
          onClick={() => track("call_click", { branch: "Infinity Clinic" })}
          className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#eadfe0] bg-[#fffafa] px-4 py-3 text-sm font-bold text-[#231f20] no-underline transition-all duration-200 hover:border-[#f52227] hover:bg-[#fff0f0] hover:text-[#f52227] active:scale-[0.98]"
        >
          <LuPhone className="size-[18px] text-[#f52227]" strokeWidth={2.3} aria-hidden="true" />
          Call now
        </a>
        <a
          href="#appointment"
          onClick={() => track("book_click", { branch: "Infinity Clinic" })}
          className="btn-wave flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full bg-[#f52227] px-4 py-3 text-sm font-bold text-white no-underline shadow-[0_8px_22px_rgba(245,34,39,0.26)] transition-all duration-200 hover:bg-[#cf1c20] active:scale-[0.98]"
        >
          <span className="relative z-10">Book now</span>
          <LuArrowRight className="relative z-10 size-[18px]" strokeWidth={2.3} aria-hidden="true" />
        </a>
      </div>
    </aside>
  );
}
