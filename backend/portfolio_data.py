"""
⚠️ IMPORTANT: This file contains ALL website content
Edit this file to update ANY text, links, or media on your website
After editing, run: python sync_to_database.py
"""

# ============================================
# AUDIO TRACKS
# ============================================
AUDIO_TRACKS = [
    {
        "id": "audio-yt-1",
        "title": "Darikande Sirassukoithoru",
        "raga": "Sopana Sangeetham",
        "duration": "3:02",
        "temple": "Traditional Performance",
        "audioUrl": "https://www.youtube.com/watch?v=frziSqfnKvM",
        "order": 1,
        "isActive": True
    },
    {
        "id": "audio-yt-2",
        "title": "Prayer Song - Kaithapram",
        "raga": "Devotional",
        "duration": "4:43",
        "temple": "Kerala Temple",
        "audioUrl": "https://www.youtube.com/watch?v=rbrF9shd5cs",
        "order": 2,
        "isActive": True
    },
    {
        "id": "audio-yt-3",
        "title": "Thingalchoodapriye Sankari",
        "raga": "Anandha Bhairavi",
        "duration": "5:20",
        "temple": "Temple Festival",
        "audioUrl": "https://www.youtube.com/watch?v=NNwGau3r6ms",
        "order": 3,
        "isActive": True
    },
    {
        "id": "audio-yt-4",
        "title": "Astapathi - Rase Harimiha",
        "raga": "Sopana Sangeetham",
        "duration": "5:09",
        "temple": "Classical Performance",
        "audioUrl": "https://www.youtube.com/watch?v=TBHQh0U_YxU",
        "order": 4,
        "isActive": True
    },
    {
        "id": "audio-yt-5",
        "title": "Ariyathe Ariyathe",
        "raga": "Film song",
        "duration": "1:07",
        "temple": "Casual Performance",
        "audioUrl": "https://www.instagram.com/p/DSsHe9SESNu/",
        "order": 5,
        "isActive": True
    },

]

# ============================================
# VIDEO PERFORMANCES
# ============================================
VIDEO_PERFORMANCES = [
    {
        "id": "video-real-1",
        "title": "Darikande Sirassukoithoru - Sopana Sangeetham",
        "venue": "YouTube Performance",
        "date": "December 2024",
        "thumbnail": "https://i.ytimg.com/vi/frziSqfnKvM/hqdefault.jpg",
        "videoUrl": "https://www.youtube.com/embed/frziSqfnKvM",
        "order": 1,
        "isActive": True
    },
    {
        "id": "video-real-2",
        "title": "Prayer Song - Kaithapram",
        "venue": "Devotional Performance",
        "date": "November 2024",
        "thumbnail": "https://i.ytimg.com/vi/rbrF9shd5cs/hqdefault.jpg",
        "videoUrl": "https://www.youtube.com/embed/rbrF9shd5cs",
        "order": 2,
        "isActive": True
    },
    {
        "id": "video-real-3",
        "title": "Thingalchoodapriye Sankari - Anandha Bhairavi",
        "venue": "Temple Performance",
        "date": "October 2024",
        "thumbnail": "https://i.ytimg.com/vi/NNwGau3r6ms/hqdefault.jpg",
        "videoUrl": "https://www.youtube.com/embed/NNwGau3r6ms",
        "order": 3,
        "isActive": True
    },
    {
        "id": "video-real-4",
        "title": "Astapathi - Rase Harimiha",
        "venue": "Sopana Sangeetham",
        "date": "September 2024",
        "thumbnail": "https://i.ytimg.com/vi/TBHQh0U_YxU/hqdefault.jpg",
        "videoUrl": "https://www.youtube.com/embed/TBHQh0U_YxU",
        "order": 4,
        "isActive": True
    },
    {
        "id": "video-real-5",
        "title": "Sarasadhala Nayane - Surutti Ragam",
        "venue": "Classical Performance",
        "date": "August 2024",
        "thumbnail": "https://i.ytimg.com/vi/2bbQtFZqcn4/hqdefault.jpg",
        "videoUrl": "https://www.youtube.com/embed/2bbQtFZqcn4",
        "order": 5,
        "isActive": True
    },
    {
        "id": "video-real-6",
        "title": "Dasami Vannanju",
        "venue": "Festival Performance",
        "date": "July 2024",
        "thumbnail": "https://i.ytimg.com/vi/Egmkek6-jls/hqdefault.jpg",
        "videoUrl": "https://www.youtube.com/embed/Egmkek6-jls",
        "order": 6,
        "isActive": True
    },
]

