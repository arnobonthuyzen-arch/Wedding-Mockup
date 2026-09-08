import Image from "next/image";
import Reveal from "./Reveal";

export default function PhotoBand() {
  return (
    <section className="bg-cream">
      <Reveal className="grid h-[340px] grid-cols-[1.4fr_1fr_1.4fr] sm:h-[520px]">
        {[
          { src: "/images/standing.jpg", sizes: "35vw" },
          { src: "/images/kiss-sun.jpg", sizes: "25vw" },
          { src: "/images/hug.jpg", sizes: "35vw" },
        ].map((photo) => (
          <div
            key={photo.src}
            className="group relative h-full w-full overflow-hidden"
          >
            <Image
              src={photo.src}
              alt=""
              fill
              sizes={photo.sizes}
              className="object-cover transition-transform duration-[1800ms] ease-silk group-hover:scale-[1.07]"
            />
            <div className="pointer-events-none absolute inset-0 bg-espresso/15 transition-opacity duration-700 ease-silk group-hover:opacity-0" />
          </div>
        ))}
      </Reveal>
    </section>
  );
}
