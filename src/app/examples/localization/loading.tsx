import React from 'react';

export default function LocalizationExamplesLoading() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        {/* Header skeleton */}
        <div className="flex justify-between items-center mb-8">
          <div className="h-8 w-64 bg-muted animate-pulse rounded" />
          <div className="h-10 w-32 bg-muted animate-pulse rounded" />
        </div>

        {/* Description skeleton */}
        <div className="h-4 w-2/3 bg-muted animate-pulse rounded mb-12" />

        <div className="max-w-4xl mx-auto">
          {/* Example card skeleton */}
          <div className="mb-16">
            <div className="p-8 rounded-xl bg-card shadow-lg">
              <div className="h-8 w-48 bg-muted animate-pulse rounded mb-4" />
              <div className="h-4 w-full bg-muted animate-pulse rounded mb-6" />
              <div className="h-24 w-full bg-muted animate-pulse rounded mb-8" />
              <div className="h-12 w-full bg-primary/10 animate-pulse rounded" />
            </div>
          </div>

          {/* Code example skeleton */}
          <div className="mb-12">
            <div className="h-6 w-40 bg-muted animate-pulse rounded mb-4" />
            <div className="h-48 w-full bg-card animate-pulse rounded" />
          </div>

          {/* Features grid skeleton */}
          <div className="h-6 w-32 bg-muted animate-pulse rounded mb-6" />
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-6 bg-card rounded-lg shadow-sm animate-pulse"
              >
                <div className="h-6 w-32 bg-muted rounded mb-4" />
                <div className="h-20 w-full bg-muted rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
