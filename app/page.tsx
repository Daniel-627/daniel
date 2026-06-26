import Image from "next/image";

export default function Home() {
  const posts = [
    {
      date: "JUNE 20, 2026",
      title: "Why I build everything with Next.js and Tailwind",
      excerpt:
        "A breakdown of my go-to stack for client projects — what works, what doesn't, and why I keep coming back to these tools.",
      readTime: "6 min read",
    },
    {
      date: "MAY 14, 2026",
      title: "Designing for the Kenyan market: what I've learned",
      excerpt:
        "Payment flows, mobile-first thinking, and the assumptions you need to drop when building products for African users.",
      readTime: "8 min read",
    },
    {
      date: "APRIL 3, 2026",
      title: "The case for productized services in web development",
      excerpt:
        "Scope creep, pricing uncertainty, and client education — how packaging your services changes the conversation entirely.",
      readTime: "5 min read",
    },
  ];

  const projects = [
    {
      tag: "NEXT.JS",
      title: "Ecommerce Starter",
      description: "A clean single-vendor storefront template with M-Pesa and Flutterwave integration.",
      link: "https://daniel.co.ke",
    },
    {
      tag: "BRANDING",
      title: "Visual Identity System",
      description: "Logo, type, and color systems for small businesses and startups across East Africa.",
      link: "https://design.daniel.co.ke",
    },
    {
      tag: "NEXT.JS",
      title: "Multivendor Marketplace",
      description: "A full-featured marketplace template built for African payment infrastructure.",
      link: "https://daniel.co.ke",
    },
  ];

  const talks = [
    {
      venue: "NAIROBI JS MEETUP",
      location: "Nairobi — Kenya",
      date: "March 2026",
      title: "Building with the React Compiler",
    },
    {
      venue: "LOCAL TECH FORUM",
      location: "Nairobi — Kenya",
      date: "January 2026",
      title: "Tailwind at Scale: Patterns for Real Projects",
    },
  ];

  return (
    <main className="flex min-h-screen bg-[#141414] text-white font-sans">
      {/* LEFT — sticky sidebar */}
      <aside className="w-[360px] shrink-0 sticky top-0 h-screen p-14 flex flex-col justify-between overflow-hidden">
        <div>
          {/* Name + title */}
          <h1 className="text-4xl font-bold leading-tight tracking-tight mb-3">
            Daniel Ochieng
          </h1>
          <p className="text-sm font-semibold text-gray-300 mb-8 tracking-wide">
            Web Designer &amp; Developer
          </p>

          {/* Bio */}
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            I design and build websites at{" "}
            <a
              href="https://daniel.co.ke"
              className="text-white underline underline-offset-2"
            >
              daniel.co.ke
            </a>
            , with a focus on ecommerce and branding.
          </p>
          <p className="text-sm text-gray-400 leading-relaxed">
            I also run a design practice at{" "}
            <a
              href="https://design.daniel.co.ke"
              className="text-white underline underline-offset-2"
            >
              design.daniel.co.ke
            </a>{" "}
            for visual identity work.
          </p>

          {/* Nav */}
          <nav className="mt-14 flex flex-col gap-5">
            {[
              { num: "01", label: "POSTS" },
              { num: "02", label: "PROJECTS" },
              { num: "03", label: "TALKS" },
            ].map(({ num, label }) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                className="flex items-center gap-3 text-xs tracking-[0.2em] text-gray-500 hover:text-white transition-colors group"
              >
                <span className="text-gray-600 group-hover:text-gray-400 transition-colors">
                  {num}
                </span>
                <span className="flex-1 border-t border-gray-700 group-hover:border-gray-500 transition-colors" />
                <span>{label}</span>
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom — socials */}
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <a
            href="https://twitter.com/AluochDOchieng"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            Twitter
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-50"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
          <span className="mx-2 text-gray-700">·</span>
          <a
            href="https://github.com/Daniel-627"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            GitHub
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-50"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </aside>

      {/* RIGHT — scrollable content */}
      <section className="flex-1 border-l border-white/[0.07] py-14 px-12 space-y-20">

        {/* POSTS */}
        <div id="posts">
          {posts.map((post, i) => (
            <article
              key={i}
              className="border-b border-white/[0.07] py-10 cursor-pointer group"
            >
              <p className="text-[11px] tracking-[0.18em] text-gray-500 mb-3 font-medium">
                {post.date}
              </p>
              <h2 className="text-xl font-bold leading-snug mb-3 group-hover:text-gray-300 transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                {post.excerpt}
              </p>
              <p className="text-xs text-gray-600">{post.readTime}</p>
            </article>
          ))}
        </div>

        {/* PROJECTS */}
        <div id="projects" className="space-y-4">
          {projects.map((project, i) => (
            <a
              key={i}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white/[0.03] border border-white/[0.07] p-8 hover:bg-white/[0.06] transition-colors group"
            >
              <p className="text-[10px] tracking-[0.2em] text-gray-500 mb-3 font-semibold">
                {project.tag}
              </p>
              <h3 className="text-lg font-bold mb-2 group-hover:text-gray-300 transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {project.description}
              </p>
            </a>
          ))}
        </div>

        {/* TALKS */}
        <div id="talks" className="grid grid-cols-2 gap-4 pb-20">
          {talks.map((talk, i) => (
            <div
              key={i}
              className="bg-white/[0.03] border border-white/[0.07] p-7"
            >
              <p className="text-[10px] tracking-[0.2em] text-gray-500 font-semibold mb-1">
                {talk.venue}
              </p>
              <p className="text-[11px] text-gray-600 mb-1">{talk.location}</p>
              <p className="text-[11px] text-gray-600 mb-5">{talk.date}</p>
              <h3 className="text-base font-bold leading-snug">{talk.title}</h3>
            </div>
          ))}
        </div>

      </section>
    </main>
  );
}
