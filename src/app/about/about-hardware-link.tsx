import Image from "next/image";
import Link from "next/link";

const controls = {
  cue: "/images/hsdj-redesign/controls/buttons/cue-round.png",
  play: "/images/hsdj-redesign/controls/buttons/play-pause-round.png",
  pad: "/images/hsdj-redesign/controls/pads/orange.png",
} as const;

type AboutHardwareLinkProps = {
  href: string;
  label: string;
  eyebrow: string;
  control: keyof typeof controls;
};

export function AboutHardwareLink({ href, label, eyebrow, control }: AboutHardwareLinkProps) {
  const content = (
    <>
      <span className="about-hardware-link__control" aria-hidden="true">
        <Image src={controls[control]} alt="" width={130} height={130} sizes="84px" />
      </span>
      <span className="about-hardware-link__copy">
        <span>{eyebrow}</span>
        <strong>{label}</strong>
      </span>
      <span className="about-hardware-link__arrow" aria-hidden="true">↗</span>
    </>
  );
  const className = `about-hardware-link about-hardware-link--${control}`;

  if (href.startsWith("#")) {
    return <a className={className} href={href} data-physical-control={control}>{content}</a>;
  }
  return <Link className={className} href={href} prefetch={false} data-physical-control={control}>{content}</Link>;
}
