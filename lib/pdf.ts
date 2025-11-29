import jsPDF from 'jspdf';
import type { Scene } from './generator';

export function scenesToPDF(title: string, scenes: Scene[]): Blob {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text(title, 40, 60);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.text('A classroom-friendly picture book generated on-device.', 40, 80);

  scenes.forEach((scene, idx) => {
    if (idx > 0) doc.addPage();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text(scene.title, 40, 60);

    // Render SVG as image: convert via data URL; jsPDF supports addImage with SVG in some builds, otherwise rasterize via <img/> fallback
    // Here we do a naive approach: draw a placeholder rectangle and embed text; keeps offline dependency-free and consistent.
    doc.setDrawColor(180, 190, 230);
    doc.setFillColor(16, 22, 56);
    doc.roundedRect(40, 80, pageW - 80, 260, 8, 8, 'FD');

    const text = wrapText(doc, scene.text, pageW - 100);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(13);
    doc.text(text, 50, 360, { baseline: 'top' as any });
  });

  return doc.output('blob');
}

function wrapText(doc: jsPDF, text: string, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let current = '';
  words.forEach((w) => {
    const test = current ? current + ' ' + w : w;
    if (doc.getTextWidth(test) > maxWidth) {
      if (current) lines.push(current);
      current = w;
    } else {
      current = test;
    }
  });
  if (current) lines.push(current);
  return lines;
}
