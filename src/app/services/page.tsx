import React from 'react';

export default function ServicesPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Our Services</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Service 1 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">AI Consulting</h2>
          <p className="text-gray-600 mb-4">
            Custom AI solutions to help your business automate processes and gain valuable insights.
          </p>
          <a href="#" className="text-blue-500 hover:underline">Learn more →</a>
        </div>
        
        {/* Service 2 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Technical Workshops</h2>
          <p className="text-gray-600 mb-4">
            Hands-on workshops to help your team build AI capabilities and stay ahead of industry trends.
          </p>
          <a href="#" className="text-blue-500 hover:underline">Learn more →</a>
        </div>
        
        {/* Service 3 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">AI Strategy Development</h2>
          <p className="text-gray-600 mb-4">
            Strategic planning for AI adoption and implementation tailored to your business needs.
          </p>
          <a href="#" className="text-blue-500 hover:underline">Learn more →</a>
        </div>
      </div>
    </div>
  );
}
