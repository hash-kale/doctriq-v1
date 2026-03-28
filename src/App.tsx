/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Upload, 
  Search, 
  BarChart3, 
  Zap, 
  ShieldCheck, 
  Shield,
  Lock,
  Package,
  Star,
  ArrowRight, 
  Mail,
  FileText,
  UserCheck,
  Smartphone,
  Copy,
  ChevronRight,
  Info,
  Building2,
  Globe,
  Play,
  LayoutDashboard,
  Settings,
  LogOut,
  Plus,
  Download,
  Check,
  Twitter,
  Github,
  Linkedin,
  Facebook
} from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Analytics } from '@vercel/analytics/react';

// --- Custom Icons ---
const GooglePlayIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L18.67,16.2C20.18,17.07 21,18.25 21,19.5C21,20.75 20.18,21.93 18.67,22.8L16.81,23.88L14.4,12.71L16.81,15.12M16.81,8.88L14.4,11.29L16.81,1.12L18.67,2.2C20.18,3.07 21,4.25 21,5.5C21,6.75 20.18,7.93 18.67,8.8L16.81,8.88M13.69,12L16.81,15.12L14.4,23.88L3.84,21.85L13.69,12M13.69,12L3.84,2.15L14.4,1.12L16.81,8.88L13.69,12Z" />
  </svg>
);

