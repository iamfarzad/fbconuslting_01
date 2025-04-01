export default function Features() {
    return (
      <section className="py-20 bg-gray-50 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">Why Work With Me</h2>
          <p className="text-gray-600 mb-8">
            Automate, scale and elevate your business with intelligent systems.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-semibold">AI Expertise</h3>
              <p className="text-sm text-gray-500">Custom GPTs, Chatbots, Voice UI</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Automation</h3>
              <p className="text-sm text-gray-500">Zapier, Make, Notion, APIs</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Business Systems</h3>
              <p className="text-sm text-gray-500">Productized service delivery systems</p>
            </div>
          </div>
        </div>
      </section>
    );
  }