# ============================================
# GALLERY ITEMS
# ============================================
GALLERY = [
    {
        "id": "gallery-real-1",
        "thumbnail": "https://i.ytimg.com/vi/Z78bMBSQh8Q/hqdefault.jpg",
        "linkType": "youtube",
        "externalLink": "https://www.youtube.com/shorts/Z78bMBSQh8Q",
        "title": "Astanagakkalam - Sopana Sangeetham",
        "caption": "Temple devotional performance"
    },
    {
        "id": "gallery-real-2",
        "thumbnail": "https://i.ytimg.com/vi/u-dfUfA1sLo/hqdefault.jpg",
        "linkType": "youtube",
        "externalLink": "https://www.youtube.com/shorts/u-dfUfA1sLo",
        "title": "Sindhooranuna Vighraham",
        "caption": "Classical raga performance"
    },
    {
        "id": "gallery-real-3",
        "thumbnail": "https://i.ytimg.com/vi/sbpNec3e17g/hqdefault.jpg",
        "linkType": "youtube",
        "externalLink": "https://www.youtube.com/shorts/sbpNec3e17g",
        "title": "Seetha Kalyanam Vaibhogame",
        "caption": "Devotional music"
    },
    {
        "id": "gallery-real-4",
        "thumbnail": "https://i.ytimg.com/vi/LMk4vgFOVLo/hqdefault.jpg",
        "linkType": "youtube",
        "externalLink": "https://www.youtube.com/shorts/LMk4vgFOVLo",
        "title": "Ormayil Ennennum",
        "caption": "Lyrics by Sathish Kalath"
    },
    {
        "id": "gallery-real-5",
        "thumbnail": "https://i.ytimg.com/vi/3ehLqsEruGU/hqdefault.jpg",
        "linkType": "youtube",
        "externalLink": "https://www.youtube.com/shorts/3ehLqsEruGU",
        "title": "Sopana Sangeetham at JTC Mala",
        "caption": "Live temple performance"
    },
    {
        "id": "gallery-real-6",
        "thumbnail": "https://i.ytimg.com/vi/JwbvZGRLyfI/hqdefault.jpg",
        "linkType": "youtube",
        "externalLink": "https://www.youtube.com/shorts/JwbvZGRLyfI",
        "title": "Aanakkomban - NK Desham",
        "caption": "Traditional temple music with Idakka"
    },
    {
        "id": "gallery-real-7",
        "thumbnail": "https://i.ytimg.com/vi/frziSqfnKvM/hqdefault.jpg",
        "linkType": "youtube",
        "externalLink": "https://www.youtube.com/watch?v=frziSqfnKvM",
        "title": "Darikande Sirassukoithoru",
        "caption": "Full performance video"
    },
    {
        "id": "gallery-real-8",
        "thumbnail": "https://i.ytimg.com/vi/rbrF9shd5cs/hqdefault.jpg",
        "linkType": "youtube",
        "externalLink": "https://www.youtube.com/watch?v=rbrF9shd5cs",
        "title": "Prayer Song - Kaithapram",
        "caption": "Devotional performance"
    },
    {
        "id": "gallery-real-9",
        "thumbnail": "https://i.ytimg.com/vi/NNwGau3r6ms/hqdefault.jpg",
        "linkType": "youtube",
        "externalLink": "https://www.youtube.com/watch?v=NNwGau3r6ms",
        "title": "Thingalchoodapriye Sankari",
        "caption": "Anandha Bhairavi raga"
    },
    {
        "id": "gallery-real-10",
        "thumbnail": "https://i.ytimg.com/vi/TBHQh0U_YxU/hqdefault.jpg",
        "linkType": "youtube",
        "externalLink": "https://www.youtube.com/watch?v=TBHQh0U_YxU",
        "title": "Astapathi - Rase Harimiha",
        "caption": "Classical Sopana Sangeetham"
    },
]

