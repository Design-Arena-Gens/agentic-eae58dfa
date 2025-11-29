"use client";

import { useMemo, useState } from 'react';
import { generateLessonPlan, generateWorksheet, type GradeBand, type Subject, type Region } from '@/lib/generator';

export default function ContentGenerator() {
  const [topic, setTopic] = useState('Water conservation');
  const [grade, setGrade] = useState<GradeBand>('3');
  const [subject, setSubject] = useState<Subject>('EVS');
  const [region, setRegion] = useState<Region>('CBSE');
  const [language, setLanguage] = useState<'English'|'Hinglish'|'Hindi'>('English');
  const [duration, setDuration] = useState(35);
  const [focus, setFocus] = useState<'Creative thinking'|'Values'|'Foundational literacy'|'Foundational numeracy'|'Art integration'>('Creative thinking');
  const [seed, setSeed] = useState<number>(Math.floor(Math.random()*1e9));

  const [lessonPlan, setLessonPlan] = useState('');
  const [worksheet, setWorksheet] = useState('');

  const exampleTopics = useMemo(() => [
    'Local festivals', 'Healthy food', 'Our school', 'Saving electricity', 'Shapes around us', 'Kindness and sharing'
  ], []);

  function regenerateSeed() {
    setSeed(Math.floor(Math.random()*1e9));
  }

  function makeLessonPlan() {
    const text = generateLessonPlan({ topic, grade, subject, region, language, durationMins: duration, focus, seed });
    setLessonPlan(text);
  }

  function makeWorksheet() {
    const text = generateWorksheet({ topic, grade, subject, language, seed });
    setWorksheet(text);
  }

  function copy(text: string) {
    navigator.clipboard.writeText(text);
  }

  return (
    <div className="grid">
      <section className="card card--half">
        <div className="section-title">
          <div>
            <div className="kicker">Generate</div>
            <h3 className="title">Lesson plans and worksheets</h3>
          </div>
          <span className="badge"><span className="dot"></span> Offline generator</span>
        </div>
        <div className="row">
          <div style={{flex: 1, minWidth: 220}}>
            <label className="label">Topic</label>
            <input className="input" value={topic} onChange={e=>setTopic(e.target.value)} placeholder="e.g., Water conservation" />
          </div>
          <div>
            <label className="label">Grade</label>
            <select className="select" value={grade} onChange={e=>setGrade(e.target.value as GradeBand)}>
              {['KG','1','2','3','4','5'].map(g=> <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Subject</label>
            <select className="select" value={subject} onChange={e=>setSubject(e.target.value as Subject)}>
              {['English','Maths','EVS','Art','General Knowledge','Hindi'].map(s=> <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Board</label>
            <select className="select" value={region} onChange={e=>setRegion(e.target.value as Region)}>
              {['CBSE','ICSE','State Board'].map(r=> <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Language</label>
            <select className="select" value={language} onChange={e=>setLanguage(e.target.value as any)}>
              {['English','Hinglish','Hindi'].map(l=> <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Duration (mins)</label>
            <input type="number" className="input" value={duration} onChange={e=>setDuration(parseInt(e.target.value||'35'))} />
          </div>
          <div>
            <label className="label">Focus</label>
            <select className="select" value={focus} onChange={e=>setFocus(e.target.value as any)}>
              {['Creative thinking','Values','Foundational literacy','Foundational numeracy','Art integration'].map(f=> <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
        </div>
        <div className="row" style={{marginTop: 10}}>
          <button className="button" onClick={makeLessonPlan}>Create Lesson Plan</button>
          <button className="button secondary" onClick={makeWorksheet}>Create Worksheet</button>
          <button className="button small secondary" onClick={regenerateSeed}>Shuffle ideas</button>
        </div>
      </section>

      <section className="card card--half">
        <div className="section-title">
          <h3 className="title">Suggestions</h3>
          <span className="helper">Try: {exampleTopics.slice(0,3).join(', ')}?</span>
        </div>
        <div className="row" style={{gap: 8, flexWrap: 'wrap'}}>
          {exampleTopics.map((t)=> (
            <button key={t} className="button small secondary" onClick={()=>setTopic(t)}>{t}</button>
          ))}
        </div>
        <div style={{height: 8}} />
        <div className="section-title"><h4 className="title">Lesson Plan</h4><button className="button small" onClick={()=>copy(lessonPlan)}>Copy</button></div>
        <pre className="result" style={{minHeight: 140}}>{lessonPlan || 'Your lesson plan will appear here?'}</pre>
        <div className="section-title"><h4 className="title">Worksheet</h4><button className="button small" onClick={()=>copy(worksheet)}>Copy</button></div>
        <pre className="result" style={{minHeight: 140}}>{worksheet || 'Your worksheet will appear here?'}</pre>
      </section>
    </div>
  );
}
