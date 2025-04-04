import React from 'react';

export default function CoursesLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          {/* Title skeleton */}
          <div className="w-64 h-10 bg-muted animate-pulse rounded-lg mx-auto mb-4" />
          
          {/* Description skeleton */}
          <div className="w-96 h-6 bg-muted animate-pulse rounded-lg mx-auto mb-8" />
          
          {/* Progress bar skeleton */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between mb-2">
              <div className="w-24 h-4 bg-muted animate-pulse rounded" />
              <div className="w-12 h-4 bg-muted animate-pulse rounded" />
            </div>
            <div className="w-full h-2 bg-muted rounded-full" />
          </div>
        </div>

        {/* Course sections skeletons */}
        <div className="space-y-16">
          {[1, 2, 3].map((section) => (
            <div key={section} className="py-12">
              <div className="container mx-auto">
                {/* Section header skeleton */}
                <div className="p-6 rounded-xl bg-muted/5 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-6 h-6 bg-muted animate-pulse rounded" />
                    <div className="w-48 h-8 bg-muted animate-pulse rounded" />
                  </div>
                  <div className="w-full h-4 bg-muted animate-pulse rounded" />
                </div>

                {/* Course cards skeleton */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3].map((card) => (
                    <div
                      key={card}
                      className="p-6 rounded-xl glassmorphism-base"
                    >
                      <div className="w-24 h-6 bg-muted animate-pulse rounded-full mb-4" />
                      <div className="w-full h-6 bg-muted animate-pulse rounded mb-2" />
                      <div className="w-3/4 h-4 bg-muted animate-pulse rounded mb-4" />
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                        <div className="w-20 h-4 bg-muted animate-pulse rounded" />
                        <div className="w-4 h-4 bg-muted animate-pulse rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
