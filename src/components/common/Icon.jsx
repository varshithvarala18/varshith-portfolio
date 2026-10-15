import {
  Briefcase,
  Code2,
  CreditCard,
  Database,
  Landmark,
  MapPin,
  Repeat,
  Server,
  Sparkles,
  Store,
  Users,
  Wrench,
} from 'lucide-react';

// Maps icon names used in src/data/portfolio.js to lucide components.
const icons = {
  Briefcase,
  Code2,
  CreditCard,
  Database,
  Landmark,
  MapPin,
  Repeat,
  Server,
  Sparkles,
  Store,
  Users,
  Wrench,
};

export default function Icon({ name, size = 20, ...props }) {
  const Component = icons[name] ?? Code2;
  return <Component size={size} aria-hidden="true" {...props} />;
}
