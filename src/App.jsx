import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Utensils, MapPin, CheckCircle2, 
  Milk, Zap, Coffee, Cookie, Check, 
  Clock, Phone, Instagram, Facebook, ArrowRight, Star
} from 'lucide-react';

/* =========================================================================
   MENU CONFIGURATION (JSON DATA)
   Edit this section to change menu items, prices, descriptions, or images.
   
   NOTE: Since your Vite config has base: '/Protein-Dreams/', 
   public directory images must be prefixed with that path.
   ========================================================================= */
const MENU_ITEMS = [
  // --- SHAKES ---
  {
    id: 'shake-1',
    category: 'shakes',
    title: 'Choco Mint',
    protein: '24g Protein',
    price: '$13.50',
    desc: 'Rich chocolate blended with refreshing mint. A classic favorite.',
    image: '/Protein-Dreams/drink-left.png',
    accent: '#00C4CC'
  },
  {
    id: 'shake-2',
    category: 'shakes',
    title: 'Oreo Dream',
    protein: '24g Protein',
    price: '$14.00',
    desc: 'Cookies and cream goodness without the guilt. Crunchy & smooth.',
    image: '/Protein-Dreams/drink-right.png',
    accent: '#00C4CC'
  },
  {
    id: 'shake-3',
    category: 'shakes',
    title: "S'mores",
    protein: '24g Protein',
    price: '$13.00',
    desc: 'Toasted marshmallow flavor with chocolate notes. Campfire vibes.',
    image: '/Protein-Dreams/drink-left.png',
    accent: '#00C4CC'
  },
  {
    id: 'shake-4',
    category: 'shakes',
    title: 'Pistachio',
    protein: '24g Protein',
    price: '$15.00',
    desc: 'Nutty, creamy, and sophisticated. A unique protein experience.',
    image: '/Protein-Dreams/drink-right.png',
    accent: '#00C4CC'
  },
  {
    id: 'shake-5',
    category: 'shakes',
    title: 'Strawberry Cheesecake',
    protein: '24g Protein',
    price: '$14.50',
    desc: 'Fruity sweetness with a creamy finish. Tastes like dessert.',
    image: '/Protein-Dreams/drink-left.png',
    accent: '#00C4CC'
  },
  {
    id: 'shake-6',
    category: 'shakes',
    title: 'Chunky Monkey',
    protein: '24g Protein',
    price: '$14.00',
    desc: 'Banana, peanut butter, and chocolate. The ultimate power trio.',
    image: '/Protein-Dreams/drink-right.png',
    accent: '#00C4CC'
  },

  // --- TEAS ---
  {
    id: 'tea-1',
    category: 'teas',
    title: 'Mega Tea: American Dream',
    protein: '160mg Caffeine',
    price: '$12.00',
    desc: 'Pomegranate, Raspberry, Cranberry, Blue Blast. 0g Sugar.',
    placeholderColor: 'bg-blue-500',
    iconType: 'Zap',
    accent: '#3b82f6'
  },
  {
    id: 'tea-2',
    category: 'teas',
    title: 'Mega Tea: Citrus Sunshine',
    protein: '160mg Caffeine',
    price: '$12.00',
    desc: 'Orange, Peach, Mandarin, Green Apple. Bright and Zesty.',
    placeholderColor: 'bg-orange-500',
    iconType: 'Star',
    accent: '#f97316'
  },
  {
    id: 'tea-3',
    category: 'teas',
    title: 'Mega Tea: Purple Rain',
    protein: '160mg Caffeine',
    price: '$12.50',
    desc: 'Tropical Peach, Mango, Grape. A royal treat.',
    placeholderColor: 'bg-purple-600',
    iconType: 'Zap',
    accent: '#9333ea'
  },
  {
    id: 'tea-4',
    category: 'teas',
    title: 'Refresher: Captain America',
    protein: 'Kids Friendly',
    price: '$10.00',
    desc: 'Wild Berry, Cranberry, Blue Blast. Caffeine Free.',
    placeholderColor: 'bg-red-600',
    iconType: 'Star',
    accent: '#dc2626'
  },

  // --- WAFFLES ---
  {
    id: 'waffle-1',
    category: 'waffles',
    title: 'Guava Cream Waffle',
    protein: '31g Protein',
    price: '$16.00',
    desc: 'Guava, cream cheese, graham cracker, whipped cream.',
    placeholderColor: 'bg-pink-400',
    iconType: 'Cookie',
    accent: '#f472b6'
  },
  {
    id: 'waffle-2',
    category: 'waffles',
    title: 'Nutoreos Waffle',
    protein: '31g Protein',
    price: '$16.50',
    desc: 'Nutella, Oreo cookies, cacao, whipped cream. Decadent.',
    placeholderColor: 'bg-stone-700',
    iconType: 'Cookie',
    accent: '#C5A059'
  },
  {
    id: 'waffle-3',
    category: 'waffles',
    title: 'Banana Crunch',
    protein: '31g Protein',
    price: '$15.50',
    desc: 'Banana, peanuts, sugar free chocolate syrup.',
    placeholderColor: 'bg-yellow-500',
    iconType: 'Cookie',
    iconColor: 'text-black', // specific override for yellow bg
    accent: '#eab308'
  },

  // --- COFFEE ---
  {
    id: 'coffee-1',
    category: 'coffee',
    title: 'Iced Caramel Macchiato',
    protein: '15g Protein',
    price: '$12.50',
    desc: 'Smooth espresso with vanilla and caramel drizzle.',
    placeholderColor: 'bg-orange-800',
    iconType: 'Coffee',
    accent: '#9a3412'
  },
  {
    id: 'coffee-2',
    category: 'coffee',
    title: 'Protein Mocha',
    protein: '15g Protein',
    price: '$13.00',
    desc: 'Rich chocolate and coffee blend. 2g Sugar.',
    placeholderColor: 'bg-stone-800',
    iconType: 'Coffee',
    accent: '#78716c'
  }
];

