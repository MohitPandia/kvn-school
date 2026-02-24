import { schoolName, schoolFullName } from "@/lib/constants";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold text-foreground">{schoolName}</h1>
      <p className="mt-2 text-muted-foreground">{schoolFullName}</p>
      <p className="mt-4 text-sm text-muted-foreground">Bikaner, Rajasthan 334001</p>
    </div>
  );
}
