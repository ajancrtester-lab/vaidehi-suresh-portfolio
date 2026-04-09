"""
Centralized Portfolio Data
Edit this file to update ALL content on your website
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
        "whatsapp": "919446909402",
        "email": "vaidehisureshikm@gmail.com",
        "location": "Iranikkulam, Thrissur, Kerala"
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
# PORTFOLIO CONTENT (Bilingual)
# ============================================
PORTFOLIO_CONTENT = {
    "about": {
        "en": {
            "title": "The Journey",
            "subtitle": "A Life Devoted to Sacred Music",
            "quote": "Music is my prayer, the temple is my home, and devotion is my guide."
        },
        "ml": {
            "title": "യാത്ര",
            "subtitle": "പവിത്ര സംഗീതത്തിനായി സമർപ്പിച്ച ജീവിതം",
            "quote": "സംഗീതം എന്റെ പ്രാർത്ഥനയാണ്, ക്ഷേത്രം എന്റെ വീടാണ്, ഭക്തി എന്റെ വഴികാട്ടിയാണ്."
        }
    },
    "achievements": {
        "en": {
            "title": "Achievements & Recognition",
            "subtitle": "Honors in Preserving Traditional Temple Music"
        },
        "ml": {
            "title": "നേട്ടങ്ങളും അംഗീകാരവും",
            "subtitle": "പരമ്പരാഗത ക്ഷേത്ര സംഗീതം സംരക്ഷിക്കുന്നതിലെ ബഹുമതികൾ"
        }
    },
    "training": {
        "en": {
            "title": "Training & Lineage",
            "subtitle": "A Rich Heritage of Musical Education",
            "gurusTitle": "Gurus & Mentors"
        },
        "ml": {
            "title": "പരിശീലനവും വംശപരമ്പരയും",
            "subtitle": "സംഗീത വിദ്യാഭ്യാസത്തിന്റെ സമ്പന്നമായ പാരമ്പര്യം",
            "gurusTitle": "ഗുരുക്കന്മാരും മാർഗദർശകരും"
        }
    },
    "services": {
        "en": {
            "title": "Services",
            "subtitle": "Bringing Sacred Music to Your Events",
            "items": [
                {
                    "title": "Temple Performances",
                    "description": "Traditional Sopana Sangeetham performances for temple festivals and rituals",
                    "icon": "temple"
                },
                {
                    "title": "Cultural Events",
                    "description": "Authentic Kerala music performances for cultural programs and festivals",
                    "icon": "event"
                },
                {
                    "title": "Music Training",
                    "description": "Teaching traditional Sopana Sangeetham and devotional music to dedicated students",
                    "icon": "teach"
                },
                {
                    "title": "Wedding Ceremonies",
                    "description": "Sacred music performances for wedding ceremonies and family celebrations",
                    "icon": "wedding"
                }
            ]
        },
        "ml": {
            "title": "സേവനങ്ങൾ",
            "subtitle": "നിങ്ങളുടെ ചടങ്ങുകളിലേക്ക് പവിത്ര സംഗീതം എത്തിക്കുന്നു",
            "items": [
                {
                    "title": "ക്ഷേത്ര പരിപാടികൾ",
                    "description": "ക്ഷേത്ര ഉത്സവങ്ങൾക്കും ആചാരങ്ങൾക്കുമുള്ള പരമ്പരാഗത സോപാന സംഗീതം",
                    "icon": "temple"
                },
                {
                    "title": "സാംസ്കാരിക പരിപാടികൾ",
                    "description": "സാംസ്കാരിക പരിപാടികൾക്കും ഉത്സവങ്ങൾക്കുമുള്ള ആധികാരിക കേരള സംഗീതം",
                    "icon": "event"
                },
                {
                    "title": "സംഗീത പരിശീലനം",
                    "description": "സമർപ്പിത വിദ്യാർത്ഥികൾക്ക് പരമ്പരാഗത സോപാന സംഗീതവും ഭക്തിഗാനങ്ങളും പഠിപ്പിക്കൽ",
                    "icon": "teach"
                },
                {
                    "title": "വിവാഹ ചടങ്ങുകൾ",
                    "description": "വിവാഹ ചടങ്ങുകൾക്കും കുടുംബ ആഘോഷങ്ങൾക്കുമുള്ള പവിത്ര സംഗീതം",
                    "icon": "wedding"
                }
            ]
        }
    }
}
