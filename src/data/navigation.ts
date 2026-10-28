export interface NavLink {
  label: string;
  href: string;
}

export const mainNavLinks: NavLink[] = [
  { label: 'Shop', href: '/shop' },
  { label: 'Collections', href: '/collections' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const shopCategories = [
  'All',
  'Outerwear',
  'Tailoring',
  'Dresses',
  'Knitwear',
  'Trousers',
  'Accessories',
] as const;

export const portfolioCategories = [
  'All',
  'Fashion Photography',
  'Styling',
  'Creative Direction',
  'Brand Identity',
  'Editorial Campaigns',
  'Lookbooks',
] as const;

export const footerLinks = {
  boutique: [
    { label: 'All Garments', href: '/shop' },
    { label: 'New Arrivals', href: '/shop?filter=new' },
    { label: 'The Permanent Archive', href: '/collections/permanent-archive' },
    { label: 'Care & Sizing Guide', href: '/about#craft' },
  ],
  portfolio: [
    { label: 'Selected Works', href: '/portfolio' },
    { label: 'Editorial Campaigns', href: '/portfolio?cat=Editorial+Campaigns' },
    { label: 'Creative Direction', href: '/portfolio?cat=Creative+Direction' },
    { label: 'Fashion Photography', href: '/portfolio?cat=Fashion+Photography' },
  ],
  atelier: [
    { label: 'Designer Profile', href: '/about' },
    { label: 'Design Philosophy', href: '/about#philosophy' },
    { label: 'Commissions & Inquiries', href: '/contact' },
    { label: 'GitHub Repository', href: 'https://github.com/muskan-1810', external: true },
  ],
};
