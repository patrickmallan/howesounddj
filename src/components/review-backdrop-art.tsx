import Image from "next/image";
import styles from "@/app/homepage-set.module.css";

export function ReviewBackdropArt() {
  return (
    <div className={styles.remembersArt} aria-hidden="true">
      <Image
        src="/images/hsdj-redesign/wedding-story/review-couples-collage-v1.webp"
        alt=""
        fill
        sizes="(max-width: 700px) 92vw, 40vw"
      />
    </div>
  );
}
