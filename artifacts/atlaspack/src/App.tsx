import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, ChevronRight, Menu, X, Cpu, Layers, Image as ImageIcon, 
  Shield, Check, HardDrive, Box, Activity, FileJson, Database,
  Settings, Maximize, AlertCircle, Zap, Lock, CheckCircle
} from 'lucide-react';
import UserAgreementPage from './pages/user-agreement';

const DOWNLOAD_URL = 'https://github.com/egorovyg-lab/AtlasPack/releases/latest/download/AtlasPack-Windows-x64.zip';
const USER_AGREEMENT_URL = '#/user-agreement';

const DEMO_ASSETS = {
  source: `${import.meta.env.BASE_URL}demo/texture_2048.png`,
  restored: `${import.meta.env.BASE_URL}demo/texture_2048_restored.png`,
  difference: `${import.meta.env.BASE_URL}demo/texture_2048_diff.png`,
} as const;

const DEMO_RESULT = {
  sourceSize: '3.41 МБ',
  archiveSize: '797.4 КБ',
  compressionRatio: '4.38×',
  savings: '77.2%',
  exportFormat: 'PNG',
  exportSize: '1.98 МБ',
  rgbBitDepth: '6 бит/канал',
  masked: '20.0%',
  psnr: '35.57 дБ',
  minimumPsnr: '30 дБ',
  processingTime: '28.3 с',
  performanceHeadroom: '2.12×',
  estimatedMinimumTime: '≈45–60 с',
  alphaChannel: 'сохранён',
} as const;

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={className}
  >
    {children}
  </motion.div>
);

const DownloadAgreementNotice = ({ className = "" }: { className?: string }) => (
  <p className={`text-xs leading-relaxed text-muted-foreground ${className}`}>
    Скачивая AtlasPack, вы принимаете{' '}
    <a
      href={USER_AGREEMENT_URL}
      className="text-primary hover:text-blue-300 underline underline-offset-4 transition-colors"
    >
      Пользовательское соглашение
    </a>
    .
  </p>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${scrolled ? 'bg-background/80 backdrop-blur-md border-border/50' : 'bg-transparent border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-bold text-xl tracking-tight flex items-center gap-2">
          <Layers className="text-primary w-6 h-6" />
          <span>Atlas<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-500">Pack</span></span>
        </a>
        <nav className="hidden md:flex gap-5 text-sm font-medium text-muted-foreground">
          <a href="#vozmozhnosti" className="hover:text-foreground transition-colors" data-testid="link-vozmozhnosti">Возможности</a>
          <a href="#kak-rabotaet" className="hover:text-foreground transition-colors" data-testid="link-kak-rabotaet">Как работает</a>
          <a href="#instruktsiya" className="hover:text-foreground transition-colors" data-testid="link-instruktsiya">Инструкция</a>
          <a href="#harakteristiki" className="hover:text-foreground transition-colors" data-testid="link-harakteristiki">Характеристики</a>
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <a
            href={USER_AGREEMENT_URL}
            className="hidden xl:inline-flex items-center justify-center px-3 py-2 rounded-md border border-border bg-card/40 hover:bg-card hover:border-primary/40 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            data-testid="btn-nav-agreement"
          >
            Пользовательское соглашение
          </a>
          <a href={DOWNLOAD_URL} className="bg-primary hover:bg-blue-500 text-primary-foreground px-4 py-2 rounded-md text-sm font-semibold transition-colors flex items-center gap-2" data-testid="btn-nav-download">
            <Download className="w-4 h-4" />
            Скачать для Windows
          </a>
        </div>
        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)} data-testid="btn-menu-toggle">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden px-6 py-4 bg-background border-b border-border flex flex-col gap-4 shadow-xl">
          <a href="#vozmozhnosti" onClick={() => setIsOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-foreground">Возможности</a>
          <a href="#kak-rabotaet" onClick={() => setIsOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-foreground">Как работает</a>
          <a href="#instruktsiya" onClick={() => setIsOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-foreground">Инструкция</a>
          <a href="#harakteristiki" onClick={() => setIsOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-foreground">Характеристики</a>
          <a
            href={USER_AGREEMENT_URL}
            onClick={() => setIsOpen(false)}
            className="border border-border bg-card/50 hover:bg-card text-center py-2.5 rounded-md text-sm font-medium transition-colors"
          >
            Пользовательское соглашение
          </a>
          <a href={DOWNLOAD_URL} onClick={() => setIsOpen(false)} className="bg-primary hover:bg-blue-500 text-primary-foreground text-center py-2.5 rounded-md text-sm font-semibold mt-2 flex items-center justify-center gap-2 transition-colors">
            <Download className="w-4 h-4" />
            Скачать для Windows
          </a>
        </div>
      )}
    </header>
  );
};

