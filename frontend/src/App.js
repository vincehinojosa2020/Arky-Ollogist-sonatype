import { useState, useEffect, useRef } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { 
  BookOpen, 
  Heart, 
  ShoppingCart, 
  MapPin, 
  Church, 
  Sparkles,
  ChevronDown,
  ExternalLink,
  Menu,
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Linkedin,
  MessageCircle
} from "lucide-react";

// Links
const AMAZON_LINK = "https://www.amazon.com/dp/B0GMZG64QG/ref=cm_sw_r_ffobk_cso_cp_apin_dp_K7BVT8ZNZEKGFJYKGTF2";
const BARTEMON_LINK = "https://www.amazon.com/Bartemon-sour-lemon-finds-his-ebook/dp/B0GMY3D31J";
const LINKEDIN_LINK = "https://www.linkedin.com/in/ishmendoza/";
const YOUTUBE_MUSIC = "https://www.youtube.com/embed/c9xtkAZSK50?start=9660&autoplay=1&enablejsapi=1";

// Book data
const BOOK_IMAGES = {
  cover: "https://customer-assets.emergentagent.com/job_book-builder-7/artifacts/nltb143z_image.png",
  arky: "https://customer-assets.emergentagent.com/job_book-builder-7/artifacts/kwb7l14t_image.png",
  colony: "https://customer-assets.emergentagent.com/job_book-builder-7/artifacts/jbnf3fzm_image.png",
  bible: "https://customer-assets.emergentagent.com/job_book-builder-7/artifacts/sfh6tqmx_image.png",
  community: "https://customer-assets.emergentagent.com/job_book-builder-7/artifacts/wxtznbh5_image.png",
  scientist: "https://customer-assets.emergentagent.com/job_book-builder-7/artifacts/b9nmqpxo_image.png",
  preacher: "https://customer-assets.emergentagent.com/job_book-builder-7/artifacts/s32qpk5n_image.png",
  explorers: "https://customer-assets.emergentagent.com/job_book-builder-7/artifacts/zziv5yep_image.png",
  couple: "https://customer-assets.emergentagent.com/job_book-builder-7/artifacts/re0u8sn0_image.png",
  nurse: "https://customer-assets.emergentagent.com/job_book-builder-7/artifacts/45hdjkzo_image.png"
};

const CHAPTERS = [
  { num: 1, title: "The Adventures of Arky Allogist Ant", desc: "Meet Arky and his special ant colony family" },
  { num: 2, title: "Arky Digs a Well", desc: "Learning the value of hard work" },
  { num: 3, title: "Arky and the Pearl of Great Price", desc: "Discovering what truly matters" },
  { num: 4, title: "Arky and the Big Fight", desc: "Finding strength in faith" },
  { num: 5, title: "Arky in the Shadow Place - Part 1", desc: "Facing fears with courage" },
  { num: 6, title: "Arky in the Shadow Place - Part 2", desc: "Light overcomes darkness" },
  { num: 7, title: "Arky in the Battle of the Oak Tree - Part 1", desc: "Standing together as a community" },
  { num: 8, title: "Arky in the Battle of the Oak Tree - Part 2", desc: "Victory through faith and unity" }
];

const CRUNCH_BUNCH = [
  "Maliyah", "Natalia", "Jonas", "Draco", 
  "Silas", "Jasper", "Sarah", "Violet"
];

// Custom Cursor Component
const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
    const moveCursor = (e) => {
      const { clientX, clientY } = e;
      cursor.style.transform = `translate(${clientX - 20}px, ${clientY - 20}px)`;
      cursorDot.style.transform = `translate(${clientX - 4}px, ${clientY - 4}px)`;
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={cursorDotRef} className="custom-cursor-dot" />
    </>
  );
};