const DBIcon = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center justify-center font-black italic tracking-tighter ${className}`} style={{ fontSize: '0.6em' }}>
    D&B
  </div>
);

// --- Tooltip Component ---
const Tooltip = ({ text, children }: { text: string; children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block" onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-[10px] font-medium rounded-lg whitespace-nowrap z-[60] shadow-xl"
          >
            {text}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
import { Button } from './components/ui/Button';
import { Card, FeatureCard } from './components/ui/Card';
import { Badge } from './components/ui/Badge';
import { Input } from './components/ui/Input';

// --- Tracking Utility (Mock) ---
const trackClick = (buttonName: string) => {
  console.log(`[Tracking] Clicked: ${buttonName}`);
  // In a real app, this would send an event to PostHog/Mixpanel/GA
};

const CountUp = ({ end, duration = 2, delay = 0 }: { end: number; duration?: number; delay?: number }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    const timeout = setTimeout(() => {
      window.requestAnimationFrame(step);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [end, duration, delay, isInView]);

  return <span ref={ref}>{count}</span>;
};

const Navbar = ({ onAuthClick, onLogoClick }: { onAuthClick: () => void; onLogoClick: () => void }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
    <div className="max-w-[1440px] mx-auto page-margin">
      <div className="flex justify-between items-center h-20">
        <button onClick={onLogoClick} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Shield className="text-white fill-white w-5 h-5" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight">Doctriq</span>
        </button>
        <div className="hidden md:flex items-center gap-8 hero-sub text-[14px] text-slate-600">
          <a href="#problem" className="hover:text-primary hover:scale-105 transition-all">Why us?</a>
          <a href="#solution" className="hover:text-primary hover:scale-105 transition-all">How it works</a>
          <a href="#pricing" className="hover:text-primary hover:scale-105 transition-all">Pricing</a>
          <Button 
            onClick={onAuthClick}
            size="sm"
            className="rounded-full hover:scale-105 transition-transform"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  </nav>
);

const Hero = ({ onCheckReadiness }: { onCheckReadiness: () => void }) => (
  <section className="relative pt-40 pb-[120px] page-margin overflow-hidden">
    {/* Atmospheric Background Elements */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-accent/5 rounded-full blur-[100px]"></div>
    </div>

    {/* Floating Decorative Elements */}
    <motion.div 
      animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/4 right-[10%] opacity-20 hidden xl:block"
    >
      <FileText className="w-12 h-12 text-primary" />
    </motion.div>
    <motion.div 
      animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      className="absolute bottom-1/4 left-[5%] opacity-15 hidden xl:block"
    >
      <ShieldCheck className="w-16 h-16 text-success" />
    </motion.div>

    <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-[20px] items-center">
      <div className="col-span-12 lg:col-span-7">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                  <img src={`https://picsum.photos/seed/user${i}/32/32`} alt="User" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
            <span className="microcopy font-bold text-slate-500 uppercase tracking-widest">Trusted by 2,400+ Developers</span>
          </div>

          <Badge variant="primary" className="mb-6">
            <Zap className="w-3 h-3 mr-1" />
            Validate Documents. Avoid Rejections. Submit Confidently.
          </Badge>
          <h1 className="mb-6 tracking-tight leading-[0.95] flex flex-wrap">
            {"Avoid Developer Account Rejection Before You Submit".split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: i * 0.1,
                  ease: [0.215, 0.61, 0.355, 1]
                }}
                className={`inline-block mr-[0.25em] ${word === 'Rejection' ? 'text-primary' : ''}`}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <p className="hero-sub text-slate-600 mb-8 max-w-xl leading-relaxed">
            Doctriq checks your identity, documents, and data in minutes—before applying for Google Play or DUNS. Know your readiness score and fix issues instantly.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <motion.div 
            whileHover={{ 
              scale: 1.05,
              boxShadow: [
                "0 0 0 0 rgba(79, 70, 229, 0)",
                "0 0 0 15px rgba(79, 70, 229, 0.15)",
                "0 0 0 0 rgba(79, 70, 229, 0)"
              ]
            }} 
            whileTap={{ scale: 0.95 }}
            transition={{ 
              boxShadow: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 0.2 }
            }}
            className="rounded-xl"
          >
            <Button 
              onClick={onCheckReadiness}
              size="md"
              className="w-full sm:w-auto"
            >
              Check My Readiness (Free)
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
          <motion.div 
            whileHover={{ 
              scale: 1.05,
              boxShadow: [
                "0 0 0 0 rgba(148, 163, 184, 0)",
                "0 0 0 15px rgba(148, 163, 184, 0.1)",
                "0 0 0 0 rgba(148, 163, 184, 0)"
              ]
            }} 
            whileTap={{ scale: 0.95 }}
            transition={{ 
              boxShadow: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 0.2 }
            }}
          >
            <Button 
              onClick={() => trackClick('Hero Secondary CTA')}
              variant="secondary"
              size="md"
              className="w-full sm:w-auto group"
            >
              <Play className="w-4 h-4 mr-2 fill-current group-hover:scale-110 transition-transform" />
              See How It Works
            </Button>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-wrap gap-6 text-small text-slate-500"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-success" />
            <span>No signup required</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-success" />
            <span>Takes &lt; 3 minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-success" />
            <span>Your documents are not stored</span>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="col-span-12 lg:col-span-5 relative mt-12 lg:mt-0"
        initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
      >
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>
        
        <Card variant="glass" padding="none" className="relative overflow-hidden shadow-2xl border-white/40 backdrop-blur-xl group">
          {/* Scanning Line Animation */}
          <motion.div 
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent z-20 pointer-events-none"
          />

          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="microcopy uppercase tracking-[0.2em]">Readiness Score</p>
                  <Tooltip text="AI-Powered Prediction">
                    <Info className="w-3 h-3 text-slate-400 cursor-help" />
                  </Tooltip>
                </div>
                <div className="flex items-baseline gap-1">
                  <div className="score-number leading-none">
                    <CountUp end={82} delay={1.5} />
                  </div>
                  <span className="text-slate-400 font-bold">%</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Tooltip text="Google Play Compatible">
                  <div className="w-12 h-12 bg-white/40 rounded-2xl flex items-center justify-center shadow-sm hover:bg-white/60 transition-all hover:scale-110 cursor-help border border-white/20">
                    <GooglePlayIcon className="w-6 h-6 text-slate-600" />
                  </div>
                </Tooltip>
                <Tooltip text="D&B Compliant">
                  <div className="w-12 h-12 bg-white/40 rounded-2xl flex items-center justify-center shadow-sm hover:bg-white/60 transition-all hover:scale-110 cursor-help border border-white/20">
                    <DBIcon className="w-6 h-6 text-slate-600" />
                  </div>
                </Tooltip>
              </div>
            </div>

            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 3.6, duration: 0.5 }}
                className="p-4 rounded-[16px] bg-warning/5 border border-warning/10 flex items-start gap-4 hover:bg-warning/10 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-warning/20 flex items-center justify-center shrink-0">
                  <AlertTriangle className="text-warning w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">Name mismatch detected</p>
                  <p className="card-desc text-slate-600 mt-1">NIC shows "Harsha Pradeep" but Passport shows "H. Pradeep".</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 3.9, duration: 0.5 }}
                className="p-4 rounded-[16px] bg-success/5 border border-success/10 flex items-start gap-4 hover:bg-success/10 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="text-success w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">Document quality: Good</p>
                  <p className="card-desc text-slate-600 mt-1">All uploaded images are clear and readable.</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 4.2, duration: 0.5 }}
                className="p-4 rounded-[16px] bg-white/40 border border-white/60 flex items-center justify-between backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <FileText className="text-slate-400 w-5 h-5" />
                  <span className="text-sm font-medium text-slate-600">Business Registration</span>
                </div>
                <Badge variant="success">Verified</Badge>
              </motion.div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-center">
              <button 
                onClick={() => trackClick('Hero Mockup Breakdown')}
                className="text-primary font-bold text-sm flex items-center gap-1 hover:underline group"
              >
                View Full Breakdown 
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  </section>
);

