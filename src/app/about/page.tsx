// src/app/about/page.tsx
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Me — Eir & Wild Wellness",
  description:
    "Learn more about Lara Bailey — fitness & wellness coach specialising in pre & postnatal training, baby massage and supporting motherhood.",
};

function Section({
  title,
  children,
  imgSrc,
  imgAlt,
  reverse = false,
}: {
  title: string;
  children: React.ReactNode;
  imgSrc?: string;
  imgAlt?: string;
  reverse?: boolean;
}) {
  return (
    <section className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <div
        className={`grid gap-0 md:grid-cols-2 ${reverse ? "md:[&>div:first-child]:order-2" : ""}`}
      >
        {/* Image (optional) */}
        <div className="relative aspect-[4/3] w-full md:aspect-[5/4]">
          {imgSrc ? (
            <Image
              src={imgSrc}
              alt={imgAlt ?? ""}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={title === "Lara Bailey"}
            />
          ) : (
            <div className="h-full w-full bg-slate-100" />
          )}
        </div>

        {/* Copy */}
        <div className="p-5 sm:p-6 md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            {title}
          </h2>
          <div className="prose prose-slate mt-3 max-w-none text-[0.975rem] leading-7">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-6 p-4 md:space-y-8 md:p-6">
      <header className="mb-2">
        <h1 className="text-3xl font-bold tracking-tight">About Me</h1>
        <p className="mt-1 text-slate-600">
          A little about Lara, fitness & women’s wellness, and how Eir & Wild supports
          you through pregnancy, postpartum and beyond.
        </p>
      </header>

      {/* 1. Hero / Bio */}
      <Section
        title="Lara Bailey"
        imgSrc="/images/aboutme.jpg" // place your image in /public/images/about/aboutme.jpg
        imgAlt="Lara Bailey, Fitness and Wellness Coach"
        reverse
      >
        <p>
          Hi I’m Lara! I’m 34, wife to Dan (also known as our tech whizz) and mum to
          our beautiful daughter Luna. I’m a lover of fitness and women’s wellness,
          babies, pregnancies and birth as well as all things celestial, crystals and
          mystical. I’m always on hand with a supportive word, a listening ear, a
          shoulder to cry on or a woo at your achievements! Whatever you need, I’m your girl!
        </p>
        <p>
          You will normally recognise me from the rainbow hair which I’ve had for about
          10 years now. It changes often though, so I’m never one colour for a long time!
          If you have little ones, I apologise for the questions of how to get those
          colours that often ensue too!
        </p>
        <p>
          I have a couple of autoimmune conditions under my belt as well as a bowel
          condition. So if you are attending with some of these too, I feel you and
          understand. I’ll always make sure you are checking in with your body too,
          after all you know it best! We have also lost 2 pregnancies in 2023 and 2024,
          so if you are joining my motherhood journey classes and are having some anxiety
          after loss or during a fertility journey, I can fully empathise and will always
          have a listening ear.
        </p>
      </Section>

      {/* 2. Fitness Career */}
      <Section title="Fitness Career">
        <p>
          I trained to be a fitness instructor when I was 18 and have been helping people
          on their fitness journeys ever since! I initially trained in group fitness which
          is why I love classes so much and quickly went on to train in various Les Mills
          programmes (6 to be exact) where I was also chosen to be a tribe coach, supporting
          new instructors through their teaching journeys.
        </p>
        <p>
          I also trained in group indoor cycling, Zumba, Zumbatomic, INSANITY and aqua
          aerobics just to name a few. I completed my Personal training qualification not
          long after this and have been training clients on a 1:1 basis for well over 10
          years now. I love being able to connect with clients on a personal basis whilst
          also helping them achieve their specific goals. I’ll chat during your sessions,
          but I know how to push those workouts for you!
        </p>
      </Section>

      {/* 3. Pre & Postnatal */}
      <Section title="Pre & Postnatal" reverse>
        <p>
          Despite being in fitness for so long, I did not specialise in pre and postnatal
          fitness until having Luna. In 2020, I took the leap and finally did my training
          course through lockdown. I felt after experiencing pregnancy and postnatal recovery
          I was better equipped to help my clients, as I have been through some of the same
          things they will be feeling.
        </p>
        <p>
          I trained throughout my pregnancy—from the early morning sickness when no one but
          close family knew, right through to 36 weeks when I stopped in case I went into
          labour mid class (I still trained my last PT client 4 days before my due date!).
          Keeping my fitness up helped me lead a happy, healthy pregnancy and aided recovery
          after an emergency Caesarean birth.
        </p>
        <p>
          I’m fully qualified to create fitness programmes for prenatal clients from first
          to third trimester and postnatal clients juggling new motherhood. Sessions are
          held with the latest guidance and are safe for each trimester, with options that
          adapt whether you’re in your first or fourth trimester.
        </p>
      </Section>

      {/* 4. Supporting Motherhood */}
      <Section title="Supporting Motherhood">
        <p>
          I completed my baby massage training to support parents and babies to connect and
          bond further—helping promote sleep, ease tummy aches and release tension, as well
          as build connection through touch and song. I love holding a safe, calm space for
          small groups to be heard, nurtured and supported postpartum.
        </p>
        <p>
          I completed my Doula training in 2022 with the Every Birth Matters course (pre-work,
          live/online training and post coursework—now certified). I’m also completing extra
          training in a mentorship with my tutor, which means you get extra knowledge and
          effectively two doulas for the price of one via on-call support, plus a discounted
          price while I complete this training. I also completed a hypnobirthing skills
          workshop to support mums-to-be and partners further.
        </p>
        <p>
          I am currently taking a break from doula work while navigating our own fertility
          journey—however, my knowledge is always on hand during sessions. Ask away, I’m
          always here to help!
        </p>
      </Section>
    </main>
  );
}
