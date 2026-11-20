"use client";

import type { MediaKey } from "@/lib/media";

import { useRef, useState } from "react";
import { Icon } from "@/components/actions";
import { Photo } from "@/components/photo";

type Entry = { image: MediaKey; caption: string };

export function Gallery({ entries }: { entries: Entry[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const start = useRef<number | null>(null);
  const [active, setActive] = useState(0);
  const item = entries[active];
  const multiple = entries.length > 1;

  function move(step: number) {
    setActive((index) => (index + step + entries.length) % entries.length);
  }

  return <>
    <div className="gallery-grid">{entries.map(({ image, caption }, index) => <button type="button" key={image} className="gallery-tile" aria-label={"View photo: " + caption} aria-haspopup="dialog" onClick={() => {
      setActive(index);
      dialog.current?.showModal();
    }}>
      <span className="gallery-image"><Photo image={image} alt="" sizes="(max-width: 620px) 50vw, 33vw" /><span className="card-arrow"><Icon name="plus" /></span></span><span>{caption}</span>
    </button>)}</div>
    {item && <dialog ref={dialog} aria-label="Project photo viewer" className="gallery-dialog" onClick={(event) => {
      if (event.target === event.currentTarget) dialog.current?.close();
    }} onKeyDown={(event) => {
      if (!multiple) return;
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    }}>
      <div className="gallery-viewer">
        <div className="gallery-controls"><p aria-live="polite">{active + 1} / {entries.length}</p><button type="button" aria-label="Close gallery" onClick={() => dialog.current?.close()}><Icon name="close" size={26} /></button></div>
        <figure>
          <div className="lightbox-image" onTouchStart={(event) => { start.current = event.touches[0].clientX; }} onTouchEnd={(event) => {
            if (start.current === null || !multiple) return;
            const distance = event.changedTouches[0].clientX - start.current;
            start.current = null;
            if (Math.abs(distance) > 45) move(distance > 0 ? -1 : 1);
          }}><Photo image={item.image} alt={item.caption} sizes="90vw" /></div>
          <figcaption aria-live="polite">{item.caption}</figcaption>
        </figure>
        {multiple && <div className="gallery-controls gallery-paging"><button type="button" aria-label="Previous photo" onClick={() => move(-1)}><Icon name="left" /></button><button type="button" aria-label="Next photo" onClick={() => move(1)}><Icon name="right" /></button></div>}
      </div>
    </dialog>}
  </>;
}
