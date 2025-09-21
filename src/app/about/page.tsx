import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="bg-[--brand] text-white">
      {/* Hero / Intro Section */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-xl overflow-hidden shadow-lg border border-white/10">
          <Image
            src="/images/aboutme.jpg" // place this in public/images
            alt="Lara Bailey, Fitness and Wellness Coach"
            width={800}
            height={600}
            className="w-full object-cover"
          />
          <div className="p-6">
            <h2 className="text-3xl font-bold text-accent">Lara Bailey</h2>
            <p className="mt-4 text-lg leading-relaxed">
              Hi I’m Lara! I’m 34, wife to Dan (also known as our tech whizz) and mum to our
              beautiful daughter Luna. I’m a lover of fitness and women’s wellness, babies,
              pregnancies and birth as well as all things celestial, crystals and mystical.
              I’m always on hand with a supportive word, a listening ear, a shoulder to cry on
              or a woo at your achievements! Whatever you need, I’m your girl!
            </p>
            <p className="mt-4 text-lg leading-relaxed">
              You will normally recognise me from the rainbow hair which I’ve had for about 10
              years now. It changes often though, so I’m never one colour for a long time! If
              you have little ones, I apologise for the questions of how to get those colours
              that often ensue too!
            </p>
            <p className="mt-4 text-lg leading-relaxed">
              I have a couple of autoimmune conditions under my belt as well as a bowel
              condition. So if you are attending with some of these too, I feel you and
              understand. I’ll always make sure you are checking in with your body too, after
              all you know it best! We have also lost 2 pregnancies in 2023 and 2024, so if
              you are joining my motherhood journey classes and are having some anxiety after
              loss or during a fertility journey, I can fully empathise and will always have a
              listening ear.
            </p>
          </div>
        </div>
      </section>

      {/* Fitness Career Section */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-xl bg-white/5 p-6 shadow-lg">
          <h3 className="text-2xl font-semibold text-accent">Fitness Career</h3>
          <p className="mt-4 leading-relaxed">
            I trained to be a fitness instructor when I was 18 and have been helping people on
            their fitness journeys ever since! I initially trained in group fitness which is why
            I love classes so much and quickly went on to train in various Les Mills programmes
            (6 to be exact) where I was also chosen to be a tribe coach, supporting new
            instructors through their teaching journeys...
          </p>
        </div>
      </section>

      {/* Pre & Postnatal Section */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-xl bg-white/5 p-6 shadow-lg">
          <h3 className="text-2xl font-semibold text-accent">Pre &amp; Postnatal</h3>
          <p className="mt-4 leading-relaxed">
            Despite being in fitness for so long, I did not specialise in pre and postnatal
            fitness until having Luna. In 2020, I took the leap and finally did my training
            course through lockdown. I felt after experiencing pregnancy and postnatal recovery
            I was better equipped to help my clients...
          </p>
        </div>
      </section>

      {/* Supporting Motherhood Section */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-xl bg-white/5 p-6 shadow-lg">
          <h3 className="text-2xl font-semibold text-accent">Supporting Motherhood</h3>
          <p className="mt-4 leading-relaxed">
            I completed my baby massage training as I knew I wanted to help support parents and
            babies to connect and bond even further after my own experiences practising baby
            massage with Luna...
          </p>
        </div>
      </section>
    </main>
  );
}
