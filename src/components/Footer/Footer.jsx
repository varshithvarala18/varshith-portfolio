import { ArrowUp, Mail } from 'lucide-react';
import { contact, profile } from '../../data/portfolio.js';
import { GithubIcon, LinkedinIcon } from '../common/BrandIcons.jsx';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <p className="footer-name">{profile.name}</p>
          <p className="footer-role">{profile.role} · {profile.stack}</p>
        </div>

        <div className="footer-links">
          <a href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
            <GithubIcon size={18} />
          </a>
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
            <LinkedinIcon size={18} />
          </a>
          <a href={`mailto:${contact.email}`} aria-label="Send an email">
            <Mail size={18} aria-hidden="true" />
          </a>
          <a href="#top" aria-label="Back to top" className="footer-top">
            <ArrowUp size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="container">
        <p className="footer-copy">© 2026 Varshith. All rights reserved.</p>
      </div>
    </footer>
  );
}
