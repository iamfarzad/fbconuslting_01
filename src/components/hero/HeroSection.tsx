import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative py-24 sm:py-32 lg:pb-40 overflow-hidden">
      <div className="mx-auto container">
        <div className="relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="heading-1 text-balance">
              Unlock the Power of AI for Your Business
            </h1>
            <p className="mt-6 text-lg md:text-xl leading-8 text-gray-600 max-w-2xl mx-auto text-balance">
              Build intelligent automation, deploy AI assistants, and turn knowledge into value with Farzad Bayat.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services" className="primary-button">
                Explore Services
              </Link>
              <Link href="/courses" className="secondary-button">
                View Courses
              </Link>
            </div>
          </div>

          <div className="mt-16 flex justify-center gap-8 sm:gap-12 opacity-80">
            <Image 
              src="/file.svg"
              alt="File icon"
              width={40}
              height={40}
              className="w-8 h-8 sm:w-10 sm:h-10"
            />
            <Image 
              src="/globe.svg"
              alt="Globe icon"
              width={40}
              height={40}
              className="w-8 h-8 sm:w-10 sm:h-10"
            />
            <Image 
              src="/window.svg"
              alt="Window icon"
              width={40}
              height={40}
              className="w-8 h-8 sm:w-10 sm:h-10"
            />
          </div>
        </div>

        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
          <div className="relative aspect-[1155/678] w-[72.1875rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
    </section>
  );
}
