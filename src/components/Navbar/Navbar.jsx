import { useEffect, useState } from 'react';
import { Download, Menu, Moon, Sun, X } from 'lucide-react';
import { navLinks, profile } from '../../data/portfolio.js';
import useTheme from '../../hooks/useTheme.js';
import useActiveSection from '../../hooks/useActiveSection.js';
import './Navbar.css';

const sectionIds = navLinks.map((link) => link.id);

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on Escape or when resizing up to desktop.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth > 1024 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const isDark = theme === 'dark';

  return (
    <header className={`navbar${scrolled || open ? ' navbar-scrolled' : ''}`}>
      <nav className="container navbar-inner" aria-label="Primary">
        <a href="#top" className="navbar-brand" onClick={() => setOpen(false)}>
          <span className="navbar-logo" aria-hidden="true">
            V
          </span>
          <span>{profile.name}</span>
        </a>

        <ul id="nav-menu" className={`navbar-links${open ? ' is-open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={active === link.id ? 'is-active' : undefined}
                aria-current={active === link.id ? 'true' : undefined}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="navbar-mobile-resume">
            <a href={profile.resume} download className="btn btn-primary">
              <Download size={16} aria-hidden="true" />
              Download Resume
            </a>
          </li>
        </ul>

        <div className="navbar-actions">
          <button
            type="button"
            className="icon-button"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>
          <a href={profile.resume} download className="btn btn-secondary navbar-resume">
            <Download size={16} aria-hidden="true" />
            Resume
          </a>
          <button
            type="button"
            className="icon-button navbar-toggle"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="nav-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>
    </header>
  );
}
