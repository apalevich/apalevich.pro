import type {PageCopyInterface} from "../interfaces/";

let agencyPageCopy: PageCopyInterface;
let marcomPageCopy: PageCopyInterface;
let emailPageCopy: PageCopyInterface;
let recruitmentPageCopy: PageCopyInterface;

agencyPageCopy = {
    hero: {
        h1: "Web development with results at the forefront",
        h2: "We are a web development agency that delivers clear and measurable projects where quality is more important than hours through our Front‑End expertise",
        buttons: [
            {
                text: "Let’s Talk",
                primary: true,
                url: null,
            },
            {
                text: "View Study Cases",
                primary: false,
                url: null,
            },
        ]
    },
    services: {
        title: "What we do",
        services: [
            {
                icon: "1",
                title: "Early-Stage Web Development",
                description: "Every decision made in the early stages impacts the future of your product — trust our experts to get it right from the start."
            },
            {
                icon: "2",
                title: "Supporting Creative Teams",
                description: "With extensive experience working alongside designers and marketers, we ensure the smooth integration of technical solutions into your campaigns and strategies."
            },
            {
                icon: "3",
                title: "Auditing and Consulting",
                description: "With experience in renowned international companies, we provide top-tier audits and actionable insights."
            },
        ],
    },
    staff: {
        title: "Our team is made up exclusively of senior professionals with up to 8 years of proven track record of success in their respective fields.",
        cards: [
            {
                icon: null,
                title: "Zarema Khalilova",
                description: "Front-end Lead Engineer with extensive expertise in Search Engine Optimization (SEO)",
            },
            {
                icon: null,
                title: "OLGA KOBCHENKO",
                description: "Agile Coach and Counsellor with expertise in optimizing teams workflow and productivity",
            },
            {
                icon: null,
                title: "DARIA PONOMAREVA",
                description: "Experienced UX Research Lead with a focus on product culture integration",
            },
            {
                icon: null,
                title: "EUGENE KHOMUTENKO",
                description: "Design manager with four years of experience leading cross-platform design teams at international fintech companies",
            },
        ]
    },
    flow: {
        title: "How It Works",
        steps: [
            {
                title: "Exploration",
                description: "We start with a few emails and a call. During the call, we dive deep into your business conditions, priorities, and specific project requirements.,"
            },
            {
                title: "Specialist Scouting",
                description: "We scout top-tier specialists with the relevant experience and skills for your project.,"
            },
            {
                title: "Defining the Project",
                description: "Together, we define the project scope, goals, stages, and expected outcomes. We determine the amount of effort required, necessary resources, specialist roles, and any access needed to your existing systems.,"
            },
            {
                title: "Proposal and Agreement",
                description: "With preliminary commitments from our specialists, we prepare a comprehensive commercial proposal for you. You review the proposal, and upon acceptance, we move forward.,"
            },
            {
                title: "Team Assembly and Kickoff",
                description: "A Project Manager is assigned as your primary point of contact and the liaison with the specialists.,"
            },
            {
                title: "Completion & Feedback",
                description: "We present the final results, meeting all predefined goals and criteria. Post-project, we exchange feedback to improve future collaborations and celebrate successes.,"
            },
        ]
    },
    proof: {
        title: "Testimonials",
        testimonials: [
            {
                quote: "Artem is an experienced developer. I was really happy to work with him!",
                title: "Kirill Zhirnov",
                role: "CEO",
                company: "Boundless Commerce",
                url: new URL("https://boundless-commerce.com"),
            },
            {
                quote: "Artem is an excellent team player, he quickly picked up on the new workflow, and showed excellent results in interacting with the team",
                title: "Ksenia Koteneva",
                role: "Talent Hunter",
                company: "Ogivly",
                url: null,
            },
            {
                quote: "Strong technical knowledge with a keen understanding of the business stakes. A true asset within a digital team!",
                title: "Youseff Oulamine",
                role: "Technical Team Leader",
                company: "La Redoute",
                url: null,
            },
            {
                quote: "he always knew perfectly well what was going on with the project and answered any of my questions accurately and in a timely manner",
                title: "Boris Nikitashov",
                role: "Frontend Developer",
                company: "La Redoute",
                url: null,
            },
        ]
    }
}