// Music Player Component
const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const iframeRef = useRef(null);

  const togglePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      toast.success("Playing Motown classics for Poopah!");
    } else {
      setIsPlaying(false);
      toast.info("Music paused");
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40" data-testid="music-player">
      <div className="bg-white dark:bg-arky-brown rounded-full shadow-lg border border-[#EBE5DA] dark:border-arky-brown-light p-2 flex items-center gap-2">
        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-arky-blue hover:bg-arky-blue-light text-white flex items-center justify-center transition-all duration-300 hover:scale-105"
          data-testid="play-pause-btn"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </button>
        
        {isPlaying && (
          <button
            onClick={toggleMute}
            className="w-10 h-10 rounded-full bg-arky-gold/20 hover:bg-arky-gold/40 text-arky-brown dark:text-white flex items-center justify-center transition-all"
            data-testid="mute-btn"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        )}
        
        <span className="text-xs font-medium text-arky-brown-light dark:text-white/70 pr-3 hidden sm:block">
          Motown
        </span>
      </div>
      
      {/* Hidden YouTube iframe for audio */}
      {isPlaying && (
        <iframe
          ref={iframeRef}
          src={`${YOUTUBE_MUSIC}${isMuted ? '&mute=1' : ''}`}
          className="hidden"
          allow="autoplay"
          title="Motown Music"
        />
      )}
    </div>
  );
};

// Dark Mode Toggle
const DarkModeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="fixed top-24 right-6 z-40 w-12 h-12 rounded-full bg-white dark:bg-arky-brown shadow-lg border border-[#EBE5DA] dark:border-arky-brown-light flex items-center justify-center transition-all duration-300 hover:scale-105"
      data-testid="dark-mode-toggle"
    >
      {darkMode ? (
        <Sun className="w-5 h-5 text-arky-gold" />
      ) : (
        <Moon className="w-5 h-5 text-arky-brown" />
      )}
    </button>
  );
};

