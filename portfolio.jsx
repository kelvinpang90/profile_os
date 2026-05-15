import { useState, useEffect } from "react";
import {
  Moon, Sun, Menu, X, Code2, Database, BarChart3, Mail,
  MessageCircle, ExternalLink, ChevronDown, Check, Layers,
  Server, Globe, ArrowRight, Zap, Shield, Star, Phone,
} from "lucide-react";
import Carousel from "./src/Carousel.jsx";

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────

const T = {
  en: {
    nav: {
      about: "About", skills: "Skills", portfolio: "Work",
      services: "Services", contact: "Contact", cta: "Free Consult",
    },
    hero: {
      badge: "🚀 Professional Dev Team · CRM & ERP Experts",
      line1: "Build Intelligent",
      line2: "Digital Systems",
      sub: "A professional development team specialized in CRM & ERP — helping SMBs automate workflows, streamline operations, and grow with technology.",
      cta1: "View Our Work", cta2: "Free Consultation",
      stat1v: "5+", stat1l: "Years Exp.",
      stat2v: "20+", stat2l: "Projects",
      stat3v: "98%", stat3l: "Satisfaction",
      scroll: "Scroll down",
    },
    about: {
      tag: "ABOUT US", title: "Kelvin Peng Dev Team",
      bio1: "We are a 5–10 person professional development team specialized in enterprise CRM and ERP customization. Our team spans frontend, backend, database, UI design, product, and project management — having delivered 20+ digitalization systems for manufacturing, retail, and trading SMBs.",
      bio2: "From business research and architecture design through agile development to deployment and long-term iteration, we deliver end-to-end engineering services that help SMBs complete digital transformation in 1–3 months, with technology truly driving business growth.",
      available: "Available ✓",
      tags: ["Full-Stack Dev", "Team Collaboration", "System Architecture", "Database Design", "API Integration", "Cloud Deploy"],
    },
    skills: {
      tag: "SKILLS", title: "Tech Stack",
      sub: "Years of full-stack experience covering frontend, backend, databases and DevOps.",
      cats: ["Frontend", "Backend", "Database", "Tooling"],
    },
    portfolio: {
      tag: "PORTFOLIO", title: "Case Studies",
      sub: "Core system demos delivered — click to view live demo.",
      projects: [
        {
          tag: "CRM System", title: "Smart CRM Platform",
          desc: "Full-featured CRM with customer management, sales funnels, follow-up tracking, and analytics dashboards.",
          features: ["360° Customer View", "Visual Sales Pipeline", "Automated Reminders", "Multi-dim Reports"],
          demoLabel: "View Demo",
        },
        {
          tag: "ERP System", title: "SMB Resource Planning",
          desc: "Integrated ERP platform combining procurement, inventory, finance, and HR modules for digital operations.",
          features: ["Real-time Inventory", "Financial Reports", "Purchase Order Flow", "HR Attendance"],
          demoLabel: "View Demo",
        },
      ],
    },
    services: {
      tag: "SERVICES", title: "Plans & Pricing",
      sub: "Transparent pricing, custom-built, guaranteed delivery.",
      popular: "⭐ Most Popular",
      plans: [
        {
          name: "Starter", price: "RM 5,000", unit: "+",
          desc: "Core features, fast delivery for individuals or small teams.",
          features: ["Supports up to 30 concurrent users", "1-year cloud server included (2 vCPU / 2 GB)", "Requirements & Prototype", "Single Module Dev", "Responsive UI", "Basic DB Design", "1-month Support"],
          cta: "Learn More",
        },
        {
          name: "Professional", price: "RM 25,000", unit: "+",
          desc: "Full system delivery for growing SMBs.",
          features: ["Supports up to 200 concurrent users", "1-year cloud server included (4 vCPU / 8 GB)", "Full Module Development", "Role-based Access", "API Integration", "Data Dashboards", "Cloud Deployment", "3-month Support"],
          cta: "Get Started",
          highlight: true,
        },
        {
          name: "Enterprise", price: "Custom", unit: "",
          desc: "Complex scenarios, fully tailored technical solutions.",
          features: ["Supports 1000+ high concurrency", "1-year dedicated cloud cluster included", "Deep Requirements Study", "Microservice Architecture", "Web + Mobile", "Data Migration", "Team Training & Docs", "Long-term Support"],
          cta: "Book a Call",
        },
      ],
      g1: "Delivery Guaranteed", g2: "Fast Response", g3: "Free Maintenance",
    },
    contact: {
      tag: "CONTACT", title: "Get In Touch",
      sub: "Have a project in mind? Fill in the form and I'll reply within 24 hours.",
      quickTitle: "Quick Contact",
      emailLabel: "Email", wechatLabel: "WhatsApp", wechatVal: "+60 16-862 3902",
      hoursTitle: "⏰ Response Time",
      hoursVal: "Weekdays 9:00–22:00 · Usually within 2 hours",
      fields: {
        name: "Your Name", namePh: "Jane Doe",
        company: "Contact Info", companyPh: "WhatsApp number or email address",
        budget: "Budget Range", budgetPh: "e.g. RM 5,000 – RM 500,000",
        message: "Project Description", messagePh: "e.g. CRM system, 500 users, 3-month timeline…",
      },
      submit: "Send Message",
      submitting: "Sending…",
      successTitle: "Message Sent!",
      successSub: "I'll get back to you within 24 hours. Thank you for reaching out.",
      errorTitle: "Something went wrong",
      errorSub: "Please try again, or reach out directly via WhatsApp or email.",
      errorRetry: "Try Again",
    },
    footer: "© 2026 Kelvin Peng · Professional Development Team",
  },

  zh: {
    nav: {
      about: "关于我们", skills: "技能", portfolio: "作品",
      services: "服务", contact: "联系", cta: "免费咨询",
    },
    hero: {
      badge: "🚀 专业开发团队 · CRM / ERP 系统专家",
      line1: "为您的业务构建",
      line2: "智能数字化系统",
      sub: "专业开发团队，专注 CRM · ERP 系统定制开发，帮助中小企业实现流程自动化，用技术驱动业务增长。",
      cta1: "查看作品案例", cta2: "免费咨询",
      stat1v: "5+", stat1l: "年开发经验",
      stat2v: "20+", stat2l: "交付项目",
      stat3v: "98%", stat3l: "客户满意度",
      scroll: "向下了解",
    },
    about: {
      tag: "关于我们", title: "Kelvin Peng 开发团队",
      bio1: "我们是一支 5–10 人规模的专业开发团队，深耕企业级 CRM 与 ERP 系统定制开发，成员涵盖前端、后端、数据库、UI 设计、产品与项目管理等完整角色。已为制造、零售、贸易等行业的中小企业交付 20+ 套数字化系统。",
      bio2: "从业务调研、架构设计、敏捷开发到上线运维与长期迭代，我们以工程化标准提供端到端服务，帮助客户在 1–3 个月内完成数字化转型，让技术真正服务于业务增长。",
      available: "接单中 ✓",
      tags: ["全栈开发", "团队协作", "系统架构", "数据库设计", "API 集成", "云端部署"],
    },
    skills: {
      tag: "技能", title: "技术栈",
      sub: "多年积累的全栈开发能力，覆盖前端、后端、数据库与运维。",
      cats: ["前端", "后端", "数据库", "工具链"],
    },
    portfolio: {
      tag: "作品", title: "案例展示",
      sub: "已交付的核心系统 Demo，点击查看在线演示。",
      projects: [
        {
          tag: "CRM 系统", title: "智能客户关系管理平台",
          desc: "全功能 CRM 系统，支持客户管理、销售漏斗、跟进记录、数据报表，提升转化率。",
          features: ["客户 360° 视图", "销售管道可视化", "自动化跟进提醒", "多维数据报表"],
          demoLabel: "查看 Demo",
        },
        {
          tag: "ERP 系统", title: "中小企业资源规划系统",
          desc: "一体化 ERP 平台，整合采购、库存、财务、人事模块，实现企业运营数字化管理。",
          features: ["库存实时管理", "财务核算与报表", "采购订单流转", "员工考勤管理"],
          demoLabel: "查看 Demo",
        },
      ],
    },
    services: {
      tag: "服务", title: "服务与报价",
      sub: "透明定价，按需定制，交付有保障。",
      popular: "⭐ 最受欢迎",
      plans: [
        {
          name: "基础方案", price: "RM 5,000", unit: "起",
          desc: "适合个人或初创团队，快速上线核心功能。",
          features: ["支持 30 人并发使用", "含 1 年云服务器（2核 2G）", "需求分析与原型设计", "单模块功能开发", "响应式界面", "基础数据库设计", "1 个月免费维护"],
          cta: "了解详情",
        },
        {
          name: "专业方案", price: "RM 25,000", unit: "起",
          desc: "完整系统交付，适合成长型中小企业。",
          features: ["支持 200 人并发使用", "含 1 年云服务器（4核 8G）", "全功能模块开发", "权限管理系统", "API 集成对接", "数据报表与可视化", "云端部署上线", "3 个月免费维护"],
          cta: "立即咨询",
          highlight: true,
        },
        {
          name: "企业方案", price: "定制报价", unit: "",
          desc: "复杂业务场景，量身定制技术解决方案。",
          features: ["支持 1000+ 高并发", "含 1 年独立云集群", "深度需求调研", "微服务架构设计", "多端适配（Web/移动）", "数据迁移与对接", "团队培训与文档", "长期技术支持"],
          cta: "预约沟通",
        },
      ],
      g1: "交付有保障", g2: "快速响应需求", g3: "免费售后维护",
    },
    contact: {
      tag: "联系", title: "联系我",
      sub: "有项目想法？填写表单，我会在 24 小时内回复。",
      quickTitle: "快速联系",
      emailLabel: "邮箱", wechatLabel: "WhatsApp", wechatVal: "+60 16-862 3902",
      hoursTitle: "⏰ 响应时间",
      hoursVal: "工作日 9:00–22:00，通常 2 小时内回复",
      fields: {
        name: "您的姓名", namePh: "张三",
        company: "联系方式", companyPh: "WhatsApp 号码或邮箱地址",
        budget: "预算范围", budgetPh: "例：RM 5,000 – RM 500,000",
        message: "项目需求描述", messagePh: "例：CRM 系统、500 用户、3 个月交付…",
      },
      submit: "发送需求",
      submitting: "发送中…",
      successTitle: "消息已发送！",
      successSub: "我会在 24 小时内与您联系，感谢您的信任。",
      errorTitle: "发送失败",
      errorSub: "请重试，或直接通过 WhatsApp / 邮件联系我。",
      errorRetry: "重新发送",
    },
    footer: "© 2026 Kelvin Peng · 专业开发团队",
  },
};

