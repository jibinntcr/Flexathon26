/**
 * FLEXATHON Official Site Configuration & Single Source of Truth
 * 
 * Centralizes all verified contacts, edition parameters, social links,
 * and organization details across the entire platform.
 */

export const SITE_CONFIG = {
    name: 'FLEXATHON',
    tagline: 'United by Sport. Driven by Global Goals.',
    subtitle: 'The Global Goals Run',
    description:
        'A nationwide running initiative by Flexon Sports Foundation connecting community fitness with the 17 United Nations Sustainable Development Goals.',
    domain: 'https://flexathonrun.org',
    canonicalBase: 'https://flexathonrun.org',

    // Verified Primary Contacts
    contacts: {
        helpline: '+91 90749 34014',
        helplineRaw: '+919074934014',
        secondaryPhone: '+91 94970 63919',
        secondaryPhoneRaw: '+919497063919',
        whatsappDisplay: '+91 90749 34014',
        whatsappLink: 'https://wa.me/919074934014',
        whatsappHelpdeskPrefill:
            'https://wa.me/919074934014?text=Hi%20FLEXATHON%20Team%2C%20I%20have%20an%20enquiry%20regarding%20FLEXATHON.',
        email: 'info@flexathonrun.org',
        emailMailto: 'mailto:info@flexathonrun.org',
        timingSupportMailto:
            'mailto:info@flexathonrun.org?subject=Certificate%20Correction%20Request',
    },

    // Verified Social Presence
    socials: {
        instagramHandle: '@flexathon_run',
        instagramUrl: 'https://www.instagram.com/flexathon_run',
    },

    // Governing Foundation
    organizer: {
        name: 'Flexon Sports Foundation',
        url: 'https://flexonsports.org/',
        tagline: 'Empowering communities through sport and wellness',
    },

    // Engineering & Maintenance Credit
    developer: {
        name: 'Infinio Technologies',
        url: 'https://infiniotechnologies.com',
    },

    // Confirmed Edition Records
    editions: {
        hyderabad: {
            slug: 'hydoct18',
            title: 'FLEXATHON 2026 Hyderabad',
            editionLabel: 'Edition 01 • Concluded',
            status: 'Completed',
            date: '18 October 2026',
            venue: 'Engineering Staff College of India (ESCI), Gachibowli, Hyderabad',
            sdgFocus: 'SDG 4: Quality Education',
            sdgNumber: 4,
            prizePool: '₹60,000 Equal Cash Prizes (1:1 Parity)',
            categories: [
                {
                    name: '10K Timed Challenge',
                    distance: '10K',
                    timed: true,
                    timingType: 'RFID Chip-Timed',
                    desc: 'Competitive distance with chip timing and podium prize eligibility.',
                },
                {
                    name: '5K Timed Run',
                    distance: '5K',
                    timed: true,
                    timingType: 'RFID Chip-Timed',
                    desc: 'Fitness challenge with official chip timing and podium prize eligibility.',
                },
                {
                    name: '3K Fun Run',
                    distance: '3K',
                    timed: false,
                    timingType: 'Non-Timed Community Walk & Run',
                    desc: 'Open celebration for beginners, students, and families.',
                },
            ],
        },
        kochi: {
            slug: 'kochi2027',
            title: 'FLEXATHON Kochi Edition',
            editionLabel: 'Edition 02 • Next Host City',
            status: 'Coming Soon',
            date: '2027 (Date TBA)',
            venue: 'Kochi, Kerala (Venue TBA)',
            sdgFocus: 'Global Goal: To Be Announced (TBA)',
            sdgNumber: null,
            categoriesNote: 'Course & Distances Subject to Certification (TBA)',
            actionLabel: 'Receive Kochi Updates',
        },
    },

    // Independent Initiative Notice
    unNotice:
        'FLEXATHON is an independent sporting and community-wellness initiative organised by Flexon Sports Foundation. References to the United Nations Sustainable Development Goals are for educational and awareness purposes only and do not imply endorsement, sponsorship, or formal partnership by the United Nations or its agencies.',
} as const;
