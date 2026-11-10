import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import {
  ArrowDown,
  ArrowDownToLine,
  ArrowRight,
  BedDouble,
  ChevronDown,
  Droplets,
  Maximize,
  Layers3,
} from "lucide-react";
import {
  ContactForm,
  HomeMotion,
  HomeHeader,
  PartnerCarousel,
  ServiceSelector,
} from "./home-interactions";

const metrics = [
  {
    label: "Total return",
    value: "19%",
    bars: [10, 18, 14, 22, 28, 32, 26, 36, 42, 48],
  },
  {
    label: "Cumulative net cashflow",
    value: "$820,000",
    bars: [20, 28, 16, 32, 24, 36, 28, 40, 44, 48],
  },
  {
    label: "Average IRR",
    value: "14%",
    bars: [16, 24, 12, 20, 30, 22, 36, 40, 44, 48],
  },
];

const steps = [
  {
    title: "Analysis",
    text: "We review property data, tenancy, and current operations to identify risks, opportunities, and operational gaps.",
  },
  {
    title: "Proposal",
    text: "You receive a tailored service proposal with scope, pricing, KPIs, and a clear implementation plan.",
  },
  {
    title: "Transition",
    text: "We hand over documents, contacts, and operational access, then set up reporting, workflows, and launch readiness.",
  },
  {
    title: "Management",
    text: "You get regular updates, financial summaries, proactive issue resolution, and a dedicated contact person.",
  },
];

const properties = [
  {
    name: "Azura Villa",
    location: "Greece / Cyclades / Mykonos",
    image: "/images/property-azura.jpg",
    imageCrop: "azura",
    description:
      "More than a residence: a curated living concept with private concierge, peaceful courtyards, and custom interiors for daily life.",
    specs: ["650 m²", "2 floors", "8 beds", "2 baths"],
    figures: [
      ["Invest", "$7,000"],
      ["IRR", "10%"],
      ["Return", "$11,275"],
    ],
  },
  {
    name: "Serenity Harbor",
    location: "Italy / Tuscany / Siena",
    image: "/images/property-azura.jpg",
    imageCrop: "serenity",
    description:
      "A tranquil retreat among rolling hills, with lush gardens, a pool, and countryside views, ideal for relaxation and events.",
    specs: ["550 m²", "3 floors", "8 beds", "3 baths"],
    figures: [
      ["Acquire", "$9,500"],
      ["IRR", "12%"],
      ["Return", "$14,500"],
    ],
  },
  {
    name: "Lisbon Miradouro",
    location: "Portugal / Lisbon / Alfama",
    image: "/images/property-lisbon.png",
    imageCrop: "lisbon",
    description:
      "A multi-floor residence with panoramic city views, contemporary finishes, and excellent access to Lisbon's cultural district.",
    specs: ["420 m²", "2 floors", "6 beds", "2 baths"],
    illustrative: true,
  },
];

const faqs = [
  [
    "How do I change the administrator or contact person for my property?",
    "We can update the primary contact, access permissions, and communication preferences after a brief review of the property details and ownership structure.",
  ],
  [
    "What are the typical costs for property management services?",
    "Costs depend on the property, scope of services, and portfolio size. We confirm a tailored proposal after reviewing your requirements.",
  ],
  [
    "How long does the onboarding process usually take?",
    "The timeline depends on the property and the handover materials. We agree on clear milestones during the initial review.",
  ],
  [
    "Do you support properties outside your current core markets?",
    "Share the property location with us and our team will confirm the available local coverage and specialist network.",
  ],
  [
    "Can I request a custom service proposal for my portfolio?",
    "Yes. Use the form below to tell us about your property and the service scope you need.",
  ],
  [
    "How do you handle urgent maintenance or technical issues?",
    "We coordinate urgent requests with the relevant building specialists and keep the responsible contact informed.",
  ],
  [
    "Are financial reports and KPIs available digitally?",
    "Financial summaries and agreed performance indicators are included in the reporting setup for each mandate.",
  ],
];