marcomPageCopy = {
    hero: {
        h1: "Web Development services for your marketing success",
        h2: "We manage the tech. You master the message.",
        buttons: [
            {
                text: "Discuss Your Project",
                primary: true,
                url: null,
            },
            {
                text: "View Study Cases",
                primary: false,
                url: null,
            },
        ]
    },
    services: {
        title: "Technical Solutions for Marketing Success",
        services: [
            {
                title: "Landing Page Development",
                description: "High-performance, conversion-optimized landing pages that load in under 2 seconds and seamlessly integrate with your marketing tools."
            },
            {
                title: "Marketing Automation Integration",
                description: "Custom development for HubSpot, Marketo, and other MA platforms integration. Full API support and advanced tracking implementation."
            },
            {
                title: "A/B Testing Infrastructure",
                description: "Technical implementation of split testing environments with real-time analytics and heatmaps for data-driven marketing decisions."
            },
            {
                title: "Marketing Analytics Setup",
                description: "Advanced tracking solutions, custom dashboard development, and integration with your existing analytics stack for full visibility."
            }
        ]
    },
    staff: {
        title: "I enjoy collaborating with intelligent, ambitious, and kind people. My network of top-tier specialists ready to collaborate:",
        // title: "With 8 years of experience supporting design and marketing departments, I have developed strong skills and built a solid network of top-tier specialists ready to collaborate:",
        cards: [
            {
                icon: null,
                title: "EUGENE KHOMUTENKO",
                description: "Design manager with four years of experience leading cross-platform design teams at international fintech companies",
            },
            {
                icon: null,
                title: "Dmitry Palewicz",
                description: "Email marketing specialist with extensive expertise in technical setup, including advanced email markup, domain optimization, and deliverability enhancement strategies.",
            },
        ]
    },
    flow: {
        title: "From Marketing Brief to Technical Solution",
        steps: [
            {
                title: "Marketing Requirements",
                description: "We analyze your marketing objectives and technical needs to propose the most effective solution",
            },
            {
                title: "Technical Specification",
                description: "Development of detailed technical documentation aligned with your marketing goals",
            },
            {
                title: "Rapid Development",
                description: "Fast-paced development process with regular marketing team involvement",
            },
            {
                title: "Launch & Optimization",
                description: "Performance testing, analytics setup, and continuous optimization for maximum marketing ROI",
            }
        ]
    },
    proof: {
        title: "Testimonials",
        testimonials: [
            {
                quote: "Artem is an experienced developer. I was really happy to work with him!",
                title: "Kirill Zhirnov",
                role: "CEO",
                company: "Boundless Commerce",
            },
            {
                quote: "Artem is an excellent team player, he quickly picked up on the new workflow, and showed excellent results in interacting with the team",
                title: "Ksenia Koteneva",
                role: "Talent Hunter",
                company: "Ogivly",
            },
            {
                quote: "Strong technical knowledge with a keen understanding of the business stakes. A true asset within a digital team!",
                title: "Youseff Oulamine",
                role: "Technical Team Leader",
                company: "La Redoute",
            },
            {
                quote: "Artem always knew perfectly well what was going on with the project and answered any of my questions accurately and in a timely manner",
                title: "Boris Nikitashov",
                role: "Frontend Developer",
                company: "La Redoute",
            },
        ]
    }
}

