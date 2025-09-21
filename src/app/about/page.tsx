import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Me — Eir & Wild Wellness",
  description:
    "Meet Lara Bailey — fitness & wellness coach specialising in pre & postnatal training, baby massage and supporting motherhood.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl p-4 sm:p-6 space-y-8">
      {/* Portrait */}
      <div className="overflow-hidden rounded-lg border shadow-md">
        <Image
          src="/images/about/aboutme.jpg" // put your portrait here
          alt="Lara Bailey, Fitness and Wellness Coach"
          width={800}
          height={1000}
          className="w-full object-cover"
          priority
        />
      </div>

      {/* Bio section */}
      <section className="rounded-lg bg-[--brand] p-6 sm:p-8 text-white shadow-md">
        <h2 className="mb-4 text-3xl font-semibold text-[--accent]">
          Lara Bailey
        </h2>
        <div className="space-y-4 text-[0.975rem] leading-7">
          <p>
            Hi I’m Lara! I’m 34, wife to Dan (also known as our tech whizz) and
            mum to our beautiful daughter Luna. I’m a lover of fitness and
            women’s wellness, babies, pregnancies and birth as well as all
            things celestial, crystals and mystical. I’m always on hand with a
            supportive word, a listening ear, a shoulder to cry on or a woo at
            your achievements! Whatever you need, I’m your girl!
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
        </div>
      </section>
    </main>
  );
}