const testimonials = [
  {
    name: "Anna Peters",
    role: "Property Owner · Apartment building",
    image: "/images/portrait-anna.png",
    quote:
      "The onboarding was clear, reporting is easy to follow, and the team helped us improve operational visibility from day one.",
  },
  {
    name: "Marcus Klein",
    role: "WEG Administrator · Mixed-use complex",
    image: "/images/portrait-marcus.png",
    quote:
      "The team helped us structure maintenance planning, communication, and budgeting in a way that made sense for our community.",
  },
  {
    name: "Sofia Lopez",
    role: "Tenant · Residential portfolio",
    image: "/images/portrait-sofia.png",
    quote:
      "Response times are fast, and the team explains every step clearly, which makes a big difference for day-to-day issues.",
  },
];

const linkGroups = [
  {
    title: "Menu",
    links: [
      ["Services", "#services"],
      ["How it works", "#how-it-works"],
      ["Featured properties", "#properties"],
      ["Partners", "#partners"],
      ["Testimonials", "#stories"],
      ["FAQ", "#faq"],
      ["Contact", "#contact"],
    ],
  },
  {
    title: "Social",
    links: [
      ["LinkedIn", "#contact"],
      ["Instagram", "#contact"],
      ["X / Twitter", "#contact"],
      ["YouTube", "#contact"],
    ],
  },
];

