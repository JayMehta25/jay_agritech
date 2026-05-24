import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

/**
 * RouterBridge: A compatibility shim that maps standard react-router-dom APIs
 * to native Next.js Pages Router APIs. This ensures zero logic and UI changes.
 */

export function Link({ to, children, ...props }) {
  // Translate react-router-dom 'to' to Next.js 'href'
  const href = typeof to === 'string'
    ? to
    : to && typeof to === 'object'
      ? to.pathname || to.href || '/'
      : '';

  return (
    <NextLink href={href} {...props}>
      {children}
    </NextLink>
  );
}

export function useLocation() {
  const router = useRouter();
  
  if (!router) {
    return { pathname: '', search: '', hash: '', state: null };
  }

  const asPath = router.asPath || '';
  const pathname = router.pathname || '';
  
  // Extract search query and hash from router.asPath
  const [pathWithoutSearch, searchAndHash] = asPath.split('?');
  const search = searchAndHash ? '?' + searchAndHash.split('#')[0] : '';
  const hash = asPath.includes('#') ? '#' + asPath.split('#').pop() : '';

  return {
    pathname: pathWithoutSearch || pathname || '',
    search: search || '',
    hash: hash || '',
    state: null,
  };
}

export function useParams() {
  const router = useRouter();
  return router ? router.query : {};
}

export function useNavigate() {
  const router = useRouter();
  
  return React.useCallback((to, options = {}) => {
    if (!router) return;
    const href = typeof to === 'string'
      ? to
      : to && typeof to === 'object'
        ? to.pathname || to.href || '/'
        : '/';

    if (options.replace) {
      router.replace(href);
    } else {
      router.push(href);
    }
  }, [router]);
}
