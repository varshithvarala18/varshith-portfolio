import { Mail, MapPin, Phone } from 'lucide-react';
import { contact, profile } from '../../data/portfolio.js';
import Section from '../common/Section.jsx';
import Reveal from '../common/Reveal.jsx';
import TiltCard from '../common/TiltCard.jsx';
import { GithubIcon, LinkedinIcon } from '../common/BrandIcons.jsx';
import ContactForm from './ContactForm.jsx';
import './Contact.css';

const channels = [
  {
    label: 'Email',
    value: contact.email,
    href: `mailto:${contact.email}`,
    icon: <Mail size={20} aria-hidden="true" />,
  },
  {
    label: 'Phone',
    value: contact.phone,
    href: `tel:${contact.phone.replace(/\s+/g, '')}`,
    icon: <Phone size={20} aria-hidden="true" />,
  },
  {
    label: 'LinkedIn',
    value: contact.linkedin.replace(/^https?:\/\/(www\.)?/, ''),
    href: contact.linkedin,
    icon: <LinkedinIcon size={20} />,
    external: true,
  },
  {
    label: 'GitHub',
    value: contact.github.replace(/^https?:\/\//, ''),
    href: contact.github,
    icon: <GithubIcon size={20} />,
    external: true,
  },
  {
    label: 'Location',
    value: profile.location,
    icon: <MapPin size={20} aria-hidden="true" />,
  },
];

function ChannelContent({ channel }) {
  return (
    <>
      <span className="icon-box">{channel.icon}</span>
      <span className="contact-channel-text">
        <span className="contact-channel-label">{channel.label}</span>
        <span className="contact-channel-value">{channel.value}</span>
      </span>
    </>
  );
}

export default function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let’s talk"
      intro="I'm open to backend and Java engineering roles. Reach out directly or send a message using the form."
      alt
    >
      <div className="contact-grid">
        <Reveal as="ul" className="contact-channels">
          {channels.map((channel) => (
            <li key={channel.label}>
              {channel.href ? (
                <TiltCard
                  as="a"
                  href={channel.href}
                  className="card contact-channel"
                  max={5}
                  {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <ChannelContent channel={channel} />
                </TiltCard>
              ) : (
                <div className="card contact-channel">
                  <ChannelContent channel={channel} />
                </div>
              )}
            </li>
          ))}
        </Reveal>

        <Reveal delay={0.08} className="contact-form-wrap">
          <ContactForm recipient={contact.email} />
        </Reveal>
      </div>
    </Section>
  );
}
