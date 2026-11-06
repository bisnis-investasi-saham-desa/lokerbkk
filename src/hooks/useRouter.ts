import { useState, useEffect, useCallback } from 'react';

export interface RouteState {
  path: string;
  queryParams: Record<string, string>;
  fullUrl: string;
}

export function useRouter() {
  const getRouteState = useCallback((): RouteState => {
    if (typeof window === 'undefined') {
      return { path: '/', queryParams: {}, fullUrl: '/' };
    }
    const path = window.location.pathname || '/';
    const search = window.location.search;
    const urlParams = new URLSearchParams(search);
    const queryParams: Record<string, string> = {};
    urlParams.forEach((val, key) => {
      queryParams[key] = val;
    });

    return {
      path,
      queryParams,
      fullUrl: path + search
    };
  }, []);

  const [currentRoute, setCurrentRoute] = useState<RouteState>(getRouteState);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(getRouteState());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [getRouteState]);

  const navigate = useCallback(
    (to: string, replace = false) => {
      if (typeof window === 'undefined') return;

      if (replace) {
        window.history.replaceState({}, '', to);
      } else {
        window.history.pushState({}, '', to);
      }
      setCurrentRoute(getRouteState());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [getRouteState]
  );

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      // Check if open in new tab or external link
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || href.startsWith('http://') || href.startsWith('https://')) {
        return;
      }
      e.preventDefault();
      navigate(href);
    },
    [navigate]
  );

  return {
    ...currentRoute,
    navigate,
    handleLinkClick
  };
}

/**
 * Dynamically updates document title, meta description, canonical link, and JSON-LD for SEO
 */
export function updatePageSeo(
  title: string,
  description: string,
  canonicalPath = '/',
  customSchema?: object
) {
  if (typeof document === 'undefined') return;

  // Title
  document.title = title;

  // Meta description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', description);

  // OpenGraph Title & Description
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', title);
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', description);

  // Twitter Title & Description
  const twTitle = document.querySelector('meta[name="twitter:title"]');
  if (twTitle) twTitle.setAttribute('content', title);
  const twDesc = document.querySelector('meta[name="twitter:description"]');
  if (twDesc) twDesc.setAttribute('content', description);

  // Canonical
  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  const cleanPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
  canonicalEl.setAttribute('href', `https://lokerbkk.com${cleanPath}`);

  // Dynamic Page-Level Structured Data (JSON-LD)
  let dynamicScript = document.getElementById('dynamic-page-schema') as HTMLScriptElement | null;
  if (customSchema) {
    if (!dynamicScript) {
      dynamicScript = document.createElement('script');
      dynamicScript.id = 'dynamic-page-schema';
      dynamicScript.type = 'application/ld+json';
      document.head.appendChild(dynamicScript);
    }
    dynamicScript.textContent = JSON.stringify(customSchema);
  } else if (dynamicScript) {
    dynamicScript.remove();
  }
}