export default function Home() {
  return (
    <ViewTransition
      enter={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      exit={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      default="none"
    >
      <main className="home-page">
        <HomeMotion />
        <section className="home-hero" id="top">
          <div className="home-hero-image" aria-hidden="true">
            <Image src="/images/hero.png" alt="" fill priority sizes="100vw" />
          </div>
          <HomeHeader />
          <div className="home-container home-hero-copy">
            <div className="home-hero-heading">
              <h1>
                Strategic Management <em>for Maximum Yield.</em>
              </h1>
              <p>
                Beyond traditional property management, we drive sustainable
                value creation for your assets. From targeted modernizations and
                energy efficiency upgrades to strategic market positioning, we
                ensure your portfolio delivers maximum yield while securing
                long-term appreciation.
              </p>
            </div>
            <div className="home-button-row">
              <a className="home-button home-button-light" href="#contact">
                Request a custom proposal
              </a>
              <a
                className="home-button home-button-outline-light"
                href="#services"
              >
                Explore our services
              </a>
            </div>
          </div>
          <a
            className="home-scroll-cue"
            href="#numbers"
            aria-label="Scroll to company results"
          >
            <ArrowDown size={20} />
          </a>
        </section>

        <section className="home-section home-numbers" id="numbers">
          <div className="home-container">
            <div className="home-section-heading home-heading-split">
              <h2>
                <span>Reliable facilities</span>
                <em>for stable investments</em>
              </h2>
              <div className="home-intro-copy">
                <p>
                  Our assets are not just square meters, it’s an opportunity for
                  your capital to work for you.
                </p>
                <p>
                  We carefully select the best investment offers for our
                  clients.
                </p>
              </div>
            </div>
            <div className="home-metric-grid">
              {metrics.map((metric) => (
                <article className="home-metric" key={metric.label}>
                  <p>{metric.label}</p>
                  <strong>{metric.value}</strong>
                  <div className="home-bars" aria-hidden="true">
                    {metric.bars.map((bar, index) => (
                      <i
                        className={index > 5 ? "is-accent" : ""}
                        style={{ height: `${bar}px` }}
                        key={`${metric.label}-${index}`}
                      />
                    ))}
                  </div>
                </article>
              ))}
            </div>
            <p className="home-source">Source: Internal data.</p>
          </div>
        </section>

        <section className="home-section home-services" id="services">
          <div className="home-container">
            <div className="home-section-heading home-heading-split">
              <h2>
                <span>Maximize your</span>
                <em>property’s value</em>
              </h2>
              <p className="home-intro-copy">
                We handle all aspects of property management—from condominium
                and tenancy management to technical support.
              </p>
            </div>
            <div className="home-service-feature">
              <ServiceSelector />
              <div className="home-service-photo">
                <Image
                  src="/images/services-architecture.png"
                  alt="Modern residential architecture"
                  width={808}
                  height={608}
                  unoptimized
                  style={{
                    bottom: "auto",
                    height: "136.94%",
                    left: "-56.52%",
                    maxWidth: "none",
                    objectFit: "fill",
                    right: "auto",
                    top: "-34.01%",
                    width: "159.68%",
                  }}
                  sizes="(max-width: 760px) 100vw, 65vw"
                />
              </div>
            </div>
            <div className="home-process" id="how-it-works">
              <h3>How it works</h3>
              <div className="home-process-grid">
                {steps.map((step, index) => (
                  <article className="home-process-card" key={step.title}>
                    <p>Step {index + 1}</p>
                    <h4>{step.title}</h4>
                    <div>{step.text}</div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="home-section home-properties" id="properties">
          <div className="home-container">
            <div className="home-section-heading home-heading-split">
              <h2>
                <span>Featured</span>
                <em>properties</em>
              </h2>
              <div className="home-intro-copy">
                <p>
                  Explore a selection of properties, with key details and
                  investment information at a glance.
                </p>
                <a className="home-text-link" href="#contact">
                  View all properties <ArrowRight size={16} />
                </a>
              </div>
            </div>
            <div className="home-property-list">
              {properties.map((property) => (
                <article className="home-property" key={property.name}>
                  <div
                    className={`home-property-image home-property-image-${property.imageCrop}`}
                  >
                    <Image
                      src={property.image}
                      alt={`${property.name}, ${property.location}`}
                      width={837}
                      height={445}
                      unoptimized={property.imageCrop !== "lisbon"}
                      style={
                        property.imageCrop === "azura"
                          ? {
                              bottom: "auto",
                              height: "257.23%",
                              left: "-15.32%",
                              objectFit: "fill",
                              right: "auto",
                              top: "-36.42%",
                              width: "337.5%",
                            }
                          : property.imageCrop === "serenity"
                            ? {
                                bottom: "auto",
                                height: "255.75%",
                                left: "-15.32%",
                                objectFit: "fill",
                                right: "auto",
                                top: "-150%",
                                width: "337.5%",
                              }
                            : undefined
                      }
                      sizes="(max-width: 760px) 100vw, 320px"
                    />
                  </div>
                  <div className="home-property-info">
                    <div>
                      <div className="home-property-title">
                        <h3>{property.name}</h3>
                        {property.illustrative && (
                          <span>Illustrative listing</span>
                        )}
                      </div>
                      <p className="home-property-location">
                        {property.location}
                      </p>
                    </div>
                    <ul className="home-specs">
                      <li>
                        <Maximize size={13} />
                        {property.specs[0]}
                      </li>
                      <li>
                        <Layers3 size={13} />
                        {property.specs[1]}
                      </li>
                      <li>
                        <BedDouble size={13} />
                        {property.specs[2]}
                      </li>
                      <li>
                        <Droplets size={13} />
                        {property.specs[3]}
                      </li>
                    </ul>
                    <p className="home-property-description">
                      {property.description}
                    </p>
                    <div className="home-property-actions">
                      <a
                        className="home-button home-button-primary"
                        href="#contact"
                      >
                        Book now
                      </a>
                      <a
                        className="home-button home-button-outline"
                        href="#contact"
                      >
                        Download brochure <ArrowDownToLine size={14} />
                      </a>
                    </div>
                  </div>
                  <aside className="home-investment">
                    {property.illustrative ? (
                      <p className="home-illustrative-note">
                        Illustrative property.
                        <br />
                        No investment figures provided.
                      </p>
                    ) : (
                      property.figures?.map(([label, value]) => (
                        <div key={label}>
                          <span>{label}</span>
                          <strong className={label === "IRR" ? "is-blue" : ""}>
                            {value}
                          </strong>
                        </div>
                      ))
                    )}
                  </aside>
                </article>
              ))}
            </div>
            <div className="home-properties-bottom">
              <span>Selected properties</span>
              <a className="home-button home-button-outline" href="#contact">
                View all properties <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        <section className="home-section home-partners" id="partners">
          <div className="home-container">
            <div className="home-section-heading">
              <h2>
                <span>Partnership</span>
                <em>Our Partners</em>
              </h2>
              <p>
                A network of specialists across energy, building services and
                property operations. Illustrative partner marks.
              </p>
            </div>
            <PartnerCarousel />
          </div>
        </section>

        <section className="home-section home-stories" id="stories">
          <div className="home-container">
            <div className="home-section-heading">
              <h2>
                <span>Testimonials</span>
                <em>Client stories</em>
              </h2>
              <p>
                Sample testimonials for illustration only. Actual endorsements,
                results, and property outcomes are confirmed during review.
              </p>
            </div>
            <div className="home-testimonial-grid">
              {testimonials.map((item) => (
                <article className="home-testimonial" key={item.name}>
                  <div className="home-author">
                    <Image src={item.image} alt="" width={56} height={56} />
                    <div>
                      <h3>{item.name}</h3>
                      <p>{item.role}</p>
                    </div>
                  </div>
                  <blockquote>“{item.quote}”</blockquote>
                </article>
              ))}
            </div>
            <article className="home-case-study">
              <div>
                <h3>Mini case study</h3>
                <p>
                  Illustrative before-and-after example for editorial layout
                  only. Actual outcomes depend on property condition, scope, and
                  market context.
                </p>
              </div>
              <div className="home-before-after">
                <figure>
                  <div className="home-case-image home-case-image-before">
                    <Image
                      src="/images/case-study.png"
                      alt="Illustrative residence before renovation"
                      width={1584}
                      height={672}
                      unoptimized
                      style={{
                        bottom: "auto",
                        height: "262.42%",
                        left: "-1.56%",
                        objectFit: "fill",
                        right: "auto",
                        top: "-101.73%",
                        width: "203.17%",
                      }}
                      sizes="(max-width: 760px) 100vw, 50vw"
                    />
                  </div>
                  <figcaption>
                    Before · An ageing exterior and underused outdoor space.
                  </figcaption>
                </figure>
                <figure>
                  <div className="home-case-image home-case-image-after">
                    <Image
                      src="/images/case-study.png"
                      alt="Illustrative residence after renovation"
                      width={1584}
                      height={672}
                      unoptimized
                      style={{
                        bottom: "auto",
                        height: "259.4%",
                        left: "-100.44%",
                        objectFit: "fill",
                        right: "auto",
                        top: "-114.24%",
                        width: "200.84%",
                      }}
                      sizes="(max-width: 760px) 100vw, 50vw"
                    />
                  </div>
                  <figcaption>
                    After · A refreshed facade, roof solar and native planting.
                  </figcaption>
                </figure>
              </div>
            </article>
          </div>
        </section>

        <section
          className="home-section home-sustainability"
          id="sustainability"
        >
          <div className="home-container">
            <div className="home-section-heading home-heading-split">
              <h2>
                <span>Sustainability</span>
                <em>for lasting value</em>
              </h2>
              <p className="home-intro-copy">
                Thoughtful property care connects long-term value with more
                efficient buildings, durable materials and healthier places to
                live.
              </p>
            </div>
            <div className="home-sustainability-grid">
              <figure>
                <div className="home-sustainability-image">
                  <Image
                    src="/images/sustainability.png"
                    alt="Energy-conscious residential renovation"
                    fill
                    sizes="(max-width: 760px) 100vw, 46vw"
                  />
                </div>
                <figcaption>
                  Illustrative architecture · energy-conscious renovation
                </figcaption>
              </figure>
              <div className="home-priorities">
                <p className="home-green-label">RESPONSIBLE PROPERTY CARE</p>
                {[
                  [
                    "Energy-conscious operations",
                    "Review consumption and identify practical opportunities in heating, lighting and day-to-day building operations.",
                  ],
                  [
                    "Smarter modernisation",
                    "Prioritise durable materials, thoughtful maintenance and upgrades aligned with each property’s condition.",
                  ],
                  [
                    "Long-term resilience",
                    "Plan for green spaces, water-conscious upkeep and lasting comfort for residents and owners.",
                  ],
                ].map(([title, text], index) => (
                  <article key={title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </article>
                ))}
                <i />
                <p>
                  A considered approach, tailored to the building—not
                  one-size-fits-all promises.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="home-section home-faq" id="faq">
          <div className="home-container">
            <div className="home-section-heading">
              <h2>
                <span>Frequently Asked Questions</span>
              </h2>
              <p>
                Common questions about partnership, costs, timelines, geographic
                coverage, and operational support. Final details are confirmed
                during enquiry.
              </p>
            </div>
            <div className="home-faq-list">
              {faqs.map(([question, answer], index) => (
                <details key={question} open={index === 0}>
                  <summary>
                    {question}
                    <ChevronDown size={19} />
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="home-section home-contact" id="contact">
          <div className="home-container">
            <div className="home-section-heading">
              <h2>
                <span>Contact</span>
                <em>Get in touch</em>
              </h2>
              <p>
                Placeholder contact details for illustration only. Actual
                contact information, business hours, and emergency support
                channels are confirmed separately.
              </p>
            </div>
            <div className="home-contact-grid">
              <ContactForm />
              <aside className="home-contact-details">
                <h3>Contact details</h3>
                <dl>
                  <div>
                    <dt>Phone</dt>
                    <dd>[Phone number]</dd>
                  </div>
                  <div>
                    <dt>Email</dt>
                    <dd>
                      <a href="mailto:hello@example.com">hello@example.com</a>
                    </dd>
                  </div>
                  <div>
                    <dt>Address</dt>
                    <dd>
                      [Street address]<span>[City / postcode]</span>
                    </dd>
                  </div>
                  <div>
                    <dt>Business hours</dt>
                    <dd>[Business hours]</dd>
                  </div>
                </dl>
                <div className="home-map">
                  <Image
                    src="/images/area-map.png"
                    alt="Illustrative service area map"
                    fill
                    sizes="(max-width: 760px) 100vw, 50vw"
                  />
                </div>
                <div className="home-emergency">
                  <h4>Emergency contact</h4>
                  <p>
                    Dedicated urgent support is available for existing
                    customers. Please use the placeholder emergency number below
                    only for illustration.
                  </p>
                  <strong>Emergency number: [Emergency number]</strong>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <footer className="home-footer">
          <div className="home-container">
            <div className="home-footer-top">
              <div className="home-footer-brand">
                <Link href="#top" aria-label="Elovate, home">
                  <Image
                    src="/images/logo.svg"
                    alt="Elovate"
                    width={123}
                    height={32}
                  />
                </Link>
                <p>
                  Strategic property management for maximum yield, long-term
                  appreciation, and sustainable value creation across
                  residential and commercial assets.
                </p>
              </div>
              <div className="home-footer-links">
                {linkGroups.map((group) => (
                  <div key={group.title}>
                    <h3>{group.title}</h3>
                    {group.links.map(([label, href]) => (
                      <Link href={href} key={label}>
                        {label}
                      </Link>
                    ))}
                  </div>
                ))}
                <div>
                  <h3>Contact</h3>
                  <span>Phone</span>
                  <a href="tel:+000000000">[Phone number]</a>
                  <span>Email</span>
                  <a href="mailto:hello@example.com">hello@example.com</a>
                  <span>Address</span>
                  <p>
                    [Street address]
                    <br />
                    [City / postcode]
                  </p>
                  <span>Business hours</span>
                  <p>[Business hours]</p>
                </div>
              </div>
            </div>
            <div className="home-footer-bottom">
              <span>© 2026 Elovate Immobilien. All rights reserved.</span>
              <nav aria-label="Legal">
                <a href="#contact">Terms &amp; Conditions</a>
                <a href="#contact">Privacy Policy</a>
                <a href="#contact">Cookie Policy / Cookie Settings</a>
                <a href="#contact">Imprint</a>
              </nav>
            </div>
          </div>
        </footer>
      </main>
    </ViewTransition>
  );
}
