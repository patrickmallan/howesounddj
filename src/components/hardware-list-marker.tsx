import Image from "next/image";

import styles from "@/app/homepage-redesign.module.css";

const STANDARD_KNOB = "/images/hsdj-redesign/controls/rotary/eq-black.png";

export function HardwareListMarker() {
  return (
    <span className={styles.hardwareMarker} aria-hidden="true">
      <Image src={STANDARD_KNOB} alt="" width={110} height={110} />
    </span>
  );
}
