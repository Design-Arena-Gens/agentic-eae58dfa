"use client";

import { useMemo, useState } from 'react';
import { generateStoryScenes, renderSceneSVG, type GradeBand } from '@/lib/generator';

export default function StoryGrid() {
  const [topic, setTopic] = useState('Friendship and helping');
  const [grade, setGrade] = useState<GradeBand>('2');
  const [lang, setLang] = useState<'English'|'Hinglish'|'Hindi'>('English');
  const [seed, setSeed] = useState(Math.floor(Math.random()*1e9));

  const scenes = useMemo(() => generateStoryScenes(topic, grade, lang, seed), [topic, grade, lang, seed]);

  return (
    <section className="card">
      <div className="section-title">
        <div>
          <div className="kicker">Create</div>
          <h3 className="title">Visual story cards</h3>
        </div>
        <span className="badge"><span className="dot"></span> Safe for kids</span>
      </div>

      <div className="row">
        <div style={{flex: 1, minWidth: 240}}>
          <label className="label">Theme</label>
          <input className="input" value={topic} onChange={e=>setTopic(e.target.value)} placeholder="e.g., Being kind" />
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
          <button className="button" onClick={()=>setSeed(Math.floor(Math.random()*1e9))}>New visuals</button>
        </div>
      </div>

      <div className="story-grid" style={{marginTop: 12}}>
        {scenes.map((sc, idx) => (
          <div key={idx} className="story-card">
            <div className="art" dangerouslySetInnerHTML={{__html: renderSceneSVG(sc, 600, 200)}} />
            <div className="body">
              <h4>{sc.title}</h4>
              <p>{sc.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