// ─── STATIC DATA ──────────────────────────────────────────────────────────────

const SKILL_ITEMS = [
  { icon: <Globe size={18} />, items: ["React", "Vue.js", "TypeScript", "Tailwind CSS", "HTML/CSS"] },
  { icon: <Server size={18} />, items: ["Node.js", "Python", "PHP/Laravel", "REST API", "GraphQL"] },
  { icon: <Database size={18} />, items: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Prisma ORM"] },
  { icon: <Layers size={18} />, items: ["Docker", "Git", "Linux", "Nginx", "AWS / Vercel"] },
];

const PROJECT_META = [
  {
    color: "blue",
    icon: <BarChart3 size={26} />,
    tech: ["React", "Node.js", "PostgreSQL", "Chart.js"],
    demoUrl: "https://crm.kelvinpeng.com",
    screenshots: [
      { desktop: "/screenshots/crm-desktop-1.jpg", mobile: "/screenshots/crm-mobile-1.jpg", alt: "CRM Dashboard" },
      { desktop: "/screenshots/crm-desktop-2.jpg", mobile: "/screenshots/crm-mobile-2.jpg", alt: "Customer List" },
      { desktop: "/screenshots/crm-desktop-3.jpg", mobile: "/screenshots/crm-mobile-3.jpg", alt: "Sales Pipeline" },
    ],
  },
  {
    color: "violet",
    icon: <Database size={26} />,
    tech: ["Vue.js", "Laravel", "MySQL", "Redis"],
    demoUrl: "https://erp.kelvinpeng.com",
    screenshots: [
      { desktop: "/screenshots/erp-desktop-1.jpg", mobile: "/screenshots/erp-mobile-1.jpg", alt: "ERP Inventory" },
      { desktop: "/screenshots/erp-desktop-2.jpg", mobile: "/screenshots/erp-mobile-2.jpg", alt: "Financial Reports" },
      { desktop: "/screenshots/erp-desktop-3.jpg", mobile: "/screenshots/erp-mobile-3.jpg", alt: "Purchase Orders" },
    ],
  },
];

// ─── THEMES ───────────────────────────────────────────────────────────────────

const themes = {
  dark: {
    bg: "#0f1117", surface: "#1a1d27", border: "#2a2d3a",
    text: "#e2e8f0", muted: "#8892a4",
    accent: "#6366f1", accentBg: "rgba(99,102,241,0.12)",
    blue: "#3b82f6", violet: "#8b5cf6",
    blueBg: "rgba(59,130,246,0.1)", violetBg: "rgba(139,92,246,0.1)",
    navBg: "rgba(15,17,23,0.88)",
  },
  light: {
    bg: "#f8fafc", surface: "#ffffff", border: "#e2e8f0",
    text: "#1e293b", muted: "#64748b",
    accent: "#6366f1", accentBg: "rgba(99,102,241,0.08)",
    blue: "#2563eb", violet: "#7c3aed",
    blueBg: "rgba(37,99,235,0.08)", violetBg: "rgba(124,58,237,0.08)",
    navBg: "rgba(248,250,252,0.9)",
  },
};

// ─── SHARED ───────────────────────────────────────────────────────────────────

function SectionHeader({ t, tag, title, sub }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 8 }}>
      <div style={{ color: t.accent, fontWeight: 700, fontSize: 11, letterSpacing: 2, marginBottom: 8, textTransform: "uppercase" }}>{tag}</div>
      <h2 className="section-title" style={{ fontWeight: 800, color: t.text, marginBottom: 12, letterSpacing: "-0.5px" }}>{title}</h2>
      {sub && <p style={{ color: t.muted, fontSize: 15, maxWidth: 500, margin: "0 auto", lineHeight: 1.65 }}>{sub}</p>}
    </div>
  );
}

