import Link from "next/link";
import { ControllerButtonFace } from "@/components/controller-button-face";

type AboutHardwareLinkProps = {
  href: string;
  label: string;
  eyebrow: string;
  control: "cue" | "play" | "pad";
};

export function AboutHardwareLink({ href, label, eyebrow, control }: AboutHardwareLinkProps) {
  const content = <ControllerButtonFace eyebrow={eyebrow} label={label} control={control === "pad" ? "message" : control} />;
  const className = `hsdj-controller-button hsdj-controller-button--${control === "pad" ? "message" : control} about-hardware-link`;

  if (href.startsWith("#")) {
    return <a className={className} href={href} data-physical-control={control}>{content}</a>;
  }
  return <Link className={className} href={href} prefetch={false} data-physical-control={control}>{content}</Link>;
}
