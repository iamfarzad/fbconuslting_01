import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-gray-900">
          Farzad Bayat
        </Link>
        <nav className="space-x-6 text-sm font-medium text-gray-700">
          <Link href="/about" className="hover:text-black">About</Link>
          <Link href="/services" className="hover:text-black">Services</Link>
          <Link href="/courses" className="hover:text-black">Courses</Link>
          <Link href="/resources" className="hover:text-black">Resources</Link>
          <Link href="/contact" className="hover:text-black">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
