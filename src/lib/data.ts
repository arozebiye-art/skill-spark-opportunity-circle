export type Role = "Student" | "Graduate" | "Job Seeker" | "Mentor" | "Employer";
export const ROLES: Role[] = ["Student", "Graduate", "Job Seeker", "Mentor", "Employer"];

export type Experience = { title: string; org: string; period: string; summary?: string };
export type Education = { school: string; qualification: string; period: string };

export type Person = {
  id: string;
  name: string;
  role: Role;
  headline: string;
  location: string;
  field: string;
  about: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  mentor?: { topics: string[]; years: number; availability: string };
};

export type OpportunityType = "Job" | "Internship" | "Attachment";
export const OPPORTUNITY_TYPES: OpportunityType[] = ["Job", "Internship", "Attachment"];
export type WorkMode = "On-site" | "Hybrid" | "Remote";
export const WORK_MODES: WorkMode[] = ["On-site", "Hybrid", "Remote"];

export type Opportunity = {
  id: string;
  title: string;
  company: string;
  type: OpportunityType;
  location: string;
  mode: WorkMode;
  field: string;
  pay: string;
  posted: string;
  deadline: string;
  summary: string;
  requirements: string[];
  skills: string[];
};

export const LOCATIONS = ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Nyeri"];

export const FIELDS = [
  "Technology",
  "Finance",
  "Healthcare",
  "Engineering",
  "Agriculture",
  "Marketing & Media",
  "Education",
  "Logistics",
];

