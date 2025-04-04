import React from 'react';

export default function CourseStepLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb skeleton */}
          <div className="flex items-center text-sm text-muted-foreground mb-8">
            <div className="w-16 h-4 bg-muted animate-pulse rounded" />
            <span className="mx-2">•</span>
            <div className="w-32 h-4 bg-muted animate-pulse rounded" />
            <span className="mx-2">•</span>
            <div className="w-20 h-4 bg-muted animate-pulse rounded" />
          </div>

          {/* Main content skeleton */}
          <div className="p-8 rounded-xl glassmorphism-base">
            {/* Header skeleton */}
            <header className="mb-8">
              <div className="w-3/4 h-8 bg-muted animate-pulse rounded-lg mb-4" />
              <div className="flex items-center text-muted-foreground">
                <div className="w-4 h-4 bg-muted animate-pulse rounded mr-2" />
                <div className="w-24 h-4 bg-muted animate-pulse rounded" />
              </div>
            </header>

            {/* Content skeleton */}
            <div className="space-y-4 mb-8">
              <div className="w-full h-4 bg-muted animate-pulse rounded" />
              <div className="w-5/6 h-4 bg-muted animate-pulse rounded" />
              <div className="w-4/6 h-4 bg-muted animate-pulse rounded" />
            </div>

            {/* Course content skeleton */}
            <div className="my-8 space-y-6">
              <div className="w-full h-32 bg-muted/5 animate-pulse rounded-lg border border-muted" />
              <div className="w-full h-32 bg-muted/5 animate-pulse rounded-lg border border-muted" />
            </div>

            {/* Button skeleton */}
            <div className="w-full h-12 bg-primary/20 animate-pulse rounded-lg" />

            {/* Navigation skeleton */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-muted animate-pulse rounded mr-2" />
                <div>
                  <div className="w-16 h-4 bg-muted animate-pulse rounded mb-1" />
                  <div className="w-32 h-5 bg-muted animate-pulse rounded" />
                </div>
              </div>

              <div className="flex items-center">
                <div>
                  <div className="w-16 h-4 bg-muted animate-pulse rounded mb-1" />
                  <div className="w-32 h-5 bg-muted animate-pulse rounded" />
                </div>
                <div className="w-4 h-4 bg-muted animate-pulse rounded ml-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
