import { useEffect, useState } from 'react';

const read = () => document.documentElement.dataset.theme !== 'light';

/**
 * Follows the data-theme attribute owned by useTheme, so 3D scenes can
 * adjust their colours without sharing state with the navbar.
 */
export default function useIsDark() {
  const [isDark, setIsDark] = useState(read);

  useEffect(() => {
    const observer = new MutationObserver(() => setIsDark(read()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  return isDark;
}