export const opportunities: Opportunity[] = [
  {
    id: "junior-frontend-developer",
    title: "Junior Frontend Developer",
    company: "Nuru Software Labs",
    type: "Job",
    location: "Nairobi",
    mode: "Hybrid",
    field: "Technology",
    pay: "KSh 85,000 – 110,000 / month",
    posted: "2 days ago",
    deadline: "18 Dec 2026",
    summary:
      "Join a small product team building mobile-first tools for Kenyan SMEs. You'll ship features weekly alongside a senior engineer who reviews your work.",
    requirements: [
      "Degree or diploma in a computing field, or a strong portfolio",
      "One or more projects built with React or a similar framework",
      "Comfortable working in English and Kiswahili with clients",
    ],
    skills: ["React", "TypeScript", "CSS", "Git"],
  },
  {
    id: "graduate-trainee-credit",
    title: "Graduate Trainee – Credit Analysis",
    company: "Baraka Sacco",
    type: "Job",
    location: "Nakuru",
    mode: "On-site",
    field: "Finance",
    pay: "KSh 55,000 / month",
    posted: "4 days ago",
    deadline: "10 Dec 2026",
    summary:
      "A 12-month rotational programme across lending, member services and risk, with a permanent role offered to strong performers.",
    requirements: [
      "Bachelor's degree in finance, economics, statistics or related",
      "Graduated in 2025 or 2026",
      "CPA Part I is an added advantage",
    ],
    skills: ["Excel", "Financial analysis", "Communication"],
  },
  {
    id: "data-internship-agritech",
    title: "Data Analysis Intern",
    company: "Rift Valley Agritech",
    type: "Internship",
    location: "Eldoret",
    mode: "Hybrid",
    field: "Agriculture",
    pay: "KSh 25,000 / month stipend",
    posted: "1 day ago",
    deadline: "5 Dec 2026",
    summary:
      "Help our agronomy team turn farm survey data into simple reports that smallholder maize and dairy farmers can act on. Three months, extendable.",
    requirements: [
      "Final-year student or recent graduate",
      "Working knowledge of Excel plus Python or R",
      "Willing to travel to farms in Uasin Gishu twice a month",
    ],
    skills: ["Excel", "Python", "Data visualisation"],
  },
  {
    id: "electrical-attachment-solar",
    title: "Industrial Attachment – Electrical Engineering",
    company: "Kilele Solar",
    type: "Attachment",
    location: "Thika",
    mode: "On-site",
    field: "Engineering",
    pay: "KSh 10,000 / month + lunch",
    posted: "3 days ago",
    deadline: "12 Dec 2026",
    summary:
      "Twelve-week attachment for diploma and degree students. You'll shadow installation crews and assist with system sizing and commissioning tests.",
    requirements: [
      "Enrolled in an electrical or renewable energy course",
      "Introduction letter and insurance cover from your institution",
      "Available January to March 2027",
    ],
    skills: ["Circuit basics", "Safety procedures", "AutoCAD"],
  },
  {
    id: "nursing-attachment-kisumu",
    title: "Clinical Attachment – Nursing",
    company: "Lakeview County Hospital",
    type: "Attachment",
    location: "Kisumu",
    mode: "On-site",
    field: "Healthcare",
    pay: "Unpaid · meals provided",
    posted: "6 days ago",
    deadline: "20 Dec 2026",
    summary:
      "Supervised ward rotations in maternity, paediatrics and outpatient for KMTC and university nursing students.",
    requirements: [
      "Second year or above in a nursing programme",
      "Valid student indexing with the Nursing Council of Kenya",
      "Hepatitis B vaccination certificate",
    ],
    skills: ["Patient care", "Record keeping", "Teamwork"],
  },
  {
    id: "digital-marketing-intern",
    title: "Digital Marketing Intern",
    company: "Tausi Creative Studio",
    type: "Internship",
    location: "Nairobi",
    mode: "Remote",
    field: "Marketing & Media",
    pay: "KSh 20,000 / month stipend",
    posted: "Today",
    deadline: "8 Dec 2026",
    summary:
      "Plan and schedule social content for three local brands, write captions and report weekly on what worked.",
    requirements: [
      "Good written English and Kiswahili",
      "Your own laptop and a reliable internet connection",
      "A sample of content you have created, in any format",
    ],
    skills: ["Copywriting", "Canva", "Social media"],
  },
  {
    id: "operations-associate-mombasa",
    title: "Operations Associate",
    company: "Pwani Logistics",
    type: "Job",
    location: "Mombasa",
    mode: "On-site",
    field: "Logistics",
    pay: "KSh 60,000 – 75,000 / month",
    posted: "5 days ago",
    deadline: "15 Dec 2026",
    summary:
      "Coordinate container clearance and last-mile deliveries from our Changamwe depot, keeping customers updated at every step.",
    requirements: [
      "Diploma in supply chain, business or related",
      "One year of experience, internships included",
      "Confident with spreadsheets and phone-based customer updates",
    ],
    skills: ["Coordination", "Excel", "Customer service"],
  },
  {
    id: "mobile-developer-fintech",
    title: "Mobile Developer (Android)",
    company: "Savanna Fintech",
    type: "Job",
    location: "Nairobi",
    mode: "Remote",
    field: "Technology",
    pay: "KSh 140,000 – 180,000 / month",
    posted: "1 week ago",
    deadline: "22 Dec 2026",
    summary:
      "Build and maintain a savings app used by chamas across the country, with a focus on reliability on low-end devices.",
    requirements: [
      "Two or more years building Android apps with Kotlin",
      "Experience integrating mobile money payments",
      "A habit of writing tests",
    ],
    skills: ["Kotlin", "Android", "REST APIs", "M-Pesa integration"],
  },
  {
    id: "health-records-intern",
    title: "Health Records Intern",
    company: "Tana Health Systems",
    type: "Internship",
    location: "Nyeri",
    mode: "On-site",
    field: "Healthcare",
    pay: "KSh 18,000 / month stipend",
    posted: "3 days ago",
    deadline: "14 Dec 2026",
    summary:
      "Support the rollout of an electronic records system in two county clinics by training front-desk staff and cleaning patient data.",
    requirements: [
      "Diploma in health records or information technology",
      "Patient, clear communicator",
      "Available for six months from January 2027",
    ],
    skills: ["Data entry", "Training", "Attention to detail"],
  },
  {
    id: "site-engineer-attachment",
    title: "Attachment – Civil Engineering (Site)",
    company: "Jenga Build Group",
    type: "Attachment",
    location: "Nakuru",
    mode: "On-site",
    field: "Engineering",
    pay: "KSh 12,000 / month",
    posted: "2 days ago",
    deadline: "9 Dec 2026",
    summary:
      "Join the site team on a four-storey residential project. You'll assist with setting out, material testing and daily site reports.",
    requirements: [
      "Third-year civil engineering or building technology student",
      "Own safety boots and reflective vest",
      "Introduction letter from your institution",
    ],
    skills: ["Surveying", "AutoCAD", "Report writing"],
  },
  {
    id: "stem-tutor-part-time",
    title: "Part-time STEM Tutor",
    company: "Mwangaza Education Trust",
    type: "Job",
    location: "Kisumu",
    mode: "Hybrid",
    field: "Education",
    pay: "KSh 1,200 / hour",
    posted: "4 days ago",
    deadline: "30 Dec 2026",
    summary:
      "Run weekend maths and science clubs for secondary school learners in Kisumu East, with lesson plans provided.",
    requirements: [
      "Studying or graduated in a STEM or education field",
      "Enjoy working with teenagers",
      "Available on Saturdays",
    ],
    skills: ["Teaching", "Mathematics", "Patience"],
  },
  {
    id: "radio-production-intern",
    title: "Radio Production Intern",
    company: "Umoja Media House",
    type: "Internship",
    location: "Mombasa",
    mode: "On-site",
    field: "Marketing & Media",
    pay: "KSh 15,000 / month stipend",
    posted: "1 week ago",
    deadline: "11 Dec 2026",
    summary:
      "Assist producers on a daily Kiswahili breakfast show: research stories, book guests and edit short audio clips.",
    requirements: [
      "Student or graduate in journalism, communication or media",
      "Fluent Kiswahili",
      "Early riser — the show starts at 6am",
    ],
    skills: ["Research", "Audio editing", "Kiswahili"],
  },
];

