export default function CallToAction() {
    return (
      <section className="py-20 bg-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Let’s build something together</h2>
          <p className="text-gray-600 mb-6">
            Ready to take your business to the next level with AI and automation?
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-black text-white font-semibold rounded hover:bg-gray-800 transition"
          >
            Book a free consultation
          </a>
        </div>
      </section>
    );
  }