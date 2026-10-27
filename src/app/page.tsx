
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  Leaf,
  ScanSearch,
  Sparkles,
  Sprout,
} from "lucide-react";

const features = [
  {
    number: "01",
    icon: ScanSearch,
    title: "Know your plant",
    description:
      "Identify plant species and understand what makes each one unique.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Understand its needs",
    description:
      "Explore AI-assisted health insights and care recommendations.",
  },
  {
    number: "03",
    icon: Sprout,
    title: "Watch it flourish",
    description:
      "Track care activities, record growth, and learn from your plant's journey.",
  },
];

export default function Home() {
  return (
    <main className="overflow-hidden">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-10 items-center justify-center rounded-2xl bg-[#194b35] text-white">
            <Leaf size={23} />
          </span>
          <span className="text-xl font-bold tracking-tight">
            LeafLens<span className="text-[#72936f]"> AI</span>
          </span>
        </Link>

        <nav className="flex items-center gap-3 sm:gap-6">
          <Link
            href="/login"
            className="text-sm font-semibold text-[#375343] hover:text-[#71946f]"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-[#194b35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#286346]"
          >
            Get started <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:pb-28 lg:pt-16">
        <div className="relative z-10">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#dbe5d6] bg-white/70 px-4 py-2 text-sm text-[#45694d]">
            <Sparkles size={15} />
            A little more understanding. A lot more growing.
          </div>

          <h1 className="max-w-2xl text-5xl leading-[1.08] font-semibold tracking-[-0.055em] sm:text-6xl lg:text-7xl">
            Help your plants
            <br />
            <span className="font-serif font-normal italic text-[#58805a]">
              thrive naturally.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-[#6d7c70]">
            Every leaf tells a story. Identify your plants, understand
            their health, and build a care routine that helps them flourish.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-3 rounded-full bg-[#194b35] px-7 py-4 font-semibold text-white shadow-lg shadow-[#194b35]/10 transition hover:-translate-y-0.5 hover:bg-[#286346]"
            >
              Start your garden <ArrowRight size={18} />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-full border border-[#d6dfd2] px-6 py-4 font-semibold text-[#345541] transition hover:bg-white"
            >
              Explore LeafLens <ArrowDownRight size={17} />
            </a>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 text-sm text-[#65796a]">
            {["Personalized care", "AI-assisted insights", "Growth tracking"].map(
              (item) => (
                <span key={item} className="flex items-center gap-2">
                  <Check size={16} className="text-[#58805a]" />
                  {item}
                </span>
              )
            )}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -inset-8 rounded-full bg-[#e4ecdf] blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white bg-[#e9eee3] p-3 shadow-2xl shadow-[#193b2a]/10">
            <div className="relative flex min-h-[430px] flex-col justify-between overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#d9e5cf] via-[#b8cdb1] to-[#66896b] p-6 sm:min-h-[520px] sm:p-8">
              <div className="absolute -right-20 top-16 size-72 rounded-full border border-white/25" />
              <div className="absolute -right-10 top-28 size-56 rounded-full border border-white/30" />
              <div className="absolute -bottom-28 -left-20 size-80 rounded-full bg-[#315d40]/20 blur-2xl" />

              <div className="relative flex items-start justify-between gap-4">
                <div className="rounded-2xl bg-white/80 px-4 py-3 backdrop-blur">
                  <p className="text-xs font-medium text-[#6d7c70]">
                    YOUR GARDEN, UNDERSTOOD
                  </p>
                  <p className="mt-1 font-semibold text-[#194b35]">
                    Grow with confidence
                  </p>
                </div>
                <span className="flex size-11 items-center justify-center rounded-full bg-white/75 text-[#315d40]">
                  <Leaf size={22} />
                </span>
              </div>

              <div className="relative flex flex-1 items-center justify-center py-8">
                <div className="absolute h-64 w-64 rounded-full bg-white/20 blur-2xl sm:h-80 sm:w-80" />
                <svg
                  viewBox="0 0 360 360"
                  role="img"
                  aria-label="Stylized botanical illustration of a thriving plant"
                  className="relative w-full max-w-[340px] drop-shadow-xl"
                >
                  <path
                    d="M180 320 C174 255 188 193 177 110"
                    stroke="#315d40"
                    strokeWidth="7"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M179 248 C140 225 117 197 103 161"
                    stroke="#315d40"
                    strokeWidth="5"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M181 202 C224 180 245 149 251 117"
                    stroke="#315d40"
                    strokeWidth="5"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M177 151 C140 130 131 91 148 54 C184 77 199 111 177 151Z"
                    fill="#315d40"
                  />
                  <path
                    d="M178 150 C182 113 165 82 148 54"
                    stroke="#aecaa2"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M104 162 C64 154 48 124 55 91 C91 95 117 122 104 162Z"
                    fill="#487b4d"
                  />
                  <path
                    d="M104 162 L55 91"
                    stroke="#c3d8b8"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M251 118 C247 78 271 52 307 45 C311 82 287 111 251 118Z"
                    fill="#3d6c43"
                  />
                  <path
                    d="M251 118 L307 45"
                    stroke="#c3d8b8"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M180 226 C211 207 242 216 257 246 C225 263 195 253 180 226Z"
                    fill="#6b925e"
                  />
                  <path
                    d="M180 226 L257 246"
                    stroke="#d4e3c8"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M180 272 C149 247 116 258 105 288 C137 306 165 297 180 272Z"
                    fill="#426f45"
                  />
                  <path
                    d="M180 272 L105 288"
                    stroke="#c3d8b8"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M111 316 Q180 340 249 316"
                    stroke="#66896b"
                    strokeWidth="5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </div>

              <div className="relative flex items-center justify-between gap-3 rounded-2xl border border-white/70 bg-white/85 p-4 backdrop-blur-md">
                <div>
                  <p className="text-xs text-[#6d7c70]">THE LEAFLENS APPROACH</p>
                  <p className="mt-1 font-semibold text-[#194b35]">
                    Observe. Understand. Grow.
                  </p>
                </div>
                <Sprout className="shrink-0 text-[#58805a]" size={28} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="border-t border-[#e5e9df] bg-white/70"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-[#658667] uppercase">
              A more thoughtful way to care
            </p>
            <h2 className="mt-4 text-3xl leading-tight font-semibold tracking-tight sm:text-5xl">
              Better care begins with
              <span className="font-serif font-normal italic text-[#58805a]">
                {" "}understanding.
              </span>
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {features.map(({ number, icon: Icon, title, description }) => (
              <article
                key={number}
                className="rounded-3xl border border-[#e4e9df] bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#193b2a]/5 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-[#e8efe3] text-[#315d40]">
                    <Icon size={23} />
                  </span>
                  <span className="text-sm font-medium text-[#a0afa0]">
                    {number}
                  </span>
                </div>
                <h3 className="mt-7 text-xl font-semibold">{title}</h3>
                <p className="mt-3 leading-7 text-[#6d7c70]">
                  {description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-5 rounded-3xl bg-[#194b35] p-8 text-white sm:flex-row sm:items-center sm:p-10">
            <div>
              <h3 className="text-2xl font-semibold">
                Your plants have a story to tell.
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/70">
                Start building a more thoughtful plant-care routine today.
              </p>
            </div>
            <Link
              href="/register"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-[#194b35] transition hover:bg-[#e8efe3]"
            >
              Join LeafLens <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-[#718071] sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <Link href="/" className="font-semibold text-[#194b35]">
          LeafLens AI
        </Link>
        <p>Grow thoughtfully. Care confidently.</p>
      </footer>
    </main>
  );
}