// Helper to resolve icon strings to components
const getIconComponent = (type, colorClass = "text-white") => {
  const props = { className: `w-12 h-12 ${colorClass}` };
  switch(type) {
    case 'Zap': return <Zap {...props} />;
    case 'Star': return <Star {...props} />;
    case 'Cookie': return <Cookie {...props} />;
    case 'Coffee': return <Coffee {...props} />;
    case 'Milk': return <Milk {...props} />;
    default: return <Utensils {...props} />;
  }
};

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'menu'
  
  // Reset scroll when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const navigateTo = (view) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  return (
    <div className="bg-black text-white antialiased font-sans overflow-x-hidden min-h-screen selection:bg-[#00C4CC] selection:text-black">
      {/* INJECTING STYLES & FONTS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Montserrat:wght@300;400;500;600;800&family=Oswald:wght@300;400;600&display=swap');

        .font-header { font-family: 'Oswald', sans-serif; }
        .font-script { font-family: 'Dancing Script', cursive; }
        .font-sans { font-family: 'Montserrat', sans-serif; }

        .text-glow {
          text-shadow: 0 0 10px rgba(0, 196, 204, 0.5);
        }
        
        /* Slant Separators */
        .clip-slant {
          clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
        }
        
        .clip-slant-reverse {
          clip-path: polygon(0 80px, 100% 0, 100% 100%, 0 100%);
        }

        @media (min-width: 768px) {
          .clip-slant-reverse {
            clip-path: polygon(0 120px, 100% 0, 100% 100%, 0 100%);
          }
        }

        /* Smooth fade for tabs */
        .fade-enter { opacity: 0; }
        .fade-enter-active { opacity: 1; transition: opacity 500ms ease-in; }

        /* Smooth "Zero Gravity" Floating Animation */
        @keyframes float-smooth {
          0% { transform: translateY(0px) rotate(-15deg); }
          50% { transform: translateY(-25px) rotate(-10deg); }
          100% { transform: translateY(0px) rotate(-15deg); }
        }

        @keyframes float-smooth-reverse {
          0% { transform: translateY(0px) rotate(15deg); }
          50% { transform: translateY(-30px) rotate(20deg); }
          100% { transform: translateY(0px) rotate(15deg); }
        }

        @keyframes float-card {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        .falling-left { animation: float-smooth 6s ease-in-out infinite; }
        .falling-right { animation: float-smooth-reverse 7s ease-in-out infinite; animation-delay: 1s; }
        .float-card { animation: float-card 6s ease-in-out infinite; }

        /* Responsive image positioning */
        .hero-image {
          position: absolute;
          z-index: 1;
          pointer-events: none;
          filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5));
        }

        @media (max-width: 768px) {
          .hero-image {
            opacity: 0.3;
            z-index: 0;
          }
        }
      `}</style>

      {/* ========================================
        NAVIGATION BAR
        ========================================
      */}
      <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* LOGO AREA */}
            <div 
              className="flex-shrink-0 flex items-center gap-1 cursor-pointer"
              onClick={() => navigateTo('home')}
            >
              <h1 className="text-3xl font-header font-bold tracking-widest text-white">PROTEIN</h1>
              <span className="text-3xl font-script text-[#00C4CC] transform -rotate-6 mt-1">dreams</span>
            </div>
            
            {/* DESKTOP NAVIGATION LINKS */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button onClick={() => navigateTo('home')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'home' ? 'text-[#00C4CC]' : 'hover:text-[#00C4CC]'}`}>Home</button>
                <a href="#about" onClick={() => navigateTo('home')} className="hover:text-[#00C4CC] px-3 py-2 rounded-md text-sm font-medium transition-colors">About Us</a>
                <button onClick={() => navigateTo('menu')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'menu' ? 'text-[#00C4CC]' : 'hover:text-[#00C4CC]'}`}>Our Menu</button>
                <a href="#location" className="hover:text-[#00C4CC] px-3 py-2 rounded-md text-sm font-medium transition-colors">Visit Us</a>
                
                {/* Main CTA Button */}
                <button onClick={() => navigateTo('menu')} className="bg-[#00C4CC] text-black px-6 py-2 rounded-full font-bold hover:bg-white transition-all transform hover:scale-105 shadow-[0_0_15px_rgba(0,196,204,0.4)]">
                  View Visual Menu
                </button>
              </div>
            </div>

            {/* MOBILE HAMBURGER BUTTON */}
            <div className="-mr-2 flex md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                type="button" 
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU DRAWER */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-zinc-900 border-b border-gray-800 transition-all duration-300 ease-in-out">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button onClick={() => navigateTo('home')} className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 w-full text-left">Home</button>
              <button onClick={() => navigateTo('menu')} className="text-gray-300 block px-3 py-2 rounded-md text-base font-medium hover:text-[#00C4CC] hover:bg-gray-800 w-full text-left">Menu</button>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 block px-3 py-2 rounded-md text-base font-medium hover:text-[#00C4CC] hover:bg-gray-800">About</a>
              <a href="#location" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 block px-3 py-2 rounded-md text-base font-medium hover:text-[#00C4CC] hover:bg-gray-800">Location</a>
              <button onClick={() => navigateTo('menu')} className="mt-4 block w-full text-center bg-[#00C4CC] text-black px-4 py-3 rounded-md font-bold">View Visual Menu</button>
            </div>
          </div>
        )}
      </nav>

      {/* VIEW SWITCHER
         Depending on currentView state, we render Home or MenuPage
      */}
      {currentView === 'home' ? (
        <HomeView onNavigateToMenu={() => navigateTo('menu')} />
      ) : (
        <MenuPageView />
      )}

      {/* ========================================
        LOCATION & FOOTER SECTION (Shared)
        ========================================
      */}
      <section id="location" className="bg-black py-20 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl">
            {/* Google Maps Embed Container */}
            <div className="h-full min-h-[300px] bg-zinc-800 relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3027.8687707321035!2d-74.0028!3d40.6095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24448c4b7b3b7%3A0x123456789!2s7615%2018th%20Ave%2C%20Brooklyn%2C%20NY%2011214!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0, minHeight: '400px', filter: 'grayscale(100%) invert(92%) contrast(83%)' }} 
                allowFullScreen="" 
                loading="lazy"
                title="Map Location"
              ></iframe>
            </div>
            
            {/* Business Information */}
            <div className="p-10 flex flex-col justify-center">
              <h2 className="text-3xl font-header font-bold text-white mb-8">VISIT US</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-zinc-800 p-3 rounded-full text-[#00C4CC]">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Address</h4>
                    <p className="text-gray-400">7615 18th Ave<br/>Brooklyn, NY 11214</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-zinc-800 p-3 rounded-full text-[#00C4CC]">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Opening Hours</h4>
                    <p className="text-gray-400">Mon - Fri: 7:00 AM - 7:00 PM</p>
                    <p className="text-gray-400">Sat - Sun: 8:00 AM - 5:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-zinc-800 p-3 rounded-full text-[#00C4CC]">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Contact</h4>
                    <p className="text-gray-400">(555) 123-4567</p>
                    <a href="https://instagram.com/protein.dreams" className="text-[#00C4CC] hover:underline mt-1 block">@protein.dreams</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 py-10 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-header font-bold text-white">PROTEIN</span>
            <span className="text-2xl font-script text-[#00C4CC]">dreams</span>
          </div>
          
          <p className="text-gray-600 text-sm">
            &copy; 2025 Protein Dreams. All rights reserved.
          </p>

          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-[#00C4CC] transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-500 hover:text-[#00C4CC] transition-colors">
              <Facebook className="w-6 h-6" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

/* =========================================================================
   HOME VIEW COMPONENT
   The original landing page content
   ========================================================================= */
const HomeView = ({ onNavigateToMenu }) => {
  const [activeTab, setActiveTab] = useState('shakes');

  return (
    <>
      {/* HERO SECTION */}
      <div 
        className="relative bg-cover bg-center h-screen flex items-center justify-center text-center px-4 clip-slant overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url('https://images.unsplash.com/photo-1577805947697-b9e782d091e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60"></div>
        
        {/* Animated Background Elements */}
        {/* UPDATED SRC for GitHub Pages base path */}
        <img src="/Protein-Dreams/drink-left.png" alt="Protein Shake" className="hero-image falling-left hidden md:block" style={{ left: '5%', top: '20%', width: '280px', height: 'auto', transform: 'rotate(-15deg)', maxWidth: '25vw' }} onError={(e) => { e.target.style.display = 'none'; }} />
        <img src="/Protein-Dreams/drink-right.png" alt="Chocolate Protein Shake" className="hero-image falling-right hidden md:block" style={{ right: '5%', top: '25%', width: '280px', height: 'auto', transform: 'rotate(15deg)', maxWidth: '25vw' }} onError={(e) => { e.target.style.display = 'none'; }} />

        {/* Mobile Background Elements */}
        <img src="/Protein-Dreams/drink-left.png" alt="Protein Shake" className="hero-image falling-left md:hidden" style={{ left: '-10%', top: '15%', width: '200px', height: 'auto', transform: 'rotate(-15deg)', opacity: 0.2 }} onError={(e) => { e.target.style.display = 'none'; }} />
        <img src="/Protein-Dreams/drink-right.png" alt="Chocolate Protein Shake" className="hero-image falling-right md:hidden" style={{ right: '-10%', top: '20%', width: '200px', height: 'auto', transform: 'rotate(15deg)', opacity: 0.2 }} onError={(e) => { e.target.style.display = 'none'; }} />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-[#00C4CC] font-medium tracking-[0.2em] mb-4 animate-pulse">EST. BROOKLYN, NY</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-header font-bold text-white mb-2 shadow-xl uppercase tracking-tighter">
            Fuel Your <br />
            <span className="text-[#00C4CC] font-script text-6xl md:text-8xl lg:text-9xl normal-case" style={{ textShadow: '0 0 20px rgba(0,196,204,0.3)' }}>Dreams</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-200 font-light">
            High Protein Shakes • Super Energy Teas • Healthy Waffles
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button onClick={onNavigateToMenu} className="w-full sm:w-auto px-8 py-4 bg-[#00C4CC] text-black font-bold text-lg rounded-full hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,196,204,0.5)] flex items-center justify-center gap-2">
              <Utensils className="w-5 h-5" /> View Full Menu
            </button>
            <a href="#location" className="w-full sm:w-auto px-8 py-4 border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5" /> Visit Store
            </a>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="bg-zinc-900 py-12 border-b border-zinc-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00C4CC]/5 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-zinc-700/50">
            <div className="p-4">
              <span className="block text-4xl font-header font-bold text-[#00C4CC] mb-1">24g+</span>
              <span className="text-sm text-gray-400 uppercase tracking-wider">Protein per Shake</span>
            </div>
            <div className="p-4">
              <span className="block text-4xl font-header font-bold text-purple-400 mb-1">Low</span>
              <span className="text-sm text-gray-400 uppercase tracking-wider">Sugar Options</span>
            </div>
            <div className="p-4">
              <span className="block text-4xl font-header font-bold text-[#C5A059] mb-1">21+</span>
              <span className="text-sm text-gray-400 uppercase tracking-wider">Vitamins & Minerals</span>
            </div>
            <div className="p-4">
              <span className="block text-4xl font-header font-bold text-green-400 mb-1">100%</span>
              <span className="text-sm text-gray-400 uppercase tracking-wider">Good Vibes</span>
            </div>
          </div>
        </div>
      </div>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 bg-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-[#00C4CC] rounded-tl-3xl"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-[#C5A059] rounded-br-3xl"></div>
              <img src="/Protein-Dreams/protein waffles.jpg" />
            </div>
            
            <div>
              <h2 className="text-[#00C4CC] font-script text-4xl mb-2">Welcome to</h2>
              <h3 className="text-4xl md:text-5xl font-header font-bold text-white mb-6">MORE THAN JUST <br/>A JUICE BAR.</h3>
              <p className="text-gray-400 leading-relaxed mb-6 text-lg">
                At <strong className="text-white">Protein Dreams</strong>, we believe healthy shouldn't taste boring. Located in the heart of Brooklyn, we serve up delicious nutrition that fuels your body and satisfies your cravings.
              </p>
              <ul className="space-y-4 mb-8">
                {['Plant-Based Protein Options', 'Aloe Vera & Vitamin Infused Teas', 'Fresh, Made-to-Order Ingredients'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 className="text-[#00C4CC]" size={20} /> {item}
                  </li>
                ))}
              </ul>
              <a href="#location" className="inline-block border border-zinc-700 hover:border-[#00C4CC] hover:text-[#00C4CC] text-white px-8 py-3 rounded-lg transition-colors">
                Find Us in Brooklyn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PREVIEW MENU SECTION 
        (Kept as per user request, but added CTA) 
      */}
      <section id="menu-preview" className="pt-48 pb-24 bg-zinc-900 clip-slant-reverse relative min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#C5A059] font-bold tracking-widest uppercase text-sm">Fresh & Made to Order</span>
            <h2 className="text-4xl md:text-6xl font-header font-bold text-white mt-2">OUR MENU</h2>
            <div className="w-24 h-1 bg-[#00C4CC] mx-auto mt-6 rounded-full"></div>
            
            {/* NEW CTA to go to Full Menu Page */}
            <div className="mt-8 mb-4">
              <button 
                onClick={onNavigateToMenu} 
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-zinc-800 text-white rounded-xl overflow-hidden border border-zinc-700 hover:border-[#00C4CC] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,196,204,0.3)]"
              >
                <span className="relative z-10 font-bold uppercase tracking-wider flex items-center gap-2">
                  See Visual Menu <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#00C4CC]/0 via-[#00C4CC]/10 to-[#00C4CC]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </button>
            </div>
          </div>

          {/* Existing Tab Logic */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <TabButton isActive={activeTab === 'shakes'} onClick={() => setActiveTab('shakes')} icon={<Milk size={16} />} label="Shakes" activeColor="bg-[#00C4CC] text-black border-[#00C4CC]" />
            <TabButton isActive={activeTab === 'teas'} onClick={() => setActiveTab('teas')} icon={<Zap size={16} />} label="Teas" activeColor="bg-purple-500 text-white border-purple-500" />
            <TabButton isActive={activeTab === 'coffee'} onClick={() => setActiveTab('coffee')} icon={<Coffee size={16} />} label="Coffee" activeColor="bg-orange-700 text-white border-orange-700" />
            <TabButton isActive={activeTab === 'waffles'} onClick={() => setActiveTab('waffles')} icon={<Cookie size={16} />} label="Waffles" activeColor="bg-[#C5A059] text-black border-[#C5A059]" />
          </div>

          <div className="relative min-h-[400px]">
            {activeTab === 'shakes' && (
              <div className="animate-fade-in">
                <div className="grid md:grid-cols-2 gap-8">
                  <MenuCard title="Chocolate Protein"><p className="text-gray-400">Chocomint, S'mores, Brownie</p></MenuCard>
                  <MenuCard title="Vanilla Protein"><p className="text-gray-400">Churro, Pistachio, Oreo, French Vanilla</p></MenuCard>
                </div>
              </div>
            )}
            {/* (Other tabs simplified for preview, since we have full menu page now) */}
            {activeTab !== 'shakes' && (
              <div className="text-center py-10">
                <p className="text-gray-400 mb-4">Click "See Visual Menu" to view all our delicious {activeTab} options with photos!</p>
                <button onClick={onNavigateToMenu} className="text-[#00C4CC] font-bold hover:underline">Go to Full Menu &rarr;</button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

/* =========================================================================
   FULL MENU VIEW COMPONENT (NEW)
   The "Different Page" with 3D Images
   ========================================================================= */
const MenuPageView = () => {
  const [activeTab, setActiveTab] = useState('shakes');

  return (
    <div className="pt-32 pb-24 bg-zinc-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-header font-bold text-white mb-4">VISUAL MENU</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Explore our delicious creations. Every item is crafted for taste and nutrition.</p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-20 sticky top-24 z-30 bg-zinc-950/90 backdrop-blur-md p-4 rounded-full border border-zinc-800 shadow-xl max-w-fit mx-auto">
          <TabButton isActive={activeTab === 'shakes'} onClick={() => setActiveTab('shakes')} icon={<Milk size={16} />} label="Shakes" activeColor="bg-[#00C4CC] text-black border-[#00C4CC]" />
          <TabButton isActive={activeTab === 'teas'} onClick={() => setActiveTab('teas')} icon={<Zap size={16} />} label="Teas" activeColor="bg-purple-500 text-white border-purple-500" />
          <TabButton isActive={activeTab === 'coffee'} onClick={() => setActiveTab('coffee')} icon={<Coffee size={16} />} label="Coffee" activeColor="bg-orange-700 text-white border-orange-700" />
          <TabButton isActive={activeTab === 'waffles'} onClick={() => setActiveTab('waffles')} icon={<Cookie size={16} />} label="Waffles" activeColor="bg-[#C5A059] text-black border-[#C5A059]" />
        </div>

        {/* 3D Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24 pt-12">
          
          {MENU_ITEMS.filter(item => item.category === activeTab).map(item => (
            <VisualMenuItem 
              key={item.id}
              {...item}
              // Resolve the string icon type to a component if needed
              placeholderIcon={item.iconType ? getIconComponent(item.iconType, item.iconColor) : null}
            />
          ))}

        </div>
      </div>
    </div>
  );
};

/* --- HELPER COMPONENTS --- */

// The 3D Item Card
const VisualMenuItem = ({ title, protein, price, desc, image, placeholderColor, placeholderIcon, accent }) => {
  return (
    <div className="group relative mt-16">
      {/* Background Card */}
      <div className="bg-zinc-900 rounded-2xl p-6 pt-28 h-full border border-zinc-800 shadow-xl transition-all duration-300 group-hover:border-[color:var(--accent)] group-hover:-translate-y-2 group-hover:shadow-[0_10px_30px_-10px_var(--accent)]" style={{ '--accent': accent }}>
        
        {/* Floating Image or Placeholder */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-40 h-40 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 float-card">
          {image ? (
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)]"
              onError={(e) => {
                e.target.style.display = 'none';
                // Use fallback if image fails
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : (
            // Placeholder Circle with 3D shadow effect
            <div className={`w-32 h-32 rounded-full ${placeholderColor} flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.5)] border-4 border-zinc-900`}>
              {placeholderIcon}
            </div>
          )}
          {/* Fallback container for image error */}
          <div className="hidden w-32 h-32 rounded-full bg-zinc-800 items-center justify-center border-4 border-zinc-900 absolute">
            <span className="text-xs text-center text-gray-500">Image<br/>Coming Soon</span>
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <h3 className="text-2xl font-header font-bold text-white mb-2">{title}</h3>
          
          {/* Protein Tag */}
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-zinc-950 border border-zinc-700 text-[color:var(--accent)] mb-4" style={{ '--accent': accent }}>
            {protein}
          </span>
          
          <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
          
          {/* Price Tag (Replaces Button) */}
          <div className="mt-6 w-full py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white font-header font-bold text-xl tracking-wider transition-colors group-hover:bg-[color:var(--accent)] group-hover:text-black group-hover:border-[color:var(--accent)]" style={{ '--accent': accent }}>
            {price}
          </div>
        </div>
      </div>
    </div>
  );
}

const TabButton = ({ isActive, onClick, icon, label, activeColor }) => (
  <button 
    onClick={onClick} 
    className={`px-6 py-2 rounded-full border-2 font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
      isActive 
        ? activeColor 
        : 'bg-transparent text-gray-400 border-gray-600 hover:border-white hover:text-white'
    }`}
  >
    {icon} {label}
  </button>
);

const MenuCard = ({ title, children }) => (
  <div className="bg-black/50 p-6 rounded-2xl border border-zinc-800 hover:border-[#00C4CC]/50 transition-colors">
    <h3 className="text-2xl font-header text-white mb-4 border-b border-zinc-800 pb-2">{title}</h3>
    {children}
  </div>
);

export default App;