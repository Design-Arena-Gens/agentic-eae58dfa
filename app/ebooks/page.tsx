import EbookMaker from '@/components/EbookMaker';

export default function EbooksPage() {
  return (
    <>
      <section className="card">
        <div className="section-title">
          <div>
            <div className="kicker">Books</div>
            <h2 className="title">Create and download a kids ebook</h2>
          </div>
          <span className="helper">One-click PDF for print or WhatsApp</span>
        </div>
        <p className="helper">Turn your theme into a short classroom-friendly picture book. Share with parents or project on a smart board.</p>
      </section>
      <EbookMaker />
    </>
  );
}
