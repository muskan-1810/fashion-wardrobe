import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'proj-01',
    slug: 'ethereal-drapery',
    title: 'Ethereal Drapery',
    category: 'Editorial Campaigns',
    year: '2026',
    role: 'Creative Direction & Styling',
    clientOrBrand: 'Atelier Noir Autumn Monograph',
    brief:
      'To conceptualize and execute a campaign visually exploring how architectural drapery interacts with natural light and stark concrete spatial geometry.',
    concept:
      'We juxtaposed the fluid softness of heavyweight silk and double-face wools against austere brutalist architecture. The light was captured exclusively in natural dawn and twilight to reveal the honest texture of each weave.',
    process:
      'Shot on location in an unadorned concrete pavilion. We selected high-drape garments that respond dynamically to ambient drafts and model movement, avoiding artificial fans or digital post-processing.',
    coverImage: 'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&fit=crop&w=1400&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&fit=crop&w=1200&q=80',
        caption: 'Opening look: Double-faced wool overcoat against monolithic stone slab.',
        aspectRatio: 'portrait',
      },
      {
        url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80',
        caption: 'Look 04: Bias-cut silk dress in motion through natural gallery light.',
        aspectRatio: 'landscape',
      },
      {
        url: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80',
        caption: 'Detail of sculpted waist darting and concealed jetted seams.',
        aspectRatio: 'portrait',
      },
      {
        url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
        caption: 'Study of stride volume and palazzo trouser break at ankle.',
        aspectRatio: 'square',
      },
    ],
    credits: {
      photographer: 'Editorial Studio Paris',
      artDirection: 'Creative Direction at Atelier Noir',
      styling: 'Studio Atelier Team',
      model: 'Elena Rostova',
      hairMakeup: 'Claire Laurent',
      location: 'Fondation Pavillon Brutaliste',
    },
    nextSlug: 'monolith-and-silhouette',
    prevSlug: 'subtle-geometry',
  },
  {
    id: 'proj-02',
    slug: 'monolith-and-silhouette',
    title: 'Monolith & Silhouette',
    category: 'Creative Direction',
    year: '2026',
    role: 'Art Direction & Concept',
    clientOrBrand: 'Winter Capsule Showcase',
    brief:
      'Art direction for a collection defined by extreme proportions—sharp roped shoulders, razor collars, and floor-sweeping outerwear.',
    concept:
      'The human body seen as an architectural column. By stripping away embellishments and hardware, clothing becomes an uninterrupted silhouette of shadow and form.',
    process:
      'Developed 35mm film moodboards and black-and-white tonal contrast plates. Directed lighting setups using large diffused overhead grids to carve clean lines without harsh glare.',
    coverImage: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1400&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=80',
        caption: 'Monochrome profile study emphasizing sharp shoulder roping.',
        aspectRatio: 'portrait',
      },
      {
        url: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80',
        caption: 'Macro exploration of unbleached organic cashmere fibers.',
        aspectRatio: 'portrait',
      },
      {
        url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
        caption: 'Full-length editorial sequence.',
        aspectRatio: 'landscape',
      },
    ],
    credits: {
      photographer: 'Matthieu Vaneck',
      artDirection: 'Atelier Noir Studio',
      styling: 'Minimalist Wardrobe Curators',
      model: 'Anja Lindqvist',
      location: 'Studio 04, Milan',
    },
    nextSlug: 'tactile-resonance',
    prevSlug: 'ethereal-drapery',
  },
  {
    id: 'proj-03',
    slug: 'tactile-resonance',
    title: 'Tactile Resonance',
    category: 'Fashion Photography',
    year: '2025',
    role: 'Photographic Direction',
    clientOrBrand: 'Textile Monograph Series',
    brief:
      'A photographic investigation into the sensual properties of rare natural fibers: raw tussah silk, Biella virgin wool, and Belgian river-washed linen.',
    concept:
      'Bringing the viewer close enough to perceive the microscopic tension of the warp and weft. Emphasizing tactile memory and craftsmanship.',
    process:
      'Utilized high-resolution medium format captures with raking cross-light to highlight tactile hills and valleys across fabric surfaces.',
    coverImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
        caption: 'The fold of Belgian linen under raking natural skylight.',
        aspectRatio: 'portrait',
      },
      {
        url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=80',
        caption: 'Full canvas tailored lapel rolling naturally across the chest.',
        aspectRatio: 'landscape',
      },
    ],
    credits: {
      photographer: 'Studio Atelier Team',
      artDirection: 'Textile Studies Archive',
      location: 'Biella Wool Guild, Italy',
    },
    nextSlug: 'nocturne-minimaliste',
    prevSlug: 'monolith-and-silhouette',
  },
  {
    id: 'proj-04',
    slug: 'nocturne-minimaliste',
    title: 'Nocturne Minimaliste',
    category: 'Lookbooks',
    year: '2025',
    role: 'Styling & Lookbook Curation',
    clientOrBrand: 'Nocturnal Capsule Lookbook',
    brief:
      'Curating a 16-look visual book capturing nocturnal tailoring for modern gallery events and intimate evening gatherings.',
    concept:
      'Subtle shades of onyx, slate, and espresso layered in varied surface textures—matte wool juxtaposed with high-shine silk habotai.',
    process:
      'Designed the complete sequence of styling combinations, accessories, and spatial pacing across 32 editorial spreads.',
    coverImage: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1400&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=80',
        caption: 'Look 02: Monastic turtleneck paired with wide-leg evening trousers.',
        aspectRatio: 'portrait',
      },
      {
        url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
        caption: 'Look 07: Fluid bias-cut evening dress under low tungsten mood.',
        aspectRatio: 'portrait',
      },
      {
        url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
        caption: 'Ensemble look: Oversized overcoat layered over evening tailoring.',
        aspectRatio: 'landscape',
      },
    ],
    credits: {
      photographer: 'Antoine Chen',
      artDirection: 'Atelier Noir',
      styling: 'Editorial Studio',
      model: 'Kasia V.',
      location: 'Palais Nocturne, Paris',
    },
    nextSlug: 'subtle-geometry',
    prevSlug: 'tactile-resonance',
  },
  {
    id: 'proj-05',
    slug: 'subtle-geometry',
    title: 'Subtle Geometry',
    category: 'Brand Identity',
    year: '2024',
    role: 'Object Design & Visual Identity',
    clientOrBrand: 'Atelier Noir Signature Artifacts',
    brief:
      'Creating visual identity guidelines, packaging, and tactile object studies for leather goods, woven tags, and editorial publication collateral.',
    concept:
      'Subdued luxury marked by blind debossing, uncoated cotton papers, hand-dyed ribbons, and raw edges that avoid loud branding.',
    process:
      'Material sourcing across historic European paper mills and Florentine tanneries. Complete specification of typographies and foil parameters.',
    coverImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1400&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=80',
        caption: 'Object study: Sculpted leather tote in natural gallery shadow.',
        aspectRatio: 'portrait',
      },
      {
        url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
        caption: 'Packaging identity: Uncoated ivory board with blind debossed mark.',
        aspectRatio: 'landscape',
      },
    ],
    credits: {
      photographer: 'Studio Atelier Noir',
      artDirection: 'Creative Direction Atelier',
      location: 'Atelier Studio, Zurich',
    },
    nextSlug: 'ethereal-drapery',
    prevSlug: 'nocturne-minimaliste',
  },
];
