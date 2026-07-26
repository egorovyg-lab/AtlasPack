import { useEffect, type ReactNode } from 'react';
import {
  ArrowLeft,
  Building2,
  FileText,
  Layers,
  Mail,
  MapPin,
} from 'lucide-react';

import agreementSource from '../content/user-agreement.md?raw';

type AgreementBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] };

type AgreementSection = {
  id: string;
  title: string;
  blocks: AgreementBlock[];
};

const HOME_URL = import.meta.env.BASE_URL;
const AGREEMENT_EMAIL = 'VERIITASOFFICE@GMAIL.COM';

function parseAgreement(source: string): AgreementSection[] {
  const sections: AgreementSection[] = [];
  let currentSection: AgreementSection | undefined;

  for (const sourceLine of source.split(/\r?\n/)) {
    const line = sourceLine.trim();
    const heading = line.match(/^##\s+(\d+)\.\s+(.+)$/);

    if (heading) {
      currentSection = {
        id: `section-${heading[1]}`,
        title: `${heading[1]}. ${heading[2]}`,
        blocks: [],
      };
      sections.push(currentSection);
      continue;
    }

    if (!currentSection || !line) {
      continue;
    }

    if (line.startsWith('- ')) {
      const lastBlock = currentSection.blocks.at(-1);
      const item = line.slice(2);

      if (lastBlock?.type === 'list') {
        lastBlock.items.push(item);
      } else {
        currentSection.blocks.push({ type: 'list', items: [item] });
      }
      continue;
    }

    currentSection.blocks.push({ type: 'paragraph', text: line });
  }

  return sections;
}

function renderInline(text: string): ReactNode[] {
  const tokenPattern =
    /(\*\*[^*]+\*\*|`[^`]+`|VERIITASOFFICE@GMAIL\.COM)/g;

  return text.split(tokenPattern).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={`${part}-${index}`} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }

    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={`${part}-${index}`}
          className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.9em] text-blue-200"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    if (part === AGREEMENT_EMAIL) {
      return (
        <a
          key={`${part}-${index}`}
          href={`mailto:${AGREEMENT_EMAIL}`}
          className="text-primary hover:text-blue-300 underline underline-offset-4 transition-colors"
        >
          {part}
        </a>
      );
    }

    return part;
  });
}

const AGREEMENT_SECTIONS = parseAgreement(agreementSource);

export default function UserAgreementPage() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Пользовательское соглашение — AtlasPack';
    window.scrollTo(0, 0);

    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between gap-4">
          <a
            href={HOME_URL}
            className="font-bold text-xl tracking-tight flex items-center gap-2"
            aria-label="Вернуться на главную страницу AtlasPack"
          >
            <Layers className="text-primary w-6 h-6" />
            <span>
              Atlas
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-500">
                Pack
              </span>
            </span>
          </a>

          <a
            href={HOME_URL}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-border bg-card/60 hover:bg-card hover:border-primary/40 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Вернуться на главную</span>
            <span className="sm:hidden">Назад</span>
          </a>
        </div>
      </header>

      <main className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_60%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 relative">
          <div className="max-w-4xl mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-primary mb-6">
              <FileText className="w-4 h-4" />
              Юридическая информация
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-5">
              Пользовательское соглашение
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              О предоставлении права использования программы для ЭВМ
              «AtlasPack»
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-xs font-mono text-muted-foreground">
              <span className="rounded-full border border-border bg-card px-3 py-1.5">
                Редакция от 26 июля 2026 года
              </span>
              <span className="rounded-full border border-border bg-card px-3 py-1.5">
                Вступает в силу с даты публикации
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[15rem_minmax(0,1fr)] gap-10 xl:gap-16 items-start">
            <aside className="hidden lg:block sticky top-24">
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
                Содержание
              </p>
              <nav aria-label="Содержание пользовательского соглашения">
                <ol className="space-y-1">
                  {AGREEMENT_SECTIONS.map((section) => (
                    <li key={section.id}>
                      <button
                        type="button"
                        onClick={() =>
                          document
                            .getElementById(section.id)
                            ?.scrollIntoView({ behavior: 'smooth' })
                        }
                        className="block w-full py-1.5 text-left text-sm leading-snug text-muted-foreground hover:text-primary transition-colors"
                      >
                        {section.title}
                      </button>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            <article className="min-w-0">
              <div className="rounded-2xl border border-primary/25 bg-primary/[0.06] p-5 md:p-6 mb-10">
                <p className="text-sm md:text-base leading-relaxed text-blue-100">
                  Настоящее Пользовательское соглашение определяет условия
                  скачивания, установки и использования программы для ЭВМ
                  «AtlasPack». Приложение предоставляется бесплатно, не требует
                  регистрации и обрабатывает файлы локально.
                </p>
              </div>

              <div className="space-y-12">
                {AGREEMENT_SECTIONS.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-24"
                  >
                    <h2 className="text-xl md:text-2xl font-semibold text-white mb-5 pb-4 border-b border-border">
                      {section.title}
                    </h2>
                    <div className="space-y-4 text-sm md:text-base leading-7 text-muted-foreground">
                      {section.blocks.map((block, index) =>
                        block.type === 'paragraph' ? (
                          <p key={index}>{renderInline(block.text)}</p>
                        ) : (
                          <ul
                            key={index}
                            className="space-y-2 pl-5 list-disc marker:text-primary"
                          >
                            {block.items.map((item) => (
                              <li key={item} className="pl-1">
                                {renderInline(item)}
                              </li>
                            ))}
                          </ul>
                        ),
                      )}
                    </div>
                  </section>
                ))}
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-xl border border-border bg-card p-5">
                  <Building2 className="w-5 h-5 text-primary mb-3" />
                  <p className="text-sm font-medium text-foreground mb-1">
                    Правообладатель
                  </p>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    ООО «ВЕРИИТАС»
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-card p-5">
                  <MapPin className="w-5 h-5 text-primary mb-3" />
                  <p className="text-sm font-medium text-foreground mb-1">
                    Место нахождения
                  </p>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    Москва, муниципальный округ Раменки
                  </p>
                </div>
                <a
                  href={`mailto:${AGREEMENT_EMAIL}`}
                  className="rounded-xl border border-border bg-card p-5 hover:border-primary/40 transition-colors"
                >
                  <Mail className="w-5 h-5 text-primary mb-3" />
                  <p className="text-sm font-medium text-foreground mb-1">
                    Обращения
                  </p>
                  <p className="text-xs leading-relaxed text-primary break-all">
                    {AGREEMENT_EMAIL}
                  </p>
                </a>
              </div>
            </article>
          </div>
        </div>
      </main>

      <footer className="py-8 px-6 border-t border-border bg-background">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-sm text-muted-foreground font-mono">
            © 2026 AtlasPack · ООО «ВЕРИИТАС»
          </p>
          <a
            href={HOME_URL}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            На главную страницу
          </a>
        </div>
      </footer>
    </div>
  );
}
