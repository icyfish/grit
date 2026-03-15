import Link from "../Link";
import { sans } from "../fonts";

export const metadata = {
  title: "Fish",
  description: "Fish's personal site",
};

export default function Posts() {
  return (
    <div className="relative -top-[10px] flex flex-col gap-8">
      <Link
        className="block py-4 hover:scale-[1.005]"
        href="/"
      >
        <article>
          <h2
            className={[
              sans.className,
              "text-[28px] font-black",
              "text-[--pink] dark:text-[--purple]",
            ].join(" ")}
          >
            Grit
          </h2>
          <p className="text-[13px] text-gray-700 dark:text-gray-300">
            We have to be very strong.
          </p>
        </article>
      </Link>
    </div>
  );
}
