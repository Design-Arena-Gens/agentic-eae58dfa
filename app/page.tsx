import ContentGenerator from '@/components/ContentGenerator';

export default function Page() {
  return (
    <>
      <section className="card">
        <div className="section-title">
          <div>
            <div className="kicker">AI Assistant</div>
            <h2 className="title">Unique creative content for Indian primary classrooms</h2>
          </div>
          <span className="helper">Lesson plans ? Worksheets ? Visual stories ? Ebooks</span>
        </div>
        <p className="helper">No sign-in, no external AI keys. Runs fully on-device using handcrafted templates with randomness tuned for Indian context.</p>
      </section>
      <ContentGenerator />
    </>
  );
}
