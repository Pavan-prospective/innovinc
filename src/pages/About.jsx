import React from 'react'
import { 
  Globe, 
  Microscope, 
  BookOpen, 
  Scale, 
  Search, 
  Handshake, 
  ShieldCheck, 
  Rocket, 
  Eye, 
  Target, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function About() {
  const stats = [
    { label: "Active Journals", value: "19" },
    { label: "Research Articles", value: "64" },
    { label: "Peer Reviewers", value: "5,000+" },
    { label: "Global Reach", value: "120+ Countries" },
  ]

  const articleTypes = [
    "Original Research Articles",
    "Review Articles",
    "Systematic Reviews",
    "Meta-Analyses",
    "Short Communications",
    "Case Reports and Case Studies",
    "Perspectives",
    "Methods and Protocols",
    "Editorials and Commentaries",
    "Letters to the Editor",
    "Emerging and interdisciplinary research"
  ]

  const benefits = [
    {
      title: "Global Scientific Platform",
      desc: "Connect your research with an international community of researchers, academics, clinicians, and professionals.",
      icon: Globe,
      color: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      title: "Multidisciplinary Research",
      desc: "Our journal portfolio covers diverse scientific and professional disciplines, creating opportunities for interdisciplinary knowledge exchange.",
      icon: Microscope,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      title: "Wide Range of Article Types",
      desc: "Researchers can contribute original research, reviews, systematic reviews, case studies, perspectives, and other scholarly work according to each journal's scope.",
      icon: BookOpen,
      color: "bg-purple-50 text-purple-600 border-purple-100",
    },
    {
      title: "Rigorous Peer Review",
      desc: "Manuscripts are evaluated through an appropriate editorial and peer-review process designed to support scientific quality and integrity.",
      icon: Scale,
      color: "bg-amber-50 text-amber-600 border-amber-100",
    },
    {
      title: "Research Visibility",
      desc: "We aim to make published research discoverable and accessible to researchers, institutions, and the wider scientific community.",
      icon: Search,
      color: "bg-sky-50 text-sky-600 border-sky-100",
    },
    {
      title: "Author Support",
      desc: "Our editorial and publishing teams aim to provide clear communication and support throughout the submission, review, revision, and publication process.",
      icon: Handshake,
      color: "bg-indigo-50 text-indigo-600 border-indigo-100",
    },
    {
      title: "Ethical Publishing",
      desc: "We are committed to responsible scholarly publishing, transparency, research integrity, and appropriate editorial practices.",
      icon: ShieldCheck,
      color: "bg-teal-50 text-teal-600 border-teal-100",
    },
    {
      title: "Emerging Research",
      desc: "We welcome innovative and interdisciplinary research addressing emerging scientific challenges and opportunities.",
      icon: Rocket,
      color: "bg-rose-50 text-rose-600 border-rose-100",
    },
  ]

  return (
    <div className="flex flex-col bg-white">
      
      {/* Header / Hero */}
      <section className="bg-navy-950 text-white pt-24 pb-20 md:pt-32 md:pb-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=2500" 
            className="w-full h-full object-cover opacity-35" 
            alt="Scientra Journals Library" 
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-navy-950 via-navy-950/95 to-navy-900/80"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent"></div>
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-500/20 text-primary-400 border border-primary-500/35 mb-6 uppercase tracking-wider">
            International Scholarly Platform
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            About Scientra Journals
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Advancing scientific knowledge, promoting global research communication, and supporting researchers in disseminating meaningful discoveries.
          </p>
        </div>
      </section>

      {/* Stats Ribbon */}
      <section className="bg-navy-950 text-white py-12 relative overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.08),transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-white/10">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center px-4">
                <div className="text-3xl md:text-4xl font-extrabold mb-1.5 bg-gradient-to-r from-sky-400 to-indigo-200 bg-clip-text text-transparent">{stat.value}</div>
                <div className="text-[11px] text-gray-400 uppercase tracking-widest font-bold mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us & Overview Section */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 space-y-6 text-gray-700 leading-relaxed text-lg">
            <div className="inline-block text-sm font-extrabold text-primary-600 uppercase tracking-wider mb-2">Our Mission & Identity</div>
            <h2 className="text-3xl font-extrabold text-navy-950 leading-tight">
              An International Platform for Scholarly Publishing
            </h2>
            <p>
              Scientra Journals is an international scholarly publishing platform dedicated to advancing scientific knowledge and promoting global research communication. We provide researchers, academics, clinicians, and professionals with a platform to share high-quality research across diverse scientific and interdisciplinary fields.
            </p>
            <p>
              We are committed to research integrity, responsible publishing, editorial quality, transparency, and global knowledge exchange. Through our growing portfolio of journals, Scientra aims to support researchers in disseminating meaningful discoveries and contributing to scientific progress.
            </p>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800&h=550" 
                alt="Medical Researcher at work" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-navy-950/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur text-navy-950 p-5 rounded-xl shadow-lg border border-white/20">
                  <p className="font-semibold text-sm md:text-base leading-relaxed">
                    "We are committed to research integrity, editorial quality, transparency, and global knowledge exchange."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="bg-gray-50 py-16 md:py-24 border-t border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Vision */}
            <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-200/80 shadow-md hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-navy-950 mb-4">Vision</h3>
              <p className="text-gray-600 leading-relaxed text-base mb-4">
                To become a trusted international platform for scholarly communication by promoting high-quality research, scientific innovation, interdisciplinary collaboration, and global knowledge exchange.
              </p>
              <p className="text-gray-600 leading-relaxed text-base">
                We envision a publishing environment where researchers from different disciplines and regions can share meaningful discoveries and contribute to the advancement of science and society.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-200/80 shadow-md hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-navy-950 mb-4">Mission</h3>
              <ul className="space-y-3.5">
                {[
                  "Provide a professional platform for publication and dissemination of research.",
                  "Encourage researchers to share innovative findings with the community.",
                  "Promote ethical, transparent, and responsible scholarly publishing.",
                  "Support interdisciplinary research and collaboration.",
                  "Facilitate global knowledge exchange among academics and clinicians.",
                  "Continuously improve editorial and publishing standards.",
                  "Increase the accessibility and visibility of valuable research."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-gray-600 text-sm md:text-base leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Aim & Scope Section */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/2 space-y-6 text-gray-700 leading-relaxed text-lg">
            <div className="inline-block text-sm font-extrabold text-primary-600 uppercase tracking-wider mb-2">Scope & Standards</div>
            <h2 className="text-3xl font-extrabold text-navy-950 leading-tight">Aim & Scope</h2>
            <p>
              Scientra Journals aims to publish high-quality scholarly contributions across a diverse range of scientific, medical, health, environmental, technological, and interdisciplinary fields.
            </p>
            <p>
              Our scope encompasses emerging areas of research as well as established scientific disciplines, with individual journals maintaining their own specific aims, scope, editorial policies, and submission requirements.
            </p>
            <p className="font-semibold text-navy-950">
              We encourage submissions that demonstrate scientific rigor, originality, methodological quality, and meaningful contribution to the respective field.
            </p>
            <div className="pt-4">
              <Link 
                to="/journals" 
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary-600 text-white font-semibold text-sm hover:bg-primary-700 transition-colors shadow"
              >
                Explore Journals <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 w-full bg-navy-50 rounded-2xl p-8 border border-navy-100">
            <h3 className="text-xl font-bold text-navy-950 mb-6">Article Types We Consider</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {articleTypes.map((type, idx) => (
                <div key={idx} className="flex items-center gap-2.5 bg-white p-3.5 rounded-xl border border-navy-100/60 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-primary-500 shrink-0" />
                  <span className="text-gray-700 font-medium text-sm">{type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Publish with Scientra? Grid */}
      <section className="bg-navy-950 text-white py-20 md:py-28 relative overflow-hidden border-t border-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.15),transparent_60%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 md:mb-20">
            <div className="text-xs font-bold text-primary-400 uppercase tracking-widest mb-3">Key Benefits</div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              Why Publish with Scientra?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mt-4 text-base md:text-lg">
              We offer authors a highly supportive editorial experience with rigorous standards and maximized global visibility.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon
              return (
                <div 
                  key={i} 
                  className="bg-navy-900/60 backdrop-blur border border-navy-800 rounded-2xl p-6 hover:translate-y-[-4px] hover:border-primary-500/50 hover:bg-navy-900 transition-all duration-300 group shadow-lg"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 border ${benefit.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2.5 group-hover:text-primary-400 transition-colors">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

    </div>
  )
}
