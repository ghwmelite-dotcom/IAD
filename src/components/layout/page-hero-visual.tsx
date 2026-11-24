import Image from 'next/image';
import type { ReactNode } from 'react';
import {
  ArrowUpRight,
  BadgeCheck,
  Bell,
  BookOpen,
  Building2,
  CalendarDays,
  Check,
  CheckCheck,
  ClipboardCheck,
  Clock3,
  Compass,
  FileCheck2,
  FileText,
  Fingerprint,
  Landmark,
  LockKeyhole,
  Mail,
  MapPin,
  MessageSquare,
  Newspaper,
  Scale,
  SearchCheck,
  ShieldCheck,
  Users,
} from 'lucide-react';

export type PageHeroTheme =
  | 'institution'
  | 'vision'
  | 'structure'
  | 'leadership'
  | 'functions'
  | 'network'
  | 'services'
  | 'audit'
  | 'advisory'
  | 'rights'
  | 'feedback'
  | 'protection'
  | 'news'
  | 'events'
  | 'knowledge'
  | 'registry'
  | 'verification'
  | 'tracking'
  | 'contact'
  | 'transparency';

const ink = 'var(--color-text)';
const line = 'var(--color-border)';
const green = 'var(--color-primary)';
const gold = 'var(--color-home-gold)';
const paper = 'var(--color-surface-card)';
const canvas = 'var(--color-surface)';
const structurePoints = [
  [133, 25],
  [46, 146],
  [133, 146],
  [220, 146],
] as const;
const networkPoints = [
  [40, 28],
  [227, 28],
  [40, 146],
  [227, 146],
  [133, 74],
] as const;
const servicePoints = [
  [54, 53],
  [234, 53],
  [54, 149],
  [234, 149],
] as const;

function Paper({
  x = 60,
  y = 24,
  w = 180,
  h = 174,
  rotate = 0,
}: {
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  rotate?: number;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx="12"
      fill={paper}
      stroke={line}
      strokeWidth="1.5"
      transform={`rotate(${rotate} ${x + w / 2} ${y + h / 2})`}
    />
  );
}

function Lines({ x = 84, y = 124, w = 130 }: { x?: number; y?: number; w?: number }) {
  return (
    <g stroke={line} strokeWidth="3" strokeLinecap="round">
      <path d={`M${x} ${y}h${w} M${x} ${y + 14}h${w} M${x} ${y + 28}h${w * 0.65}`} />
    </g>
  );
}

