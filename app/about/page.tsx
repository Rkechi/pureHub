"use client";
import { 
  Shield, 
  Target, 
  Heart, 
  Zap,
  Users,
  TrendingUp,
  Award,
  Globe,
  Lightbulb,
  Rocket,
  CheckCircle,
  Mail,
  MapPin,
  Phone
} from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: "Trust & Transparency",
      description: "We believe in complete transparency. Every data point is verifiable, every record is permanent, and every client deserves proof."
    },
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "We're not just using technology—we're pioneering it. From IoT to blockchain, we bring tomorrow's solutions today."
    },
    {
      icon: Heart,
      title: "Client Success",
      description: "Your success is our mission. We don't just provide software; we partner with you to transform your operations."
    },
    {
      icon: Globe,
      title: "Sustainability",
      description: "ESG isn't just compliance—it's our commitment. We help you prove your environmental and social responsibility."
    }
  ];

  const team = [
    {
      name: "Operations Team",
      role: "Installation & Support",
      icon: "👥",
      description: "Expert technicians ensuring smooth deployment and 24/7 support"
    },
    {
      name: "Engineering Team",
      role: "Product Development",
      icon: "⚙️",
      description: "Building cutting-edge solutions with IoT, AI, and blockchain"
    },
    {
      name: "Data Science Team",
      role: "AI & Analytics",
      icon: "📊",
      description: "Creating intelligent algorithms that optimize your operations"
    },
    {
      name: "Success Team",
      role: "Customer Success",
      icon: "🎯",
      description: "Dedicated partners helping you achieve maximum ROI"
    }
  ];

  const milestones = [
    { year: "2024", title: "PureHive Founded", description: "Started with a vision to revolutionize commercial cleaning" },
    { year: "2024 Q2", title: "First Pilot Program", description: "Successful deployment with leading cleaning companies" },
    { year: "2024 Q3", title: "Blockchain Integration", description: "Launched tamper-proof verification system" },
    { year: "2024 Q4", title: "AI Engine Launch", description: "Released intelligent optimization algorithms" },
    { year: "2025", title: "Global Expansion", description: "Scaling to serve clients worldwide" }
  ];

  const stats = [
    { value: "10,000+", label: "Cleaning Sessions Verified" },
    { value: "50+", label: "Facilities Monitored" },
    { value: "99.9%", label: "System Uptime" },
    { value: "40%", label: "Average Cost Reduction" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                PureHive
              </span>
            </div>
            <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              ← Back to Home
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
                <Rocket className="w-4 h-4" />
                Our Story
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Transforming Cleaning Into
                <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Verifiable Science
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                PureHive was born from a simple observation: commercial cleaning companies do excellent work, but they can't prove it. Clients demand transparency, tenders require compliance, and trust is earned through evidence—not promises.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We brought together experts in IoT, AI, and blockchain to create a platform that turns invisible work into verifiable proof. Today, PureHive helps cleaning companies win more contracts, reduce costs, and build unshakeable client trust.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-8 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">Our Mission</p>
                      <p className="text-gray-600">Make excellence visible</p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Empower cleaning companies with technology that proves their value, optimizes their operations, and helps them win in a competitive market.
                  </p>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-purple-400 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-cyan-400 rounded-full opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Problem */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 border-l-4 border-red-500">
              <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">The Problem We Solve</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Cleaning companies can't prove they did the work</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Clients can't verify cleaning quality or frequency</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Manual logging leads to errors and fraud</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>ESG compliance reporting is time-consuming</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Resources are wasted due to poor optimization</span>
                </li>
              </ul>
            </div>

            {/* Solution */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border-l-4 border-green-500">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">How PureHive Helps</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>IoT sensors automatically capture proof of work</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Real-time data shows exactly what was cleaned and when</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Blockchain creates tamper-proof, verifiable records</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>One-click ESG reports for tenders and audits</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>AI optimizes routes and reduces waste by 40%</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Teams
            </h2>
            <p className="text-xl text-gray-600">
              Experts working together to deliver excellence
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8">
            {/* Founder Profile Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-center border-2 border-blue-200">
              <div className="flex flex-col items-center mb-4">
                <span className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 text-white text-4xl font-bold shadow-lg mb-2">
                  S
                </span>
                <span className="text-lg font-bold text-gray-900">Samuel Oluwaseun Adekanbi</span>
                <span className="text-blue-600 font-semibold">Founder & CEO, PureHive Ltd</span>
              </div>
              <div className="text-left text-gray-700 text-sm space-y-3">
                <p><span className="font-semibold">Industry Insight:</span> Samuel worked within the NHS cleaning operations team, experiencing first-hand the compliance and documentation challenges that cleaning SMEs face. This insider perspective gives him deep understanding of operational inefficiencies and ESG reporting gaps.</p>
                <p><span className="font-semibold">Academic & Analytical Expertise:</span> MSc in International Business with Data Analytics (Ulster University), BSc in Economics (University of Lagos). Samuel applies data-driven approaches to sustainability, IoT integration, and ESG compliance.</p>
                <p><span className="font-semibold">Entrepreneurial Network & Access:</span> Active in the diaspora business community, Samuel has direct access to SME cleaning enterprises—ideal first adopters of PureHive. This trusted network reduces early customer acquisition barriers.</p>
                <p><span className="font-semibold">Commitment & Leadership:</span> Fully committed as a full-time founder, Samuel has secured early traction including pilot SMEs, endorsement interest from NACC UK, and an Innovate UK grant application.</p>
                <p><span className="font-semibold">Strategic Growth Mindset:</span> Samuel is building a well-rounded founding team, with plans to recruit a CTO in Year 1 and an ESG consultant in Year 3, demonstrating foresight in scaling a technology-led business.</p>
              </div>
            </div>
            {/* Other Team Cards */}
            {team.map((member, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-center">
                <div className="text-6xl mb-4">{member.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                <p className="text-sm text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operational Plan */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Operational Plan
            </h2>
            <p className="text-xl text-gray-600">
              A strategic roadmap to transform the commercial cleaning sector
            </p>
          </div>

          {/* Year 1 */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 mb-8 border-l-4 border-blue-600">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">1</div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Year 1: MVP Launch & Validation</h3>
                <p className="text-gray-600">Foundation Phase</p>
              </div>
            </div>
            <p className="text-gray-700 font-semibold mb-4">Goal: Build credibility, secure first paying customers, and refine product.</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Product Development</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Launch MVP (IoT + ESG dashboard)</li>
                  <li>• Blockchain and AI features integrated and adopted</li>
                  <li>• File initial IP (dashboard design & data schema)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Customer Acquisition</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Onboard 20–30 pilot SMEs</li>
                  <li>• Offer discounted pilots for case studies</li>
                  <li>• Gather feedback to refine pricing tiers</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Operations</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Incorporate PureHive Ltd</li>
                  <li>• Founder full-time commitment</li>
                  <li>• Recruit CTO (technical co-founder or senior engineer)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Partnerships</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Secure IoT supplier MoUs (Tork, uHoo)</li>
                  <li>• Build trade association links (NACC, Nigerian-British Chamber)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Year 2 */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 mb-8 border-l-4 border-purple-600">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">2</div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Year 2: Market Expansion & Institutional Entry</h3>
                <p className="text-gray-600">Growth Phase</p>
              </div>
            </div>
            <p className="text-gray-700 font-semibold mb-4">Goal: Move beyond pilots into repeatable SME sales and first council/NHS entry.</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Product Development</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Launch blockchain audit trail</li>
                  <li>• Add automated ESG reports aligned with NHS & council templates</li>
                  <li>• Enhance dashboard UX</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Customer Acquisition</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Target 120 SMEs through trade associations</li>
                  <li>• Secure first council contract (pilot-level)</li>
                  <li>• Build SME referral scheme with discounts</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Operations</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Hire Sales Lead (B2B SaaS experience)</li>
                  <li>• Hire Customer Success Manager</li>
                  <li>• Establish Birmingham HQ + London satellite office</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Partnerships</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Apply for Innovate UK/Smart Grant</li>
                  <li>• Pursue NHS supplier framework approval</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Year 3 */}
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-8 mb-8 border-l-4 border-green-600">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">3</div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Year 3: Scale-Up & Procurement Integration</h3>
                <p className="text-gray-600">Acceleration Phase</p>
              </div>
            </div>
            <p className="text-gray-700 font-semibold mb-4">Goal: Transition from SME-heavy revenue to mixed SME + council contracts.</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Product Development</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Deploy AI route optimisation</li>
                  <li>• Introduce bulk council reporting dashboards</li>
                  <li>• Strengthen IP portfolio (data benchmarking, ESG scoring)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Customer Acquisition</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Grow to 300 SMEs + 2 council contracts</li>
                  <li>• Develop tiered licensing for local councils</li>
                  <li>• Explore EU pilot expansion (Ireland/Netherlands)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Operations</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Hire ESG Consultant (in-house compliance expertise)</li>
                  <li>• Expand sales and support teams</li>
                  <li>• Standardise onboarding to reduce CAC</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Partnerships</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Collaborate with FM software firms (API integrations)</li>
                  <li>• Engage sustainability certification bodies (BREEAM, ISO 14001)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Years 4-5 */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 border-l-4 border-orange-600">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg">4-5</div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Years 4–5: National & International Scale</h3>
                <p className="text-gray-600">Market Leadership Phase</p>
              </div>
            </div>
            <p className="text-gray-700 font-semibold mb-4">Goal: Become a recognised ESG compliance verification engine in the UK cleaning sector, with EU growth entry.</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2"><span className="text-orange-600 font-bold">→</span> National rollout across 1,000+ SMEs</li>
                  <li className="flex items-start gap-2"><span className="text-orange-600 font-bold">→</span> 5–10 council contracts secured</li>
                  <li className="flex items-start gap-2"><span className="text-orange-600 font-bold">→</span> Explore expansion into broader facilities management (FM SaaS + ESG compliance)</li>
                  <li className="flex items-start gap-2"><span className="text-orange-600 font-bold">→</span> EU pilot programmes launched</li>
                  <li className="flex items-start gap-2"><span className="text-orange-600 font-bold">→</span> <span className="font-bold">Revenues exceeding £3M, net profit margins 40–45%</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-12 text-white shadow-2xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
              <p className="text-xl text-blue-100">
                Let's discuss how PureHive can transform your operations
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <Mail className="w-8 h-8 mx-auto mb-3" />
                <p className="font-semibold mb-1">Email</p>
                <a href="mailto:hello@purehive.com" className="text-blue-100 hover:text-white transition-colors">
                  admin@purehiveesg.com
                </a>
              </div>
              <div>
                <Phone className="w-8 h-8 mx-auto mb-3" />
                <p className="font-semibold mb-1">Phone</p>
                <a href="tel:+234XXXXXXXXXX" className="text-blue-100 hover:text-white transition-colors">
                  +44 XXX XXX XXXX
                </a>
              </div>
              <div>
                <MapPin className="w-8 h-8 mx-auto mb-3" />
                <p className="font-semibold mb-1">Location</p>
                <p className="text-blue-100">Birmingham, West Midlands</p>
              </div>
            </div>
            <div className="mt-12 text-center">
              <a 
                href="/register"
                className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-xl transition-all"
              >
                Start Your Free Trial
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}