# ============================================
# SITE SETTINGS
# ============================================
SITE_SETTINGS = {
    "id": "main_settings",
    "hero": {
        "mainTitle": "Vaidehi Suresh",
        "subtitle": "Sopana Sangeetham Exponent",
        "tagline": "Preserving the Sacred Melodies of Kerala Temples",
        "description": "A dedicated practitioner of Sopana Sangeetham, carrying forward the ancient tradition of temple music with devotion and artistry."
    },
    "stats": {
        "yearsOfExperience": 13,
        "templesPerformed": 750,
        "studentsTrained": 100,
        "awardsReceived": 12
    },
    "backgroundMusic": {
        "enabled": False,
        "audioUrl": "",
        "duration": 30,
        "volume": 0.3,
        "title": "Sopana Sangeetham",
        "description": "Traditional temple music"
    },
    "socialMedia": {
        "instagram": "https://www.instagram.com/iraneesam_vaidehi_suresh/",
        "youtube": "https://www.youtube.com/@sureshnairiranikulam3072",
        "facebook": "https://www.facebook.com/vaidehi.suresh"
    },
    "contact": {
        "whatsapp": "919447435548",
        "email": "vaidehisureshikm@gmail.com",
        "location": "Iranikkulam,Mala,Thrissur, Kerala"
    },
    "seo": {
        "metaTitle": "Vaidehi Suresh - Sopana Sangeetham Artist | Kerala Temple Music",
        "metaDescription": "Renowned Sopana Sangeetham artist from Kerala. Book authentic temple music performances for festivals, cultural events, and devotional concerts.",
        "keywords": [
            "Sopana Sangeetham",
            "Kerala Temple Music",
            "Vaidehi Suresh",
            "Traditional Music",
            "Temple Performances"
        ]
    }
}

# ============================================
# BILINGUAL CONTENT (English & Malayalam)
# This is what appears on the website in different sections
# ============================================

