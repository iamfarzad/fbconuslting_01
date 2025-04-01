import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { SpatialContext } from '@/components/copilot/types';

/**
 * Hook to track user's spatial context within the application
 */
export function useSpatialContext(enabled: boolean) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [spatialContext, setSpatialContext] = useState<SpatialContext | null>(null);

  useEffect(() => {
    if (!enabled) return; // Don't track context if copilot is disabled

    if (!spatialContext) {
      const currentPath = pathname;
      const pageName = currentPath === '/' ? 'home' : currentPath.substring(1);
      
      setSpatialContext({
        pageSection: pageName,
        elementType: 'page',
        interactionType: 'navigation',
        userBehavior: 'active',
        timestamp: Date.now()
      });
    }
  }, [pathname, searchParams, spatialContext, enabled]);

  return { spatialContext };
}