function scrollTo(href) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────

function Navbar({ theme, lang, t, tx, onToggleTheme, onToggleLang, mobileOpen, setMobileOpen }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const navStyle = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
    background: scrolled ? t.navBg : "transparent",
    backdropFilter: scrolled ? "blur(16px)" : "none",
    borderBottom: scrolled ? `1px solid ${t.border}` : "none",
    transition: "all 0.3s ease",
  };

  const links = [
    { label: tx.nav.about, href: "#about" },
    { label: tx.nav.skills, href: "#skills" },
    { label: tx.nav.portfolio, href: "#portfolio" },
    { label: tx.nav.services, href: "#services" },
    { label: tx.nav.contact, href: "#contact" },
  ];

  const iconBtn = (onClick, children) => (
    <button onClick={onClick} className="icon-btn" style={{ background: t.accentBg, border: "none", cursor: "pointer", padding: "7px 10px", borderRadius: 8, color: t.accent, display: "flex", alignItems: "center", fontSize: 13, fontWeight: 700, gap: 2 }}>
      {children}
    </button>
  );

  return (
    <nav style={navStyle}>
      <div className="nav-inner">
        {/* Logo */}
        <div style={{ fontWeight: 800, fontSize: 18, color: t.accent }}>
          <Code2 size={16} style={{ display: "inline", marginRight: 5, verticalAlign: "middle" }} />
          KP<span style={{ color: t.text }}>.dev</span>
        </div>

        {/* Desktop links */}
        <div className="nav-links">
          {links.map((l) => (
            <button key={l.href} onClick={() => scrollTo(l.href)} className="nav-link" style={{ background: "transparent", border: "none", cursor: "pointer", color: t.muted, padding: "6px 12px", borderRadius: 8, fontSize: 14, transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = t.text}
              onMouseLeave={e => e.target.style.color = t.muted}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {iconBtn(onToggleLang, lang === "en" ? "中文" : "EN")}
          {iconBtn(onToggleTheme, theme === "dark" ? <Sun size={15} /> : <Moon size={15} />)}
          <button onClick={() => scrollTo("#contact")} className="nav-cta" style={{ background: t.accent, border: "none", cursor: "pointer", color: "#fff", padding: "8px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
            {tx.nav.cta}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="hamburger" style={{ background: t.accentBg, border: "none", cursor: "pointer", padding: 8, borderRadius: 8, color: t.accent, display: "none" }}>
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div style={{ background: t.surface, borderTop: `1px solid ${t.border}`, padding: "12px 20px 20px" }}>
          {links.map((l) => (
            <button key={l.href} onClick={() => { scrollTo(l.href); setMobileOpen(false); }}
              style={{ display: "block", width: "100%", textAlign: "left", background: "transparent", border: "none", cursor: "pointer", color: t.text, padding: "11px 0", fontSize: 15, borderBottom: `1px solid ${t.border}` }}>
              {l.label}
            </button>
          ))}
          <button onClick={() => { scrollTo("#contact"); setMobileOpen(false); }}
            style={{ marginTop: 14, width: "100%", background: t.accent, color: "#fff", border: "none", cursor: "pointer", padding: "12px 0", borderRadius: 8, fontWeight: 700, fontSize: 15 }}>
            {tx.nav.cta}
          </button>
        </div>
      )}
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero({ t, tx }) {
  const h = tx.hero;
  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 20px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: "min(600px, 100vw)", height: 600, background: `radial-gradient(circle, ${t.accentBg} 0%, transparent 70%)`, pointerEvents: "none" }} />
      <div style={{ maxWidth: 760, position: "relative", width: "100%" }}>
        <div style={{ display: "inline-block", background: t.accentBg, color: t.accent, border: `1px solid ${t.accent}44`, borderRadius: 20, padding: "6px 16px", fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
          {h.badge}
        </div>
        <h1 className="hero-title" style={{ fontWeight: 900, lineHeight: 1.1, color: t.text, marginBottom: 20, letterSpacing: "-1.5px" }}>
          {h.line1}<br />
          <span style={{ background: `linear-gradient(135deg, ${t.accent}, ${t.blue})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {h.line2}
          </span>
        </h1>
        <p style={{ fontSize: 17, color: t.muted, lineHeight: 1.75, marginBottom: 36, maxWidth: 540, margin: "0 auto 36px" }}>
          {h.sub}
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => scrollTo("#portfolio")} style={{ background: t.accent, color: "#fff", border: "none", cursor: "pointer", padding: "13px 26px", borderRadius: 10, fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", gap: 6 }}>
            {h.cta1} <ArrowRight size={15} />
          </button>
          <button onClick={() => scrollTo("#contact")} style={{ background: "transparent", color: t.text, border: `1.5px solid ${t.border}`, cursor: "pointer", padding: "13px 26px", borderRadius: 10, fontWeight: 600, fontSize: 15 }}>
            {h.cta2}
          </button>
        </div>

        {/* Stats */}
        <div className="stats-row">
          {[
            { v: h.stat1v, l: h.stat1l },
            { v: h.stat2v, l: h.stat2l },
            { v: h.stat3v, l: h.stat3l },
          ].map((s) => (
            <div key={s.l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 30, fontWeight: 800, color: t.accent }}>{s.v}</div>
              <div style={{ fontSize: 12, color: t.muted, marginTop: 3 }}>{s.l}</div>
            </div>
          ))}
        </div>

        <button onClick={() => scrollTo("#about")} style={{ background: "transparent", border: "none", cursor: "pointer", color: t.muted, display: "flex", alignItems: "center", flexDirection: "column", gap: 4, margin: "40px auto 0" }}>
          <span style={{ fontSize: 12 }}>{h.scroll}</span>
          <ChevronDown size={15} />
        </button>
      </div>
    </section>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────

function About({ t, tx }) {
  const a = tx.about;
  return (
    <section id="about" style={{ padding: "90px 20px", background: t.surface }}>
      <div className="two-col" style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <div style={{ width: 220, height: 220, borderRadius: "50%", background: `linear-gradient(135deg, ${t.accent}28, ${t.blue}28)`, border: `3px solid ${t.accent}44`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Code2 size={70} color={t.accent} strokeWidth={1.2} />
            </div>
            <div style={{ position: "absolute", bottom: 10, right: -6, background: t.accent, color: "#fff", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>
              {a.available}
            </div>
          </div>
        </div>
        <div>
          <div style={{ color: t.accent, fontWeight: 700, fontSize: 11, letterSpacing: 2, marginBottom: 8, textTransform: "uppercase" }}>{a.tag}</div>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: t.text, marginBottom: 14, letterSpacing: "-0.5px" }}>{a.title}</h2>
          <p style={{ color: t.muted, lineHeight: 1.8, marginBottom: 14, fontSize: 15 }}>{a.bio1}</p>
          <p style={{ color: t.muted, lineHeight: 1.8, marginBottom: 24, fontSize: 15 }}>{a.bio2}</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {a.tags.map((tag) => (
              <span key={tag} style={{ background: t.accentBg, color: t.accent, border: `1px solid ${t.accent}33`, borderRadius: 6, padding: "4px 12px", fontSize: 13, fontWeight: 500 }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SKILLS ───────────────────────────────────────────────────────────────────

function Skills({ t, tx }) {
  const s = tx.skills;
  return (
    <section id="skills" style={{ padding: "90px 20px", background: t.bg }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <SectionHeader t={t} tag={s.tag} title={s.title} sub={s.sub} />
        <div className="skills-grid" style={{ marginTop: 44 }}>
          {SKILL_ITEMS.map((sk, i) => (
            <div key={i} style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, padding: 22 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, color: t.accent }}>
                {sk.icon}
                <span style={{ fontWeight: 700, color: t.text, fontSize: 15 }}>{s.cats[i]}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {sk.items.map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: t.accent, flexShrink: 0 }} />
                    <span style={{ color: t.muted, fontSize: 13 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PORTFOLIO ────────────────────────────────────────────────────────────────

function Portfolio({ t, tx }) {
  const p = tx.portfolio;
  return (
    <section id="portfolio" style={{ padding: "90px 20px", background: t.surface }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <SectionHeader t={t} tag={p.tag} title={p.title} sub={p.sub} />
        <div className="two-col-equal" style={{ marginTop: 44 }}>
          {p.projects.map((proj, i) => {
            const meta = PROJECT_META[i];
            const mainColor = t[meta.color];
            const bgColor = t[`${meta.color}Bg`];
            return (
              <div key={i} style={{ background: t.bg, border: `1px solid ${t.border}`, borderRadius: 16, overflow: "hidden" }}>
                <div style={{ background: bgColor, padding: "24px 24px 20px", borderBottom: `1px solid ${t.border}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ background: `${mainColor}22`, color: mainColor, border: `1px solid ${mainColor}44`, borderRadius: 8, padding: "5px 11px", fontSize: 12, fontWeight: 700 }}>
                      {proj.tag}
                    </div>
                    <div style={{ color: mainColor }}>{meta.icon}</div>
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: t.text, marginTop: 14, marginBottom: 8, letterSpacing: "-0.3px" }}>{proj.title}</h3>
                  <p style={{ color: t.muted, fontSize: 13, lineHeight: 1.7 }}>{proj.desc}</p>
                </div>
                <Carousel slides={meta.screenshots} accentColor={mainColor} />
                <div style={{ padding: "18px 24px 22px" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: t.muted, marginBottom: 10, letterSpacing: 0.5, textTransform: "uppercase" }}>Features</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 16 }}>
                    {proj.features.map((f) => (
                      <div key={f} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                        <Check size={13} color={mainColor} />
                        <span style={{ color: t.muted, fontSize: 13 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 18 }}>
                    {meta.tech.map((tech) => (
                      <span key={tech} style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 4, padding: "3px 8px", fontSize: 11, color: t.muted }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a href={meta.demoUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: mainColor, color: "#fff", borderRadius: 8, padding: "9px 16px", textDecoration: "none", fontWeight: 600, fontSize: 13 }}>
                    {proj.demoLabel} <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────

function Services({ t, tx }) {
  const s = tx.services;
  return (
    <section id="services" style={{ padding: "90px 20px", background: t.bg }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <SectionHeader t={t} tag={s.tag} title={s.title} sub={s.sub} />
        <div className="services-grid" style={{ marginTop: 44 }}>
          {s.plans.map((plan, i) => {
            const hi = !!plan.highlight;
            return (
              <div key={i} style={{ background: hi ? t.accent : t.surface, border: hi ? `2px solid ${t.accent}` : `1px solid ${t.border}`, borderRadius: 16, padding: "26px 22px", position: "relative", boxShadow: hi ? `0 16px 50px ${t.accent}28` : "none" }}>
                {hi && (
                  <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#f59e0b", color: "#000", fontSize: 11, fontWeight: 800, padding: "4px 12px", borderRadius: 20, whiteSpace: "nowrap" }}>
                    {s.popular}
                  </div>
                )}
                <div style={{ fontWeight: 800, fontSize: 17, color: hi ? "#fff" : t.text, marginBottom: 4 }}>{plan.name}</div>
                <div style={{ color: hi ? "rgba(255,255,255,0.65)" : t.muted, fontSize: 13, marginBottom: 18 }}>{plan.desc}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 3, marginBottom: 22 }}>
                  <span style={{ fontSize: 32, fontWeight: 900, color: hi ? "#fff" : t.text }}>{plan.price}</span>
                  {plan.unit && <span style={{ color: hi ? "rgba(255,255,255,0.55)" : t.muted, fontSize: 13 }}>{plan.unit}</span>}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 24 }}>
                  {plan.features.map((f) => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 17, height: 17, borderRadius: "50%", background: hi ? "rgba(255,255,255,0.2)" : t.accentBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Check size={10} color={hi ? "#fff" : t.accent} />
                      </div>
                      <span style={{ color: hi ? "rgba(255,255,255,0.82)" : t.muted, fontSize: 13 }}>{f}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => scrollTo("#contact")} style={{ width: "100%", border: hi ? "2px solid rgba(255,255,255,0.35)" : `1.5px solid ${t.accent}`, background: hi ? "rgba(255,255,255,0.14)" : t.accentBg, color: hi ? "#fff" : t.accent, borderRadius: 8, padding: "11px 0", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
                  {plan.cta}
                </button>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 36, display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { icon: <Shield size={14} />, text: s.g1 },
            { icon: <Zap size={14} />, text: s.g2 },
            { icon: <Star size={14} />, text: s.g3 },
          ].map((g) => (
            <div key={g.text} style={{ display: "flex", alignItems: "center", gap: 6, color: t.muted, fontSize: 13 }}>
              <span style={{ color: t.accent }}>{g.icon}</span>{g.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────

// 👉 Replace with your key from https://web3forms.com
const WEB3FORMS_KEY = "d1b9a5ac-1e26-4135-b896-04acd0e688d8";

function Contact({ t, tx }) {
  const c = tx.contact;
  const [form, setForm]       = useState({ name: "", company: "", budget: "", message: "" });
  const [status, setStatus]   = useState("idle"); // "idle" | "sending" | "sent" | "error"

  const inputStyle = { width: "100%", background: t.bg, border: `1.5px solid ${t.border}`, borderRadius: 8, padding: "10px 13px", color: t.text, fontSize: 14, outline: "none", boxSizing: "border-box" };
  const labelStyle = { display: "block", fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 5 };

  return (
    <section id="contact" style={{ padding: "90px 20px", background: t.surface }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <SectionHeader t={t} tag={c.tag} title={c.title} sub={c.sub} />
        <div className="contact-grid" style={{ marginTop: 44 }}>
          {/* Info */}
          <div>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: t.text, marginBottom: 18 }}>{c.quickTitle}</h3>
            {[
              { icon: <Mail size={17} />, label: c.emailLabel, value: "contact@kelvinpeng.com", href: "mailto:contact@kelvinpeng.com" },
              { icon: <Phone size={17} />, label: c.wechatLabel, value: c.wechatVal, href: "https://wa.me/60168623902" },
            ].map((item) => (
              <a key={item.label} href={item.href} style={{ display: "flex", gap: 12, marginBottom: 18, textDecoration: "none" }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: t.accentBg, display: "flex", alignItems: "center", justifyContent: "center", color: t.accent, flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: 11, color: t.muted, marginBottom: 2 }}>{item.label}</div>
                  <div style={{ color: t.text, fontWeight: 500, fontSize: 14 }}>{item.value}</div>
                </div>
              </a>
            ))}
            <div style={{ background: t.bg, border: `1px solid ${t.border}`, borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 4 }}>{c.hoursTitle}</div>
              <div style={{ fontSize: 13, color: t.muted }}>{c.hoursVal}</div>
            </div>
          </div>

          {/* Form */}
          {status === "sent" ? (
            <div style={{ background: t.accentBg, border: `1px solid ${t.accent}44`, borderRadius: 16, padding: 40, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontSize: 44, marginBottom: 14 }}>✅</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: t.text, marginBottom: 8 }}>{c.successTitle}</div>
              <div style={{ color: t.muted, fontSize: 14 }}>{c.successSub}</div>
            </div>
          ) : status === "error" ? (
            <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 16, padding: 36, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>⚠️</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: t.text, marginBottom: 8 }}>{c.errorTitle}</div>
              <div style={{ color: t.muted, fontSize: 13, marginBottom: 20 }}>{c.errorSub}</div>
              <button onClick={() => setStatus("idle")} style={{ background: t.accent, color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
                {c.errorRetry}
              </button>
            </div>
          ) : (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setStatus("sending");
                try {
                  const res = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    headers: { "Content-Type": "application/json", Accept: "application/json" },
                    body: JSON.stringify({
                      access_key: WEB3FORMS_KEY,
                      subject: `[Portfolio] New enquiry from ${form.name}`,
                      from_name: form.name,
                      name: form.name,
                      contact: form.company,
                      budget: form.budget,
                      message: form.message,
                    }),
                  });
                  const data = await res.json();
                  setStatus(data.success ? "sent" : "error");
                } catch {
                  setStatus("error");
                }
              }}
              style={{ display: "flex", flexDirection: "column", gap: 14 }}
            >
              {[
                { key: "name", label: c.fields.name, ph: c.fields.namePh },
                { key: "company", label: c.fields.company, ph: c.fields.companyPh },
                { key: "budget", label: c.fields.budget, ph: c.fields.budgetPh },
              ].map((f) => (
                <div key={f.key}>
                  <label style={labelStyle}>{f.label}</label>
                  <input type="text" placeholder={f.ph} required value={form[f.key]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    style={inputStyle} />
                </div>
              ))}
              <div>
                <label style={labelStyle}>{c.fields.message}</label>
                <textarea rows={4} placeholder={c.fields.messagePh} required value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ ...inputStyle, resize: "vertical" }} />
              </div>
              <button type="submit" disabled={status === "sending"}
                style={{ background: status === "sending" ? `${t.accent}99` : t.accent, color: "#fff", border: "none", borderRadius: 8, padding: "13px 0", fontWeight: 700, fontSize: 15, cursor: status === "sending" ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "background 0.2s" }}>
                {status === "sending" ? c.submitting : <>{c.submit} <ArrowRight size={15} /></>}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── FLOATING BUTTONS ─────────────────────────────────────────────────────────

const WHATSAPP_URL = "https://wa.me/60168623902";
const EMAIL_URL    = "mailto:contact@kelvinpeng.com";

function FloatingButtons({ t }) {
  const [hoveredWA, setHoveredWA]  = useState(false);
  const [hoveredEM, setHoveredEM]  = useState(false);
  const [visible,   setVisible]    = useState(false);

  useEffect(() => {
    const h = () => setVisible(window.scrollY > 120);
    window.addEventListener("scroll", h);
    h();
    return () => window.removeEventListener("scroll", h);
  }, []);

  const wrap = {
    position: "fixed", bottom: 24, right: 20, zIndex: 200,
    display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end",
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(12px)",
    transition: "opacity 0.3s, transform 0.3s",
    pointerEvents: visible ? "auto" : "none",
  };

  const pill = (hovered, color, href, icon, labelEN, labelZH) => (
    <a href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => hovered === "wa" ? setHoveredWA(true) : setHoveredEM(true)}
      onMouseLeave={() => hovered === "wa" ? setHoveredWA(false) : setHoveredEM(false)}
      style={{
        display: "flex", alignItems: "center", gap: 0,
        background: color, color: "#fff",
        borderRadius: 50, textDecoration: "none",
        boxShadow: `0 4px 20px ${color}55`,
        overflow: "hidden",
        transition: "box-shadow 0.25s, gap 0.25s",
        ...(hovered === "wa" ? (hoveredWA ? { gap: 8, boxShadow: `0 6px 28px ${color}77` } : {}) :
            (hoveredEM ? { gap: 8, boxShadow: `0 6px 28px ${color}77` } : {})),
      }}
    >
      {/* Label slides in */}
      <span style={{
        fontSize: 13, fontWeight: 700, whiteSpace: "nowrap",
        maxWidth: (hovered === "wa" ? hoveredWA : hoveredEM) ? 120 : 0,
        opacity: (hovered === "wa" ? hoveredWA : hoveredEM) ? 1 : 0,
        overflow: "hidden",
        transition: "max-width 0.25s ease, opacity 0.2s ease",
        paddingLeft: (hovered === "wa" ? hoveredWA : hoveredEM) ? 14 : 0,
      }}>
        {labelEN}
      </span>
      {/* Icon circle */}
      <div style={{ width: 50, height: 50, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {icon}
      </div>
    </a>
  );

  return (
    <div style={wrap}>
      {pill("em", t.accent,  EMAIL_URL,    <Mail size={20} />,  "Email Us",  "发送邮件")}
      {pill("wa", "#25D366", WHATSAPP_URL, <Phone size={20} />, "WhatsApp",  "WhatsApp")}
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer({ t, tx }) {
  return (
    <footer style={{ background: t.bg, borderTop: `1px solid ${t.border}`, padding: "22px 20px", textAlign: "center" }}>
      <div style={{ color: t.muted, fontSize: 13 }}>
        {tx.footer} ·{" "}
        <a href="mailto:contact@kelvinpeng.com" style={{ color: t.accent, textDecoration: "none" }}>contact@kelvinpeng.com</a>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [lang, setLang] = useState("en");
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = themes[theme];
  const tx = T[lang];

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.title = lang === "zh"
      ? "Kelvin Peng · CRM 与 ERP 开发团队"
      : "Kelvin Peng · CRM & ERP Development Team";
  }, [lang]);

  return (
    <div style={{ background: t.bg, color: t.text, minHeight: "100vh", fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", transition: "background 0.3s, color 0.3s" }}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }

        /* NAV */
        .nav-inner { max-width: 1040px; margin: 0 auto; height: 62px; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; }
        .nav-links { display: flex; gap: 2px; align-items: center; }
        .nav-cta { display: block; }
        .hamburger { display: none !important; }

        /* HERO */
        .hero-title { font-size: clamp(34px, 7vw, 62px); }
        .stats-row { display: flex; gap: 36px; justify-content: center; margin-top: 52px; flex-wrap: wrap; }

        /* SECTIONS */
        .section-title { font-size: clamp(26px, 4vw, 40px); }
        .two-col { display: grid; grid-template-columns: 1fr 1.4fr; gap: 52px; align-items: center; }
        .two-col-equal { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .skills-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .contact-grid { display: grid; grid-template-columns: 1fr 1.6fr; gap: 48px; align-items: start; }

        /* INPUTS */
        input, textarea { transition: border-color 0.2s; }
        input:focus, textarea:focus { border-color: #6366f1 !important; }
        input::placeholder, textarea::placeholder { color: #8892a4; opacity: 1; }
        button:hover { opacity: 0.86; }
        a:hover { opacity: 0.8; }

        /* TABLET */
        @media (max-width: 900px) {
          .skills-grid { grid-template-columns: repeat(2, 1fr); }
          .services-grid { grid-template-columns: 1fr; max-width: 400px; margin: 44px auto 0; }
          .two-col { grid-template-columns: 1fr; gap: 32px; text-align: center; }
          .two-col > div:first-child { justify-content: center; }
          .contact-grid { grid-template-columns: 1fr; gap: 32px; }
        }

        /* MOBILE */
        @media (max-width: 640px) {
          .nav-links { display: none; }
          .nav-cta { display: none; }
          .hamburger { display: flex !important; }
          .hero-title { letter-spacing: -0.5px; }
          .stats-row { gap: 24px; margin-top: 40px; }
          .two-col-equal { grid-template-columns: 1fr; }
          .skills-grid { grid-template-columns: 1fr 1fr; }
          .services-grid { grid-template-columns: 1fr; max-width: 100%; margin: 36px 0 0; }
          .contact-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <Navbar
        theme={theme} lang={lang} t={t} tx={tx}
        onToggleTheme={() => setTheme((p) => p === "dark" ? "light" : "dark")}
        onToggleLang={() => setLang((p) => p === "en" ? "zh" : "en")}
        mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}
      />
      <Hero t={t} tx={tx} />
      <About t={t} tx={tx} />
      <Skills t={t} tx={tx} />
      <Portfolio t={t} tx={tx} />
      <Services t={t} tx={tx} />
      <Contact t={t} tx={tx} />
      <Footer t={t} tx={tx} />
      <FloatingButtons t={t} />
    </div>
  );
}
