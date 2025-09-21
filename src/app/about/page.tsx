import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Me — Eir & Wild Wellness",
  description:
    "Meet Lara Bailey — fitness & women’s wellness coach specialising in pre & postnatal training, baby massage and supporting motherhood.",
};

// Reusable brand strip (deep blue bg, gold heading, white text)
function BrandStrip({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl bg-[--brand] p-6 sm:p-8 text-white shadow-md">
      <h2 className="text-2xl sm:text-3xl font-semibold text-[--accent] tracking-tight">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-[0.975rem] leading-7 text-white/95">
        {children}
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-8 p-4 sm:p-6">
      {/* Portrait */}
      <div className="overflow-hidden rounded-xl border shadow-md">
        <Image
          src="/images/aboutme.jpg" // <— put your portrait in /public/images/about/aboutme.jpg
          alt="Lara Bailey, Fitness and Wellness Coach"
          width={1200}
          height={1500}
          className="h-auto w-full object-cover"
          priority
        />
      </div>

      {/* Bio */}
      <BrandStrip title="Lara Bailey">
        <p>
          Hi I’m Lara! I’m 34, wife to Dan (also known as our tech whizz) and mum
          to our beautiful daughter Luna. I’m a lover of fitness and women’s
          wellness, babies, pregnancies and birth as well as all things
          celestial, crystals and mystical. I’m always on hand with a supportive
          word, a listening ear, a shoulder to cry on or a woo at your
          achievements! Whatever you need, I’m your girl!
        </p>
        <p>
          You will normally recognise me from the rainbow hair which I’ve had
          for about 10 years now. It changes often though, so I’m never one
          colour for a long time! If you have little ones, I apologise for the
          questions of how to get those colours that often ensue too!
        </p>
        <p>
          I have a couple of autoimmune conditions under my belt as well as a
          bowel condition. So if you are attending with some of these too, I
          feel you and understand. I’ll always make sure you are checking in
          with your body too, after all you know it best! We have also lost 2
          pregnancies in 2023 and 2024, so if you are joining my motherhood
          journey classes and are having some anxiety after loss or during a
          fertility journey, I can fully empathise and will always have a
          listening ear.
        </p>
      </BrandStrip>

      {/* Fitness Career */}
      <BrandStrip title="Fitness Career">
        <p>
          I trained to be a fitness instructor when I was 18 and have been
          helping people on their fitness journeys ever since! I initially
          trained in group fitness which is why I love classes so much and
          quickly went on to train in various Les Mills programmes (6 to be
          exact) where I was also chosen to be a tribe coach, supporting new
          instructors through their teaching journeys.
        </p>
        <p>
          I also trained in group indoor cycling, Zumba, Zumbatomic, INSANITY
          and aqua aerobics just to name a few. I completed my Personal training
          qualification not long after this and have been training clients on a
          1:1 basis for well over 10 years now. I love being able to connect
          with clients on a personal basis whilst also helping them achieve
          their specific goals. I’ll chat during your sessions, but I know how
          to push those workouts for you!
        </p>
      </BrandStrip>

      {/* Pre & Postnatal */}
      <BrandStrip title="Pre & Postnatal">
        <p>
          Despite being in fitness for so long, I did not specialise in pre and
          postnatal fitness until having Luna. In 2020, I took the leap and
          finally did my training course through lockdown. I felt after
          experiencing pregnancy and postnatal recovery I was better equipped to
          help my clients, as I have been through some of the same things they
          will be feeling.
        </p>
        <p>
          I trained throughout my pregnancy—from the early morning sickness when
          no one but close family knew, right through to 36 weeks when I stopped
          in case I went into labour mid class (I still trained my last PT
          client 4 days before my due date!). Keeping my fitness up helped me
          lead a happy, healthy pregnancy and aided recovery after an emergency
          Caesarean birth.
        </p>
        <p>
          I’m fully qualified to create fitness programmes for prenatal clients
          from first to third trimester and postnatal clients juggling new
          motherhood. Sessions are held with the latest guidance and are safe
          for each trimester, with options that adapt whether you’re in your
          first or fourth trimester.
        </p>
      </BrandStrip>

      {/* Supporting Motherhood */}
      <BrandStrip title="Supporting Motherhood">
        <p>
          I completed my baby massage training to support parents and babies to
          connect and bond further—helping promote sleep, ease tummy aches and
          release tension, as well as build connection through touch and song. I
          love holding a safe, calm space for small groups to be heard, nurtured
          and supported postpartum.
        </p>
        <p>
          I completed my Doula training in 2022 with the Every Birth Matters
          course (pre-work, live/online training and post coursework—now
          certified). I’m also completing extra training in a mentorship with my
          tutor, which means you get extra knowledge and effectively two doulas
          for the price of one via on-call support, plus a discounted price while
          I complete this training. I also completed a hypnobirthing skills
          workshop to support mums-to-be and partners further.
        </p>
        <p>
          I am currently taking a break from doula work while navigating our own
          fertility journey—however, my knowledge is always on hand during
          sessions. Ask away, I’m always here to help!
        </p>
      </BrandStrip>

      {/* Call to action */}
      <section className="rounded-xl border bg-white p-6 text-center shadow-sm">
        <h3 className="text-xl font-semibold text-slate-900">
          Ready to join a class or chat 1:1?
        </h3>
        <p className="mt-2 text-slate-600">
          Explore the timetable or reach out for personal training.
        </p>
        <div className="mt-4 flex justify-center gap-3">
          <Link
            href="/timetable"
            className="inline-flex items-center rounded-lg bg-[--brand] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            View timetable
          </Link>
          <Link
            href="/personal-training"
            className="inline-flex items-center rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-slate-50"
          >
            Personal training
          </Link>
        </div>
      </section>
    </main>
  );
}
