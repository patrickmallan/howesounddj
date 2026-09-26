import type { Metadata } from "next";
import { ContactAvailabilityForm } from "@/components/contact-availability-form";
import { ContactMessageDrawer } from "@/components/contact-message-drawer";
import { MeterMatrixHeading } from "@/components/meter-matrix-heading";
import styles from "./contact-page.module.css";

/** Read Turnstile at request time so local and hosted environments use their current key. */
function turnstileSiteKey(): string {
  return (
    process.env.TURNSTILE_SITE_KEY?.trim() ||
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ||
    ""
  );
}

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Contact | Howe Sound DJ" },
  description:
    "Check your wedding date with Howe Sound DJ. If Patrick is available, book a complimentary consultation right away.",
  openGraph: {
    images: ["/og-share.jpg"],
    title: "Contact | Howe Sound DJ",
    description:
      "Check your wedding date with Howe Sound DJ. If Patrick is available, book a complimentary consultation right away.",
    url: "/contact",
  },
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const siteKey = turnstileSiteKey();

  return (
    <main className={`${styles.page} hsdj-interior hsdj-contact-page`}>
      <section id="availability" className={styles.stage} aria-labelledby="contact-title" style={{ scrollMarginTop: "9rem" }}>
        <div className={styles.artwork} aria-hidden="true" />
        <div className={styles.stageShade} aria-hidden="true" />
        <div className={styles.signalTop} aria-hidden="true" />

        <div className={styles.stageInner}>
          <header className={styles.intro}>
            <p className={styles.eyebrow}>Contact / Squamish + Sea-to-Sky</p>
            <MeterMatrixHeading id="contact-title" text="Have a wedding date?" lines={["Have a", "wedding date?"]} className={styles.title} />
            <p className={styles.lede}>
              Check it here. If I&apos;m free, you can book a consult right away.
            </p>
            <div className={styles.signalWave} aria-hidden="true" />
          </header>

          <ContactAvailabilityForm turnstileSiteKey={siteKey} />
        </div>
      </section>

      <ContactMessageDrawer turnstileSiteKey={siteKey} />
    </main>
  );
}
