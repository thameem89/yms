"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { company } from "@/data/company";
import { navigation } from "@/data/navigation";
import { ButtonLink, Icon } from "@/components/actions";

export function Header() {
  const pathname = usePathname();
  const menu = useRef<HTMLDialogElement>(null);
  const links = navigation.map(({ href, label }) => {
    const active = pathname === href || (href !== "/" && pathname.startsWith(href + "/"));
    return <Link key={href} href={href} prefetch={false} aria-current={active ? "page" : undefined} onClick={() => menu.current?.close()}>{label}</Link>;
  });

  return <>
    <div className="utility"><div className="wrap utility-inner">
      <span><Icon name="pin" size={15} /> Dubai Industrial Park, UAE</span>
      <div><a href={"tel:" + company.tel}><Icon name="phone" size={14} />{company.phone}</a><a href={"mailto:" + company.email}><Icon name="mail" size={15} />{company.email}</a></div>
    </div></div>
    <header className="site-header">
      <div className="wrap header-inner">
        <Link href="/" className="brand">
          <Image src="/brand/yms-logo.svg" width={123} height={137} alt="" />
          <span>YMS ENGINEERING <small>STRUCTURAL STEEL CONTRACTOR</small><span className="sr-only"> Home</span></span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">{links}</nav>
        <div className="header-cta"><ButtonLink href="/contact">Get in Touch</ButtonLink></div>
        <button type="button" className="menu-button" aria-label="Open menu" aria-haspopup="dialog" aria-controls="site-menu" onClick={() => menu.current?.showModal()}><Icon name="menu" size={25} /></button>
      </div>
      <dialog ref={menu} id="site-menu" className="mobile-dialog" aria-labelledby="menu-title" onClick={(event) => { if (event.target === event.currentTarget) menu.current?.close(); }}>
        <div className="drawer-inner">
          <div className="drawer-top"><p id="menu-title">YMS Engineering</p><button type="button" className="menu-button" aria-label="Close menu" onClick={() => menu.current?.close()}><Icon name="close" size={25} /></button></div>
          <nav aria-label="Mobile navigation">{links}</nav>
          <a className="drawer-phone" href={"tel:" + company.tel}><Icon name="phone" />{company.phone}</a>
        </div>
      </dialog>
    </header>
  </>;
}
