export default function TimetablePage() {
  return (
    <div className="grid gap-6 py-8">
      <h1 className="text-3xl font-bold">Timetable & Booking</h1>
      <p className="text-slate-700">
        Find your class below. Book, reschedule, or cancel directly in the scheduler.
      </p>
      <div className="rounded-lg border">
        <iframe
          title="Eir & Wild — Bookings"
          src="https://bookwhen.com/eirandwild"
          className="h-[1200px] w-full"
          loading="lazy"
        />
      </div>
      <p className="text-sm text-slate-600">
        Problems booking? Email <a className="underline" href="mailto:hello@eirandwild.co.uk">hello@eirandwild.co.uk</a>.
      </p>
    </div>
  );
}