/** Subject-specific, decorative illustrations; these do not represent live data. */
export function PageHeroVisual({ theme }: { theme: PageHeroTheme }) {
  if (theme === 'institution' || theme === 'leadership') {
    return (
      <div
        aria-hidden="true"
        className="relative mx-auto flex h-full w-full max-w-xs items-center justify-center"
      >
        <div className="absolute inset-y-1 left-1/2 aspect-square -translate-x-1/2 rounded-full border border-home-gold/20" />
        <div className="absolute inset-y-5 left-1/2 aspect-square -translate-x-1/2 rounded-full border border-border bg-white" />
        {theme === 'institution' ? (
          <Image
            data-hero-detail
            src="/images/ohcs-crest.png"
            alt=""
            width={116}
            height={138}
            className="relative h-[72%] w-auto object-contain"
          />
        ) : (
          <div className="relative h-[90%] aspect-[4/5] overflow-hidden rounded-t-full rounded-b-2xl border-4 border-white shadow-sm">
            <Image
              src="/images/leadership/solomon-wemegah-iaa-2026.jpeg"
              alt=""
              fill
              sizes="(max-width: 768px) 100px, 220px"
              className="object-cover object-[42%_50%]"
            />
          </div>
        )}
      </div>
    );
  }

  let drawing: ReactNode;
  switch (theme) {
    case 'knowledge':
      drawing = (
        <>
          <Paper x={70} y={22} rotate={-9} />
          <Paper x={86} y={28} rotate={7} />
          <Paper x={72} y={30} />
          <BookOpen
            data-hero-detail
            x={94}
            y={52}
            width={54}
            height={54}
            color={green}
            strokeWidth={1.3}
          />
          <Lines x={96} y={132} w={125} />
          <path d="M210 31v37l-12-7-12 7V31" fill={gold} opacity=".85" />
        </>
      );
      break;
    case 'news':
      drawing = (
        <>
          <Paper x={52} y={34} w={204} h={163} rotate={-6} />
          <Paper x={62} y={24} w={204} h={163} />
          <Newspaper
            data-hero-detail
            x={85}
            y={46}
            width={60}
            height={60}
            color={ink}
            strokeWidth={1.3}
          />
          <path
            d="M164 54h72M164 68h58M164 82h72"
            stroke={line}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M86 121h151M86 137h151M86 153h105"
            stroke={line}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path d="M237 24h29v29" fill="none" stroke={gold} strokeWidth="3" />
        </>
      );
      break;
    case 'events':
      drawing = (
        <>
          <Paper x={58} y={38} w={204} h={160} />
          <path d="M59 82h202" stroke={line} strokeWidth="1.5" />
          <path d="M104 26v27M216 26v27" stroke={ink} strokeWidth="5" strokeLinecap="round" />
          <CalendarDays x={76} y={49} width={20} height={20} color={gold} />
          <g fill={canvas}>
            {[0, 1, 2].flatMap((row) =>
              [0, 1, 2, 3].map((col) => (
                <rect
                  key={`${row}-${col}`}
                  x={81 + col * 43}
                  y={99 + row * 28}
                  width="27"
                  height="17"
                  rx="4"
                />
              )),
            )}
          </g>
          <rect x="167" y="127" width="27" height="17" rx="4" fill={green} />
          <Bell
            data-hero-detail
            x={227}
            y={151}
            width={39}
            height={39}
            color={gold}
            strokeWidth={1.5}
          />
        </>
      );
      break;
    case 'network':
    case 'structure':
      drawing = (
        <>
          <g fill="none" stroke={line} strokeWidth="2">
            <path
              d={
                theme === 'structure'
                  ? 'M160 72v42M73 114h174M73 114v33M160 114v33M247 114v33'
                  : 'M160 100L67 57M160 100L254 57M160 100L67 173M160 100L254 173'
              }
            />
          </g>
          {(theme === 'structure' ? structurePoints : networkPoints).map(([x, y], i) => (
            <g key={i}>
              <rect x={x} y={y} width="54" height="54" rx="14" fill={paper} stroke={line} />
              <Building2
                data-hero-detail={i === 0 ? true : undefined}
                x={x + 14}
                y={y + 14}
                width={26}
                height={26}
                color={i === 0 ? green : ink}
                strokeWidth={1.4}
              />
            </g>
          ))}
          {theme === 'structure' && (
            <path d="M144 91h32" stroke={gold} strokeWidth="3" strokeLinecap="round" />
          )}
        </>
      );
      break;
    case 'vision':
      drawing = (
        <>
          <circle cx="160" cy="110" r="86" fill={paper} stroke={line} />
          <circle cx="160" cy="110" r="64" fill="none" stroke={line} strokeDasharray="2 8" />
          <Compass
            data-hero-detail
            x={114}
            y={64}
            width={92}
            height={92}
            color={green}
            strokeWidth={1}
          />
          <path d="M160 14v13M160 193v13M64 110h13M243 110h13" stroke={gold} strokeWidth="2" />
          <ArrowUpRight x={229} y={26} width={26} height={26} color={gold} strokeWidth={1.5} />
        </>
      );
      break;
    case 'registry':
      drawing = (
        <>
          <Paper x={43} y={49} w={235} h={138} rotate={-6} />
          <Paper x={43} y={39} w={235} h={138} />
          <circle cx="99" cy="99" r="30" fill={canvas} />
          <Users x={78} y={78} width={42} height={42} color={ink} strokeWidth={1.2} />
          <Lines x={149} y={82} w={101} />
          <BadgeCheck
            data-hero-detail
            x={223}
            y={139}
            width={52}
            height={52}
            color={green}
            strokeWidth={1.3}
          />
          <path d="M63 155h81" stroke={gold} strokeWidth="3" strokeLinecap="round" />
        </>
      );
      break;
    case 'verification':
      drawing = (
        <>
          <Paper x={62} y={25} w={184} h={172} />
          <FileCheck2 x={86} y={48} width={54} height={54} color={ink} strokeWidth={1.2} />
          <Lines x={87} y={124} w={132} />
          <circle cx="233" cy="152" r="40" fill={paper} stroke={line} />
          <BadgeCheck
            data-hero-detail
            x={206}
            y={125}
            width={54}
            height={54}
            color={green}
            strokeWidth={1.4}
          />
          <path d="M219 188l-3 20 17-8 17 8-3-20" fill="none" stroke={gold} strokeWidth="2" />
        </>
      );
      break;
    case 'tracking':
      drawing = (
        <>
          <path
            d="M55 61h154a40 40 0 010 80H110a31 31 0 000 62h125"
            fill="none"
            stroke={line}
            strokeWidth="2"
            strokeDasharray="5 6"
          />
          <circle cx="55" cy="61" r="24" fill={paper} stroke={line} />
          <Check x={43} y={49} width={24} height={24} color={green} />
          <circle cx="240" cy="112" r="32" fill={paper} stroke={line} />
          <Clock3
            data-hero-detail
            x={219}
            y={91}
            width={42}
            height={42}
            color={gold}
            strokeWidth={1.3}
          />
          <circle cx="235" cy="202" r="17" fill={paper} stroke={line} />
          <SearchCheck x={141} y={29} width={52} height={52} color={ink} strokeWidth={1.2} />
        </>
      );
      break;
    case 'contact':
      drawing = (
        <>
          <path
            d="M53 157C93 58 217 55 267 158"
            fill="none"
            stroke={line}
            strokeWidth="2"
            strokeDasharray="4 7"
          />
          <Paper x={61} y={94} w={160} h={100} rotate={-5} />
          <path d="M62 98l78 57 79-57" fill="none" stroke={line} strokeWidth="2" />
          <MapPin
            data-hero-detail
            x={180}
            y={22}
            width={72}
            height={72}
            color={green}
            strokeWidth={1.2}
          />
          <Mail x={36} y={48} width={30} height={30} color={gold} strokeWidth={1.4} />
          <circle cx="261" cy="165" r="17" fill={paper} stroke={line} />
          <MessageSquare x={250} y={154} width={22} height={22} color={gold} />
        </>
      );
      break;
    case 'feedback':
      drawing = (
        <>
          <rect x="40" y="39" width="181" height="100" rx="18" fill={paper} stroke={line} />
          <path d="M76 139v23l28-23" fill={paper} stroke={line} />
          <Lines x={67} y={69} w={120} />
          <rect x="145" y="119" width="140" height="73" rx="16" fill={paper} stroke={line} />
          <MessageSquare x={161} y={138} width={37} height={37} color={green} strokeWidth={1.3} />
          <path d="M215 144h45M215 158h31" stroke={line} strokeWidth="3" strokeLinecap="round" />
          <CheckCheck
            data-hero-detail
            x={237}
            y={68}
            width={36}
            height={36}
            color={gold}
            strokeWidth={1.3}
          />
        </>
      );
      break;
    case 'rights':
      drawing = (
        <>
          <Paper x={63} y={30} w={153} h={169} rotate={-7} />
          <FileText x={84} y={55} width={45} height={45} color={ink} strokeWidth={1.2} />
          <Lines x={87} y={122} w={103} />
          <circle cx="229" cy="118" r="54" fill={paper} stroke={line} />
          <Scale
            data-hero-detail
            x={193}
            y={82}
            width={72}
            height={72}
            color={gold}
            strokeWidth={1.2}
          />
        </>
      );
      break;
    case 'protection':
      drawing = (
        <>
          <path
            d="M160 21l78 31v58c0 48-36 77-78 96-42-19-78-48-78-96V52z"
            fill={paper}
            stroke={line}
            strokeWidth="1.5"
          />
          <path d="M160 39l62 25v46c0 35-27 62-62 79" fill="none" stroke={green} strokeWidth="2" />
          <LockKeyhole
            data-hero-detail
            x={128}
            y={75}
            width={64}
            height={64}
            color={ink}
            strokeWidth={1.2}
          />
          <Fingerprint x={240} y={141} width={43} height={43} color={gold} strokeWidth={1.1} />
        </>
      );
      break;
    case 'advisory':
      drawing = (
        <>
          <Paper x={53} y={46} w={191} h={146} />
          <MessageSquare
            data-hero-detail
            x={174}
            y={21}
            width={93}
            height={93}
            color={green}
            fill={paper}
            strokeWidth={1}
          />
          <Compass x={78} y={73} width={64} height={64} color={gold} strokeWidth={1.2} />
          <Lines x={80} y={151} w={132} />
        </>
      );
      break;
    case 'transparency':
      drawing = (
        <>
          <Paper x={45} y={39} w={231} h={148} />
          <path d="M72 159h178" stroke={line} strokeWidth="1.5" />
          <rect x="83" y="111" width="29" height="48" rx="4" fill={canvas} stroke={line} />
          <rect x="132" y="86" width="29" height="73" rx="4" fill={canvas} stroke={line} />
          <rect
            data-hero-detail
            x="181"
            y="64"
            width="29"
            height="95"
            rx="4"
            fill={green}
            opacity=".8"
          />
          <SearchCheck x={226} y={134} width={65} height={65} color={gold} strokeWidth={1.2} />
          <path d="M70 65h43" stroke={gold} strokeWidth="3" strokeLinecap="round" />
        </>
      );
      break;
    case 'services':
      drawing = (
        <>
          <circle cx="160" cy="110" r="74" fill="none" stroke={line} strokeWidth="1.5" />
          <circle cx="160" cy="110" r="42" fill={paper} stroke={line} />
          <ShieldCheck
            data-hero-detail
            x={134}
            y={84}
            width={52}
            height={52}
            color={green}
            strokeWidth={1.1}
          />
          {servicePoints.map(([x, y], i) => (
            <g key={i}>
              <rect x={x} y={y} width="36" height="36" rx="10" fill={paper} stroke={line} />
              {i % 2 === 0 ? (
                <FileText x={x + 8} y={y + 8} width={20} height={20} color={gold} />
              ) : (
                <Landmark x={x + 8} y={y + 8} width={20} height={20} color={ink} />
              )}
            </g>
          ))}
        </>
      );
      break;
    case 'functions':
      drawing = (
        <>
          {[Building2, ClipboardCheck, Users].map((Icon, i) => (
            <g key={i}>
              <rect
                x="48"
                y={25 + i * 62}
                width="224"
                height="49"
                rx="12"
                fill={paper}
                stroke={line}
              />
              <Icon
                data-hero-detail={i === 0 ? true : undefined}
                x={65}
                y={38 + i * 62}
                width={24}
                height={24}
                color={i === 1 ? green : ink}
                strokeWidth={1.3}
              />
              <path
                d={`M109 ${43 + i * 62}h132M109 ${56 + i * 62}h89`}
                stroke={line}
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path d={`M48 ${39 + i * 62}v20`} stroke={gold} strokeWidth="2" />
            </g>
          ))}
        </>
      );
      break;
    case 'audit':
    default:
      drawing = (
        <>
          <Paper x={73} y={32} w={172} h={170} />
          <rect x="119" y="19" width="80" height="28" rx="9" fill={paper} stroke={line} />
          <ClipboardCheck
            data-hero-detail
            x={95}
            y={67}
            width={49}
            height={49}
            color={theme === 'audit' ? green : ink}
            strokeWidth={1.2}
          />
          <g stroke={line} strokeWidth="3" strokeLinecap="round">
            <path d="M113 141h104M113 165h104" />
          </g>
          <Check x={87} y={131} width={20} height={20} color={gold} />
          <Check x={87} y={155} width={20} height={20} color={gold} />
          <SearchCheck x={214} y={145} width={65} height={65} color={green} strokeWidth={1.2} />
        </>
      );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 320 230"
      className="mx-auto h-full w-full max-w-sm"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {drawing}
    </svg>
  );
}
