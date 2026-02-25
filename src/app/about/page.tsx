import { schoolFullName } from "@/lib/constants";

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <header className="border-b border-border pb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          About Us
        </h1>
      </header>

      <div className="mt-8 space-y-8 text-muted-foreground">
        <section>
          <p className="text-lg leading-relaxed">
            Established in May 1, 1997, {schoolFullName}, Bikaner was founded with a
            dream — a dream to build not just a school, but a nurturing space
            where children are guided, valued, and empowered to shape their own
            futures.
          </p>
        </section>

        <section>
          <p className="leading-relaxed">
            Under the visionary leadership of Director & Principal{" "}
            <span className="font-medium text-foreground">Shri Ghanshyam Pandia</span>, the institution was built on the belief that education is not
            merely about textbooks and examinations, but about character,
            discipline, confidence, and compassion.
          </p>
        </section>

        <section>
          <p className="leading-relaxed">
            For more than two decades, the school has proudly delivered
            exceptional board examination results. Yet, our true success is not
            measured only by marks — it is reflected in the journeys of our
            students.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            Our alumni today stand across the world:
          </h2>
          <ul className="list-none space-y-2 pl-0">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>Working in global technology companies such as Google</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>Building careers abroad</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>Serving the nation in respected Government roles</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>Leading their own successful businesses and ventures</span>
            </li>
          </ul>
        </section>

        <section>
          <p className="leading-relaxed">
            Each success story carries a part of the foundation laid here —
            the guidance, personal attention, and unwavering belief that every
            child matters.
          </p>
        </section>

        <section>
          <p className="leading-relaxed">
            At {schoolFullName}, students are not just roll numbers — they are
            dreams entrusted to us by families. Shri Ghanshyam Pandia&apos;s
            philosophy has always been simple yet powerful:
          </p>
          <blockquote className="mt-4 border-l-4 border-primary bg-muted/50 py-2 pl-4 pr-4 italic text-foreground">
            Give every child the right direction, and they will find their own
            destiny.
          </blockquote>
        </section>

        <section>
          <p className="leading-relaxed">
            For 25+ years, this institution has stood as a symbol of dedication,
            discipline, and heartfelt mentorship in Bikaner.
          </p>
        </section>

        <footer className="pt-4">
          <p className="text-lg font-semibold text-foreground">
            We are not just shaping careers.
          </p>
          <p className="text-lg font-semibold text-primary">
            We are shaping lives.
          </p>
        </footer>
      </div>
    </article>
  );
}
