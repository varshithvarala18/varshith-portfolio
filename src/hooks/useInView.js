import { useEffect, useRef, useState } from 'react';

/**
 * Reports whether an element is near the viewport.
 * `hasEntered` stays true once the element has been seen, so heavy content
 * can mount lazily, while `inView` lets it pause work when scrolled away.
 */
export default function useInView({ rootMargin = '200px 0px' } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setHasEntered(true);
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, inView, hasEntered };
}
