type ControllerButtonFaceProps = {
  eyebrow: string;
  label: string;
  control: "play" | "cue" | "message";
};

export function ControllerButtonFace({ eyebrow, label, control }: ControllerButtonFaceProps) {
  return (
    <span className="hsdj-controller-button__face">
      <span className="hsdj-controller-button__indicator" aria-hidden="true">
        {control === "play" ? "▶" : control === "cue" ? "●" : "✦"}
      </span>
      <span className="hsdj-controller-button__copy">
        <small>{eyebrow}</small>
        <strong>{label}</strong>
      </span>
    </span>
  );
}
