import { Helmet } from 'react-helmet-async';

const SEO = () => {
  // Enhanced Person + PerformingArtist Schema
  const personSchema = {
    "@context": "https://schema.org",
    "@type": ["Person", "PerformingArtist"],
    "name": "Vaidehi Suresh",
    "alternateName": "Vaidehi Suresh Sopana Sangeetham Artist",
    "description": "Professional Sopana Sangeetham artist from Kerala with 13+ years experience and 750+ temple performances. Specializing in Kerala temple music, Idakka performances, and devotional sangeetham across Thrissur, Kerala, and India.",
    "url": "https://vaidehisopanasangeethaartist.netlify.app/",
    "image": "https://images.unsplash.com/photo-1598000938546-d8b840f69952?w=800&h=1000&fit=crop",
    "jobTitle": "Sopana Sangeetham Artist",
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Sopana Sangeetham Artist",
      "occupationLocation": {
        "@type": "City",
        "name": "Thrissur"
      },
      "skills": "Sopana Sangeetham, Temple Music, Idakka, Carnatic Music, Kerala Classical Music"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Thrissur",
      "addressRegion": "Kerala",
      "addressCountry": "IN"
    },
    "areaServed": [
      {
        "@type": "State",
        "name": "Kerala"
      },
      {
        "@type": "Country",
        "name": "India"
      }
    ],
    "knowsAbout": [
      "Sopana Sangeetham",
      "Kerala Temple Music",
      "Thrissur Temple Performances",
      "Carnatic Music",
      "Devotional Music",
      "Idakka Performance",
      "Kathakali Music",
      "Guruvayur Temple Music",
      "Sabarimala Temple Music",
      "Malayalam Devotional Songs"
    ],
    "sameAs": [
      "https://www.instagram.com/iraneesam_vaidehi_suresh/",
      "https://www.youtube.com/@sureshnairiranikulam3072",
      "https://www.facebook.com/vaidehi.suresh"
    ],
    "award": [
      "750+ Temple Performances",
      "13+ Years of Experience in Sopana Sangeetham"
    ],
    "performerIn": {
      "@type": "MusicEvent",
      "name": "Kerala Temple Music Performances",
      "location": {
        "@type": "Place",
        "name": "Various Temples across Kerala"
      }
    }
  };

  // LocalBusiness Schema (Service-based)
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Vaidehi Suresh - Sopana Sangeetham Artist Kerala",
    "description": "Book professional Sopana Sangeetham artist for temple events, festivals, and ceremonies in Kerala. Authentic Kerala temple music performances with 13+ years experience.",
    "url": "https://vaidehisopanasangeethaartist.netlify.app/",
    "telephone": "+919447435548",
    "priceRange": "Contact for booking",
    "areaServed": {
      "@type": "State",
      "name": "Kerala"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Thrissur",
      "addressRegion": "Kerala",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "10.5276",
      "longitude": "76.2144"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Sopana Sangeetham Performance Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Temple Music Performance",
            "description": "Traditional Sopana Sangeetham performances for temple events and festivals"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Idakka Performance",
            "description": "Classical Idakka performances for Kerala cultural events"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Devotional Concerts",
            "description": "Kerala devotional music concerts and sangeetham programs"
          }
        }
      ]
    }
  };

  // FAQ Schema for AI Overview
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Who is the best Sopana Sangeetham artist in Kerala?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Vaidehi Suresh is a renowned Sopana Sangeetham artist in Kerala with 13+ years of experience and performances in 750+ temples across Kerala including Guruvayur, Sabarimala, and major temples in Thrissur."
        }
      },
      {
        "@type": "Question",
        "name": "How to book Sopana Sangeetham artist in Thrissur?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can book Vaidehi Suresh for Sopana Sangeetham performances by contacting via WhatsApp at +919447435548 or through the booking form on the website."
        }
      },
      {
        "@type": "Question",
        "name": "What is Sopana Sangeetham?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sopana Sangeetham is a form of classical music originated from Kerala temples, characterized by devotional singing on the sopanam (steps) of temples. It combines elements of Carnatic music with Kerala's temple traditions."
        }
      },
      {
        "@type": "Question",
        "name": "Which temples has Vaidehi Suresh performed in Kerala?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Vaidehi Suresh has performed in 750+ temples across Kerala including famous temples in Guruvayur, Thrissur, Thruvambady, Paramekkavu, Ettumanoor, Ambalappuzha, Sabarimala, and temples across Mumbai, Delhi, Gujarat, and other states."
        }
      },
      {
        "@type": "Question",
        "name": "What instruments are used in Sopana Sangeetham?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sopana Sangeetham typically features the Idakka (hourglass drum), Chenda, Maddalam, and vocal performances. Vaidehi Suresh specializes in Idakka performances along with traditional Kerala temple vocals."
        }
      }
    ]
  };

  return (
    <Helmet>
      {/* Google Search Console Verification */}
      <meta name="google-site-verification" content="92oTJzcupnwJTiRPtGexCcNFHPt02Y0e3Tj7iz7w3M0" />

      {/* Primary Meta Tags - Enhanced for AI Overview */}
      <title>Vaidehi Suresh | Sopana Sangeetham Artist Kerala & Thrissur | Book Temple Music Performances</title>

      <meta
        name="description"
        content="Book Vaidehi Suresh, professional Sopana Sangeetham artist from Thrissur, Kerala with 13+ years experience and 750+ temple performances. Specialist in Kerala temple music, Idakka performances, and devotional sangeetham across India. Contact for temple events and cultural programs."
      />

      <meta
        name="keywords"
        content="Sopana Sangeetham artist Kerala, Sopana Sangeetham artist Thrissur, Sopana Sangeetham booking, Vaidehi Suresh Sopana Sangeetham, Sopana Sangeetham artist India, temple music artist Kerala, Idakka artist Kerala, Kerala temple singer, Thrissur temple music, Guruvayur temple artist, book Sopana Sangeetham, devotional singer Kerala, Kerala classical music"
      />

      <meta name="author" content="Vaidehi Suresh" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* Language & Region */}
      <meta httpEquiv="content-language" content="en-IN" />
      <meta name="language" content="English, Malayalam" />

      {/* Enhanced Open Graph - Better for AI Overview */}
      <meta property="og:type" content="profile" />
      <meta property="og:url" content="https://vaidehisopanasangeethaartist.netlify.app/" />
      <meta property="og:site_name" content="Vaidehi Suresh - Sopana Sangeetham Artist" />
      <meta property="og:title" content="Vaidehi Suresh | Sopana Sangeetham Artist Kerala Thrissur | Book Temple Music" />
      <meta property="og:description" content="Professional Sopana Sangeetham artist from Thrissur, Kerala. 13+ years experience, 750+ temple performances. Book authentic Kerala temple music for events and festivals." />
      <meta property="og:image" content="https://images.unsplash.com/photo-1598000938546-d8b840f69952?w=1200&h=630&fit=crop" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Vaidehi Suresh performing Sopana Sangeetham Kerala temple music" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:locale:alternate" content="ml_IN" />

      {/* Enhanced Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Vaidehi Suresh - Sopana Sangeetham Artist Kerala Thrissur" />
      <meta name="twitter:description" content="Book professional Sopana Sangeetham artist with 13+ years experience and 750+ temple performances across Kerala and India." />
      <meta name="twitter:image" content="https://images.unsplash.com/photo-1598000938546-d8b840f69952?w=1200&h=630&fit=crop" />
      <meta name="twitter:image:alt" content="Vaidehi Suresh Sopana Sangeetham Kerala temple music artist" />

      {/* Structured Data - Multiple Schemas */}
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
      
      <script type="application/ld+json">
        {JSON.stringify(businessSchema)}
      </script>
      
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>

      {/* Canonical */}
      <link rel="canonical" href="https://vaidehisopanasangeethaartist.netlify.app/" />

      {/* Geo Tags - Enhanced for Local SEO */}
      <meta name="geo.region" content="IN-KL" />
      <meta name="geo.placename" content="Thrissur, Kerala, India" />
      <meta name="geo.position" content="10.5276;76.2144" />
      <meta name="ICBM" content="10.5276, 76.2144" />
      
      {/* Additional SEO Tags */}
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      <meta name="revisit-after" content="7 days" />
    </Helmet>
  );
};

export default SEO;