emailPageCopy = {
    hero: {
        h1: "Launch Your Email Campaign in 96 Hours",
        h2: "Professional email design, coding, and testing – everything you need to start getting results fast",
        buttons: [
            {
                text: "Start Your Campaign",
                url: null,
                primary: true
            },
            {
                text: "View Recent Work",
                url: null,
                primary: false
            }
        ]
    },
    services: {
        title: "Essential Email Campaign Services",
        services: [
            {
                title: "Responsive Email Design",
                description: "Eye-catching designs that look perfect across all email clients – from Gmail to Outlook, mobile to desktop. Optimized for maximum engagement."
            },
            {
                title: "Bulletproof HTML Coding",
                description: "Pixel-perfect email templates that render flawlessly across 40+ email clients and devices. Tested and verified for optimal delivery."
            },
            {
                title: "Cross-Platform Testing",
                description: "Comprehensive testing on real devices and email clients. Includes spam score analysis and deliverability optimization."
            },
            {
                title: "Performance Analysis",
                description: "Detailed post-campaign reports with open rates, click rates, and device analytics. Actionable insights for your next campaign."
            }
        ]
    },
    staff: {
        title: "With 8 years of experience supporting design and marketing departments, I have developed strong skills and built a solid network of top-tier specialists ready to collaborate:",
        cards: [
            {
                title: "Eugene Khomutenko",
                description: "Expert in creating conversion-focused email designs that maintain brand consistency"
            },
            {
                title: "Dmitry Palewicz",
                description: "Technical expert in email-specific HTML/CSS coding and troubleshooting"
            },
            {
                title: "QA Engineer",
                description: "Specialist in email testing and optimization across platforms"
            }
        ]
    },
    flow: {
        title: "From Concept to Inbox in 96 Hours",
        steps: [
            {
                title: "Brief & Design",
                description: "Quick brief review and design concept creation (Day 1)"
            },
            {
                title: "HTML Development",
                description: "Pixel-perfect coding of approved design (Day 2)"
            },
            {
                title: "Testing & Optimization",
                description: "Cross-platform testing and performance optimization (Day 3)"
            },
            {
                title: "Ready to Launch",
                description: "Final delivery with testing report and launch support (Day 4)"
            }
        ]
    },
    proof: {
        title: "Results That Speak",
        testimonials: [
            {
                quote: "Artem is an experienced developer. I was really happy to work with him!",
                title: "Kirill Zhirnov",
                role: "CEO",
                company: "Boundless Commerce"
            },
            {
                quote: "Artem is an excellent team player, he quickly picked up on the new workflow, and showed excellent results in interacting with the team",
                title: "Ksenia Koteneva",
                role: "Talent Hunter",
                company: "Ogivly"
            },
            {
                quote: "Strong technical knowledge with a keen understanding of the business stakes. A true asset within a digital team!",
                title: "Youseff Oulamine",
                role: "Technical Team Leader",
                company: "La Redoute"
            },
            {
                quote: "he always knew perfectly well what was going on with the project and answered any of my questions accurately and in a timely manner",
                title: "Boris Nikitashov",
                role: "Frontend Developer",
                company: "La Redoute"
            },
        ]
    }
};

recruitmentPageCopy = {
    hero: {
        h1: "Senior IT Specialists Ready to Code in 14 Days",
        h2: "Access cherry-picked developers, designers and PMs with more than 8 years of experience",
        buttons: [
            {
                text: "Start Technical Recruitment",
                url: null,
                primary: true
            },
            {
                text: "Review Assessment Process",
                url: null,
                primary: false
            }
        ]
    },
    services: {
        title: "Technical Recruitment Excellence",
        services: [
            {
                title: "Deep Technical Screening",
                description: "4-stage technical assessment including system design, live coding, architecture review, and real-world problem solving. Only top 3% pass our verification."
            },
            {
                title: "Tech Stack Matching",
                description: "Precise matching of tech stack experience, including specific versions, frameworks, and architectural patterns your team uses."
            },
            {
                title: "Code Quality Verification",
                description: "Review of candidates' real-world projects, contribution to open source, and coding style alignment with your team's standards."
            },
            {
                title: "Cultural Fit Assessment",
                description: "Psychological assesment to ensure seamless integration into your team and development process."
            }
        ]
    },
    staff: {
        title: "Some of our available top-tier specialists",
        cards: [
            {
                icon: null,
                title: "Zarema Khalilova",
                description: "Front-end Lead Engineer with extensive expertise in Search Engine Optimization (SEO)",
            },
            {
                icon: null,
                title: "OLGA KOBCHENKO",
                description: "Agile Coach and Counsellor with expertise in optimizing teams workflow and productivity",
            },
            {
                icon: null,
                title: "DARIA PONOMAREVA",
                description: "Experienced UX Research Lead with a focus on product culture integration",
            },
            {
                icon: null,
                title: "EUGENE KHOMUTENKO",
                description: "Design manager with four years of experience leading cross-platform design teams at international fintech companies",
            },
        ]
    },
    flow: {
        title: "Technical Recruitment Process",
        steps: [
            {
                title: "Technical Requirements",
                description: "Detailed analysis of your tech stack, architecture, and specific technical needs (Day 1)"
            },
            {
                title: "Technical Screening",
                description: "In-depth technical assessment of pre-vetted candidates including system design and code quality (Day 2-5)"
            },
            {
                title: "Technical Interview",
                description: "Your team evaluates top candidates through pair programming and architecture discussions (Day 6-10)"
            },
            {
                title: "Technical Onboarding",
                description: "Structured technical integration process with your development ecosystem (Day 11-14)"
            }
        ]
    },
};

export {
    agencyPageCopy,
    marcomPageCopy,
    emailPageCopy,
    recruitmentPageCopy,
}