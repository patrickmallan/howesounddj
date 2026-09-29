import styles from "./venue-flow-diagram.module.css";

type Motif = "mountain" | "forest" | "river" | "field" | "room" | "rail";
type Plan = { motif: Motif; reception?: boolean; title: string; points: readonly [number, number][] };

const plans: Record<string, Plan> = {
  "sea-to-sky-gondola": { motif: "mountain", title: "From the view to the dance floor", points: [[26, 92], [266, 182], [40, 292]] },
  "cheekye-ranch": { motif: "field", title: "A day with room to roam", points: [[264, 78], [28, 188], [260, 296]] },
  "sitka-farms": { motif: "field", title: "Easy afternoon. Full reception.", points: [[28, 74], [264, 182], [56, 294]] },
  sunwolf: { motif: "river", title: "Follow the day into the night", points: [[28, 90], [260, 170], [58, 292]] },
  "squamish-valley-golf-club": { motif: "field", title: "From gathering to celebrating", points: [[264, 82], [28, 180], [264, 288]] },
  "cheakamus-centre": { motif: "forest", title: "A gathering among the trees", points: [[28, 84], [266, 180], [28, 292]] },
  "glacier-valley-farm": { motif: "mountain", title: "Open space. Your kind of night.", points: [[258, 94], [30, 196], [262, 296]] },
  "howe-sound-brewing": { motif: "room", reception: true, title: "Warm up the room", points: [[28, 80], [260, 188], [30, 298]] },
  "house-of-lager-brewing-company": { motif: "room", reception: true, title: "One celebration, three energies", points: [[258, 80], [28, 190], [260, 298]] },
  "evans-lake": { motif: "river", title: "A little escape. A big night.", points: [[260, 86], [28, 184], [248, 294]] },
  "brackendale-art-gallery": { motif: "room", reception: true, title: "Let the room change tempo", points: [[34, 92], [264, 190], [56, 298]] },
  "railway-museum-of-british-columbia": { motif: "rail", title: "Three stops. One celebration.", points: [[262, 80], [28, 188], [256, 292]] },
  "capilano-university-squamish-campus": { motif: "forest", title: "Give each part its own space", points: [[28, 80], [262, 186], [40, 298]] },
};

function Scene({ motif }: { motif: Motif }) {
  if (motif === "mountain") return <path d="M0 78 72 18 123 57 186 8 259 74 321 26 401 85 447 43 480 65 M142 47 186 8 215 43 193 35 180 48 168 38" />;
  if (motif === "river") return <path d="M208 0 C350 70 135 135 236 209 S365 325 211 420 M237 0 C379 70 164 135 265 209 S394 325 240 420" />;
  if (motif === "rail") return <><path d="M205 0V420 M234 0V420" />{Array.from({ length: 14 }, (_, i) => <path key={i} d={`M197 ${i * 32}H242`} />)}</>;
  if (motif === "forest") return <>{[32, 106, 190, 282, 365, 448].map((x, i) => <path key={x} d={`M${x} 6 l-24 38 h13 l-22 30 h66 l-22 -30 h13 Z M${x} 74v20`} transform={`translate(0 ${i % 2 * 13})`} />)}</>;
  if (motif === "field") return <path d="M0 42 Q120 0 240 43T480 43 M0 66Q120 24 240 67T480 67 M0 402Q100 364 220 402T480 402 M15 31v40 M48 20v42 M407 30v40 M448 19v43" />;
  return <><path d="M15 66V14H465V65 M15 360v47H465v-48" />{[55, 145, 235, 325, 415].map((x) => <circle key={x} cx={x} cy="36" r="7" />)}</>;
}

export function VenueFlowDiagram({ slug, name }: { slug: string; name: string }) {
  const plan = plans[slug];
  if (!plan) return null;
  const labels = plan.reception ? ["Cocktails", "Dinner", "Dance party"] : ["Ceremony", "Cocktails", "Reception"];
  const colors = ["#ffe020", "#ff4e8c", "#58e9ee"];
  const [a, b, c] = plan.points.map(([x, y]) => [x + 88, y + 44]);
  return (
    <figure className={styles.diagram} aria-label={`A possible celebration flow for ${name}`}>
      <figcaption><span>PLAN THE FEELING</span><strong>{plan.title}</strong></figcaption>
      <svg viewBox="0 0 480 420" role="img" aria-label={labels.join(" to ")}>
        <g className={styles.scenery}><Scene motif={plan.motif} /></g>
        <path className={styles.route} d={`M${a[0]} ${a[1]} C${a[0]} ${b[1]},${b[0]} ${a[1]},${b[0]} ${b[1]} S${c[0]} ${b[1]},${c[0]} ${c[1]}`} />
        {plan.points.map(([x, y], i) => (
          <g key={labels[i]} transform={`translate(${x} ${y})`}>
            <rect x="5" y="6" width="176" height="86" rx="5" fill="#1255ff" />
            <rect width="176" height="86" rx="5" fill="#0a1920" stroke={colors[i]} strokeWidth="2" />
            <path d="M12 0H164" stroke={colors[i]} strokeWidth="5" />
            <circle cx="19" cy="24" r="5" fill={colors[i]} />
            <text x="30" y="30" fill={colors[i]} fontSize="23" fontWeight="900">{labels[i]}</text>
            <g fill="none" stroke={colors[i]} strokeWidth="2" opacity=".85">
              {labels[i] === "Ceremony" ? <path d="M22 65V52a12 12 0 0 1 24 0v13 M18 65h12m9 0h12 M62 51h10v12H62z M82 51h10v12H82z" />
                : labels[i] === "Cocktails" ? <path d="M20 43h26L33 56Zm13 13v10m-8 0h16 M56 43h26L69 56Zm13 13v10m-8 0h16" />
                : labels[i] === "Dance party" ? <path d="M20 64V48m8 16V39m8 25V46m8 18V54m8 10V42m8 22V48m8 16V37m8 27V46m8 18V52" />
                : <><ellipse cx="54" cy="54" rx="30" ry="10" /><path d="M24 54v12m60-12v12 M30 39h10m8-3h12m8 3h10 M30 72h10m8 3h12m8-3h10" /></>}
            </g>
            <path d="M12 72h10m5 0h10m5 0h10m5 0h10" stroke={colors[i]} strokeWidth="3" />
            <text x="157" y="76" fill={colors[i]} fontSize="12" fontWeight="800">{i + 1}</text>
          </g>
        ))}
      </svg>
      <p>One possible flow, not a floor plan. We’ll confirm the spaces and setup with your venue.</p>
    </figure>
  );
}
