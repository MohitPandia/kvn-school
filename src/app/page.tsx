import { Hero } from "@/components/landing/Hero";
import { PhotoCarousel } from "@/components/landing/PhotoCarousel";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <PhotoCarousel />
    </div>
  );
}
