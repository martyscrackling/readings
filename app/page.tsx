import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="text-center space-y-5">
        <h1 className="text-5xl font-bold">
          Catholic Daily Readings
        </h1>

        <p className="text-gray-500 text-lg">
          Read today’s Mass readings and homily
        </p>

        <div className="flex flex-col gap-4 mt-8">
          <Link
            href="/reading"
            className="bg-black text-white px-6 py-4 rounded-2xl"
          >
            Open Today’s Readings
          </Link>

          <Link
            href="/calendar"
            className="border px-6 py-4 rounded-2xl"
          >
            Liturgical Calendar
          </Link>
        </div>
      </div>
    </main>
  );
}