// Navigation Component
const Navigation = ({ isScrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'py-2' : 'py-4'
    }`}>
      <div className={`max-w-5xl mx-4 md:mx-auto rounded-full nav-glass border border-white/20 dark:border-arky-brown-light/30 shadow-sm ${
        isScrolled ? 'shadow-md' : ''
      }`}>
        <div className="flex items-center justify-between px-6 py-3">
          <a href="#hero" className="flex items-center gap-2">
            <img 
              src={BOOK_IMAGES.arky} 
              alt="Arky" 
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-heading font-bold text-arky-brown dark:text-white hidden sm:block">
              Arky's Adventures
            </span>
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#about" className="text-arky-brown-light dark:text-white/80 hover:text-arky-brown dark:hover:text-white transition-colors font-medium">
              About
            </a>
            <a href="#chapters" className="text-arky-brown-light dark:text-white/80 hover:text-arky-brown dark:hover:text-white transition-colors font-medium">
              Chapters
            </a>
            <a href="#author" className="text-arky-brown-light dark:text-white/80 hover:text-arky-brown dark:hover:text-white transition-colors font-medium">
              Author
            </a>
            <a href="#dedication" className="text-arky-brown-light dark:text-white/80 hover:text-arky-brown dark:hover:text-white transition-colors font-medium">
              Dedication
            </a>
            <a href="#more-books" className="text-arky-brown-light dark:text-white/80 hover:text-arky-brown dark:hover:text-white transition-colors font-medium">
              More Books
            </a>
            <a 
              href={AMAZON_LINK}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="nav-buy-btn"
            >
              <Button className="bg-arky-blue hover:bg-arky-blue-light text-white rounded-full px-6 btn-glow">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Buy Now
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-arky-brown dark:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-6 pb-4 space-y-3">
            <a href="#about" className="block py-2 text-arky-brown-light dark:text-white/80 hover:text-arky-brown dark:hover:text-white" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#chapters" className="block py-2 text-arky-brown-light dark:text-white/80 hover:text-arky-brown dark:hover:text-white" onClick={() => setMobileMenuOpen(false)}>Chapters</a>
            <a href="#author" className="block py-2 text-arky-brown-light dark:text-white/80 hover:text-arky-brown dark:hover:text-white" onClick={() => setMobileMenuOpen(false)}>Author</a>
            <a href="#dedication" className="block py-2 text-arky-brown-light dark:text-white/80 hover:text-arky-brown dark:hover:text-white" onClick={() => setMobileMenuOpen(false)}>Dedication</a>
            <a 
              href={AMAZON_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
              data-testid="mobile-buy-btn"
            >
              <Button className="w-full bg-arky-blue hover:bg-arky-blue-light text-white rounded-full">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Buy Now
              </Button>
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-24 pb-16 relative overflow-hidden">
      {/* Golden blob background */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] golden-blob -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] golden-blob -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8 opacity-0 animate-fade-up">
            <div className="space-y-4">
              <span className="inline-block font-accent text-2xl text-arky-orange dark:text-arky-gold">
                A Faith-Based Children's Book
              </span>
              <h1 className="font-heading text-5xl md:text-7xl font-bold text-arky-brown dark:text-white tracking-tight leading-none">
                The Adventures of Arky Allogist Ant
              </h1>
              <p className="text-lg md:text-xl text-arky-brown-light dark:text-white/80 leading-relaxed max-w-lg">
                A grandfather's love letter to his grandchildren. Eight timeless stories 
                of faith, courage, and family that will inspire generations to come.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={AMAZON_LINK}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="hero-buy-btn"
              >
                <Button className="bg-arky-blue hover:bg-arky-blue-light text-white rounded-full px-8 py-6 font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 btn-glow w-full sm:w-auto">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Buy on Amazon
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
            
            <div className="flex items-center gap-4">
              <p className="text-sm text-arky-brown-light dark:text-white/60 font-accent text-xl">
                By Poopah (Moises Mendoza)
              </p>
              <span className="text-arky-gold">|</span>
              <p className="text-sm text-arky-brown-light dark:text-white/60">
                A Storyteller from Fresno
              </p>
            </div>
          </div>
          
          {/* Book Cover */}
          <div className="relative opacity-0 animate-fade-up delay-200">
            <div className="relative floating">
              <a href={AMAZON_LINK} target="_blank" rel="noopener noreferrer">
                <img 
                  src={BOOK_IMAGES.cover}
                  alt="The Adventures of Arky Allogist Ant Book Cover"
                  className="w-full max-w-md mx-auto rounded-2xl book-shadow cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                  data-testid="book-cover-image"
                />
              </a>
            </div>
            {/* Decorative Arky */}
            <img 
              src={BOOK_IMAGES.scientist}
              alt="Scientist Ant"
              className="absolute -bottom-8 -right-4 w-32 h-32 rounded-full shadow-lg hidden lg:block animate-float"
            />
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#about">
            <ChevronDown className="w-8 h-8 text-arky-brown-light dark:text-white/60" />
          </a>
        </div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img 
                src={BOOK_IMAGES.colony}
                alt="Ant Colony"
                className="rounded-2xl shadow-lg w-full aspect-square object-cover"
              />
              <img 
                src={BOOK_IMAGES.bible}
                alt="Bible Scene"
                className="rounded-2xl shadow-lg w-full aspect-square object-cover mt-8"
              />
              <img 
                src={BOOK_IMAGES.explorers}
                alt="Ant Explorers"
                className="rounded-2xl shadow-lg w-full aspect-square object-cover"
              />
              <img 
                src={BOOK_IMAGES.community}
                alt="Community"
                className="rounded-2xl shadow-lg w-full aspect-square object-cover mt-8"
              />
            </div>
          </div>
          
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-sm uppercase tracking-widest font-bold text-arky-green">
                About the Book
              </span>
              <h2 className="font-heading text-4xl md:text-5xl font-semibold text-arky-brown dark:text-white tracking-tight">
                Stories That Shape Hearts
              </h2>
            </div>
            
            <div className="space-y-6 text-lg text-arky-brown-light dark:text-white/80 leading-relaxed">
              <p>
                <strong className="text-arky-brown dark:text-white">Arky is an ant.</strong> He lives in a small colony of special ants 
                with his family. His family's last name is Allogist.
              </p>
              <p>
                Through eight beautifully illustrated chapters, children discover the power of 
                hard work, the courage to face fears, and the strength found in faith and community.
              </p>
              <p className="font-medium text-arky-brown dark:text-white">
                Every adventure is rooted in God's word—the perfect gift for families who 
                want to pass down timeless values to the next generation.
              </p>
            </div>
            
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-arky-brown dark:text-white">
                <Sparkles className="w-5 h-5 text-arky-gold" />
                <span className="font-medium">8 Chapters</span>
              </div>
              <div className="flex items-center gap-2 text-arky-brown dark:text-white">
                <Heart className="w-5 h-5 text-arky-orange" />
                <span className="font-medium">Faith-Based</span>
              </div>
              <div className="flex items-center gap-2 text-arky-brown dark:text-white">
                <BookOpen className="w-5 h-5 text-arky-green" />
                <span className="font-medium">Illustrated</span>
              </div>
            </div>
            
            <a 
              href={AMAZON_LINK}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="about-buy-btn"
            >
              <Button className="bg-arky-blue hover:bg-arky-blue-light text-white rounded-full px-8 py-4 font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 btn-glow mt-4">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Get Your Copy Today
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// Chapters Section
const ChaptersSection = () => {
  return (
    <section id="chapters" className="py-24 md:py-32 bg-white/50 dark:bg-arky-brown/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-sm uppercase tracking-widest font-bold text-arky-blue">
            Chapter Preview
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-arky-brown dark:text-white tracking-tight">
            Eight Adventures Await
          </h2>
          <p className="text-lg text-arky-brown-light dark:text-white/80">
            Each chapter brings a new lesson and adventure for Arky and his family.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CHAPTERS.map((chapter, index) => (
            <div 
              key={chapter.num}
              className="chapter-card bg-white dark:bg-arky-brown/50 rounded-3xl p-6 border border-[#EBE5DA] dark:border-arky-brown-light/30 shadow-sm"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-full bg-arky-gold/20 flex items-center justify-center font-heading font-bold text-arky-brown dark:text-white">
                  {chapter.num}
                </span>
                <span className="text-xs uppercase tracking-wider text-arky-brown-light dark:text-white/60 font-bold">
                  Chapter
                </span>
              </div>
              <h3 className="font-heading text-lg font-semibold text-arky-brown dark:text-white mb-2 leading-snug">
                {chapter.title}
              </h3>
              <p className="text-sm text-arky-brown-light dark:text-white/70">
                {chapter.desc}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href={AMAZON_LINK}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="chapters-buy-btn"
          >
            <Button className="bg-arky-blue hover:bg-arky-blue-light text-white rounded-full px-8 py-6 font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 btn-glow">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Get the Full Book
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

// Author Section
const AuthorSection = () => {
  return (
    <section id="author" className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <span className="text-sm uppercase tracking-widest font-bold text-arky-orange">
                Meet the Storyteller
              </span>
              <h2 className="font-heading text-4xl md:text-5xl font-semibold text-arky-brown dark:text-white tracking-tight">
                Moises J. Mendoza Sr.
                <span className="block text-2xl md:text-3xl font-normal text-arky-brown-light dark:text-white/80 mt-2">
                  "Poopah"
                </span>
              </h2>
            </div>
            
            <div className="space-y-5 text-base md:text-lg text-arky-brown-light dark:text-white/80 leading-relaxed">
              <p>
                Born in <strong className="text-arky-brown dark:text-white">Madera, California</strong> to immigrant parents 
                from Jalisco, Mexico. Raised in a hardworking Mexican American household, he spent his early years 
                picking grapes in the fields—an experience that shaped his character, resilience, and deep appreciation 
                for family and faith.
              </p>
              <p>
                He served in the <strong className="text-arky-brown dark:text-white">United States Army National Guard</strong>, 
                including a stationing in South Korea, and built a professional career spanning transportation, 
                agriculture, and manufacturing.
              </p>
              <p>
                Above all, Moises is a <strong className="text-arky-brown dark:text-white">devoted follower of Christ and preacher 
                of the Gospel</strong>. For decades, he has served in ministry, delivering sermons, leading children's programs, 
                and guiding others in their spiritual journey.
              </p>
              <p className="font-accent text-xl text-arky-orange italic">
                "Becoming both a young father and later a young grandfather strengthened his childlike wonder 
                and love for storytelling."
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <div className="flex items-center gap-2 text-arky-brown dark:text-white bg-arky-bg dark:bg-arky-brown/50 px-4 py-2 rounded-full">
                <MapPin className="w-4 h-4 text-arky-green" />
                <span className="text-sm font-medium">Central Valley, CA</span>
              </div>
              <div className="flex items-center gap-2 text-arky-brown dark:text-white bg-arky-bg dark:bg-arky-brown/50 px-4 py-2 rounded-full">
                <Church className="w-4 h-4 text-arky-blue" />
                <span className="text-sm font-medium">Minister</span>
              </div>
              <div className="flex items-center gap-2 text-arky-brown dark:text-white bg-arky-bg dark:bg-arky-brown/50 px-4 py-2 rounded-full">
                <BookOpen className="w-4 h-4 text-arky-orange" />
                <span className="text-sm font-medium">Army Veteran</span>
              </div>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative">
              <img 
                src={BOOK_IMAGES.preacher}
                alt="Poopah preaching"
                className="rounded-3xl shadow-2xl w-full max-w-md mx-auto"
              />
              {/* Decorative couple */}
              <img 
                src={BOOK_IMAGES.couple}
                alt="Ant couple"
                className="absolute -bottom-6 -left-6 w-32 h-32 rounded-2xl shadow-lg hidden lg:block"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Dedication Section
const DedicationSection = () => {
  return (
    <section id="dedication" className="py-24 md:py-32 bg-white/50 dark:bg-arky-brown/30 relative overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url(${BOOK_IMAGES.community})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <span className="text-sm uppercase tracking-widest font-bold text-arky-gold">
            With All My Love
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-arky-brown dark:text-white tracking-tight">
            For the Crunch Bunch
          </h2>
          <p className="text-lg text-arky-brown-light dark:text-white/80 leading-relaxed">
            These stories were developed and written over a period of several years as a 
            tribute to my grandchildren. Inspired by my "Crunch Bunch" with all my love.
          </p>
        </div>
        
        {/* Grandchildren Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto mb-12">
          {CRUNCH_BUNCH.map((name, index) => (
            <div 
              key={name}
              className="name-tag rounded-2xl p-4 text-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="font-heading text-xl font-semibold text-arky-brown dark:text-white">
                {name}
              </span>
            </div>
          ))}
        </div>
        
        {/* Special Thanks */}
        <div className="bg-white dark:bg-arky-brown/50 rounded-3xl p-8 md:p-12 shadow-sm border border-[#EBE5DA] dark:border-arky-brown-light/30 max-w-4xl mx-auto">
          <div className="text-center space-y-6">
            <Heart className="w-12 h-12 text-arky-orange mx-auto" />
            <blockquote className="text-lg md:text-xl text-arky-brown-light dark:text-white/80 leading-relaxed italic">
              "I thank you all, especially my True Love <strong className="text-arky-brown dark:text-white">Moomah- Julie</strong> and 
              my children <strong className="text-arky-brown dark:text-white">Moises, Ismael, Benjamin, Marissa</strong>, and their spouses 
              for making me the man I am today. Special thanks to my church friends Pastor and 
              first lady Guzman and Ministry at Family Vine for your encouragement."
            </blockquote>
            <p className="font-accent text-2xl text-arky-orange">
              Thank you, Lord, for allowing me to share my thoughts through my writing.
            </p>
            <p className="text-arky-brown dark:text-white font-heading font-semibold">
              — Poopah, Moises Mendoza
              <span className="block text-sm text-arky-brown-light dark:text-white/60 font-body font-normal mt-1">
                January 10, 2026
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// More Books Section
const MoreBooksSection = () => {
  return (
    <section id="more-books" className="py-16 md:py-20 border-t border-[#EBE5DA] dark:border-arky-brown-light/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-sm uppercase tracking-widest font-bold text-arky-green">
            Also by Moises Mendoza
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-arky-brown dark:text-white tracking-tight mt-3">
            More Stories to Discover
          </h2>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-4xl mx-auto">
          {/* Bartemon Book Card */}
          <a 
            href={BARTEMON_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex-1 max-w-sm"
            data-testid="bartemon-book-link"
          >
            <div className="bg-white dark:bg-arky-brown/50 rounded-3xl p-6 border border-[#EBE5DA] dark:border-arky-brown-light/30 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center text-3xl shadow-md">
                  🍋
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-lg font-semibold text-arky-brown dark:text-white leading-snug">
                    Bartemon the Sour Lemon Finds His Way
                  </h3>
                  <p className="text-sm text-arky-brown-light dark:text-white/60 mt-1">
                    Another heartwarming tale by Poopah
                  </p>
                </div>
                <ExternalLink className="w-5 h-5 text-arky-blue opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </a>
        </div>
        
        <p className="text-center text-sm text-arky-brown-light dark:text-white/60 mt-8">
          Stories first told at bedtime, now shared with the world.
        </p>
      </div>
    </section>
  );
};

// Contact/CTA Section (Simplified)
const ContactSection = () => {
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Message to Ish */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-sm uppercase tracking-widest font-bold text-arky-green">
                Questions?
              </span>
              <h2 className="font-heading text-4xl md:text-5xl font-semibold text-arky-brown dark:text-white tracking-tight">
                Let's Connect
              </h2>
              <p className="text-lg text-arky-brown-light dark:text-white/80 leading-relaxed">
                Have questions about Arky's adventures? Want to discuss bulk orders for your 
                church, school, or family? Interested in Poopah's upcoming stories?
              </p>
            </div>
            
            <div className="bg-arky-bg dark:bg-arky-brown/30 rounded-3xl p-8 border border-[#EBE5DA] dark:border-arky-brown-light/30">
              <div className="flex items-start gap-4">
                <img 
                  src={BOOK_IMAGES.scientist}
                  alt="Scientist Ant"
                  className="w-16 h-16 rounded-full"
                />
                <div className="space-y-3">
                  <p className="text-arky-brown dark:text-white font-medium">
                    Send a message to Ish, Poopah's son! He'll make sure your questions 
                    get answered.
                  </p>
                  <p className="text-sm text-arky-brown-light dark:text-white/60 font-accent text-lg">
                    "Happy to help spread Poopah's stories!"
                  </p>
                </div>
              </div>
            </div>
            
            <a 
              href={LINKEDIN_LINK}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="linkedin-dm-btn"
            >
              <Button className="bg-arky-blue hover:bg-arky-blue-light text-white rounded-full px-8 py-6 font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 btn-glow">
                <Linkedin className="w-5 h-5 mr-2" />
                Send a DM to Ish
                <MessageCircle className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
          
          {/* Right - CTA Card */}
          <div className="lg:pl-12">
            <div className="bg-arky-brown dark:bg-arky-brown rounded-3xl p-8 md:p-12 text-white sticky top-32">
              <img 
                src={BOOK_IMAGES.arky}
                alt="Arky"
                className="w-24 h-24 rounded-2xl mb-6 shadow-lg"
              />
              <h3 className="font-heading text-3xl font-semibold mb-4">
                Ready to Start the Adventure?
              </h3>
              <p className="text-white/80 mb-8 leading-relaxed">
                One click away from bringing Arky's faith-filled adventures into your home. 
                The perfect gift for children, grandchildren, and families who love stories with heart.
              </p>
              <a 
                href={AMAZON_LINK}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="contact-buy-btn"
              >
                <Button className="bg-arky-blue hover:bg-arky-blue-light text-white rounded-full px-8 py-6 font-bold w-full shadow-lg hover:shadow-xl transition-all duration-300 btn-glow">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Buy Now on Amazon
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </a>
              
              <div className="mt-8 pt-8 border-t border-white/20 text-center">
                <p className="text-sm text-white/60">
                  Paperback copies available on Amazon
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="py-12 border-t border-[#EBE5DA] dark:border-arky-brown-light/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img 
              src={BOOK_IMAGES.arky}
              alt="Arky"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-heading font-semibold text-arky-brown dark:text-white">
                The Adventures of Arky Allogist Ant
              </p>
              <p className="text-sm text-arky-brown-light dark:text-white/60">
                By Poopah (Moises Mendoza)
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-arky-brown-light dark:text-white/60">
            <a href="#about" className="hover:text-arky-brown dark:hover:text-white transition-colors">About</a>
            <a href="#chapters" className="hover:text-arky-brown dark:hover:text-white transition-colors">Chapters</a>
            <a href="#author" className="hover:text-arky-brown dark:hover:text-white transition-colors">Author</a>
            <a href="#more-books" className="hover:text-arky-brown dark:hover:text-white transition-colors">More Books</a>
            <a 
              href={LINKEDIN_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-arky-brown dark:hover:text-white transition-colors flex items-center gap-1"
            >
              <Linkedin className="w-4 h-4" />
              Connect
            </a>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href={AMAZON_LINK}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-buy-btn"
            >
              <Button className="bg-arky-blue hover:bg-arky-blue-light text-white rounded-full px-6 py-2 text-sm btn-glow">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Buy Now
              </Button>
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-[#EBE5DA] dark:border-arky-brown-light/30 text-center space-y-3">
          <p className="text-sm text-arky-brown-light dark:text-white/60">
            © {new Date().getFullYear()} All rights reserved
          </p>
          <p className="text-xs text-arky-brown-light/60 dark:text-white/40">
            Made by{' '}
            <a 
              href="https://charlottesoftwareengineering.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-arky-blue transition-colors underline underline-offset-2"
              data-testid="charlotte-link"
            >
              Charlotte
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main Home Component
const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-[#2A1F14]' : 'bg-arky-bg'}`} data-testid="home-page">
      <CustomCursor />
      <Navigation isScrolled={isScrolled} />
      <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      <main>
        <HeroSection />
        <AboutSection />
        <ChaptersSection />
        <AuthorSection />
        <DedicationSection />
        <MoreBooksSection />
        <ContactSection />
      </main>
      <Footer />
      <MusicPlayer />
      <Toaster position="bottom-left" />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
