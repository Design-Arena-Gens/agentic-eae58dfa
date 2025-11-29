"use client";

import { useMemo, useRef, useState } from 'react';
import { generateStoryScenes, type GradeBand } from '@/lib/generator';
import { scenesToPDF } from '@/lib/pdf';

export default function EbookMaker() {
  const [title, setTitle] = useState('My Classroom Picture Book');
  const [topic, setTopic] = useState('Being eco-friendly');
  const [grade, setGrade] = useState<GradeBand>('3');
  const [lang, setLang] = useState<'English'|'Hinglish'|'Hindi'>('English');
  const [seed, setSeed] = useState(Math.floor(Math.random()*1e9));
  const linkRef = useRef<HTMLAnchorElement>(null);

  const scenes = useMemo(() => generateStoryScenes(topic, grade, lang, seed), [topic, grade, lang, seed]);

  function downloadPDF() {
    const blob = scenesToPDF(title, scenes);
    const url = URL.createObjectURL(blob);
    if (linkRef.current) {
      linkRef.current.href = url;
      linkRef.current.download = `${title.replace(/\s+/g,'_')}.pdf`;
      linkRef.current.click();
      setTimeout(()=> URL.revokeObjectURL(url), 2000);
    }
  }

  return (
    <section className="card">
      <div className="section-title">
        <div>
          <div className="kicker">Publish</div>
          <h3 className="title">Kids Ebook (PDF)</h3>
        </div>
        <span className="badge"><span className="dot"></span> No data leaves device</span>
      </div>

      <div className="row">
        <div style={{flex: 1, minWidth: 240}}>
          <label className="label">Title</label>
          <input className="input" value={title} onChange={e=>setTitle(e.target.value)} />
        </div>
        <div style={{flex: 1, minWidth: 240}}>
          <label className="label">Theme</label>
          <input className="input" value={topic} onChange={e=>setTopic(e.target.value)} />
        </div>
        <div>
          <label className="label">Grade</label>
          <select className="select" value={grade} onChange={e=>setGrade(e.target.value as GradeBand)}>
            {['KG','1','2','3','4','5'].map(g=> <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Language</label>
          <select className="select" value={lang} onChange={e=>setLang(e.target.value as any)}>
            {['English','Hinglish','Hindi'].map(l=> <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Shuffle</label>
          <button className="button" onClick={()=>setSeed(Math.floor(Math.random()*1e9))}>New story</button>
        </div>
      </div>

      <div className="row" style={{marginTop: 10}}>
        <button className="button" onClick={downloadPDF}>Download PDF</button>
        <a ref={linkRef} style={{display:'none'}} aria-hidden />
      </div>

      <div style={{marginTop: 12}} className="result">
        <strong>Preview:</strong>
        <ol>
          {scenes.map((s, i) => (
            <li key={i} style={{marginBottom: 6}}>
              <span style={{color: '#a7b0ff'}}>{s.title}:</span> {s.text}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