export const people: Person[] = [
  {
    id: "wanjiru-kamau",
    name: "Wanjiru Kamau",
    role: "Mentor",
    headline: "Engineering Manager at Savanna Fintech",
    location: "Nairobi",
    field: "Technology",
    about:
      "I lead a team of nine engineers building savings products for chamas. I started as a self-taught developer in Thika and enjoy helping people get their first tech job.",
    skills: ["Engineering leadership", "Kotlin", "System design", "Interview coaching"],
    experience: [
      {
        title: "Engineering Manager",
        org: "Savanna Fintech",
        period: "2022 – Present",
        summary: "Grew the mobile team from three to nine and cut app crash rates by half.",
      },
      { title: "Senior Android Developer", org: "Nuru Software Labs", period: "2018 – 2022" },
    ],
    education: [
      { school: "JKUAT", qualification: "BSc Computer Science", period: "2012 – 2016" },
    ],
    mentor: {
      topics: ["Breaking into tech", "CV and portfolio review", "Mock interviews"],
      years: 10,
      availability: "2 sessions a month",
    },
  },
  {
    id: "otieno-odhiambo",
    name: "Otieno Odhiambo",
    role: "Mentor",
    headline: "Senior Credit Manager at Baraka Sacco",
    location: "Nakuru",
    field: "Finance",
    about:
      "Fifteen years in cooperative banking. I mentor graduates who want to build a career in finance outside Nairobi.",
    skills: ["Credit risk", "Financial analysis", "CPA", "Team leadership"],
    experience: [
      { title: "Senior Credit Manager", org: "Baraka Sacco", period: "2019 – Present" },
      { title: "Credit Officer", org: "Baraka Sacco", period: "2011 – 2019" },
    ],
    education: [
      { school: "Egerton University", qualification: "BCom Finance", period: "2006 – 2010" },
    ],
    mentor: {
      topics: ["Careers in banking", "CPA study planning", "First 90 days at work"],
      years: 15,
      availability: "1 session a month",
    },
  },
  {
    id: "amina-hassan",
    name: "Dr. Amina Hassan",
    role: "Mentor",
    headline: "Public Health Specialist, Tana Health Systems",
    location: "Mombasa",
    field: "Healthcare",
    about:
      "I design community health programmes along the coast and supervise interns every year. Happy to talk through career paths beyond clinical work.",
    skills: ["Public health", "Programme design", "Research methods", "Grant writing"],
    experience: [
      { title: "Public Health Specialist", org: "Tana Health Systems", period: "2020 – Present" },
      { title: "Medical Officer", org: "Lakeview County Hospital", period: "2014 – 2020" },
    ],
    education: [
      { school: "University of Nairobi", qualification: "MBChB", period: "2007 – 2013" },
      { school: "Moi University", qualification: "Master of Public Health", period: "2017 – 2019" },
    ],
    mentor: {
      topics: ["Health careers", "Research and scholarships", "Work-life balance"],
      years: 12,
      availability: "2 sessions a month",
    },
  },
  {
    id: "kiprono-cheruiyot",
    name: "Kiprono Cheruiyot",
    role: "Mentor",
    headline: "Founder, Rift Valley Agritech",
    location: "Eldoret",
    field: "Agriculture",
    about:
      "I run an agritech company serving 4,000 smallholder farmers. I mentor young people who want to start or join agribusinesses.",
    skills: ["Entrepreneurship", "Agronomy", "Fundraising", "Sales"],
    experience: [
      { title: "Founder & CEO", org: "Rift Valley Agritech", period: "2017 – Present" },
      { title: "Field Agronomist", org: "County Government of Uasin Gishu", period: "2012 – 2017" },
    ],
    education: [
      { school: "University of Eldoret", qualification: "BSc Agriculture", period: "2008 – 2012" },
    ],
    mentor: {
      topics: ["Starting a business", "Agribusiness careers", "Pitching to funders"],
      years: 14,
      availability: "1 session a month",
    },
  },
  {
    id: "njeri-mwangi",
    name: "Njeri Mwangi",
    role: "Mentor",
    headline: "Brand Strategist at Tausi Creative Studio",
    location: "Nairobi",
    field: "Marketing & Media",
    about:
      "I help Kenyan brands find their voice. I mentor creatives on building a portfolio and pricing freelance work.",
    skills: ["Brand strategy", "Copywriting", "Client management", "Freelancing"],
    experience: [
      { title: "Brand Strategist", org: "Tausi Creative Studio", period: "2021 – Present" },
      { title: "Copywriter", org: "Umoja Media House", period: "2017 – 2021" },
    ],
    education: [
      { school: "Daystar University", qualification: "BA Communication", period: "2013 – 2017" },
    ],
    mentor: {
      topics: ["Building a portfolio", "Freelance pricing", "Personal branding"],
      years: 9,
      availability: "3 sessions a month",
    },
  },
  {
    id: "brian-mutua",
    name: "Brian Mutua",
    role: "Graduate",
    headline: "Computer Science graduate · Aspiring frontend developer",
    location: "Nairobi",
    field: "Technology",
    about:
      "Recent Kenyatta University graduate. I built a fare-tracking web app for matatu saccos as my final-year project and I'm looking for my first developer role.",
    skills: ["React", "JavaScript", "TypeScript", "Figma", "Git"],
    experience: [
      {
        title: "Web Development Intern",
        org: "Nuru Software Labs",
        period: "May – Aug 2025",
        summary: "Rebuilt the company careers page and fixed accessibility issues.",
      },
    ],
    education: [
      { school: "Kenyatta University", qualification: "BSc Computer Science", period: "2022 – 2026" },
    ],
  },
  {
    id: "faith-achieng",
    name: "Faith Achieng",
    role: "Student",
    headline: "Nursing student at Maseno University · Seeking clinical attachment",
    location: "Kisumu",
    field: "Healthcare",
    about:
      "Third-year nursing student with a strong interest in maternal health. I volunteer with a community health group in Nyalenda on weekends.",
    skills: ["Patient care", "First aid", "Community outreach", "Dholuo, Kiswahili, English"],
    experience: [
      { title: "Community Health Volunteer", org: "Nyalenda Health Group", period: "2025 – Present" },
    ],
    education: [
      { school: "Maseno University", qualification: "BSc Nursing", period: "2024 – 2028" },
    ],
  },
  {
    id: "abdi-noor",
    name: "Abdi Noor",
    role: "Job Seeker",
    headline: "Supply chain officer with 3 years' experience",
    location: "Mombasa",
    field: "Logistics",
    about:
      "I've coordinated clearing and forwarding for importers at the port of Mombasa. Looking for an operations role with room to grow into management.",
    skills: ["Clearing & forwarding", "Inventory control", "Excel", "Negotiation"],
    experience: [
      { title: "Logistics Officer", org: "Pwani Logistics", period: "2023 – 2026" },
      { title: "Stores Clerk (Attachment)", org: "Kenya Ports Authority", period: "Jan – Apr 2022" },
    ],
    education: [
      {
        school: "Technical University of Mombasa",
        qualification: "Diploma in Supply Chain Management",
        period: "2020 – 2022",
      },
    ],
  },
  {
    id: "mercy-chebet",
    name: "Mercy Chebet",
    role: "Student",
    headline: "Electrical Engineering student at Moi University",
    location: "Eldoret",
    field: "Engineering",
    about:
      "Fourth-year student interested in solar mini-grids. I lead our campus renewable energy club and I'm looking for a January attachment.",
    skills: ["Circuit design", "AutoCAD", "MATLAB", "Public speaking"],
    experience: [
      { title: "Chairperson", org: "Moi University Renewable Energy Club", period: "2025 – Present" },
    ],
    education: [
      {
        school: "Moi University",
        qualification: "BEng Electrical & Electronics Engineering",
        period: "2023 – 2028",
      },
    ],
  },
  {
    id: "kevin-wafula",
    name: "Kevin Wafula",
    role: "Graduate",
    headline: "Economics graduate · Data and research",
    location: "Nakuru",
    field: "Finance",
    about:
      "I enjoy turning messy data into clear answers. My thesis looked at how table banking groups in Bungoma manage loan defaults.",
    skills: ["Excel", "Stata", "Python", "Report writing"],
    experience: [
      { title: "Research Assistant", org: "Egerton University", period: "Sep 2025 – Mar 2026" },
    ],
    education: [
      { school: "Egerton University", qualification: "BA Economics & Statistics", period: "2021 – 2025" },
    ],
  },
  {
    id: "grace-wambui",
    name: "Grace Wambui",
    role: "Employer",
    headline: "Talent Lead at Nuru Software Labs",
    location: "Nairobi",
    field: "Technology",
    about:
      "I hire developers, designers and interns for Nuru. We care more about what you've built than where you studied.",
    skills: ["Recruitment", "Onboarding", "Employer branding"],
    experience: [
      { title: "Talent Lead", org: "Nuru Software Labs", period: "2023 – Present" },
      { title: "HR Officer", org: "Savanna Fintech", period: "2019 – 2023" },
    ],
    education: [
      { school: "Strathmore University", qualification: "BCom Human Resource Management", period: "2014 – 2018" },
    ],
  },
  {
    id: "samuel-kariuki",
    name: "Samuel Kariuki",
    role: "Employer",
    headline: "Operations Director at Kilele Solar",
    location: "Thika",
    field: "Engineering",
    about:
      "We take on eight attachment students every term and hire many of them afterwards. Reach out if you're studying electrical or renewable energy.",
    skills: ["Operations", "Project management", "Technical training"],
    experience: [
      { title: "Operations Director", org: "Kilele Solar", period: "2020 – Present" },
      { title: "Project Engineer", org: "Jenga Build Group", period: "2013 – 2020" },
    ],
    education: [
      {
        school: "Technical University of Kenya",
        qualification: "BTech Electrical Engineering",
        period: "2008 – 2012",
      },
    ],
  },
];

export const mentors = people.filter((p) => p.mentor);

export function getPerson(id: string) {
  return people.find((p) => p.id === id);
}

export function getOpportunity(id: string) {
  return opportunities.find((o) => o.id === id);
}
