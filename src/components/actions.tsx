import Link from "next/link";

export function Icon({ name, size = 20 }: { name: "arrow" | "external" | "pin" | "phone" | "mail" | "menu" | "close" | "left" | "right" | "plus" | "shield" | "check" | "down"; size?: number }) {
  const paths = {
    arrow: "M4 12h15m-6-6 6 6-6 6",
    external: "M6 18 18 6M7 6h11v11",
    pin: "M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z M14.5 10a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z",
    phone: "M5 3h4l2 5-3 2c1 3 3 5 6 6l2-3 5 2v4c0 2-4 2-6 1C8 18 6 16 4 10 3 8 3 3 5 3Z",
    mail: "M3 5h18v14H3z M3 6l9 7 9-7",
    menu: "M3 7h18M3 12h18M3 17h18",
    close: "m5 5 14 14M19 5 5 19",
    left: "m15 5-7 7 7 7",
    right: "m9 5 7 7-7 7",
    plus: "M12 5v14M5 12h14",
    shield: "M12 22s7-3 7-10V5l-7-3-7 3v7c0 7 7 10 7 10Zm-3-10 2 2 4-4",
    check: "m5 12 4 4L19 6",
    down: "M12 4v15m-6-6 6 6 6-6",
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}

export function ButtonLink({ href, children, variant = "yellow" }: { href: string; children: React.ReactNode; variant?: "yellow" | "outline" | "dark" }) {
  return <Link className={"button " + variant} href={href}>{children}<Icon name="arrow" size={19} /></Link>;
}
