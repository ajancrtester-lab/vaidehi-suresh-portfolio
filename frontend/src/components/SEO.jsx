import { Helmet } from 'react-helmet-async';

const SEO = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Vaidehi Suresh",
    "jobTitle": "Sopana Sangeetham Artist",
    "description": "Professional Kerala temple music artist specializing in traditional Sopana Sangeetham performances",
    "url": "https://vaidehisuresh.com",
    "image": "https://images.unsplash.com/photo-1598000938546-d8b840f69952?w=800&h=1000&fit=crop",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Thrissur",
      "addressRegion": "Kerala",
      "addressCountry": "India"
    },
    "performerIn": [
      {
        "@type": "Event",
        "name": "Sabarimala Temple Performance",
        "location": "Sabarimala Temple, Kerala"
      },
      {
        "@type": "Event", 
        "name": "Guruvayur Temple Festival",
        "location": "Guruvayur Sri Krishna Temple, Kerala"
      },
      {
        "@type": "Event",
        "name": "Thrissur Pooram",
        "location": "Vadakkunnathan Temple, Thrissur"
      }
    ],
    "award": [
      "Kerala Sangeetha Nataka Akademi Recognition",
      "Best Temple Music Performance Award",
      "Cultural Heritage Ambassador"
    ],
    "alumniOf": [
      {
        "@type": "EducationalOrganization",
        "name": "Kerala Sangeetha Nataka Akademi"
      },
      {
        "@type": "EducationalOrganization",
        "name": "Swathi Thirunal Music Academy"
      }
    ],
    "knowsAbout": [
      "Sopana Sangeetham",
      "Kerala Temple Music",
      "Carnatic Classical Music",
      "Devotional Music",
      "Traditional Ragas",
      "Temple Ceremonies"
    ],
    "sameAs": [
      "https://www.instagram.com/vaidehisuresh",
      "https://www.youtube.com/@vaidehisuresh"
    ]
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>Vaidehi Suresh - Sopana Sangeetham Artist | Kerala Temple Music Performer</title>
      <meta 
        name="title" 
        content="Vaidehi Suresh - Sopana Sangeetham Artist | Kerala Temple Music Performer" 
      />
      <meta 
        name="description" 
        content="Professional Sopana Sangeetham artist from Thrissur, Kerala. Specializing in traditional temple music performances at Sabarimala, Guruvayur, and major Kerala temples. Book authentic devotional music for temple ceremonies, cultural events, and private functions. 15+ years experience in classical ragas." 
      />
      <meta 
        name="keywords" 
        content="Sopana Sangeetham, Kerala temple music, Vaidehi Suresh, temple music artist, devotional music Kerala, Sabarimala music, Guruvayur performance, classical Kerala music, traditional temple singer, Thrissur Pooram, Kerala cultural music, temple ceremony music, devotional singer Kerala, Carnatic temple music" 
      />
      <meta name="author" content="Vaidehi Suresh" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="profile" />
      <meta property="og:url" content="https://vaidehisuresh.com/" />
      <meta property="og:title" content="Vaidehi Suresh - Sopana Sangeetham Artist | Kerala Temple Music" />
      <meta property="og:description" content="Award-winning Kerala temple music artist. 15+ years performing traditional Sopana Sangeetham at major temples across Kerala." />
      <meta property="og:image" content="https://images.unsplash.com/photo-1598000938546-d8b840f69952?w=1200&h=630&fit=crop" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://vaidehisuresh.com/" />
      <meta property="twitter:title" content="Vaidehi Suresh - Sopana Sangeetham Artist" />
      <meta property="twitter:description" content="Professional Kerala temple music performer specializing in traditional Sopana Sangeetham" />
      <meta property="twitter:image" content="https://images.unsplash.com/photo-1598000938546-d8b840f69952?w=1200&h=630&fit=crop" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* Additional SEO Tags */}
      <link rel="canonical" href="https://vaidehisuresh.com/" />
      <meta name="geo.region" content="IN-KL" />
      <meta name="geo.placename" content="Thrissur, Kerala" />
    </Helmet>
  );
};

export default SEO;
