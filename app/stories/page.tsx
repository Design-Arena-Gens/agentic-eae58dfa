import StoryGrid from '@/components/StoryGrid';

export default function StoriesPage() {
  return (
    <>
      <section className="card">
        <div className="section-title">
          <div>
            <div className="kicker">Visual</div>
            <h2 className="title">Story cards for classroom display</h2>
          </div>
          <span className="helper">Download-friendly, kid-safe visuals</span>
        </div>
        <p className="helper">Generated SVG art with simple shapes and cheerful colours. Great for discussions, circle time, and assemblies.</p>
      </section>
      <StoryGrid />
    </>
  );
}