const ProblemSection = () => {
  const pains = [
    {
      icon: <UserCheck className="text-error w-6 h-6" />,
      title: "Identity Mismatch",
      desc: "Your name or address doesn't match across documents, triggering instant flags."
    },
    {
      icon: <Smartphone className="text-error w-6 h-6" />,
      title: "Blurred Documents",
      desc: "Blurred or cropped images get rejected instantly by automated verification systems."
    },
    {
      icon: <FileText className="text-error w-6 h-6" />,
      title: "Format Errors",
      desc: "Wrong formatting or missing fields cause endless verification delays."
    },
    {
      icon: <ArrowRight className="text-error w-6 h-6" />,
      title: "Resubmission Loop",
      desc: "You waste days fixing small errors, delaying your app launch by weeks."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="problem" className="section-spacing page-margin bg-white">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-slate-900 mb-6">Why Developer Accounts Get Rejected</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Google Play and DUNS verification is stricter than ever. Even a tiny typo can lead to a permanent ban or months of delay.</p>
        </div>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-x-[20px] gap-y-[40px] max-w-4xl mx-auto"
        >
          {pains.map((pain, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full group transition-all duration-300 hover:shadow-xl hover:border-primary/20">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="mb-6 w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-primary/5 transition-colors"
                >
                  {pain.icon}
                </motion.div>
                <h3 className="mb-6 group-hover:text-primary transition-colors">{pain.title}</h3>
                <p className="card-desc text-slate-600">{pain.desc}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const SolutionSection = () => {
  const steps = [
    { 
      icon: <Upload className="w-6 h-6" />, 
      title: "Upload Documents", 
      desc: "NIC / Passport / Business Registration.",
      tooltip: "Supports PDF, JPG, and PNG formats",
      platforms: true
    },
    { 
      icon: <Search className="w-6 h-6" />, 
      title: "Auto Validation", 
      desc: "Check data consistency, quality, format.",
      tooltip: "AI-powered cross-referencing with global databases",
      glow: true
    },
    { 
      icon: <BarChart3 className="w-6 h-6" />, 
      title: "Get Your Score", 
      desc: "Know if you're safe to submit.",
      tooltip: "Predictive analysis based on thousands of submissions",
      score: 82
    },
    { 
      icon: <Zap className="w-6 h-6" />, 
      title: "Fix Instantly", 
      desc: "Corrected, ready-to-use data.",
      tooltip: "Ready for Google Play & D&B verification",
      fix: true
    }
  ];

  return (
    <section id="solution" className="section-spacing page-margin bg-bg-light overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center mb-16">
          <Badge variant="primary" className="mb-4">The Process</Badge>
          <h2 className="text-slate-900 mb-6">One Simple Check Before You Submit</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">We use advanced pattern matching to simulate the exact checks Google and DUNS perform.</p>
        </div>
        
        <div className="relative flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-0">
          {/* Connecting Line */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-10 left-0 w-full h-0.5 bg-slate-200 hidden lg:block -z-0 origin-left"
          ></motion.div>
          
          {steps.map((step, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left flex-1 px-4 group"
            >
              <div className="relative mb-8">
                <Tooltip text={step.tooltip}>
                  <motion.div 
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    className={`w-20 h-20 rounded-full flex items-center justify-center font-bold text-lg shadow-xl cursor-help transition-all duration-500 ${
                      step.glow ? 'shadow-[0_0_20px_rgba(79,70,229,0.3)]' : ''
                    } bg-white border-4 border-bg-light relative overflow-hidden`}
                  >
                    {/* Animated Pulse Ring */}
                    {step.glow && (
                      <motion.div 
                        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-primary/20 rounded-full"
                      />
                    )}
                    <motion.div 
                      animate={step.glow ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center relative z-10"
                    >
                      {step.icon}
                    </motion.div>
                  </motion.div>
                </Tooltip>
                
                {/* Step Number Badge */}
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold border-4 border-bg-light">
                  {idx + 1}
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4 justify-center lg:justify-start">
                <h3 className="text-lg">{step.title}</h3>
                {step.platforms && (
                  <div className="flex gap-1">
                    <Tooltip text="Google Play Console → Verified against official Play Console account format">
                      <GooglePlayIcon className="w-4 h-4 text-slate-400 hover:text-primary transition-all hover:scale-125 cursor-help" />
                    </Tooltip>
                    <Tooltip text="D&B → Business data verified against Dun & Bradstreet records">
                      <DBIcon className="w-4 h-4 text-slate-400 hover:text-primary transition-all hover:scale-125 cursor-help" />
                    </Tooltip>
                  </div>
                )}
              </div>
              
              <p className="card-desc text-slate-600 mb-4">{step.desc}</p>

              {/* Step-specific animations */}
              {step.score && (
                <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 inline-flex items-center gap-2">
                  <div className="text-primary font-bold text-xl">
                    <CountUp end={step.score} delay={idx * 0.2 + 0.5} />%
                  </div>
                  <Tooltip text="Your risk is low. Only minor fixes needed.">
                    <Info className="w-4 h-4 text-slate-300 cursor-help" />
                  </Tooltip>
                </div>
              )}

              {step.fix && (
                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.2 + 0.8 }}
                  className="bg-slate-900 text-white p-3 rounded-xl text-xs font-mono"
                >
                  <span className="text-success">✓</span> Fix: Use "Harsha Pradeep"
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureSection = () => {
  const features = [
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "Identity Match Check",
      desc: "Compare name, address, and ID numbers across all your documents automatically."
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Document Quality Detection",
      desc: "Detect blur, cropping, and low resolution before the automated bots do."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Smart Fix Suggestions",
      desc: "Get specific instructions on how to correct your data for a 100% match."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Readiness Score",
      desc: "Know your rejection risk instantly with our weighted scoring algorithm."
    },
    {
      icon: <Copy className="w-6 h-6" />,
      title: "Copy-Ready Output",
      desc: "Get a clean text file to paste directly into Google Play or DUNS forms."
    }
  ];

  return (
    <section className="section-spacing page-margin bg-white">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-slate-900 mb-6">Built to Prevent Rejections</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Our engine is trained on thousands of successful and failed developer account applications.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-x-[20px] gap-y-[40px]">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FeatureCard 
                icon={
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", delay: i * 0.1 }}
                  >
                    {f.icon}
                  </motion.div>
                }
                title={f.title}
                description={f.desc}
              />
            </motion.div>
          ))}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card variant="dark" className="flex flex-col justify-center items-center text-center h-full">
              <Info className="w-8 h-8 text-accent mb-6" />
              <h3 className="mb-3 text-white">And much more...</h3>
              <p className="card-desc text-slate-300">We constantly update our rules to match the latest Google Play policies.</p>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const DemoSection = () => (
  <section className="section-spacing page-margin bg-bg-light border-y border-slate-100">
    <div className="max-w-[1440px] mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-slate-900 mb-6">See What You Get</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">A comprehensive breakdown of every potential rejection point in your application.</p>
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Card padding="none" className="max-w-4xl mx-auto shadow-2xl border-slate-200 overflow-hidden">
          <div className="bg-slate-50 px-8 py-4 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-300"></div>
              <div className="w-3 h-3 rounded-full bg-slate-300"></div>
              <div className="w-3 h-3 rounded-full bg-slate-300"></div>
            </div>
            <div className="flex items-center gap-4">
              <Tooltip text="Google Play Console Ready">
                <GooglePlayIcon className="w-4 h-4 text-slate-400 hover:text-primary transition-colors cursor-help" />
              </Tooltip>
              <Tooltip text="D&B Verified">
                <DBIcon className="w-4 h-4 text-slate-400 hover:text-primary transition-colors cursor-help" />
              </Tooltip>
              <span className="microcopy uppercase tracking-[0.2em] ml-2">Result Preview</span>
            </div>
            <div className="w-12"></div>
          </div>
          
          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
              <div className="text-center md:text-left">
                <h3 className="text-slate-900 mb-2">Harsha Pradeep</h3>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <p className="text-small text-slate-500">Individual Developer Account Check</p>
                  <Tooltip text="Verified via AI Engine">
                    <ShieldCheck className="w-4 h-4 text-success cursor-help" />
                  </Tooltip>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-warning/10 px-6 py-3 rounded-[12px] border border-warning/20">
                <div className="text-right">
                  <p className="microcopy uppercase tracking-widest">Readiness Score</p>
                  <p className="score-number text-warning">
                    <CountUp end={78} delay={0.5} />%
                  </p>
                </div>
                <Tooltip text="78% - Moderate Risk of Rejection">
                  <AlertTriangle className="text-warning w-8 h-8 cursor-help" />
                </Tooltip>
              </div>
            </div>
            
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="flex gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center shrink-0">
                  <XCircle className="text-error w-5 h-5" />
                </div>
                <div>
                  <h3 className="mb-2">Name mismatch between NIC and Passport</h3>
                  <p className="card-desc text-slate-500 mt-1">Google Play requires an exact character-for-character match across all identity documents.</p>
                  <motion.div 
                    initial={{ x: 30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white text-xs rounded-lg"
                  >
                    <CheckCircle2 className="w-3 h-3 text-success" />
                    <span>Fix Suggestion: Use full name "Harsha Pradeep"</span>
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.5 }}
                className="flex gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center shrink-0">
                  <AlertTriangle className="text-warning w-5 h-5" />
                </div>
                <div>
                  <h3 className="mb-2">Document slightly blurred</h3>
                  <p className="card-desc text-slate-500 mt-1">The edges of your Passport are not clearly defined, which often triggers automated rejection.</p>
                  <motion.div 
                    initial={{ x: 30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.9 }}
                    className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white text-xs rounded-lg"
                  >
                    <CheckCircle2 className="w-3 h-3 text-success" />
                    <span>Fix Suggestion: Upload clearer image with better lighting</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  </section>
);

const PricingSection = () => (
  <section id="pricing" className="section-spacing page-margin bg-white">
    <div className="max-w-[1440px] mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-slate-900 mb-6">Start Free. Upgrade Only If You Need Fixes.</h2>
        <p className="text-slate-600">No credit card required to get your initial readiness score.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-x-[20px] gap-y-[40px] max-w-4xl mx-auto">
        <motion.div
          whileHover={{ y: -10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card className="flex flex-col h-full">
            <div className="flex justify-between items-start mb-6">
              <Badge variant="slate" className="w-fit">FREE</Badge>
              <Package className="w-6 h-6 text-slate-300" />
            </div>
            <p className="card-desc text-slate-500 mb-6">Perfect for a quick health check.</p>
            <div className="text-4xl font-black text-slate-900 mb-8">$0</div>
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-center gap-3 card-desc text-slate-600">
                <CheckCircle2 className="w-5 h-5 text-success" />
                Readiness score
              </li>
              <li className="flex items-center gap-3 card-desc text-slate-600">
                <CheckCircle2 className="w-5 h-5 text-success" />
                Basic validation
              </li>
              <li className="flex items-center gap-3 card-desc text-slate-400 line-through">
                Full issue breakdown
              </li>
              <li className="flex items-center gap-3 card-desc text-slate-400 line-through">
                Smart fix suggestions
              </li>
            </ul>
            <Button 
              onClick={() => trackClick('Pricing Free Plan')}
              variant="secondary"
              className="w-full"
            >
              Get Started
            </Button>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ y: -10 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative group"
        >
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-[20px] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          
          <Card variant="dark" className="relative overflow-hidden flex flex-col border-primary/20 h-full shadow-[0_0_20px_rgba(79,70,229,0.1)] hover:shadow-[0_0_30px_rgba(79,70,229,0.2)]">
            <div className="absolute top-0 right-0 bg-accent text-slate-900 px-4 py-1 text-[10px] font-black uppercase tracking-widest rounded-bl-xl">Popular</div>
            <div className="flex justify-between items-start mb-6">
              <Badge variant="accent" className="w-fit">PRO</Badge>
              <Star className="w-6 h-6 text-accent fill-accent" />
            </div>
            <p className="card-desc text-slate-400 mb-6">Everything you need for a 100% pass.</p>
            <div className="text-4xl font-black mb-8">$12 <span className="text-sm font-normal text-slate-400">/ report</span></div>
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-center gap-3 card-desc text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                Full issue breakdown
              </li>
              <li className="flex items-center gap-3 card-desc text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                Smart fix suggestions
              </li>
              <li className="flex items-center gap-3 card-desc text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                Copy-ready data export
              </li>
              <li className="flex items-center gap-3 card-desc text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                Email export
              </li>
            </ul>
            <Button 
              onClick={() => trackClick('Pricing Pro Plan')}
              className="w-full"
            >
              Upgrade to Pro
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  </section>
);

const TrustSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200 } }
  };

  return (
    <section className="section-spacing page-margin bg-bg-light border-y border-slate-100">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-[1440px] mx-auto text-center"
      >
        <motion.div 
          variants={itemVariants}
          className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary/10 text-primary mb-8 shadow-inner"
        >
          <Lock className="w-10 h-10" />
        </motion.div>
        <motion.h2 variants={itemVariants} className="text-slate-900 mb-6">Your Data Is Safe</motion.h2>
        <motion.p variants={itemVariants} className="text-slate-600 max-w-2xl mx-auto leading-[24px]">
          Documents are processed securely, not stored permanently, and fully encrypted. We understand the sensitivity of your identity documents. All processing happens in encrypted memory and documents are permanently deleted the moment your report is generated.
        </motion.p>
        
        <motion.div 
          variants={itemVariants}
          className="mt-12 flex justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500"
        >
          <div className="flex items-center gap-2 font-bold text-sm">
            <ShieldCheck className="w-5 h-5" /> SOC2 COMPLIANT
          </div>
          <div className="flex items-center gap-2 font-bold text-sm">
            <ShieldCheck className="w-5 h-5" /> GDPR READY
          </div>
          <div className="flex items-center gap-2 font-bold text-sm">
            <ShieldCheck className="w-5 h-5" /> 256-BIT AES
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const FinalCTA = ({ onCheckReadiness }: { onCheckReadiness: () => void }) => (
  <section className="section-spacing page-margin bg-primary relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
      <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
    </div>
    <div className="max-w-4xl mx-auto text-center relative z-10">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-white mb-6"
      >
        Don’t Risk Getting Rejected
      </motion.h1>
      <p className="text-white/80 text-lg mb-10">Check your data before you apply and save days of delay.</p>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ 
          boxShadow: ["0 0 0 0 rgba(79, 70, 229, 0)", "0 0 0 20px rgba(79, 70, 229, 0.1)", "0 0 0 0 rgba(79, 70, 229, 0)"] 
        }}
        transition={{ 
          boxShadow: { duration: 2, repeat: Infinity }
        }}
      >
        <Button 
          onClick={onCheckReadiness}
          variant="white"
          size="md"
          className="mx-auto"
        >
          Check My Readiness Now (Free)
        </Button>
      </motion.div>
    </div>
  </section>
);

const LeadCapture = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      trackClick('Lead Capture Submit');
    }
  };

  return (
    <section className="section-spacing page-margin bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl pointer-events-none opacity-[0.03]">
        <div className="absolute top-0 left-0 w-64 h-64 border-2 border-primary rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 border-2 border-primary rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      <div className="max-w-xl mx-auto text-center relative z-10">
        <h2 className="mb-6">Want Early Access?</h2>
        <p className="card-desc text-slate-600 mb-10">Join the waitlist to get notified when we launch the full automation suite.</p>
        
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              whileFocus={{ scale: 1.05 }}
            >
              <Button type="submit" className="whitespace-nowrap w-full sm:w-auto transition-all focus:ring-4 focus:ring-primary/20">
                Get early access
              </Button>
            </motion.div>
          </form>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-success/10 border border-success/20 p-8 rounded-[16px] text-slate-900"
          >
            <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-6" />
            <p className="hero-sub mb-2">You're on the list! 🚀</p>
            <p className="card-desc opacity-80">We'll notify you as soon as we launch.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

const AuthPage = ({ onBack, onSuccess }: { onBack: () => void; onSuccess: () => void }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock error for demonstration
    if (mode === 'login') {
      setError(true);
      setTimeout(() => setError(false), 500);
    } else {
      onSuccess();
    }
  };

  const shakeVariants = {
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.4 }
    }
  };

  return (
    <section className="pt-32 pb-20 page-margin min-h-[80vh] flex items-center justify-center">
      <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Branding/Info */}
        <div className="hidden lg:block">
          <Badge variant="primary" className="mb-6">Join Doctriq</Badge>
          <h1 className="mb-6">Secure Your Developer Future</h1>
          <p className="hero-sub text-slate-600 mb-8 max-w-md">
            Join thousands of developers who trust Doctriq to validate their documents before submission.
          </p>
          <div className="space-y-4">
            {[
              "Instant Readiness Score",
              "Smart Fix Suggestions",
              "Secure Document Processing"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 card-desc text-slate-700">
                <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                </div>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Auth Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="mb-6">
            <button 
              onClick={onBack}
              className="text-slate-400 hover:text-primary text-sm font-medium flex items-center gap-2 transition-colors"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              Back to Home
            </button>
          </div>
          <Card className="shadow-2xl border-slate-100 overflow-hidden">
            <div className="flex border-b border-slate-100 mb-8">
              <button
                onClick={() => setMode('login')}
                className={`flex-1 py-4 microcopy uppercase tracking-widest transition-all border-b-2 ${
                  mode === 'login' ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setMode('signup')}
                className={`flex-1 py-4 microcopy uppercase tracking-widest transition-all border-b-2 ${
                  mode === 'signup' ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                Sign Up
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div 
                key={mode}
                initial={{ opacity: 0, x: mode === 'login' ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: mode === 'login' ? 20 : -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <button 
                  onClick={() => trackClick('Google OAuth')}
                  className="w-full py-3 px-4 bg-white border border-slate-200 rounded-[12px] flex items-center justify-center gap-3 font-display font-medium text-[14px] text-slate-700 hover:bg-slate-50 hover:scale-[1.02] transition-all shadow-sm"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Continue with Google
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                  <div className="relative flex justify-center microcopy uppercase tracking-widest"><span className="bg-white px-4">Or with email</span></div>
                </div>

                <motion.form 
                  variants={shakeVariants}
                  animate={error ? "shake" : ""}
                  className="space-y-4" 
                  onSubmit={handleSubmit}
                >
                  {mode === 'signup' && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <label className="microcopy uppercase tracking-widest">Full Name</label>
                        <Tooltip text="Enter your name as it appears on your ID">
                          <Info className="w-3 h-3 text-slate-300 cursor-help" />
                        </Tooltip>
                      </div>
                      <Input 
                        type="text" 
                        placeholder="John Doe" 
                        required 
                        className={error ? "border-error ring-1 ring-error/20" : ""}
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="microcopy uppercase tracking-widest">Email Address</label>
                      <Tooltip text="We'll send your readiness report here">
                        <Info className="w-3 h-3 text-slate-300 cursor-help" />
                      </Tooltip>
                    </div>
                    <Input 
                      type="email" 
                      placeholder="john@example.com" 
                      required 
                      className={error ? "border-error ring-1 ring-error/20" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <label className="microcopy uppercase tracking-widest">Password</label>
                        <Tooltip text="At least 8 characters">
                          <Info className="w-3 h-3 text-slate-300 cursor-help" />
                        </Tooltip>
                      </div>
                      {mode === 'login' && (
                        <button type="button" className="microcopy text-primary hover:underline">Forgot?</button>
                      )}
                    </div>
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      required 
                      className={error ? "border-error ring-1 ring-error/20" : ""}
                    />
                  </div>
                  
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      type="submit" 
                      className={`w-full mt-4 ${error ? 'bg-error hover:bg-error/90' : ''}`}
                    >
                      {mode === 'login' ? 'Login' : 'Create Account'}
                    </Button>
                  </motion.div>
                </motion.form>

                <p className="text-center microcopy leading-relaxed">
                  By continuing, you agree to Doctriq's <br />
                  <a href="#" className="text-slate-600 hover:underline">Terms of Service</a> and <a href="#" className="text-slate-600 hover:underline">Privacy Policy</a>.
                </p>
              </motion.div>
            </AnimatePresence>
          </Card>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-20 bg-slate-50 border-t border-slate-200 page-margin">
    <div className="max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-[20px] gap-y-[60px] mb-16">
        <div className="md:col-span-4">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="text-white fill-white w-5 h-5" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight">Doctriq</span>
          </div>
          <p className="card-desc text-slate-500 max-w-xs mb-8 leading-relaxed">
            Helping developers worldwide avoid account rejections and launch their apps faster with AI-powered document validation.
          </p>
          <div className="flex items-center gap-4">
            {[
              { icon: <Twitter className="w-5 h-5" />, label: 'Twitter' },
              { icon: <Github className="w-5 h-5" />, label: 'GitHub' },
              { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn' },
              { icon: <Facebook className="w-5 h-5" />, label: 'Facebook' }
            ].map((social, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ y: -3, color: 'var(--primary)' }}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 transition-colors shadow-sm"
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
        
        <div className="md:col-span-2">
          <h4 className="text-slate-900 font-bold mb-6">Product</h4>
          <ul className="space-y-4 card-desc text-slate-500">
            <li><a href="#problem" className="hover:text-primary hover:translate-x-1 transition-all inline-block">Why Doctriq?</a></li>
            <li><a href="#solution" className="hover:text-primary hover:translate-x-1 transition-all inline-block">How it works</a></li>
            <li><a href="#pricing" className="hover:text-primary hover:translate-x-1 transition-all inline-block">Pricing</a></li>
            <li><a href="#" className="hover:text-primary hover:translate-x-1 transition-all inline-block">Features</a></li>
            <li><a href="#" className="hover:text-primary hover:translate-x-1 transition-all inline-block">Changelog</a></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-slate-900 font-bold mb-6">Resources</h4>
          <ul className="space-y-4 card-desc text-slate-500">
            <li><a href="#" className="hover:text-primary hover:translate-x-1 transition-all inline-block">Documentation</a></li>
            <li><a href="#" className="hover:text-primary hover:translate-x-1 transition-all inline-block">Help Center</a></li>
            <li><a href="#" className="hover:text-primary hover:translate-x-1 transition-all inline-block">API Reference</a></li>
            <li><a href="#" className="hover:text-primary hover:translate-x-1 transition-all inline-block">Community</a></li>
            <li><a href="#" className="hover:text-primary hover:translate-x-1 transition-all inline-block">Blog</a></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-slate-900 font-bold mb-6">Legal</h4>
          <ul className="space-y-4 card-desc text-slate-500">
            <li><a href="#" className="hover:text-primary hover:translate-x-1 transition-all inline-block">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary hover:translate-x-1 transition-all inline-block">Terms of Service</a></li>
            <li><a href="#" className="hover:text-primary hover:translate-x-1 transition-all inline-block">Security</a></li>
            <li><a href="#" className="hover:text-primary hover:translate-x-1 transition-all inline-block">Cookie Policy</a></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-slate-900 font-bold mb-6">Status</h4>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-success/10 text-success rounded-full w-fit">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest">All Systems Operational</span>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <p className="microcopy text-slate-400">© 2026 Doctriq. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 microcopy text-slate-400">
              <ShieldCheck className="w-4 h-4 text-success" />
              <span>SOC2 Compliant</span>
            </div>
            <div className="flex items-center gap-2 microcopy text-slate-400">
              <ShieldCheck className="w-4 h-4 text-success" />
              <span>GDPR Ready</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-slate-400">
          <Globe className="w-4 h-4" />
          <select className="bg-transparent text-[10px] font-bold uppercase tracking-widest focus:outline-none cursor-pointer">
            <option>English (US)</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
          </select>
        </div>
      </div>
    </div>
  </footer>
);

const Dashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [score, setScore] = useState(0);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setScore(78), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleCopy = (field: string) => {
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const issues = [
    { id: 1, title: 'Name Mismatch', desc: 'NIC vs Passport mismatch', severity: 'high' },
    { id: 2, title: 'Address Format', desc: 'Missing postal code in D&B', severity: 'medium' },
    { id: 3, title: 'Document Clarity', desc: 'Business reg is slightly blurry', severity: 'low' },
  ];

  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success'>('idle');

  const handleUpload = () => {
    setUploadStatus('uploading');
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadStatus('success');
          setTimeout(() => setUploadStatus('idle'), 3000);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="text-white fill-white w-5 h-5" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">Doctriq</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-primary/5 text-primary rounded-xl font-medium">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-xl font-medium transition-colors">
            <FileText className="w-5 h-5" /> My Documents
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-xl font-medium transition-colors">
            <Settings className="w-5 h-5" /> Settings
          </button>
        </nav>
        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-red-50 hover:text-red-600 rounded-xl font-medium transition-colors"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Welcome back, Harsha</h2>
            <p className="text-slate-500">Here is your latest readiness report.</p>
          </div>
          <div className="flex gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="secondary" size="sm" className="shadow-sm">
                <Download className="w-4 h-4 mr-2" /> Export PDF
              </Button>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              animate={{ boxShadow: ["0 0 0 0 rgba(79, 70, 229, 0)", "0 0 0 10px rgba(79, 70, 229, 0.1)", "0 0 0 0 rgba(79, 70, 229, 0)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" /> New Validation
              </Button>
            </motion.div>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-6">
          {/* Upload Area */}
          <Card className={`col-span-12 p-8 border-dashed border-2 transition-all group ${
            isDragging ? 'border-primary bg-primary/5' : 'border-slate-200 bg-white/50 hover:bg-white hover:border-primary/50'
          }`}>
            <div 
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleUpload(); }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <AnimatePresence mode="wait">
                {uploadStatus === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="w-20 h-20 rounded-3xl bg-success text-white flex items-center justify-center mb-6 shadow-lg shadow-success/20"
                  >
                    <Check className="w-10 h-10" />
                  </motion.div>
                ) : (
                  <motion.div 
                    key="upload"
                    initial={{ scale: 1 }}
                    animate={isDragging ? { scale: 1.2, y: -10 } : { scale: 1, y: 0 }}
                    className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-6 transition-colors ${
                      isDragging ? 'bg-primary text-white' : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white'
                    }`}
                  >
                    <Upload className="w-10 h-10" />
                  </motion.div>
                )}
              </AnimatePresence>
              
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {uploadStatus === 'success' ? 'Upload Complete!' : 'Upload Your Documents'}
              </h3>
              <p className="text-slate-500 mb-8 max-w-sm">
                {uploadStatus === 'success' 
                  ? 'Your documents have been scanned and are ready for review.' 
                  : 'Drag and drop your NIC, Passport, or Business Registration here. We\'ll scan them instantly.'}
              </p>
              
              {uploadStatus === 'idle' && (
                <div className="flex gap-4">
                  <Button onClick={handleUpload} variant="outline" size="md">
                    Browse Files
                  </Button>
                  <Button onClick={handleUpload} size="md">
                    Scan Now
                  </Button>
                </div>
              )}

              {uploadStatus === 'uploading' && (
                <div className="w-full max-w-md mt-4">
                  <div className="flex justify-between microcopy mb-2">
                    <motion.span
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Scanning documents...
                    </motion.span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                      transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Score Card */}
          <Card className={`col-span-12 lg:col-span-4 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden transition-all duration-500 ${
            score > 80 ? 'shadow-[0_0_30px_rgba(34,197,94,0.1)] border-success/20' : ''
          }`}>
            {score > 80 && (
              <motion.div 
                animate={{ opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-success/5 pointer-events-none"
              />
            )}
            <p className="microcopy uppercase tracking-widest mb-4">Overall Readiness</p>
            <div className="relative w-48 h-48 flex items-center justify-center mb-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                <motion.circle 
                  cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" 
                  strokeDasharray={552.92}
                  initial={{ strokeDashoffset: 552.92 }}
                  animate={{ strokeDashoffset: 552.92 - (552.92 * score) / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="text-primary" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold text-slate-900">{score}%</span>
                <span className="text-sm font-medium text-slate-500">Ready</span>
              </div>
            </div>
            <Badge variant={score > 80 ? 'success' : 'warning'} className="px-4 py-1">
              {score > 80 ? 'High Probability' : 'Action Required'}
            </Badge>
          </Card>

          {/* Issues List */}
          <Card className="col-span-12 lg:col-span-8 p-0 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-900">Detected Issues</h3>
              <span className="text-xs font-medium text-slate-400">{issues.length} Issues Found</span>
            </div>
            <div className="divide-y divide-slate-100">
              <AnimatePresence>
                {issues.map((issue, i) => (
                  <motion.div 
                    key={issue.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 flex items-start justify-between hover:bg-slate-50 transition-colors group"
                  >
                    <div className="flex gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        issue.severity === 'high' ? 'bg-red-50 text-red-600' : 
                        issue.severity === 'medium' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'
                      }`}>
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{issue.title}</h4>
                        <p className="text-sm text-slate-500">{issue.desc}</p>
                      </div>
                    </div>
                    <Button variant="secondary" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      Fix Now
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </Card>

          {/* Fix Suggestions / Copy Data */}
          <Card className="col-span-12 p-8">
            <div className="flex items-center gap-3 mb-8">
              <Zap className="w-6 h-6 text-accent fill-accent" />
              <h3 className="text-xl font-bold text-slate-900">Smart Fix Suggestions</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: 'Legal Name', value: 'Harsha Pradeep Kalugalage' },
                { label: 'Business Address', value: '123 Tech Lane, Colombo 07, Sri Lanka' },
                { label: 'D-U-N-S Number', value: '12-345-6789' },
              ].map((field, i) => (
                <motion.div 
                  key={field.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-100 relative group"
                >
                  <p className="microcopy uppercase tracking-widest mb-2">{field.label}</p>
                  <p className="font-medium text-slate-900 pr-10">{field.value}</p>
                  <button 
                    onClick={() => handleCopy(field.label)}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-primary transition-colors"
                  >
                    {copiedField === field.label ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                  </button>
                  {copiedField === field.label && (
                    <motion.span 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-8 right-0 bg-slate-900 text-white text-[10px] px-2 py-1 rounded"
                    >
                      Copied!
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'auth' | 'dashboard'>('landing');

  // Time on page tracking
  useEffect(() => {
    const startTime = Date.now();
    return () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      console.log(`[Tracking] Time on page: ${timeSpent}s`);
    };
  }, []);

  return (
    <div className="min-h-screen selection:bg-primary/20 selection:text-primary">
      <Navbar onAuthClick={() => setCurrentPage('auth')} onLogoClick={() => setCurrentPage('landing')} />
      
      <motion.main
        key={currentPage}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {currentPage === 'landing' ? (
          <>
            <Hero onCheckReadiness={() => setCurrentPage('dashboard')} />
            <ProblemSection />
            <SolutionSection />
            <FeatureSection />
            <DemoSection />
            <PricingSection />
            <TrustSection />
            <FinalCTA onCheckReadiness={() => setCurrentPage('dashboard')} />
            <LeadCapture />
          </>
        ) : currentPage === 'auth' ? (
          <AuthPage onBack={() => setCurrentPage('landing')} onSuccess={() => setCurrentPage('dashboard')} />
        ) : (
          <Dashboard onLogout={() => setCurrentPage('landing')} />
        )}
      </motion.main>

      <Footer />
      <Analytics />
    </div>
  );
}
