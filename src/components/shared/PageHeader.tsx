import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { SectionHeader } from "@/components/shared/SectionHeader";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  /** Konten tambahan di bawah judul (mis. baris kurs). */
  below?: React.ReactNode;
}

/**
 * Shell header halaman yang seragam — menggantikan boilerplate
 * section + container + RevealOnScroll + SectionHeader yang
 * sebelumnya disalin di setiap halaman.
 */
export function PageHeader({ eyebrow, title, description, below }: PageHeaderProps) {
  return (
    <section className="pt-16 md:pt-20 pb-12 border-b border-border-warm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll y={16}>
          <SectionHeader eyebrow={eyebrow} title={title} description={description} />
        </RevealOnScroll>
        {below && (
          <RevealOnScroll delay={120} y={12}>
            {below}
          </RevealOnScroll>
        )}
      </div>
    </section>
  );
}
