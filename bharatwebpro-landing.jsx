'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Globe, Zap, Shield, Phone, Mail, MessageCircle, Check, Star, MapPin, TrendingUp, Users, BarChart3, ChevronDown, Play, ExternalLink, Menu, X, IndianRupee } from 'lucide-react';
import { Boxes } from '@/components/ui/background-boxes';

export default function BharatWebProLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [language, setLanguage] = useState('en');
  const [scrollY, setScrollY] = useState(0);
  const [selectedBusiness, setSelectedBusiness] = useState('restaurant');
  const [selectedCity, setSelectedCity] = useState('mumbai');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const businessTypes = [
    { id: 'restaurant', label: 'Restaurant', icon: '🍽️' },
    { id: 'salon', label: 'Salon', icon: '💇' },
    { id: 'clinic', label: 'Clinic', icon: '🏥' },
    { id: 'kirana', label: 'Kirana Store', icon: '🛒' },
    { id: 'coaching', label: 'Coaching', icon: '📚' }
  ];

  const cities = [
    { id: 'mumbai', label: 'Mumbai' },
    { id: 'delhi', label: 'Delhi' },
    { id: 'bangalore', label: 'Bangalore' },
    { id: 'chennai', label: 'Chennai' },
    { id: 'hyderabad', label: 'Hyderabad' },
    { id: 'coimbatore', label: 'Coimbatore' }
  ];

  const pricingPlans = {
    basic: {
      name: 'BASIC',
      price: '14,999',
      gst: '17,699',
      color: 'emerald',
      features: [
        '5-Page Responsive Website',
        'Mobile-First Design',
        'Free .in/.co.in Domain (1 Year)',
        '5 Business Email IDs',
        'Basic SEO Setup',
        '6 Months Support',
        'UPI Integration'
      ]
    },
    premium: {
      name: 'PREMIUM',
      price: '29,999',
      gst: '35,399',
      color: 'amber',
      popular: true,
      features: [
        'Everything in Basic +',
        'E-commerce (100 Products)',
        'WhatsApp Business',
        'Multi-language Support',
        'Razorpay Gateway',
        'GST Invoice Generator',
        'Social Media Integration',
        '1 Year Support'
      ]
    },
    enterprise: {
      name: 'ENTERPRISE',
      price: '59,999',
      gst: '70,799',
      color: 'rose',
      features: [
        'Everything in Premium +',
        'Custom Development',
        'Inventory Management',
        'CRM System',
        'Analytics Dashboard',
        '24/7 Priority Support',
        'Digital Marketing Credits'
      ]
    }
  };

  const steps = [
    { icon: '🔍', title: 'FIND', desc: 'We scan your city for businesses without websites' },
    { icon: '📞', title: 'CONTACT', desc: 'Automated calls/WhatsApp to business owners' },
    { icon: '🏗️', title: 'BUILD', desc: 'AI generates professional website in your language' },
    { icon: '✅', title: 'APPROVE', desc: 'You review and request changes' },
    { icon: '🚀', title: 'LAUNCH', desc: 'Website goes live with domain & hosting' }
  ];

  const testimonials = [
    {
      name: 'Dhirajj P',
      business: 'Kumar Sweets, Delhi',
      image: '👨‍💼',
      quote: 'FAAAAAAAAAAHHHHHH',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      business: 'Priya Beauty Salon, Mumbai',
      image: '👩‍💼',
      quote: 'The WhatsApp booking feature is amazing. My customers love the convenience!',
      rating: 5
    },
    {
      name: 'Dr. Anil Mehta',
      business: 'Mehta Clinic, Bangalore',
      image: '👨‍⚕️',
      quote: 'Professional website at affordable price. Patient appointments are now automated.',
      rating: 5
    }
  ];

  const handleGenerateMockup = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
  };

  const parallaxOffset = scrollY * 0.5;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .heading-font {
          font-family: 'Playfair Display', serif;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.6s ease-out forwards;
        }

        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }

        .animate-rotate {
          animation: rotate 20s linear infinite;
        }

        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glass-effect {
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(16px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }

        .card-3d {
          transform-style: preserve-3d;
          transition: transform 0.6s ease;
        }

        .card-3d:hover {
          transform: rotateY(5deg) rotateX(5deg);
        }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }

        .scroll-reveal {
          opacity: 0;
        }

        .scroll-reveal.visible {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .counter-number {
          font-variant-numeric: tabular-nums;
        }

        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.3;
          animation: float 6s ease-in-out infinite;
        }

        .blob-1 {
          width: 400px;
          height: 400px;
          background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
          top: -100px;
          right: -100px;
        }

        .blob-2 {
          width: 300px;
          height: 300px;
          background: linear-gradient(180deg, #f093fb 0%, #f5576c 100%);
          bottom: -50px;
          left: -50px;
          animation-delay: 2s;
        }

        .blob-3 {
          width: 350px;
          height: 350px;
          background: linear-gradient(180deg, #4facfe 0%, #00f2fe 100%);
          top: 50%;
          left: 50%;
          animation-delay: 4s;
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2 animate-slideInLeft">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold heading-font gradient-text">BharatWebPro</h1>
                <p className="text-xs text-gray-400">हर व्यवसाय के लिए</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" className="text-gray-200 hover:text-indigo-400 transition-colors font-medium">How It Works</a>
              <a href="#pricing" className="text-gray-200 hover:text-indigo-400 transition-colors font-medium">Pricing</a>
              <a href="#templates" className="text-gray-200 hover:text-indigo-400 transition-colors font-medium">Templates</a>
              <a href="#testimonials" className="text-gray-200 hover:text-indigo-400 transition-colors font-medium">Success Stories</a>
              
              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors text-sm font-medium backdrop-blur-sm"
              >
                {language === 'en' ? 'हिंदी' : 'English'}
              </button>

              {/* CTA Buttons */}
              <button className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2">
                <span>Start Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-slate-900/50 backdrop-blur-xl">
            <div className="px-4 py-4 space-y-3">
              <a href="#how-it-works" className="block py-2 text-gray-200 hover:text-indigo-400">How It Works</a>
              <a href="#pricing" className="block py-2 text-gray-200 hover:text-indigo-400">Pricing</a>
              <a href="#templates" className="block py-2 text-gray-200 hover:text-indigo-400">Templates</a>
              <a href="#testimonials" className="block py-2 text-gray-200 hover:text-indigo-400">Success Stories</a>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold">
                Start Free Trial
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 px-4 overflow-hidden bg-slate-900">
        {/* Animated Background */}
        <Boxes />
        <div className="absolute inset-0 w-full h-full bg-slate-900 z-10 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-indigo-100 px-4 py-2 rounded-full animate-fadeInUp">
                <Star className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-semibold text-indigo-600">Trusted by 10,000+ Indian Businesses</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl lg:text-7xl font-bold heading-font text-white leading-tight animate-fadeInUp stagger-1">
                Your Business
                <span className="block gradient-text">Deserves a</span>
                <span className="block text-white">Professional Website</span>
              </h1>

              {/* Sub-headline */}
              <p className="text-xl text-gray-300 leading-relaxed animate-fadeInUp stagger-2">
                We find businesses without websites, create stunning sites in <span className="font-bold text-indigo-400">24 hours</span>, and handle everything for you. No coding needed.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 animate-fadeInUp stagger-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-400 counter-number">10K+</div>
                  <div className="text-sm text-gray-300 mt-1">Websites Built</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-400 counter-number">24h</div>
                  <div className="text-sm text-gray-300 mt-1">Delivery Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-400 counter-number">99%</div>
                  <div className="text-sm text-gray-300 mt-1">Satisfaction</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp stagger-4">
                <button className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105">
                  <span>Get Your Free Website</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold border-2 border-gray-200 hover:border-indigo-600 hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 animate-fadeInUp stagger-5">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-gray-300">30-Day Money Back</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm text-gray-300">24hr Delivery</span>
                </div>
              </div>
            </div>

            {/* Right Content - Interactive Demo */}
            <div className="relative animate-fadeInUp stagger-3">
              <div className="relative z-10 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 hover-lift border border-white/20">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold heading-font text-white">Try Live Demo</h3>
                  <p className="text-gray-300">See your website come to life instantly</p>

                  {/* Business Type Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-3">Select Your Business</label>
                    <div className="grid grid-cols-3 gap-3">
                      {businessTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setSelectedBusiness(type.id)}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 backdrop-blur-sm ${
                            selectedBusiness === type.id
                              ? 'border-indigo-400 bg-indigo-500/30 scale-105'
                              : 'border-white/20 bg-white/5 hover:border-indigo-400/50 hover:bg-white/10'
                          }`}
                        >
                          <div className="text-3xl mb-2">{type.icon}</div>
                          <div className="text-xs font-medium text-white">{type.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* City Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-3">Your City</label>
                    <div className="grid grid-cols-2 gap-3">
                      {cities.map((city) => (
                        <button
                          key={city.id}
                          onClick={() => setSelectedCity(city.id)}
                          className={`px-4 py-3 rounded-xl border-2 transition-all duration-300 text-sm font-medium backdrop-blur-sm ${
                            selectedCity === city.id
                              ? 'border-indigo-400 bg-indigo-500/30 text-white'
                              : 'border-white/20 bg-white/5 hover:border-indigo-400/50 hover:bg-white/10 text-gray-200'
                          }`}
                        >
                          {city.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Generate Button */}
                  <button
                    onClick={handleGenerateMockup}
                    disabled={isGenerating}
                    className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5" />
                        <span>Generate Free Mockup</span>
                      </>
                    )}
                  </button>

                  {/* Preview */}
                  {isGenerating && (
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 animate-scaleIn">
                      <div className="space-y-3">
                        <div className="h-4 bg-white/20 rounded shimmer"></div>
                        <div className="h-4 bg-white/20 rounded shimmer w-3/4"></div>
                        <div className="h-4 bg-white/20 rounded shimmer w-1/2"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-pink-400 to-rose-600 rounded-full opacity-20 animate-float"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-gray-400" />
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-slate-900 relative overflow-hidden">
        <Boxes />
        <div className="absolute inset-0 w-full h-full bg-slate-900 z-10 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold heading-font text-white mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              From finding your business to launching your website - completely automated
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 transform -translate-y-1/2" style={{ zIndex: 0 }}></div>

            <div className="grid lg:grid-cols-5 gap-8 relative z-10">
              {steps.map((step, index) => (
                <div key={index} className={`text-center animate-fadeInUp stagger-${index + 1}`}>
                  <div className="relative inline-block mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-4xl shadow-xl hover:scale-110 transition-transform duration-300">
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-indigo-600 border-2 border-indigo-600">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-slate-900 relative overflow-hidden">
        <Boxes />
        <div className="absolute inset-0 w-full h-full bg-slate-900 z-10 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold heading-font text-white mb-4">
              Simple <span className="gradient-text">Pricing</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Transparent pricing with no hidden costs. GST included.
            </p>

            {/* Pricing Toggle */}
            <div className="inline-flex items-center bg-white/10 backdrop-blur-xl rounded-full p-1 shadow-lg border border-white/20">
              <button
                onClick={() => setActiveTab('basic')}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === 'basic' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' : 'text-gray-300'
                }`}
              >
                One-Time
              </button>
              <button
                onClick={() => setActiveTab('monthly')}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === 'monthly' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' : 'text-gray-300'
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {Object.entries(pricingPlans).map(([key, plan], index) => (
              <div
                key={key}
                className={`relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-xl p-8 hover-lift card-3d animate-fadeInUp stagger-${index + 1} border ${
                  plan.popular ? 'ring-4 ring-amber-400 scale-105 border-amber-400/30' : 'border-white/20'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                    MOST POPULAR
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center space-x-2">
                    <IndianRupee className="w-6 h-6 text-gray-300" />
                    <span className="text-5xl font-bold heading-font gradient-text">{plan.price}</span>
                  </div>
                  <div className="text-sm text-gray-400 mt-2">
                    ₹{plan.gst} with GST
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-green-400" />
                      </div>
                      <span className="text-gray-200 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:shadow-lg hover:scale-105'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>

          {/* Payment Methods */}
          <div className="mt-12 text-center">
            <p className="text-gray-300 mb-4 font-semibold">We Accept:</p>
            <div className="flex flex-wrap justify-center items-center gap-6">
              <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg shadow-md border border-white/20 text-white">UPI</div>
              <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg shadow-md border border-white/20 text-white">Paytm</div>
              <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg shadow-md border border-white/20 text-white">PhonePe</div>
              <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg shadow-md border border-white/20 text-white">Google Pay</div>
              <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg shadow-md border border-white/20 text-white">Net Banking</div>
              <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg shadow-md border border-white/20 text-white">Credit/Debit Cards</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-slate-900 relative overflow-hidden">
        <Boxes />
        <div className="absolute inset-0 w-full h-full bg-slate-900 z-10 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold heading-font text-white mb-4">
              Success <span className="gradient-text">Stories</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Real businesses, real results from across India
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/20">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`${
                    activeTestimonial === index ? 'block' : 'hidden'
                  } animate-fadeInUp`}
                >
                  <div className="text-center mb-8">
                    <div className="text-6xl mb-4">{testimonial.image}</div>
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <blockquote className="text-2xl text-gray-200 text-center mb-8 leading-relaxed italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="text-center">
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-gray-300">{testimonial.business}</div>
                  </div>
                </div>
              ))}

              {/* Dots Navigation */}
              <div className="flex justify-center space-x-3 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeTestimonial === index ? 'bg-indigo-400 w-8' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full animate-float"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl lg:text-6xl font-bold heading-font text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Join 10,000+ Indian businesses who trusted BharatWebPro for their digital presence
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="group px-10 py-5 bg-white text-indigo-600 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-3 hover:scale-105">
              <span>Get Your Website Now</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
            <button className="px-10 py-5 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-indigo-600 transition-all duration-300">
              Schedule a Call
            </button>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-white/90">
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5" />
              <span>support@bharatwebpro.in</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white heading-font">BharatWebPro</span>
              </div>
              <p className="text-sm">हर भारतीय व्यवसाय के लिए स्वचालित वेबसाइट सेवा</p>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Services</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Website Building</a></li>
                <li><a href="#" className="hover:text-white transition-colors">E-commerce Setup</a></li>
                <li><a href="#" className="hover:text-white transition-colors">SEO Services</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Maintenance</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GSTIN: 29XXXXX1234X1ZX</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2026 BharatWebPro. All rights reserved. Made with ❤️ in India</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
