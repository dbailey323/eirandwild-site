import Link from "next/link";

export default function PersonalTrainingPage() {
  return (
    <div className="grid gap-4 py-8">
      <h1 className="text-3xl font-bold">Personal Training</h1>
      <p className="text-slate-700">
        1:1 or small-group sessions tailored to your goals. Pre/post-natal aware programming available.
      </p>
      <Link href="/contact" className="mt-2 inline-block rounded-md bg-slate-900 px-5 py-2.5 text-white">
        Enquire
      </Link>
    </div>
  );
}