const Hero = () => (
  <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 min-h-[90vh]">
    <div className="flex-1 space-y-8">
      <FadeIn>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
          AtlasPack — интеллектуальная <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-500">
            оптимизация текстурных атласов
          </span>
        </h1>
      </FadeIn>
      
      <FadeIn delay={0.1}>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          Локальное сжатие RGB/RGBA-текстур с помощью Big-LaMa и переупаковка UV-развёрток через xatlas. Без отправки файлов в интернет.
        </p>
      </FadeIn>
      
      <FadeIn delay={0.2}>
        <div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href={DOWNLOAD_URL} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary hover:bg-blue-500 text-white font-medium transition-colors" data-testid="btn-hero-download">
              <Download className="w-5 h-5" />
              Скачать для Windows
            </a>
            <a href="#vozmozhnosti" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border bg-card/50 hover:bg-card text-foreground font-medium transition-colors backdrop-blur-sm" data-testid="btn-hero-more">
              Узнать больше
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </a>
          </div>
          <DownloadAgreementNotice className="mt-3 max-w-md" />
        </div>
      </FadeIn>

      <FadeIn delay={0.3}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-border/50">
          {[
            { icon: Lock, text: 'Полностью локально' },
            { icon: Zap, text: 'Работает без интернета' },
            { icon: ImageIcon, text: 'RGB и RGBA' },
            { icon: Maximize, text: 'До 2048×2048' },
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <feature.icon className="w-4 h-4 text-primary" />
              <span>{feature.text}</span>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>

    <FadeIn delay={0.4} className="flex-1 w-full max-w-xl lg:max-w-none">
      <div className="rounded-xl border border-border bg-[#0F172A]/80 p-4 shadow-2xl relative backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-violet-500/5 rounded-xl pointer-events-none"></div>
        
        <div className="flex items-center justify-between mb-4 border-b border-border/50 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-mono text-muted-foreground">Демонстрация интерфейса</span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-border"></div>
            <div className="w-3 h-3 rounded-full bg-border"></div>
            <div className="w-3 h-3 rounded-full bg-border"></div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-2">
            <div className="aspect-square bg-background rounded-lg border border-border/50 relative overflow-hidden group">
              <div className="absolute inset-0 opacity-30" style={{ backgroundSize: '8px 8px', backgroundImage: 'radial-gradient(circle, #475569 1px, transparent 1px)' }}></div>
              <img
                src={DEMO_ASSETS.source}
                alt="Исходная текстура AtlasPack"
                className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                decoding="async"
              />
              <div className="absolute bottom-2 right-2 z-10 bg-background/90 text-[10px] font-mono px-1.5 py-0.5 rounded text-muted-foreground border border-border">
                {DEMO_RESULT.sourceSize}
              </div>
            </div>
            <div className="text-xs text-center font-mono text-muted-foreground">Исходная</div>
          </div>
          <div className="space-y-2">
            <div className="aspect-square bg-background rounded-lg border border-primary/30 relative overflow-hidden group">
              <div className="absolute inset-0 opacity-20" style={{ backgroundSize: '8px 8px', backgroundImage: 'radial-gradient(circle, #3B82F6 1px, transparent 1px)' }}></div>
              <img
                src={DEMO_ASSETS.restored}
                alt="Восстановленная текстура AtlasPack"
                className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                decoding="async"
              />
              <div className="absolute bottom-2 right-2 z-10 bg-primary/20 text-[10px] font-mono px-1.5 py-0.5 rounded text-primary border border-primary/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                {DEMO_RESULT.exportSize}
              </div>
            </div>
            <div className="text-xs text-center font-mono text-primary font-medium">Восстановленная</div>
          </div>
          <div className="space-y-2">
            <div className="aspect-square bg-background rounded-lg border border-violet-500/30 relative overflow-hidden group">
              <img
                src={DEMO_ASSETS.difference}
                alt="Карта RGB-различий исходной и восстановленной текстур"
                className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                decoding="async"
              />
              <div className="absolute bottom-2 right-2 z-10 bg-violet-500/20 text-[10px] font-mono px-1.5 py-0.5 rounded text-violet-300 border border-violet-500/30">
                {DEMO_RESULT.psnr}
              </div>
            </div>
            <div className="text-xs text-center font-mono text-violet-300">Карта различий</div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-border/50 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
          <span className="inline-flex items-center gap-1.5 text-emerald-400">
            <CheckCircle className="w-3.5 h-3.5" />
            Результат принят
          </span>
          <span className="text-muted-foreground">
            Экономия {DEMO_RESULT.savings} · {DEMO_RESULT.processingTime}
          </span>
        </div>
      </div>
    </FadeIn>
  </section>
);

const Features = () => {
  const features = [
    { title: 'Нейросетевое восстановление', desc: 'Big-LaMa восстанавливает замаскированные однородные области текстуры.', icon: Cpu },
    { title: 'UV-переупаковка', desc: 'xatlas уплотняет UV-острова и создаёт новый комплект OBJ, MTL и PNG.', icon: Box },
    { title: 'Снижение битности', desc: 'Пользователь может выбрать 8, 6, 5 или 4 эффективных бита на канал RGB.', icon: Settings },
    { title: 'Контроль качества', desc: 'AtlasPack рассчитывает PSNR и автоматически отклоняет результат при недостаточном качестве.', icon: Activity },
    { title: 'Проверка уменьшения файла', desc: 'Результат принимается только в том случае, если архив действительно меньше исходного файла.', icon: CheckCircle },
    { title: 'Поддержка прозрачности', desc: 'Альфа-канал RGBA сохраняется без потерь при экспорте в PNG и WebP.', icon: Layers },
    { title: 'Наглядное сравнение', desc: 'Интерфейс показывает исходную текстуру, восстановленный результат, маску и карту различий.', icon: ImageIcon },
    { title: 'Подробный отчёт', desc: 'После обработки формируется JSON-отчёт с размером файлов, степенью сжатия, PSNR, временем и параметрами оптимизации.', icon: FileJson },
  ];

  return (
    <section id="vozmozhnosti" className="py-24 px-6 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-16 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Возможности AtlasPack</h2>
          <p className="text-muted-foreground">Каждая функция спроектирована для максимальной эффективности и точности результата.</p>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="p-6 h-full rounded-xl border border-border bg-card hover:border-primary/50 transition-colors group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                  <f.icon className="w-24 h-24 text-primary" />
                </div>
                <div className="w-12 h-12 rounded-lg bg-background border border-border flex items-center justify-center mb-4 group-hover:bg-primary/10 group-hover:border-primary/30 transition-colors relative z-10">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 relative z-10">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed relative z-10">{f.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    { num: '01', title: 'Выбор файла', desc: 'Пользователь выбирает PNG, JPG или WebP.' },
    { num: '02', title: 'Анализ', desc: 'AtlasPack находит избыточные однородные области и создаёт бинарную маску.' },
    { num: '03', title: 'Обработка', desc: 'Данные упаковываются в формат .atlaspack, а Big-LaMa проверяет возможность восстановления.' },
    { num: '04', title: 'Результат', desc: 'Пользователь получает оптимизированную текстуру и JSON-отчёт.' },
  ];

  return (
    <section id="kak-rabotaet" className="py-24 px-6 border-t border-border bg-card/30">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-16 text-center">
          <h2 className="text-3xl font-bold">Как работает AtlasPack</h2>
        </FadeIn>
        
        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-border -translate-y-1/2"></div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <FadeIn key={i} delay={i * 0.1} className="relative z-10 bg-background/50 p-6 rounded-xl border border-border backdrop-blur-sm shadow-xl">
                <div className="text-primary font-mono text-sm mb-3">Шаг {step.num}</div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>

        <FadeIn delay={0.4} className="mt-16 mx-auto max-w-2xl bg-blue-950/30 border border-blue-900/50 rounded-xl p-6 flex items-start gap-4">
          <Lock className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
          <p className="text-blue-100 text-sm leading-relaxed">
            <strong className="font-semibold text-white">Все вычисления выполняются на компьютере пользователя.</strong> Изображения не загружаются на удалённые серверы.
          </p>
        </FadeIn>
      </div>
    </section>
  );
};

const QuickGuide = () => {
  const steps = [
    {
      title: 'Распакуйте архив',
      desc: 'Извлеките всю папку и запустите AtlasPack.exe. Не отделяйте файл от папки _internal.',
      icon: Download,
    },
    {
      title: 'Выберите режим',
      desc: 'Сжатие текстуры, восстановление .atlaspack или переупаковка UV-развёртки.',
      icon: Layers,
    },
    {
      title: 'Добавьте файлы',
      desc: 'Для сжатия выберите PNG, JPG или WebP; для UV — OBJ и связанную текстуру.',
      icon: ImageIcon,
    },
    {
      title: 'Запустите обработку',
      desc: 'Настройте параметры, дождитесь проверки качества и сохраните принятый результат.',
      icon: CheckCircle,
    },
  ];

  return (
    <section id="instruktsiya" className="py-24 px-6 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-14 max-w-2xl">
          <p className="text-xs font-mono uppercase tracking-wider text-primary mb-3">Кратко · 4 шага</p>
          <h2 className="text-3xl font-bold mb-4">Как пользоваться AtlasPack</h2>
          <p className="text-muted-foreground">От запуска приложения до готового результата — без регистрации и подключения к интернету.</p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <FadeIn key={step.title} delay={index * 0.08}>
              <article className="h-full rounded-xl border border-border bg-card p-6 hover:border-primary/40 transition-colors">
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-2xl font-mono text-border">0{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.35} className="mt-8 rounded-xl border border-blue-900/50 bg-blue-950/30 p-5 flex items-start gap-4">
          <HardDrive className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <p className="text-sm leading-relaxed text-blue-100">
            Результаты по умолчанию сохраняются в папку <code className="font-mono text-blue-300">Документы/AtlasPack</code>. Папку можно изменить в верхней части окна приложения.
          </p>
        </FadeIn>
      </div>
    </section>
  );
};

const TwoModes = () => {
  return (
    <section className="py-24 px-6 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-16">
          <h2 className="text-3xl font-bold">Два режима работы</h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <FadeIn delay={0}>
            <div className="h-full rounded-2xl border border-border bg-card overflow-hidden flex flex-col group hover:border-blue-500/30 transition-colors">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-400 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-shadow"></div>
              <div className="p-8 flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-md bg-blue-500/10 text-blue-400">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Сжатие текстур</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    'PNG, JPG и WebP',
                    'RGB и RGBA',
                    'Максимальное разрешение 2048×2048',
                    'Экспорт в PNG, JPG или WebP',
                    'Контроль PSNR',
                    'Формат архива .atlaspack',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-muted-foreground">
                      <Check className="w-5 h-5 text-blue-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="h-full rounded-2xl border border-border bg-card overflow-hidden flex flex-col group hover:border-violet-500/30 transition-colors">
              <div className="h-2 bg-gradient-to-r from-violet-500 to-violet-400 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-shadow"></div>
              <div className="p-8 flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-md bg-violet-500/10 text-violet-400">
                    <Box className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Переупаковка UV</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    'OBJ с готовой UV-развёрткой',
                    'Входная текстура до 1024×1024',
                    'Выходные варианты: 256, 512, 1024 и 2048',
                    'Настройка отступа между UV-островами',
                    'Экспорт OBJ, MTL, PNG, JSON и ZIP-комплекта',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-muted-foreground">
                      <Check className="w-5 h-5 text-violet-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
};

const BeforeAfter = () => {
  return (
    <section className="py-24 px-6 border-t border-border bg-card/30">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-3">До и после</h2>
          <p className="text-muted-foreground font-mono text-sm uppercase tracking-wider">Демонстрация интерфейса</p>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FadeIn delay={0} className="space-y-4">
            <div className="aspect-square rounded-xl border border-border bg-background relative overflow-hidden group">
              <div className="absolute inset-0 opacity-40 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMGYxNzJhIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMOCA4Wk04IDBMMCA4WiIgc3Ryb2tlPSIjMzMzIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] transition-transform duration-700 group-hover:scale-105"></div>
              <img
                src={DEMO_ASSETS.source}
                alt="Исходная текстура AtlasPack, 2048 на 2048 пикселей"
                className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-start gap-2">
                <span className="bg-background/80 backdrop-blur text-xs font-mono px-2 py-1 rounded text-muted-foreground border border-border">2048×2048</span>
                <span className="bg-background/80 backdrop-blur text-xs font-mono px-2 py-1 rounded text-muted-foreground border border-border">{DEMO_RESULT.sourceSize}</span>
              </div>
            </div>
            <h3 className="text-center font-medium">Исходная текстура</h3>
          </FadeIn>

          <FadeIn delay={0.1} className="space-y-4">
            <div className="aspect-square rounded-xl border border-primary/40 bg-background relative overflow-hidden group">
              <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMGYxNzJhIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMOCA4Wk04IDBMMCA4WiIgc3Ryb2tlPSIjM2I4MmY2IiBzdHJva2Utd2lkdGg9IjAuNSI+PC9wYXRoPgo8L3N2Zz4=')] transition-transform duration-700 group-hover:scale-105"></div>
              <img
                src={DEMO_ASSETS.restored}
                alt="Восстановленная текстура AtlasPack, 2048 на 2048 пикселей"
                className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-start gap-2">
                <span className="bg-primary/20 text-primary text-xs font-mono px-2 py-1 rounded border border-primary/30">2048×2048</span>
                <span className="bg-primary/20 text-primary text-xs font-mono px-2 py-1 rounded border border-primary/30 shadow-[0_0_10px_rgba(59,130,246,0.3)]">{DEMO_RESULT.exportSize}</span>
              </div>
            </div>
            <h3 className="text-center font-medium">Восстановленная текстура</h3>
          </FadeIn>

          <FadeIn delay={0.2} className="space-y-4">
            <div className="aspect-square rounded-xl border border-violet-500/40 bg-background relative overflow-hidden group">
              <img
                src={DEMO_ASSETS.difference}
                alt="Карта RGB-различий исходной и восстановленной текстур, 2048 на 2048 пикселей"
                className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-start gap-2">
                <span className="bg-violet-500/20 text-violet-300 text-xs font-mono px-2 py-1 rounded border border-violet-500/30">2048×2048</span>
                <span className="bg-violet-500/20 text-violet-300 text-xs font-mono px-2 py-1 rounded border border-violet-500/30">PSNR: {DEMO_RESULT.psnr}</span>
              </div>
            </div>
            <h3 className="text-center font-medium">Карта RGB-различий ×4</h3>
          </FadeIn>
        </div>

        <FadeIn delay={0.3} className="mt-10 rounded-xl border border-emerald-500/25 bg-emerald-500/[0.04] overflow-hidden">
          <div className="px-5 py-4 border-b border-emerald-500/20 flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 text-emerald-400 font-semibold">
              <CheckCircle className="w-5 h-5" />
              Результат принят
            </div>
            <span className="text-sm font-mono text-emerald-300">Экономия {DEMO_RESULT.savings}</span>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Исходный файл', value: DEMO_RESULT.sourceSize },
              { label: 'Архив .atlaspack', value: DEMO_RESULT.archiveSize },
              { label: 'Коэффициент', value: `${DEMO_RESULT.compressionRatio} · ${DEMO_RESULT.savings}` },
              { label: 'Экспорт', value: `${DEMO_RESULT.exportFormat}, ${DEMO_RESULT.exportSize}` },
              { label: 'Битность RGB', value: DEMO_RESULT.rgbBitDepth },
              { label: 'Замаскировано', value: DEMO_RESULT.masked },
              { label: 'PSNR', value: `${DEMO_RESULT.psnr} · минимум ${DEMO_RESULT.minimumPsnr}` },
              { label: 'Время', value: DEMO_RESULT.processingTime },
            ].map((item) => (
              <div key={item.label} className="px-5 py-4 border-t border-border/70 lg:[&:nth-child(-n+4)]:border-t-0">
                <dt className="text-xs text-muted-foreground mb-1">{item.label}</dt>
                <dd className="text-sm font-mono text-foreground">{item.value}</dd>
              </div>
            ))}
          </dl>

          <div className="px-5 py-4 border-t border-border/70 flex items-center gap-2 text-sm text-muted-foreground">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            Альфа-канал {DEMO_RESULT.alphaChannel}.
          </div>
        </FadeIn>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FadeIn delay={0.4}>
            <article className="h-full rounded-xl border border-primary/30 bg-primary/[0.04] overflow-hidden">
              <div className="px-5 py-4 border-b border-primary/20 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-primary mb-1">Фактический замер</p>
                  <h3 className="text-lg font-semibold">Тестовая конфигурация</h3>
                </div>
                <span className="px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-mono">
                  {DEMO_RESULT.processingTime}
                </span>
              </div>

              <dl className="divide-y divide-border/70">
                <div className="px-5 py-4 flex items-start gap-3">
                  <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <dt className="text-xs text-muted-foreground mb-1">Видеокарта</dt>
                    <dd className="text-sm font-mono">NVIDIA GeForce RTX 4050 Laptop GPU · 6 ГБ VRAM</dd>
                  </div>
                </div>
                <div className="px-5 py-4 flex items-start gap-3">
                  <Cpu className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <dt className="text-xs text-muted-foreground mb-1">Процессор</dt>
                    <dd className="text-sm font-mono">Intel Core i5-12500H · 12 ядер / 16 потоков</dd>
                  </div>
                </div>
                <div className="px-5 py-4 flex items-start gap-3">
                  <Database className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <dt className="text-xs text-muted-foreground mb-1">Оперативная память</dt>
                    <dd className="text-sm font-mono">32 ГБ</dd>
                  </div>
                </div>
              </dl>

              <p className="px-5 py-4 border-t border-border/70 text-xs leading-relaxed text-muted-foreground">
                Замер для RGBA-атласа 2048×2048: маскирование 20.0%, RGB 6 бит/канал, экспорт PNG.
              </p>
            </article>
          </FadeIn>

          <FadeIn delay={0.5}>
            <article className="h-full rounded-xl border border-violet-500/30 bg-violet-500/[0.04] overflow-hidden">
              <div className="px-5 py-4 border-b border-violet-500/20 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-violet-300 mb-1">Расчётный ориентир</p>
                  <h3 className="text-lg font-semibold">Минимум для обработки менее чем за минуту</h3>
                </div>
                <span className="px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm font-mono">
                  {DEMO_RESULT.estimatedMinimumTime}
                </span>
              </div>

              <dl className="divide-y divide-border/70">
                <div className="px-5 py-4 flex items-start gap-3">
                  <Zap className="w-5 h-5 text-violet-300 shrink-0 mt-0.5" />
                  <div>
                    <dt className="text-xs text-muted-foreground mb-1">Видеокарта</dt>
                    <dd className="text-sm font-mono">NVIDIA с CUDA и 6 ГБ VRAM · RTX 3050 Laptop 6 ГБ или лучше</dd>
                  </div>
                </div>
                <div className="px-5 py-4 flex items-start gap-3">
                  <Cpu className="w-5 h-5 text-violet-300 shrink-0 mt-0.5" />
                  <div>
                    <dt className="text-xs text-muted-foreground mb-1">Процессор</dt>
                    <dd className="text-sm font-mono">От 4 ядер / 8 потоков · Core i5-10300H / Ryzen 5 4600H или лучше</dd>
                  </div>
                </div>
                <div className="px-5 py-4 flex items-start gap-3">
                  <Database className="w-5 h-5 text-violet-300 shrink-0 mt-0.5" />
                  <div>
                    <dt className="text-xs text-muted-foreground mb-1">Оперативная память</dt>
                    <dd className="text-sm font-mono">16 ГБ · желательно не менее 8 ГБ свободно</dd>
                  </div>
                </div>
              </dl>

              <p className="px-5 py-4 border-t border-border/70 text-xs leading-relaxed text-muted-foreground">
                Оценка использует запас {DEMO_RESULT.performanceHeadroom} относительно замера 28.3 с и не является гарантией. Время зависит от TGP видеокарты, охлаждения, драйвера, первого запуска модели и фоновой нагрузки.
              </p>
            </article>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

const TechSpecs = () => {
  const specs = [
    { label: 'Платформа', value: 'Windows x64' },
    { label: 'Режим работы', value: 'Полностью локальный' },
    { label: 'Интернет', value: 'Не требуется' },
    { label: 'Форматы входа', value: 'PNG, JPG, WebP' },
    { label: 'Цветовые режимы', value: 'RGB, RGBA' },
    { label: 'Максимальное разрешение сжатия', value: '2048×2048' },
    { label: 'Максимальный вход для xatlas', value: '1024×1024' },
    { label: 'Выход xatlas', value: '256, 512, 1024 или 2048' },
    { label: 'Экспорт', value: 'PNG, JPG, WebP, .atlaspack' },
    { label: 'Модель восстановления', value: 'Big-LaMa' },
    { label: 'Движок UV-переупаковки', value: 'xatlas' },
    { label: 'Контроль качества', value: 'PSNR' },
    { label: 'Альфа-канал', value: 'Сохраняется без потерь в PNG и WebP' },
  ];

  return (
    <section id="harakteristiki" className="py-24 px-6 border-t border-border bg-background">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="mb-12 text-center">
          <h2 className="text-3xl font-bold">Технические характеристики</h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
              <div className="flex flex-col divide-y divide-border">
                {specs.slice(0, Math.ceil(specs.length/2)).map((spec, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-white/[0.02] transition-colors">
                    <span className="text-sm text-muted-foreground mb-1 sm:mb-0">{spec.label}</span>
                    <span className="text-sm font-mono text-foreground sm:text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col divide-y divide-border">
                {specs.slice(Math.ceil(specs.length/2)).map((spec, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-white/[0.02] transition-colors">
                    <span className="text-sm text-muted-foreground mb-1 sm:mb-0">{spec.label}</span>
                    <span className="text-sm font-mono text-foreground sm:text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const Security = () => {
  return (
    <section className="py-24 px-6 border-t border-border bg-card/30">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="flex flex-col items-center text-center mb-12">
          <Shield className="w-12 h-12 text-primary mb-6" />
          <h2 className="text-3xl font-bold mb-4">Безопасность и конфиденциальность</h2>
          <p className="text-muted-foreground max-w-2xl">Ваши данные остаются вашими. AtlasPack спроектирован для работы в изолированных средах.</p>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FadeIn delay={0.1}>
            <div className="h-full p-6 rounded-xl border border-border bg-background flex flex-col items-center text-center hover:border-blue-500/30 transition-colors">
              <HardDrive className="w-8 h-8 text-blue-400 mb-4" />
              <p className="text-sm font-medium">Файлы остаются на компьютере пользователя</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="h-full p-6 rounded-xl border border-border bg-background flex flex-col items-center text-center hover:border-blue-500/30 transition-colors">
              <AlertCircle className="w-8 h-8 text-blue-400 mb-4" />
              <p className="text-sm font-medium">Приложение не требует подключения к серверу</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="h-full p-6 rounded-xl border border-border bg-background flex flex-col items-center text-center hover:border-blue-500/30 transition-colors">
              <Database className="w-8 h-8 text-blue-400 mb-4" />
              <p className="text-sm font-medium">Модель и все необходимые библиотеки входят в автономный комплект</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section id="skachat" className="py-32 px-6 border-t border-border bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none"></div>
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <FadeIn>
          <h2 className="text-4xl font-bold mb-6">Готовы оптимизировать текстуры?</h2>
          <p className="text-lg text-muted-foreground mb-10">
            Скачайте автономную версию AtlasPack для Windows. Установка интернет-соединения, Python, WSL или дополнительных библиотек не требуется.
          </p>
          <a href={DOWNLOAD_URL} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary hover:bg-blue-500 text-white font-bold text-lg transition-colors shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)]" data-testid="btn-cta-download">
            <Download className="w-6 h-6" />
            Скачать AtlasPack для Windows
          </a>
          <DownloadAgreementNotice className="mt-4 max-w-lg mx-auto" />
        </FadeIn>
        <FadeIn delay={0.2} className="flex flex-wrap justify-center gap-4 mt-8">
          <span className="px-3 py-1 rounded-full border border-border bg-card text-xs font-mono text-muted-foreground">Windows x64</span>
          <span className="px-3 py-1 rounded-full border border-border bg-card text-xs font-mono text-muted-foreground">Автономная версия</span>
          <span className="px-3 py-1 rounded-full border border-border bg-card text-xs font-mono text-muted-foreground">Работает без интернета</span>
        </FadeIn>
        <FadeIn delay={0.3} className="mt-12 p-4 rounded-lg bg-blue-950/20 border border-blue-900/30 text-sm text-blue-200/70 inline-block text-left max-w-xl mx-auto">
          <strong>Примечание:</strong> После скачивания распакуйте архив целиком и запустите <code className="font-mono text-blue-300">AtlasPack.exe</code>. Не переносите EXE отдельно от папки <code className="font-mono text-blue-300">_internal</code>.
        </FadeIn>
      </div>
    </section>
  );
};

const FundBlock = () => {
  return (
    <section className="py-16 px-6 border-t border-border bg-card/50">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[minmax(180px,260px)_1fr_minmax(180px,260px)] items-center gap-8 text-center">
        <img
          src={`${import.meta.env.BASE_URL}fund-logo.png`}
          alt="Фонд содействия инновациям"
          className="w-full max-w-[260px] h-auto justify-self-center bg-white rounded-xl p-3"
        />
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Проект реализован при поддержке Фонда содействия инновациям в рамках программы «Студенческий стартап» мероприятия «Платформа университетского технологического предпринимательства» федерального проекта «Технологии».
        </p>
        <img
          src={`${import.meta.env.BASE_URL}university-tech-platform-logo.png`}
          alt="Платформа университетского технологического предпринимательства"
          className="w-full max-w-[220px] h-auto justify-self-center rounded-xl"
        />
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-6 px-6 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <p className="text-sm text-muted-foreground font-mono">© 2026 AtlasPack · ООО «ВЕРИИТАС»</p>
        <a
          href={USER_AGREEMENT_URL}
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          Пользовательское соглашение
        </a>
      </div>
    </footer>
  );
};

function App() {
  const [isAgreementPage, setIsAgreementPage] = useState(
    () => window.location.hash === USER_AGREEMENT_URL,
  );

  useEffect(() => {
    const handleHashChange = () => {
      setIsAgreementPage(window.location.hash === USER_AGREEMENT_URL);
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (isAgreementPage) {
    return <UserAgreementPage />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/30">
      <Navbar />
      <main className="flex-1 overflow-x-hidden">
        <Hero />
        <Features />
        <HowItWorks />
        <QuickGuide />
        <TwoModes />
        <BeforeAfter />
        <TechSpecs />
        <Security />
        <CTA />
        <FundBlock />
      </main>
      <Footer />
    </div>
  );
}

export default App;
