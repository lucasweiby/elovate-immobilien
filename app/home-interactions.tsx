"use client";

import Image from "next/image";
import Link from "next/link";
import {
  startTransition,
  useEffect,
  useRef,
  useState,
  ViewTransition,
  type FormEvent,
} from "react";
import { ChevronDown, Menu, X } from "lucide-react";

const navigation = [
  ["About us", "#numbers"],
  ["Our Buildings", "#properties"],
  ["Blog", "/posts"],
  ["Contact us", "#contact"],
];

export function HomeMotion() {
  useEffect(() => {
    const page = document.querySelector<HTMLElement>(".home-page");
    if (
      !page ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const targets = [
      ...page.querySelectorAll<HTMLElement>(
        ".home-header, .home-hero-copy, .home-scroll-cue, .home-section-heading, .home-metric, .home-service-feature, .home-process-card, .home-property, .home-properties-bottom, .home-partner-carousel, .home-testimonial, .home-case-study, .home-sustainability-grid, .home-faq-list details, .home-contact-grid, .home-footer-top, .home-footer-bottom",
      ),
    ];

    if (!targets.length || !("IntersectionObserver" in window)) return;

    page.classList.add("home-motion-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        }
      },
      { rootMargin: "-4% 0px -8% 0px", threshold: 0.04 },
    );

    targets.forEach((target, index) => {
      target.classList.add("home-reveal");
      target.style.setProperty("--reveal-delay", `${(index % 5) * 55}ms`);
      observer.observe(target);
    });

    return () => {
      observer.disconnect();
      page.classList.remove("home-motion-ready");
      targets.forEach((target) => {
        target.classList.remove("home-reveal", "is-visible");
        target.style.removeProperty("--reveal-delay");
      });
    };
  }, []);

  return null;
}

