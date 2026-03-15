import { sans } from "./fonts";
import Link from "./Link";

export default function NotFound() {
  return (
    <article>
      <h1
        className={[
          sans.className,
          "text-[40px] font-black leading-[44px] text-[--title]",
        ].join(" ")}
      >
        Not found
      </h1>
    </article>
  );
}
