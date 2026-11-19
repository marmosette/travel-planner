"use client";
import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);

    const res = await fetch("http://localhost:3000/plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        budget: Number(form.get("budget")),
        country: form.get("country"),
        startDate: form.get("startDate"),
        endDate: form.get("endDate"),
       
      }),
    });
     
    setResult(await res.json());
    setLoading(false);
  }

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl mb-4">Планировщик путешествий</h1>
      <form onSubmit={handleSubmit} className="space-y-2">

        <input name="country" placeholder="Страна" required className="border p-2 w-full" />
        <input name="budget" type="number" placeholder="Бюджет" required className="border p-2 w-full" />
        <input name="startDate" type="date" required className="border p-2 w-full" />
        <input name="endDate" type="date" required className="border p-2 w-full" />
      
        <button type="submit" disabled={loading} className="bg-black text-white p-2 w-full">
          {loading ? "Составляю..." : "Составить маршрут"}
        </button>
      </form>
   


      {result && (
        <pre className="mt-4 bg-gray-100 p-4 overflow-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  );
}