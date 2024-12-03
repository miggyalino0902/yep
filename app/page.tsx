import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Component() {
  return (
    <section className="relative h-[92vh] flex items-center justify-center overflow-hidden">
      <Image
        alt="Festive background"
        src={'/party.jpg'}
        layout="fill"
        objectFit="cover"
        className="absolute z-0"
        priority
      />
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <div className="bg-black bg-opacity-50 p-8 rounded-lg backdrop-blur-sm">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4">
            Poplar Homes 2024 Year End Party
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-white mb-8">
            Join us for a night of celebration, fun, and amazing prizes!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Link href={"/register"}>Register Now</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-background/80 hover:bg-background/90 text-foreground"
            >
              <Link href={"/my-prize"}>See Prize</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