BILINGUAL_CONTENT = {
    "en": {
        # Artist Info
        "name": "Vaidehi Suresh",
        "tagline": "Preserving the Sacred Melodies of Kerala Temples",
        "description": "A dedicated practitioner of Sopana Sangeetham with over 13 years of experience, deeply rooted in Kerala's sacred temple traditions. Having performed in nearly 750 temples, the artist continues to preserve and elevate this divine musical heritage with devotion and discipline.",
        "yearsOfExperience": 13,
        "templesPerformed": "750",
        
        # About Section
        "about": {
            "title": "The Journey",
            "subtitle": "A Life Devoted to Sacred Music",
            "quote": "Music is my prayer, the temple is my home, and devotion is my guide."
        },
        
        # Performance Info
        "performance": {
            "title": "Notable Performances",
            "description": "Performed at Guruvayur, Panachikkadu, Mookambika, Thiruvambady, Paramekkavu, Ettumanoor, Ambalappuzha and many more.",
            "national": "Performed in Mumbai, Delhi, Gujarat, Kanyakumari, Tiruchirappalli",
            "media": "Featured in Red Carpet & Shreshta Bharatham (Amrita TV)"
        },
        
        # Achievements
        "achievements": {
            "title": "Achievements & Recognition",
            "subtitle": "Honors in Preserving Traditional Temple Music",
            "items": [
                {
                    "year": "2023",
                    "title": "Sopana Sarangi Award",
                    "description": "Honored by Kollam Kuruveli Family Trust for outstanding contribution to preserving and promoting Sopana Sangeetham and traditional Kerala temple music."
                }
            ],
            "milestones": {
                "temples": "Temples Performed",
                "performances": "Performances",
                "years": "Years Experience",
                "ragas": "Ragas Mastered"
            }
        },
        
        # Training & Education
        "training": {
            "title": "Training & Lineage",
            "subtitle": "A Rich Heritage of Musical Education",
            "gurusTitle": "Gurus & Mentors",
            
            "education": [
                {
                    "title": "BA in Malayalam",
                    "institution": "University",
                    "description": "Bachelor's degree in Malayalam language and literature, providing deep understanding of Kerala's cultural heritage."
                },
                {
                    "title": "BEd (Bachelor of Education)",
                    "institution": "Education College",
                    "description": "Specialized training in education methodology and pedagogy."
                },
                {
                    "title": "Post Graduation in Malayalam (Pursuing)",
                    "institution": "University",
                    "description": "Currently pursuing advanced studies in Malayalam literature and culture."
                }
            ],
            
            "gurus": [
                {
                    "name": "Eloor Biju",
                    "title": "Sopana Sangeetham & Astapathi",
                    "description": "Trained under this renowned maestro in traditional temple music and the devotional compositions of Astapathi.",
                    "specialization": "Sopana Sangeetham & Devotional Music"
                },
                {
                    "name": "Annamanada Baburaj",
                    "title": "Carnatic Music",
                    "description": "Received comprehensive training in Carnatic vocal techniques and classical ragas.",
                    "specialization": "Carnatic Vocals & Classical Technique"
                },
                {
                    "name": "Reju Narayanan",
                    "title": "Carnatic Music",
                    "description": "Advanced training in Carnatic music, enriching the classical foundation.",
                    "specialization": "Advanced Carnatic Music"
                },
                {
                    "name": "Kuzhur Vijayan Marar",
                    "title": "Idakka",
                    "description": "Mastered the traditional Kerala temple percussion instrument under this expert.",
                    "specialization": "Temple Percussion - Idakka"
                },
                {
                    "name": "Kalanilayam Rajeevan",
                    "title": "Kathakali Sangeetham",
                    "description": "Trained in the unique musical tradition of Kathakali classical dance-drama.",
                    "specialization": "Kathakali Music & Performance"
                },
                {
                    "name": "Shri James",
                    "title": "Piano & Basic Carnatic",
                    "description": "Foundation training in piano and basic Carnatic music principles.",
                    "specialization": "Piano & Carnatic Basics"
                }
            ]
        },
        
        # Services
        "services": {
            "title": "Services Offered",
            "subtitle": "Bringing Sacred Temple Music to Every Occasion",
            "intro": "As a dedicated Sopana Sangeetham artist, I offer authentic Kerala temple music performances for various occasions. With 15+ years of experience, I bring the divine melodies of traditional ragas to temples, cultural events, and private ceremonies across Kerala.",
            "items": [
                {
                    "title": "Temple Ceremonies & Festivals",
                    "description": "Authentic Sopana Sangeetham performances for temple rituals, daily poojas, and major festivals. Specializing in traditional Kerala temple music that enhances the divine atmosphere of sacred ceremonies.",
                    "keywords": "Temple music, Kerala festivals, Sopana Sangeetham, Religious ceremonies"
                },
                {
                    "title": "Cultural Events & Concerts",
                    "description": "Classical music concerts for cultural organizations, sangeetha sabhas, and heritage events. Presenting the rich tradition of Kerala's temple music to wider audiences with authentic renditions of classical ragas.",
                    "keywords": "Classical concert, Cultural events, Kerala music, Traditional performance"
                },
                {
                    "title": "Private Performances",
                    "description": "Intimate devotional music sessions for private functions, family ceremonies, and special occasions. Bringing the sacred melodies of temple music to your home with personalized performances.",
                    "keywords": "Private concert, Home ceremony, Devotional music, Family event"
                },
                {
                    "title": "Music Workshops & Training",
                    "description": "Conducting workshops and training sessions on Sopana Sangeetham, teaching the traditional techniques, ragas, and spiritual aspects of Kerala temple music to aspiring musicians and devotees.",
                    "keywords": "Music training, Sopana Sangeetham lessons, Kerala music education, Classical training"
                },
                {
                    "title": "Annual Temple Performances",
                    "description": "Regular annual performances at major Kerala temples including Guruvayur, Thrissur Pooram, and other prestigious temple festivals. Maintaining the living tradition of temple music through consistent yearly engagements.",
                    "keywords": "Guruvayur performance, Thrissur Pooram, Kerala temple music, Annual temple events"
                },
                {
                    "title": "Special Occasion Music",
                    "description": "Devotional music for weddings, housewarming ceremonies, and auspicious occasions. Traditional Sopana Sangeetham renditions that invoke blessings and create a sacred atmosphere for important life events.",
                    "keywords": "Wedding music, Auspicious ceremony, Kerala wedding, Traditional blessing music"
                }
            ]
        }
    },
    
    "ml": {
        # Artist Info
        "name": "വൈദേഹി സുരേഷ്",
        "tagline": "കേരള ക്ഷേത്രങ്ങളുടെ പവിത്രമായ സംഗീതം സംരക്ഷിക്കുന്നു",
        "description": "കേരളത്തിലെ ക്ഷേത്ര സംഗീത പാരമ്പര്യത്തിൽ ആഴത്തിൽ വേരൂന്നിയ, 13 വർഷത്തിലേറെ അനുഭവമുള്ള സോപാന സംഗീത കലാകാരി. ഏകദേശം 750 ക്ഷേത്രങ്ങളിൽ അവതരണം നടത്തിയിട്ടുള്ള ഈ കലാകാരി, ഭക്തിയോടും അച്ചടക്കത്തോടും കൂടി ഈ ദിവ്യമായ സംഗീത പൈതൃകം സംരക്ഷിക്കുകയും ഉയർത്തുകയും ചെയ്യുന്നു.",
        "yearsOfExperience": 13,
        "templesPerformed": "750",
        
        # About Section
        "about": {
            "title": "യാത്ര",
            "subtitle": "പവിത്ര സംഗീതത്തിനായി സമർപ്പിച്ച ജീവിതം",
            "quote": "സംഗീതം എന്റെ പ്രാർത്ഥനയാണ്, ക്ഷേത്രം എന്റെ വീടാണ്, ഭക്തി എന്റെ വഴികാട്ടിയാണ്."
        },
        
        # Performance Info  
        "performance": {
            "title": "പ്രധാന അവതരണങ്ങൾ",
            "description": "ഗുരുവായൂർ, പനച്ചിക്കാട്, മൂകാംബിക, തിരുവമ്പാടി, പരമേക്കാവ്, ഏറ്റുമാനൂർ, അമ്പലപ്പുഴ എന്നിവിടങ്ങളിലും മറ്റ് നിരവധി ക്ഷേത്രങ്ങളിലും അവതരണം നടത്തി.",
            "national": "മുംബൈ, ഡൽഹി, ഗുജറാത്ത്, കന്യാകുമാരി, തിരുച്ചിറപ്പള്ളി എന്നിവിടങ്ങളിൽ അവതരണം നടത്തി",
            "media": "അമൃത ടിവിയിലെ റെഡ് കാർപെറ്റ്, ശ്രേഷ്ഠ ഭാരതം എന്നിവയിൽ പങ്കെടുത്തു"
        },
        
        # Achievements
        "achievements": {
            "title": "നേട്ടങ്ങളും അംഗീകാരങ്ങളും",
            "subtitle": "പരമ്പരാഗത ക്ഷേത്ര സംഗീതം സംരക്ഷിക്കുന്നതിനുള്ള ബഹുമതികൾ",
            "items": [
                {
                    "year": "2023",
                    "title": "സോപാന സാരംഗി അവാർഡ്",
                    "description": "സോപാന സംഗീതവും പരമ്പരാഗത കേരള ക്ഷേത്ര സംഗീതവും സംരക്ഷിക്കുന്നതിനും പ്രോത്സാഹിപ്പിക്കുന്നതിനുമുള്ള മികച്ച സംഭാവനയ്ക്ക് കൊല്ലം കുറുവേലി ഫാമിലി ട്രസ്റ്റ് നൽകിയ ബഹുമതി."
                }
            ],
            "milestones": {
                "temples": "ക്ഷേത്രങ്ങളിൽ അവതരണം",
                "performances": "അവതരണങ്ങൾ",
                "years": "വർഷത്തെ അനുഭവം",
                "ragas": "രാഗങ്ങൾ പഠിച്ചു"
            }
        },
        
        # Training & Education
        "training": {
            "title": "പരിശീലനവും പാരമ്പര്യവും",
            "subtitle": "സംഗീത വിദ്യാഭ്യാസത്തിന്റെ സമ്പന്നമായ പൈതൃകം",
            "gurusTitle": "ഗുരുക്കന്മാരും മാർഗദർശകരും",
            
            "education": [
                {
                    "title": "മലയാളത്തിൽ ബി.എ",
                    "institution": "സർവകലാശാല",
                    "description": "കേരളത്തിന്റെ സാംസ്കാരിക പൈതൃകത്തെക്കുറിച്ച് ആഴത്തിലുള്ള ധാരണ നൽകുന്ന മലയാള ഭാഷയിലും സാഹിത്യത്തിലും ബാച്ചിലർ ബിരുദം."
                },
                {
                    "title": "ബി.എഡ് (വിദ്യാഭ്യാസ ബിരുദം)",
                    "institution": "വിദ്യാഭ്യാസ കോളേജ്",
                    "description": "വിദ്യാഭ്യാസ രീതിശാസ്ത്രത്തിലും അധ്യാപനത്തിലും പ്രത്യേക പരിശീലനം."
                },
                {
                    "title": "മലയാളത്തിൽ പി.ജി (തുടരുന്നു)",
                    "institution": "സർവകലാശാല",
                    "description": "മലയാള സാഹിത്യത്തിലും സംസ്കാരത്തിലും നിലവിൽ ഉന്നത പഠനം തുടരുന്നു."
                }
            ],
            
            "gurus": [
                {
                    "name": "ഏലൂർ ബിജു",
                    "title": "സോപാന സംഗീതം & അഷ്ടപതി",
                    "description": "പരമ്പരാഗത ക്ഷേത്ര സംഗീതത്തിലും അഷ്ടപതിയുടെ ഭക്തിഗാനങ്ങളിലും ഈ പ്രശസ്ത ഗുരുവിന്റെ കീഴിൽ പരിശീലനം നേടി.",
                    "specialization": "സോപാന സംഗീതം & ഭക്തി സംഗീതം"
                },
                {
                    "name": "അന്നമനട ബാബുരാജ്",
                    "title": "കർണാടക സംഗീതം",
                    "description": "കർണാടക സ്വര സാങ്കേതികതകളിലും ശാസ്ത്രീയ രാഗങ്ങളിലും സമഗ്രമായ പരിശീലനം നേടി.",
                    "specialization": "കർണാടക സംഗീതം & ശാസ്ത്രീയ സാങ്കേതികത"
                },
                {
                    "name": "റെജു നാരായണൻ",
                    "title": "കർണാടക സംഗീതം",
                    "description": "കർണാടക സംഗീതത്തിൽ ഉന്നത പരിശീലനം, ശാസ്ത്രീയ അടിത്തറ സമ്പുഷ്ടമാക്കുന്നു.",
                    "specialization": "ഉന്നത കർണാടക സംഗീതം"
                },
                {
                    "name": "കുഴൂർ വിജയൻ മറാർ",
                    "title": "ഇടയ്ക്ക",
                    "description": "ഈ വിദഗ്ധന്റെ കീഴിൽ പരമ്പരാഗത കേരള ക്ഷേത്ര താള വാദ്യമായ ഇടയ്ക്കയിൽ പ്രാവീണ്യം നേടി.",
                    "specialization": "ക്ഷേത്ര താള വാദ്യം - ഇടയ്ക്ക"
                },
                {
                    "name": "കലാനിലയം രാജീവൻ",
                    "title": "കഥകളി സംഗീതം",
                    "description": "കഥകളി ശാസ്ത്രീയ നൃത്തനാടകത്തിന്റെ അതുല്യമായ സംഗീത പാരമ്പര്യത്തിൽ പരിശീലനം നേടി.",
                    "specialization": "കഥകളി സംഗീതം & അവതരണം"
                },
                {
                    "name": "ശ്രീ ജെയിംസ്",
                    "title": "പിയാനോ & അടിസ്ഥാന കർണാടകം",
                    "description": "പിയാനോയിലും അടിസ്ഥാന കർണാടക സംഗീത തത്ത്വങ്ങളിലും അടിസ്ഥാന പരിശീലനം.",
                    "specialization": "പിയാനോ & കർണാടക അടിസ്ഥാനങ്ങൾ"
                }
            ]
        },
        
        # Services
        "services": {
            "title": "നൽകുന്ന സേവനങ്ങൾ",
            "subtitle": "എല്ലാ അവസരങ്ങളിലേക്കും പവിത്രമായ ക്ഷേത്ര സംഗീതം എത്തിക്കുന്നു",
            "intro": "സമർപ്പിത സോപാന സംഗീത കലാകാരി എന്ന നിലയിൽ, വിവിധ അവസരങ്ങളിൽ ആധികാരിക കേരള ക്ഷേത്ര സംഗീത അവതരണങ്ങൾ ഞാൻ നൽകുന്നു. 15+ വർഷത്തെ അനുഭവത്തോടെ, കേരളത്തിലുടനീളമുള്ള ക്ഷേത്രങ്ങളിലേക്കും സാംസ്കാരിക പരിപാടികളിലേക്കും സ്വകാര്യ ചടങ്ങുകളിലേക്കും പരമ്പരാഗത രാഗങ്ങളുടെ ദിവ്യമായ സ്വരങ്ങൾ ഞാൻ കൊണ്ടുവരുന്നു.",
            "items": [
                {
                    "title": "ക്ഷേത്ര ചടങ്ങുകളും ഉത്സവങ്ങളും",
                    "description": "ക്ഷേത്ര ആചാരങ്ങൾ, ദിവസേന പൂജകൾ, പ്രധാന ഉത്സവങ്ങൾ എന്നിവയ്ക്കായി ആധികാരിക സോപാന സംഗീത അവതരണങ്ങൾ. പവിത്രമായ ചടങ്ങുകളുടെ ദിവ്യ അന്തരീക്ഷം വർദ്ധിപ്പിക്കുന്ന പരമ്പരാഗത കേരള ക്ഷേത്ര സംഗീതത്തിൽ വൈദഗ്ധ്യം.",
                    "keywords": "ക്ഷേത്ര സംഗീതം, കേരള ഉത്സവങ്ങൾ, സോപാന സംഗീതം, മത ചടങ്ങുകൾ"
                },
                {
                    "title": "സാംസ്കാരിക പരിപാടികളും സംഗീതോത്സവങ്ങളും",
                    "description": "സാംസ്കാരിക സംഘടനകൾ, സംഗീത സഭകൾ, പൈതൃക പരിപാടികൾ എന്നിവയ്ക്കായുള്ള ശാസ്ത്രീയ സംഗീത കച്ചേരികൾ. ശാസ്ത്രീയ രാഗങ്ങളുടെ ആധികാരിക അവതരണങ്ങളോടെ കേരളത്തിന്റെ ക്ഷേത്ര സംഗീതത്തിന്റെ സമ്പന്നമായ പാരമ്പര്യം വിശാലമായ പ്രേക്ഷകർക്ക് അവതരിപ്പിക്കുന്നു.",
                    "keywords": "ശാസ്ത്രീയ കച്ചേരി, സാംസ്കാരിക പരിപാടികൾ, കേരള സംഗീതം, പരമ്പരാഗത അവതരണം"
                },
                {
                    "title": "സ്വകാര്യ അവതരണങ്ങൾ",
                    "description": "സ്വകാര്യ പരിപാടികൾ, കുടുംബ ചടങ്ങുകൾ, പ്രത്യേക അവസരങ്ങൾ എന്നിവയ്ക്കായി അടുപ്പമുള്ള ഭക്തി സംഗീത സെഷനുകൾ. വ്യക്തിഗത അവതരണങ്ങളോടെ നിങ്ങളുടെ വീട്ടിലേക്ക് ക്ഷേത്ര സംഗീതത്തിന്റെ പവിത്രമായ സ്വരങ്ങൾ കൊണ്ടുവരുന്നു.",
                    "keywords": "സ്വകാര്യ കച്ചേരി, ഗൃഹ ചടങ്ങ്, ഭക്തി സംഗീതം, കുടുംബ പരിപാടി"
                },
                {
                    "title": "സംഗീത ശില്പശാലകളും പരിശീലനവും",
                    "description": "സോപാന സംഗീതത്തെക്കുറിച്ചുള്ള ശില്പശാലകളും പരിശീലന സെഷനുകളും നടത്തുന്നു, അഭിലാഷികളായ സംഗീതജ്ഞർക്കും ഭക്തർക്കും കേരള ക്ഷേത്ര സംഗീതത്തിന്റെ പരമ്പരാഗത സാങ്കേതികതകളും രാഗങ്ങളും ആത്മീയ വശങ്ങളും പഠിപ്പിക്കുന്നു.",
                    "keywords": "സംഗീത പരിശീലനം, സോപാന സംഗീത പാഠങ്ങൾ, കേരള സംഗീത വിദ്യാഭ്യാസം, ശാസ്ത്രീയ പരിശീലനം"
                },
                {
                    "title": "വാർഷിക ക്ഷേത്ര അവതരണങ്ങൾ",
                    "description": "ഗുരുവായൂർ, തൃശൂർ പൂരം എന്നിവ ഉൾപ്പെടെയുള്ള പ്രധാന കേരള ക്ഷേത്രങ്ങളിൽ പതിവ് വാർഷിക അവതരണങ്ങൾ. സ്ഥിരമായ വാർഷിക ഇടപെടലുകളിലൂടെ ക്ഷേത്ര സംഗീതത്തിന്റെ ജീവനുള്ള പാരമ്പര്യം നിലനിർത്തുന്നു.",
                    "keywords": "ഗുരുവായൂർ അവതരണം, തൃശൂർ പൂരം, കേരള ക്ഷേത്ര സംഗീതം, വാർഷിക ക്ഷേത്ര പരിപാടികൾ"
                },
                {
                    "title": "പ്രത്യേക അവസര സംഗീതം",
                    "description": "വിവാഹങ്ങൾ, ഗൃഹപ്രവേശ ചടങ്ങുകൾ, ശുഭകരമായ അവസരങ്ങൾ എന്നിവയ്ക്കായി ഭക്തി സംഗീതം. പ്രധാന ജീവിത സംഭവങ്ങൾക്ക് അനുഗ്രഹങ്ങൾ വിളിച്ചുവരുത്തുകയും പവിത്രമായ അന്തരീക്ഷം സൃഷ്ടിക്കുകയും ചെയ്യുന്ന പരമ്പരാഗത സോപാന സംഗീത അവതരണങ്ങൾ.",
                    "keywords": "വിവാഹ സംഗീതം, ശുഭകരമായ ചടങ്ങ്, കേരള വിവാഹം, പരമ്പരാഗത അനുഗ്രഹ സംഗീതം"
                }
            ]
        }
    }
}
