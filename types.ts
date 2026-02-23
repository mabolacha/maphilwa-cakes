
export interface NavLink {
  label: string;
  path: string;
}

export interface GalleryImage {
  url: string;
  title: string;
  category?: string;
  originalIndex?: number; // Utilisé pour l'édition quand la liste est filtrée
}

export interface Flavor {
  name: string;
  description: string;
}

export interface FlavorCategory {
  title: string;
  items: Flavor[];
}

export interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    image: string;
  };
  about: {
    title: string;
    story: string[];
    values: string[];
    quote: string;
  };
  weddings: {
    title: string;
    description: string;
    steps: {
      title: string;
      description: string;
    }[];
    gallery: GalleryImage[];
  };
  celebrations: {
    title: string;
    eventTypes: string[];
    description: string;
    gallery: GalleryImage[];
  };
  flavors: FlavorCategory[];
  contact: {
    address: string;
    email: string;
    phone: string;
    hours: string;
    delayNotice: string;
  };
}
