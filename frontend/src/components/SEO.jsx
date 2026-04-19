import { Helmet } from 'react-helmet-async';

const SEO = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Vaidehi Suresh",
    "jobTitle": "Sopana Sangeetham Artist",
    "description": "Professional Sopana Sangeetham artist from Kerala with 13+ years experience performing in temples and cultural events.",
    "url": "https://vaidehisopanasangeethaartist.netlify.app/",
    "image": "https://images.unsplash.com/photo-1598000938546-d8b840f69952?w=800&h=1000&fit=crop",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Thrissur",
      "addressRegion": "Kerala",
      "addressCountry": "India"
    },
    "knowsAbout": [
      "Sopana Sangeetham",
      "Kerala Temple Music",
      "Carnatic Music",
      "Devotional Music",
      "Idakka",
      "Kathakali Music"
    ],
    "sameAs": [
      "https://www.instagram.com/iraneesam_vaidehi_suresh/",
      "https://www.youtube.com/@sureshnairiranikulam3072",
      "https://www.facebook.com/vaidehi.suresh"
    ]
  };

  return (
    <Helmet>
      {/* Google Search Console Verification */}
      <meta name="google-site-verification" content="92oTJzcupnwJTiRPtGexCcNFHPt02Y0e3Tj7iz7w3M0" />

      {/* Primary Meta Tags */}
      <title>Vaidehi Suresh | Sopana Sangeetham Artist Kerala | Temple Music Performer</title>

      <meta
        name="description"
        content="Vaidehi Suresh is a Sopana Sangeetham artist from Kerala with 13+ years of experience and performances in 750+ temples. Book authentic Kerala temple music for events, festivals, and ceremonies."
      />

      <meta
        name="keywords"
        content="Sopana Sangeetham artist Kerala, Vaidehi Suresh, temple music Kerala, Idakka artist Kerala, Kerala temple singer, Carnatic temple music, devotional singer Kerala"
      />

      <meta name="author" content="Vaidehi Suresh" />
      <meta name="robots" content="index, follow" />

      {/* Open Graph */}
      <meta property="og:type" content="profile" />
      <meta property="og:url" content="https://vaidehisopanasangeethaartist.netlify.app/" />
      <meta property="og:title" content="Vaidehi Suresh - Sopana Sangeetham Artist Kerala" />
      <meta property="og:description" content="Experienced Sopana Sangeetham artist performing across Kerala temples. 13+ years experience and 750+ temple performances." />
      <meta property="og:image" content="https://images.unsplash.com/photo-1598000938546-d8b840f69952?w=1200&h=630&fit=crop" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Vaidehi Suresh - Sopana Sangeetham Artist" />
      <meta name="twitter:description" content="Professional Kerala temple music performer specializing in Sopana Sangeetham." />
      <meta name="twitter:image" content="https://images.unsplash.com/photo-1598000938546-d8b840f69952?w=1200&h=630&fit=crop" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* Canonical */}
      <link rel="canonical" href="https://vaidehisopanasangeethaartist.netlify.app/" />

      {/* Geo Tags */}
      <meta name="geo.region" content="IN-KL" />
      <meta name="geo.placename" content="Thrissur, Kerala" />
    </Helmet>
  );
};

export default SEO;