export function HomeHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"English" | "German (Deutsch)">(
    "English",
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerBlur, setHeaderBlur] = useState(0);
  const scrollReady = useRef(false);
  const scrolledRef = useRef(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateScrollState = () => {
      const nextState = window.scrollY > 24;
      if (
        scrollReady.current &&
        scrolledRef.current !== nextState &&
        !media.matches
      ) {
        setHeaderBlur((tick) => tick + 1);
      }
      scrolledRef.current = nextState;
      setIsScrolled((currentState) =>
        currentState === nextState ? currentState : nextState,
      );
    };

    updateScrollState();
    scrollReady.current = true;
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  return (
    <div className="home-header-anchor">
      <header
        className={`home-header${isScrolled ? " is-scrolled" : ""}`}
        style={{
          viewTransitionName: "site-header",
          animationName:
            headerBlur > 0
              ? headerBlur % 2 === 1
                ? "home-header-blur"
                : "home-header-blur-alt"
              : undefined,
          animationDuration: headerBlur > 0 ? "640ms" : undefined,
          animationTimingFunction:
            headerBlur > 0 ? "cubic-bezier(0.2, 0.7, 0.2, 1)" : undefined,
        }}
      >
        <Link className="home-brand" href="#top" aria-label="Elovate, home">
          <span className="home-brand-logo" aria-hidden="true" />
          <Image
            className="home-brand-logo-color"
            src="/images/logo-color.png"
            alt=""
            width={123}
            height={32}
            priority
          />
        </Link>
        <nav
          className={menuOpen ? "home-nav is-open" : "home-nav"}
          aria-label="Main navigation"
        >
          {navigation.map(([label, href]) => (
            <Link
              href={href}
              key={label}
              transitionTypes={href.startsWith("/") ? ["nav-forward"] : []}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="home-language-wrap">
          <button
            className="home-language"
            type="button"
            aria-label={`Selected language: ${language}`}
            aria-haspopup="menu"
            aria-expanded={languageMenuOpen}
            onClick={() => setLanguageMenuOpen((open) => !open)}
          >
            {language === "English" ? (
              <Image src="/images/flag.png" alt="" width={27} height={16} />
            ) : (
              <GermanFlag />
            )}
            <span>{language === "English" ? "English" : "Deutsch"}</span>
            <ChevronDown size={16} />
          </button>
          {languageMenuOpen && (
            <div className="home-language-menu" role="menu">
              <button
                type="button"
                role="menuitemradio"
                aria-checked={language === "English"}
                onClick={() => {
                  setLanguage("English");
                  setLanguageMenuOpen(false);
                }}
              >
                <Image src="/images/flag.png" alt="" width={27} height={16} />
                English
              </button>
              <button
                type="button"
                role="menuitemradio"
                aria-checked={language === "German (Deutsch)"}
                onClick={() => {
                  setLanguage("German (Deutsch)");
                  setLanguageMenuOpen(false);
                }}
              >
                <GermanFlag />
                German (Deutsch)
              </button>
            </div>
          )}
        </div>
        <button
          className="home-menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>
    </div>
  );
}

function GermanFlag() {
  return (
    <span className="home-flag-german" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

export function ContactForm() {
  const [profile, setProfile] = useState("Property Owner");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form className="home-proposal-form" onSubmit={handleSubmit}>
      <h3>Request a proposal</h3>
      <fieldset>
        <legend>Profile</legend>
        <div className="home-profile-options">
          {["Property Owner", "WEG", "Tenant"].map((option) => (
            <button
              aria-pressed={profile === option}
              className={profile === option ? "is-selected" : ""}
              key={option}
              onClick={() => setProfile(option)}
              type="button"
            >
              {option}
            </button>
          ))}
        </div>
      </fieldset>
      <label>
        Property Type
        <select defaultValue="" required>
          <option value="" disabled>
            Select property type
          </option>
          <option>Residential</option>
          <option>Commercial</option>
          <option>Mixed-use</option>
        </select>
      </label>
      <label>
        Number of Units
        <input
          min="1"
          name="units"
          placeholder="Enter number of units"
          required
          type="number"
        />
      </label>
      <label>
        City
        <input name="city" placeholder="Enter city" required />
      </label>
      <label className="home-consent">
        <input required type="checkbox" />
        <span>
          I agree to be contacted about the proposal and understand that actual
          costs and timelines are confirmed during review.
        </span>
      </label>
      <button className="home-button home-button-primary" type="submit">
        {submitted ? "Request received" : "Submit proposal request"}
      </button>
      {submitted && (
        <p className="home-form-status" role="status">
          Thank you. Our team will be in touch.
        </p>
      )}
    </form>
  );
}

const serviceOptions = [
  {
    title: "Holistic property management",
    description:
      "We handle all aspects of property management—from condominium and tenancy management to technical support. With clear processes, digital transparency, and our strong network, we ensure value retention, efficiency, and satisfied owners and tenants.",
  },
  {
    title: "Real estate valuation & strategic development",
    description:
      "We assess each property’s condition, market position, and potential, then shape a practical development plan to strengthen its long-term value.",
  },
  {
    title: "Predictive maintenance",
    description:
      "We monitor building needs, plan maintenance ahead, and coordinate timely interventions to reduce disruption and protect your property over time.",
  },
  {
    title: "Financial clarity & control",
    description:
      "Clear budgets, dependable reporting, and ongoing oversight help you understand costs, track performance, and make informed decisions.",
  },
  {
    title: "Personal service & reliability",
    description:
      "A dedicated point of contact keeps communication direct, follows up on open tasks, and coordinates the right support for owners and tenants.",
  },
];

export function ServiceSelector() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedService = serviceOptions[selectedIndex];

  return (
    <div className="home-service-panel">
      <ViewTransition
        key={selectedIndex}
        name="service-copy"
        share="auto"
        enter="auto"
        default="none"
      >
        <div className="home-service-copy" aria-live="polite">
          <h3>{selectedService.title}</h3>
          <p>{selectedService.description}</p>
          <a className="home-button home-button-outline" href="#contact">
            Get consultation
          </a>
        </div>
      </ViewTransition>
      <div className="home-service-nav" role="group" aria-label="Our services">
        {serviceOptions.map((service, index) => (
          <button
            aria-pressed={selectedIndex === index}
            className={selectedIndex === index ? "is-current" : ""}
            key={service.title}
            onClick={() => startTransition(() => setSelectedIndex(index))}
            type="button"
          >
            {service.title}
          </button>
        ))}
      </div>
    </div>
  );
}

const partners = [
  {
    name: "Logoipsum wordmark",
    width: 203,
    image: "/images/partner-wordmark-one.svg",
  },
  {
    name: "Logoipsum mark",
    width: 48,
    image: "/images/partner-mark-one.svg",
  },
  {
    name: "Logoipsum logo",
    width: 373,
    mark: "/images/partner-logomark-main.svg",
    wordmark: "/images/partner-logotype-main.svg",
  },
  {
    name: "Logoipsum mark",
    width: 48,
    image: "/images/partner-mark-two.svg",
  },
  {
    name: "Logoipsum logo",
    width: 283,
    mark: "/images/partner-logogram-two.svg",
    wordmark: "/images/partner-logotype-two.svg",
    isVariantTwo: true,
  },
  {
    name: "Logoipsum mark",
    width: 48,
    image: "/images/partner-mark-three.svg",
  },
];

const partnerList = [...partners, ...partners];

export function PartnerCarousel() {
  return (
    <div className="home-partner-carousel">
      <div
        className="home-partner-window"
        aria-label="Illustrative partner marks"
      >
        <div className="home-partner-track">
          <div className="home-partner-strip">
            {partnerList.map((partner, index) => (
              <div
                className={`home-partner-logo${partner.isVariantTwo ? " home-partner-logo-two" : ""}`}
                key={`partner-track-1-${index}`}
                style={{ width: partner.width }}
                role="img"
                aria-label={partner.name}
              >
                {partner.image ? (
                  <Image
                    src={partner.image}
                    alt=""
                    fill
                    sizes={`${partner.width}px`}
                  />
                ) : (
                  <>
                    <Image
                      className="home-partner-logo-mark"
                      src={partner.mark!}
                      alt=""
                      width={partner.width === 373 ? 58 : 74}
                      height={48}
                      sizes="74px"
                      style={{
                        bottom: "auto",
                        height: "100%",
                        left: 0,
                        objectFit: "fill",
                        right: "auto",
                        top: 0,
                        width: partner.width === 373 ? "15.43%" : "26.27%",
                      }}
                    />
                    <Image
                      className="home-partner-logo-wordmark"
                      src={partner.wordmark!}
                      alt=""
                      width={partner.width === 373 ? 296 : 197}
                      height={partner.width === 373 ? 26 : 27}
                      sizes="300px"
                      style={{
                        bottom: "auto",
                        height: partner.width === 373 ? "53.13%" : "55.15%",
                        left: partner.width === 373 ? "20.58%" : "30.22%",
                        objectFit: "fill",
                        right: "auto",
                        top: "22.5%",
                        width: partner.width === 373 ? "79.33%" : "69.63%",
                      }}
                    />
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="home-partner-strip" aria-hidden="true">
            {partnerList.map((partner, index) => (
              <div
                className={`home-partner-logo${partner.isVariantTwo ? " home-partner-logo-two" : ""}`}
                key={`partner-track-2-${index}`}
                style={{ width: partner.width }}
                role="presentation"
              >
                {partner.image ? (
                  <Image
                    src={partner.image}
                    alt=""
                    fill
                    sizes={`${partner.width}px`}
                  />
                ) : (
                  <>
                    <Image
                      className="home-partner-logo-mark"
                      src={partner.mark!}
                      alt=""
                      width={partner.width === 373 ? 58 : 74}
                      height={48}
                      sizes="74px"
                      style={{
                        bottom: "auto",
                        height: "100%",
                        left: 0,
                        objectFit: "fill",
                        right: "auto",
                        top: 0,
                        width: partner.width === 373 ? "15.43%" : "26.27%",
                      }}
                    />
                    <Image
                      className="home-partner-logo-wordmark"
                      src={partner.wordmark!}
                      alt=""
                      width={partner.width === 373 ? 296 : 197}
                      height={partner.width === 373 ? 26 : 27}
                      sizes="300px"
                      style={{
                        bottom: "auto",
                        height: partner.width === 373 ? "53.13%" : "55.15%",
                        left: partner.width === 373 ? "20.58%" : "30.22%",
                        objectFit: "fill",
                        right: "auto",
                        top: "22.5%",
                        width: partner.width === 373 ? "79.33%" : "69.63%",
                      }}
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
