import React, { useState, useEffect } from 'react';
import { 
  Utensils, 
  Plus, 
  Minus, 
  ShoppingCart, 
  Phone, 
  MapPin, 
  Star, 
  Check, 
  Menu, 
  X, 
  CheckCircle,
  Search,
  ChevronDown,
  Compass
} from 'lucide-react';

// Sample Dishes with verified high-res Pexels images
const POPULAR_DISHES = [
  {
    id: 'biryani',
    name: 'Chicken Biryani',
    category: 'biryani',
    categoryLabel: 'Mains & Biryani',
    price: 140,
    rating: 4.8,
    isFavorite: true,
    description: 'Aromatic long-grain basmati rice cooked with handpicked Kerala spices, layered with juicy chicken, caramelized onions, and pure ghee. Served with traditional raita and dates pickle.',
    image: 'https://images.pexels.com/photos/28674660/pexels-photo-28674660.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
    tags: ['Best Seller', 'Traditional Taste', 'Malabar Spices']
  },
  {
    id: 'alfahm',
    name: 'Alfahm Chicken',
    category: 'grills',
    categoryLabel: 'Arabian Grills',
    price: 150,
    rating: 4.9,
    isFavorite: true,
    description: 'Authentic Arabian-spiced chicken slow-cooked over glowing hot charcoal. Juicy inside, smoky outside, and served with fluffy kubboos, signature garlic garlic dip, and crisp salads.',
    image: 'https://images.pexels.com/photos/9646859/pexels-photo-9646859.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
    tags: ['Charcoal Grilled', 'Spicy Arabian', 'Highly Popular']
  },
  {
    id: 'mandi',
    name: 'Chicken Mandi',
    category: 'biryani',
    categoryLabel: 'Mains & Mandi',
    price: 160,
    rating: 4.7,
    isFavorite: true,
    description: 'Authentic Yemenite-style smoky mandi rice layered with incredibly tender chicken, roasted spices, and slow-steamed to perfection. Accompanied by spicy red mandi sauce.',
    image: 'https://images.pexels.com/photos/29173114/pexels-photo-29173114.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
    tags: ['Smoky Rice', 'Extremely Tender', 'Arabian Heritage']
  },
  {
    id: 'friedrice',
    name: 'Chicken Fried Rice',
    category: 'chinese',
    categoryLabel: 'Chinese Specialties',
    price: 120,
    rating: 4.6,
    isFavorite: false,
    description: 'Delectable wok-tossed premium basmati rice cooked with fresh shredded vegetables, scrambled organic eggs, tender seasoned chicken bits, and rich authentic sauces.',
    image: 'https://images.pexels.com/photos/28573375/pexels-photo-28573375.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
    tags: ['Wok Tossed', 'Neatly Prepared', 'Kids Favorite']
  },
  {
    id: 'chillichicken',
    name: 'Chilli Chicken (Chinese)',
    category: 'chinese',
    categoryLabel: 'Chinese Specialties',
    price: 130,
    rating: 4.7,
    isFavorite: false,
    description: 'A classic Indo-Chinese favorite! Stir-fried succulent chicken chunks tossed in a sweet, sour, and spicy chilli sauce, flavored with fresh ginger, garlic, and crispy bell peppers.',
    image: 'https://images.pexels.com/photos/6705486/pexels-photo-6705486.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
    tags: ['Spicy Gravy', 'Indo-Chinese', 'Perfect Side Dish']
  },
  {
    id: 'orangejuice',
    name: 'Fresh Orange Juice',
    category: 'juices',
    categoryLabel: 'Fresh Juices',
    price: 50,
    rating: 4.5,
    isFavorite: false,
    description: '100% natural, freshly squeezed sweet oranges. Chilled and served without any artificial preservatives, perfect for a sunny Kerala afternoon.',
    image: 'https://images.pexels.com/photos/10277954/pexels-photo-10277954.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
    tags: ['100% Natural', 'Freshly Squeezed', 'Vitamin C Loaded']
  },
  {
    id: 'masalachai',
    name: 'Live Special Masala Chai',
    category: 'tea-snacks',
    categoryLabel: 'Tea & Snacks',
    price: 12,
    rating: 4.9,
    isFavorite: true,
    description: 'Our pride! Piping-hot Malabar style spiced tea brewed live at our counter with crushed cardamom, ginger, and thick, creamy milk. An absolute refresher.',
    image: 'https://images.pexels.com/photos/29650995/pexels-photo-29650995.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
    tags: ['Live Counter', 'Cardamom Rich', 'Customer Love']
  },
  {
    id: 'snackcombo',
    name: 'Tea & Kerala Snack Combo',
    category: 'tea-snacks',
    categoryLabel: 'Tea & Snacks',
    price: 25,
    rating: 4.6,
    isFavorite: false,
    description: 'Enjoy a glass of warm live tea paired with crispy, authentic Kerala tea snacks of the day (like Pazhampori, Samosa, or Neyyappam). Freshly prepared.',
    image: 'https://images.pexels.com/photos/34966997/pexels-photo-34966997.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
    tags: ['Tea Time Special', 'Crispy Delights', 'Budget Friendly']
  }
];

// Customized why choose us items are styled live inside the components below

const INITIAL_REVIEWS = [
  {
    id: 1,
    name: 'Anupama Rajan',
    rating: 5,
    date: '1 week ago',
    comment: 'Great new find in Kolachery Town! Very clean, well-organized, and the staff are incredibly well-mannered. Chicken Biryani was aromatic and portion was great.',
    verified: true
  },
  {
    id: 2,
    name: 'Muhammed Shafi',
    rating: 5,
    date: '3 weeks ago',
    comment: 'Fried rice and the Chinese dishes were delicious and neatly prepared. The Alfahm was perfectly grilled too. High recommendation for families.',
    verified: true
  },
  {
    id: 3,
    name: 'Ragesh K.',
    rating: 5,
    date: '1 month ago',
    comment: 'The food quality, taste, and overall dining experience were excellent. Prices are extremely affordable for everyone. Parking space is easily accessible too.',
    verified: true
  }
];

const GALLERY_PHOTOS = [
  {
    title: 'Signature Chicken Biryani',
    category: 'dishes',
    url: 'https://images.pexels.com/photos/28674660/pexels-photo-28674660.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
    desc: 'Golden rice with tender, spice-infused chicken.'
  },
  {
    title: 'Modern Cozy Ambiance',
    category: 'interior',
    url: 'https://images.pexels.com/photos/12688956/pexels-photo-12688956.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
    desc: 'Our warm, clean, and organized family dining seating.'
  },
  {
    title: 'Live Tea and Snack Brew',
    category: 'tea-snack',
    url: 'https://images.pexels.com/photos/15211517/pexels-photo-15211517.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
    desc: 'Aromatic tea being poured live for local commuters.'
  },
  {
    title: 'Healthy Fresh Juices',
    category: 'juices',
    url: 'https://images.pexels.com/photos/4958861/pexels-photo-4958861.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
    desc: 'Cooling, revitalizing orange and citrus refreshments.'
  },
  {
    title: 'Traditional Dining Vibe',
    category: 'experience',
    url: 'https://images.pexels.com/photos/31970867/pexels-photo-31970867.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
    desc: 'Savoring hot biryani and snacks with family and friends.'
  },
  {
    title: 'Sizzling Charcoal Alfahm',
    category: 'dishes',
    url: 'https://images.pexels.com/photos/9646859/pexels-photo-9646859.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
    desc: 'Arabian recipe cooked over slow open flames.'
  }
];

const FAQS = [
  {
    question: "Where exactly is HOMRAI Restaurant located?",
    answer: "We are located in Ponkuthi, Kolachery, Kerala 670601. We are a prominent dining landmark in the town, easily accessible with convenient parking space."
  },
  {
    question: "What are your popular signature dishes?",
    answer: "Our local favorites include our authentic Malabar Chicken Biryani, smoky Arabian Alfahm Chicken with kubboos, slow-cooked Chicken Mandi, freshly prepared Chinese Fried Rice, and our ever-popular live Masala Tea with snacks!"
  },
  {
    question: "What is your price range? Is it budget-friendly?",
    answer: "Yes, we are highly budget-friendly! Our prices range from ₹10 for snacks/tea up to just ₹200 per person. You can enjoy a heavy, delicious dining experience under ₹150 easily."
  },
  {
    question: "Do you accept pre-orders or home delivery via WhatsApp?",
    answer: "Yes! You can easily place an order or pre-schedule a pick-up through our website's integrated WhatsApp features. Simply select your dishes, compile your list in our live cart, and hit the WhatsApp button to chat with our staff instantly."
  },
  {
    question: "What are the opening hours of HOMRAI?",
    answer: "We are open daily from 11:00 AM until 11:00 PM. Our live tea and snack counter begins buzzing in the afternoon, perfect for tea time."
  }
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState('all');
  const [visitName, setVisitName] = useState('');
  const [visitTime, setVisitTime] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [visitGuests, setVisitGuests] = useState('2');
  const [visitSubmitted, setVisitSubmitted] = useState(false);
  // Kitchen and counter are open daily 11:00 AM - 11:00 PM
  useEffect(() => {
    // Component mounted successfully
  }, []);

  // Cart operations
  const addToCart = (dishId: string) => {
    setCart(prev => ({
      ...prev,
      [dishId]: (prev[dishId] || 0) + 1
    }));
  };

  const removeFromCart = (dishId: string) => {
    setCart(prev => {
      const updated = { ...prev };
      if (updated[dishId] <= 1) {
        delete updated[dishId];
      } else {
        updated[dishId] -= 1;
      }
      return updated;
    });
  };

  const clearCart = () => {
    setCart({});
  };

  // Calculate cart details
  const getCartTotal = () => {
    return Object.entries(cart).reduce((sum, [id, qty]) => {
      const dish = POPULAR_DISHES.find(d => d.id === id);
      return sum + (dish ? dish.price * qty : 0);
    }, 0);
  };

  const getCartCount = () => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  };

  // Generate WhatsApp message and redirect
  const handleWhatsAppCheckout = () => {
    if (Object.keys(cart).length === 0) {
      alert("Your order cart is empty! Add some delicious dishes first.");
      return;
    }

    let messageText = `*HOMRAI RESTAURANT ORDER*\n`;
    messageText += `--------------------------------\n`;
    
    Object.entries(cart).forEach(([id, qty]) => {
      const dish = POPULAR_DISHES.find(d => d.id === id);
      if (dish) {
        messageText += `• ${qty} x ${dish.name} (₹${dish.price} each) = ₹${dish.price * qty}\n`;
      }
    });

    const total = getCartTotal();
    messageText += `--------------------------------\n`;
    messageText += `*Total Amount: ₹${total}*\n\n`;
    messageText += `*Customer Details:*\n`;
    messageText += `• Order Method: Takeaway / Dine-in pre-order\n`;
    messageText += `• Location Search: Ponkuthi, Kolachery\n\n`;
    messageText += `_Please confirm my order. I will arrive in about 20-25 minutes._`;

    const encodedText = encodeURIComponent(messageText);
    window.open(`https://wa.me/919645119966?text=${encodedText}`, '_blank');
  };

  // Live review submission handler
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.comment.trim()) {
      alert("Please fill out your name and write a comment!");
      return;
    }

    const created = {
      id: reviews.length + 1,
      name: newReview.name,
      rating: newReview.rating,
      date: 'Just now',
      comment: newReview.comment,
      verified: false
    };

    setReviews([created, ...reviews]);
    setNewReview({ name: '', rating: 5, comment: '' });
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  // Table visitor notification via WhatsApp or instant mock
  const handleVisitPlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitName || !visitTime || !visitDate) {
      alert("Please enter your name, date, and time of arrival.");
      return;
    }
    
    const visitMsg = `*HOMRAI VISIT NOTIFICATION*\nHi Homrai, I am planning a visit!\n• Name: ${visitName}\n• Date: ${visitDate}\n• Time: ${visitTime}\n• Guests: ${visitGuests} People\n\n_Please keep your delicious dishes ready!_`;
    const encoded = encodeURIComponent(visitMsg);
    window.open(`https://wa.me/919645119966?text=${encoded}`, '_blank');
    
    setVisitSubmitted(true);
    setTimeout(() => {
      setVisitSubmitted(false);
      setVisitName('');
      setVisitTime('');
      setVisitDate('');
    }, 4000);
  };

  // Filtering dishes
  const filteredDishes = POPULAR_DISHES.filter(dish => {
    const matchesCategory = selectedCategory === 'all' || dish.category === selectedCategory;
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          dish.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dish.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A0E08] selection:bg-[#C5A059] selection:text-[#1A0E08]">
      
      {/* LOCAL SEO ENHANCEMENT HEADER BAR */}
      <div className="bg-[#1E110B] text-[#FDFBF7] border-b border-[#C5A059]/20 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-[#E5B842] font-semibold">
              <Star className="w-3.5 h-3.5 fill-[#E5B842] stroke-none" />
              4.3 / 5 Rating (39 Google Reviews)
            </span>
            <span className="text-[#C5A059] hidden md:inline">|</span>
            <span className="text-gray-300 hidden md:inline">📍 Ponkuthi, Kolachery, Kerala</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-300">📞 Support: <a href="tel:+919645119966" className="text-[#E5B842] hover:underline font-bold">+91 96451 19966</a></span>
            <span className="hidden sm:inline bg-green-950 text-green-300 px-2 py-0.5 rounded-full text-[10px] font-bold border border-green-800 flex items-center gap-1 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
              KITCHEN OPEN & SERVING
            </span>
          </div>
        </div>
      </div>

      {/* NAVIGATION HEADER */}
      <header className="sticky top-0 z-40 bg-[#1A0E08]/95 backdrop-blur-md border-b border-[#C5A059]/15 shadow-xl transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E5B842] to-[#9E782F] p-0.5 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-[#1A0E08] rounded-[10px] flex items-center justify-center">
                  <span className="font-accent font-bold text-xl text-[#E5B842] tracking-wider">H</span>
                </div>
              </div>
              <div>
                <span className="block font-accent font-black text-xl tracking-widest text-[#FDFBF7] group-hover:text-[#E5B842] transition-colors">HOMRAI</span>
                <span className="block text-[10px] uppercase tracking-widest text-[#C5A059]">RESTAURANT • KOLACHERY</span>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8 font-medium">
              <a href="#about" className="text-gray-300 hover:text-[#E5B842] transition-colors text-sm tracking-wide">About Us</a>
              <a href="#menu" className="text-gray-300 hover:text-[#E5B842] transition-colors text-sm tracking-wide relative">
                Menu
                <span className="absolute -top-3 -right-6 bg-red-600 text-white text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-tighter">New</span>
              </a>
              <a href="#why-us" className="text-gray-300 hover:text-[#E5B842] transition-colors text-sm tracking-wide">Why Choose Us</a>
              <a href="#reviews" className="text-gray-300 hover:text-[#E5B842] transition-colors text-sm tracking-wide">Reviews</a>
              <a href="#gallery" className="text-gray-300 hover:text-[#E5B842] transition-colors text-sm tracking-wide">Gallery</a>
              <a href="#contact" className="text-gray-300 hover:text-[#E5B842] transition-colors text-sm tracking-wide">Contact</a>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <a 
                href="#menu" 
                className="px-4 py-2 text-xs font-bold text-[#E5B842] border border-[#C5A059]/40 rounded-lg hover:bg-[#C5A059]/10 transition-all flex items-center gap-1.5"
              >
                <Utensils className="w-3.5 h-3.5" />
                Explore Dishes
              </a>
              <a 
                href="https://wa.me/919645119966" 
                target="_blank" 
                rel="noreferrer"
                className="bg-[#25D366] hover:bg-[#20ba5a] text-[#1A0E08] font-bold px-4 py-2 rounded-lg text-xs tracking-wide shadow-md transition-all flex items-center gap-1.5"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-100"></span>
                </span>
                WhatsApp Order
              </a>
            </div>

            {/* Mobile menu button & Cart icon indicator */}
            <div className="flex items-center gap-3 lg:hidden">
              <a 
                href="#cart-section" 
                className="relative p-2 text-[#E5B842] bg-[#2B1B17] rounded-lg border border-[#C5A059]/20"
                aria-label="View Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs font-bold w-5 h-5 flex items-center justify-center animate-bounce">
                    {getCartCount()}
                  </span>
                )}
              </a>

              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#E5B842] hover:text-white transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#1E110B] border-t border-[#C5A059]/20 px-4 py-6 space-y-4 animate-fadeIn">
            <div className="grid grid-cols-2 gap-3 text-center">
              <a 
                href="#about" 
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 bg-[#2B1B17] text-gray-200 rounded-lg text-sm font-semibold hover:text-[#E5B842] border border-white/5"
              >
                About Us
              </a>
              <a 
                href="#menu" 
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 bg-[#2B1B17] text-[#E5B842] rounded-lg text-sm font-semibold border border-[#C5A059]/25"
              >
                Our Menu
              </a>
              <a 
                href="#why-us" 
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 bg-[#2B1B17] text-gray-200 rounded-lg text-sm font-semibold hover:text-[#E5B842] border border-white/5"
              >
                Why Choose Us
              </a>
              <a 
                href="#reviews" 
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 bg-[#2B1B17] text-gray-200 rounded-lg text-sm font-semibold hover:text-[#E5B842] border border-white/5"
              >
                Reviews
              </a>
              <a 
                href="#gallery" 
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 bg-[#2B1B17] text-gray-200 rounded-lg text-sm font-semibold hover:text-[#E5B842] border border-white/5"
              >
                Photo Gallery
              </a>
              <a 
                href="#contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 bg-[#2B1B17] text-gray-200 rounded-lg text-sm font-semibold hover:text-[#E5B842] border border-white/5"
              >
                Contact
              </a>
            </div>

            <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
              <div className="text-center text-xs text-[#C5A059] font-medium">
                📍 Ponkuthi, Kolachery, Kerala | Daily 11 AM - 11 PM
              </div>
              <a 
                href="https://wa.me/919645119966" 
                target="_blank" 
                rel="noreferrer"
                className="w-full bg-[#25D366] text-[#1A0E08] font-bold py-3 px-4 rounded-lg text-center text-sm flex items-center justify-center gap-2"
              >
                <span className="text-lg">💬</span> Quick WhatsApp Order
              </a>
              <a 
                href="tel:+919645119966" 
                className="w-full bg-transparent text-[#E5B842] border border-[#C5A059]/50 font-bold py-3 px-4 rounded-lg text-center text-sm flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" /> Call: +91 96451 19966
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#1E110B] text-[#FDFBF7] py-12 lg:py-24">
        
        {/* Background decorative vector overlays */}
        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay">
          <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-[#E5B842] filter blur-3xl"></div>
          <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-[#C5A059] filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#C5A059]/15 border border-[#C5A059]/30 rounded-full px-4 py-1.5 text-xs text-[#E5B842] font-semibold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-[#E5B842] animate-ping"></span>
                🔥 Best Restaurant in Kolachery Town
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-tight">
                Experience Authentic <br className="hidden sm:inline" />
                Flavors at <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5B842] via-[#F6D072] to-[#C5A059]">HOMRAI Restaurant</span>
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0">
                Savor delicious local and Arabian delicacies in Ponkuthi. We proudly serve premium <span className="text-[#E5B842] font-bold">Chicken Biryani</span>, smokey charcoal <span className="text-[#E5B842] font-bold">Alfahm Chicken</span>, aromatic <span className="text-[#E5B842] font-bold">Chicken Mandi</span>, stir-fried Rice, Fresh Juices & much more!
              </p>

              {/* Highlights tags */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 max-w-lg mx-auto lg:mx-0">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-[#E5B842]" />
                  <span>Budget (₹1–200)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-[#E5B842]" />
                  <span>Clean Environment</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-[#E5B842]" />
                  <span>Open Daily until 11 PM</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6">
                <a 
                  href="#menu" 
                  className="shine-effect bg-gradient-to-r from-[#E5B842] to-[#B88F3A] text-[#1A0E08] font-extrabold text-sm px-8 py-4 rounded-xl shadow-lg shadow-[#E5B842]/10 hover:shadow-2xl hover:scale-[1.02] transition-all text-center flex items-center justify-center gap-2 uppercase tracking-wider"
                >
                  <Utensils className="w-4 h-4" />
                  View Live Menu
                </a>
                <a 
                  href="https://wa.me/919645119966" 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-transparent hover:bg-[#FDFBF7]/5 text-white border-2 border-white/20 hover:border-[#E5B842]/60 font-bold text-sm px-8 py-4 rounded-xl transition-all text-center flex items-center justify-center gap-2"
                >
                  <span className="text-xl">💬</span>
                  WhatsApp Order
                </a>
              </div>

              {/* Rating Trust Badge */}
              <div className="pt-6 border-t border-white/5 flex items-center justify-center lg:justify-start gap-4">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full border-2 border-[#1E110B] bg-amber-800 flex items-center justify-center text-white text-xs font-bold">K</div>
                  <div className="w-10 h-10 rounded-full border-2 border-[#1E110B] bg-orange-700 flex items-center justify-center text-white text-xs font-bold">R</div>
                  <div className="w-10 h-10 rounded-full border-2 border-[#1E110B] bg-yellow-600 flex items-center justify-center text-white text-xs font-bold">S</div>
                </div>
                <div className="text-left">
                  <div className="flex items-center text-[#E5B842]">
                    <Star className="w-4 h-4 fill-[#E5B842] stroke-none" />
                    <Star className="w-4 h-4 fill-[#E5B842] stroke-none" />
                    <Star className="w-4 h-4 fill-[#E5B842] stroke-none" />
                    <Star className="w-4 h-4 fill-[#E5B842] stroke-none" />
                    <Star className="w-4 h-4 fill-gray-400 stroke-none" />
                    <span className="ml-1 text-white text-sm font-extrabold">4.3 / 5</span>
                  </div>
                  <p className="text-xs text-gray-400">Based on 39 Google Map Reviews from Kolachery Town</p>
                </div>
              </div>

            </div>

            {/* Hero Right Visuals (Image Showcase / Dynamic Carousel) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Visual back glow */}
                <div className="absolute -inset-4 rounded-full bg-[#E5B842]/20 filter blur-2xl"></div>

                {/* Primary Food Banner Frame */}
                <div className="relative rounded-3xl overflow-hidden border-4 border-[#C5A059]/40 shadow-2xl bg-[#1A0E08]">
                  <img 
                    src="https://images.pexels.com/photos/28674660/pexels-photo-28674660.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" 
                    alt="Delicious Malabar Chicken Biryani at HOMRAI Restaurant" 
                    className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Floating price indicator */}
                  <div className="absolute top-4 right-4 bg-[#1A0E08]/90 text-white backdrop-blur-md border border-[#E5B842]/30 px-3 py-2 rounded-xl text-center shadow-lg">
                    <span className="block text-[10px] uppercase text-[#C5A059] tracking-widest font-extrabold">Starting From</span>
                    <span className="text-xl font-black text-[#E5B842]">₹12 <span className="text-xs font-normal text-gray-300">to</span> ₹200</span>
                  </div>

                  {/* Caption bottom bar */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#1A0E08] via-[#1A0E08]/80 to-transparent p-6 pt-16">
                    <span className="text-xs text-[#E5B842] tracking-wider uppercase font-extrabold">Featured Today</span>
                    <h3 className="text-xl font-heading font-bold text-[#FDFBF7]">Signature Chicken Biryani</h3>
                    <p className="text-xs text-gray-300 mt-1">Rich with Malabar ghee, caramelized cashew, and signature recipe spices.</p>
                  </div>
                </div>

                {/* Overlapping small review sticker */}
                <div className="absolute -bottom-6 -left-6 bg-[#C5A059] text-[#1A0E08] p-4 rounded-2xl shadow-xl max-w-[210px] border-2 border-[#1E110B] hidden sm:block">
                  <div className="flex items-center gap-1 text-xs font-bold text-[#1A0E08]">
                    <span>🔥 Highly Rated</span>
                  </div>
                  <p className="text-xs font-bold mt-1">"Fried rice and Chinese dishes were delicious!"</p>
                  <span className="block text-[10px] text-[#1A0E08]/70 mt-1.5">— Muhammed S.</span>
                </div>

                {/* Live Visit Info Tag */}
                <div className="absolute -top-4 -left-4 bg-[#FDFBF7] text-[#1A0E08] px-4 py-2.5 rounded-xl shadow-lg border border-[#C5A059]/40 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                  <div className="text-left">
                    <p className="text-[10px] text-gray-500 uppercase tracking-tighter">Average Duration</p>
                    <p className="text-xs font-extrabold">25 Mins Visit Time</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Waves bottom separator */}
        <div className="absolute bottom-0 inset-x-0 h-4 bg-[#FDFBF7] rounded-t-3xl"></div>
      </section>

      {/* ABOUT US SECTION */}
      <section id="about" className="py-16 bg-[#FDFBF7] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side graphics */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden border-2 border-[#C5A059]/20 shadow-md">
                  <img 
                    src="https://images.pexels.com/photos/12688956/pexels-photo-12688956.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=220" 
                    alt="HOMRAI Clean Restaurant Ambiance" 
                    className="w-full h-48 object-cover hover:scale-105 transition-transform"
                  />
                </div>
                <div className="bg-[#1E110B] text-[#FDFBF7] p-6 rounded-2xl border border-[#C5A059]/30 text-center">
                  <p className="text-3xl font-heading font-black text-[#E5B842]">₹1-200</p>
                  <p className="text-xs text-gray-300 mt-1 font-bold">Price Range</p>
                  <p className="text-[10px] text-gray-400 mt-2">Affordable dining options for everyone in Ponkuthi.</p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-[#C5A059]/10 p-6 rounded-2xl border border-[#C5A059]/30 text-center">
                  <p className="text-3xl font-heading font-black text-[#1E110B]">4.3★</p>
                  <p className="text-xs text-gray-800 font-bold">Google Rating</p>
                  <p className="text-[10px] text-gray-600 mt-2">Backed by verified local diners.</p>
                </div>
                <div className="rounded-2xl overflow-hidden border-2 border-[#C5A059]/20 shadow-md">
                  <img 
                    src="https://images.pexels.com/photos/15211517/pexels-photo-15211517.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=220" 
                    alt="HOMRAI Live Tea Counter" 
                    className="w-full h-48 object-cover hover:scale-105 transition-transform"
                  />
                </div>
              </div>
            </div>

            {/* Right side narrative */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-1.5 text-xs text-[#7C5A32] font-extrabold uppercase tracking-widest bg-[#C5A059]/10 px-3 py-1 rounded-full">
                <Compass className="w-3.5 h-3.5 text-[#C5A059]" />
                Discover Our Heritage
              </div>

              <h2 className="text-3xl sm:text-4xl font-heading font-black text-[#1A0E08] tracking-tight">
                About <span className="text-[#7C5A32]">HOMRAI Restaurant</span> in Kolachery
              </h2>

              <p className="text-base text-gray-700 leading-relaxed font-medium">
                HOMRAI Restaurant is one of Kolachery's favorite dining destinations, known for its flavorful dishes, affordable prices, clean ambiance, and friendly service. We proudly serve freshly prepared meals that keep customers coming back.
              </p>

              <p className="text-sm text-gray-600 leading-relaxed">
                Whether you're stopping by for a quick, energetic lunch, planning a dinner takeaway for your family, or gathering with friends at our live tea and snack counter, HOMRAI is designed to provide you with the most satisfying taste buds journey. We strictly source fresh poultry, premium spices, and quality local vegetables.
              </p>

              {/* Unique selling points blocks */}
              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                <div className="flex gap-3 items-start bg-[#F9F6EE] p-4 rounded-xl border border-amber-900/5">
                  <span className="p-2 bg-[#1A0E08] text-[#E5B842] rounded-lg font-bold text-sm">🍛</span>
                  <div>
                    <h4 className="font-bold text-sm text-[#1A0E08]">Fresh Malabar Cookery</h4>
                    <p className="text-xs text-gray-500">Every single curry, roast, and biryani plate is cooked fresh daily.</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start bg-[#F9F6EE] p-4 rounded-xl border border-amber-900/5">
                  <span className="p-2 bg-[#1A0E08] text-[#E5B842] rounded-lg font-bold text-sm">🍵</span>
                  <div>
                    <h4 className="font-bold text-sm text-[#1A0E08]">Live Tea & Snacks</h4>
                    <p className="text-xs text-gray-500">A hot refreshing glass of cardamom chai paired with fresh Kerala bites.</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start bg-[#F9F6EE] p-4 rounded-xl border border-amber-900/5">
                  <span className="p-2 bg-[#1A0E08] text-[#E5B842] rounded-lg font-bold text-sm">🧼</span>
                  <div>
                    <h4 className="font-bold text-sm text-[#1A0E08]">Pristine Hygiene Standards</h4>
                    <p className="text-xs text-gray-500">Clean dining room, spotless kitchen, and sanitized server stations.</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start bg-[#F9F6EE] p-4 rounded-xl border border-amber-900/5">
                  <span className="p-2 bg-[#1A0E08] text-[#E5B842] rounded-lg font-bold text-sm">🤝</span>
                  <div>
                    <h4 className="font-bold text-sm text-[#1A0E08]">Courteous Hospitality</h4>
                    <p className="text-xs text-gray-500">Polite, incredibly fast service with a customer-first warm smile.</p>
                  </div>
                </div>
              </div>

              {/* Fast WhatsApp action */}
              <div className="bg-[#1E110B] p-4 rounded-xl text-[#FDFBF7] flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#C5A059]/20">
                <div>
                  <p className="text-xs text-[#E5B842] uppercase tracking-wider font-extrabold">Hungry or on-the-go?</p>
                  <p className="text-sm font-bold text-white">Call ahead to secure fresh Biryani instantly on your arrival!</p>
                </div>
                <a 
                  href="tel:+919645119966" 
                  className="bg-[#C5A059] hover:bg-[#E5B842] text-[#1A0E08] text-xs font-bold px-4 py-2.5 rounded-lg flex items-center gap-1 transition-all"
                >
                  <Phone className="w-3.5 h-3.5" /> Call: +91 96451 19966
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* DYNAMIC FOOD EXPLORER & INTERACTIVE ORDER BUILDER */}
      <section id="menu" className="py-16 bg-[#1A0E08] text-[#FDFBF7] scroll-mt-20 relative">
        <div className="absolute inset-0 bg-repeat bg-center opacity-5 pointer-events-none" style={{ backgroundImage: `url('https://images.pexels.com/photos/34966997/pexels-photo-34966997.jpeg')` }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header of Section */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[#E5B842] text-xs font-extrabold tracking-widest uppercase bg-[#C5A059]/10 px-4 py-1.5 rounded-full">
              🧑‍🍳 Explore Our Menu
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-[#FDFBF7] tracking-tight">
              Delicious Local & Arabian <span className="text-[#E5B842]">Delicacies</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-300">
              Browse our freshly prepared popular dishes. Click the <span className="text-[#E5B842] font-semibold">"Add to Plate"</span> button on any dish to build your custom order and message us directly on WhatsApp!
            </p>

            {/* Live Search bar inside menu */}
            <div className="relative max-w-md mx-auto pt-4">
              <input 
                type="text" 
                placeholder="Search Biryani, Alfahm, Juices, Tea..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#2B1B17] text-white border border-[#C5A059]/30 rounded-full px-5 py-3 pl-11 text-sm focus:outline-none focus:border-[#E5B842] transition-colors"
              />
              <Search className="absolute left-4 top-7 text-gray-400 w-4 h-4" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-7 text-gray-400 hover:text-[#E5B842]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-8 mb-10">
            {[
              { id: 'all', label: 'All Dishes', icon: '🍽️' },
              { id: 'biryani', label: 'Mandi & Biryani', icon: '🍛' },
              { id: 'grills', label: 'Arabian Grills', icon: '🔥' },
              { id: 'chinese', label: 'Chinese Specials', icon: '🥢' },
              { id: 'juices', label: 'Fresh Juices', icon: '🥤' },
              { id: 'tea-snacks', label: 'Tea & Snacks', icon: '☕' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  selectedCategory === cat.id 
                    ? 'bg-[#E5B842] text-[#1A0E08] shadow-md shadow-[#E5B842]/10 scale-105' 
                    : 'bg-[#2B1B17] text-gray-300 hover:bg-[#C5A059]/10 border border-[#C5A059]/20'
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Main Content: Food Cards + Floating Cart Order Builder */}
          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Grid of Dishes */}
            <div className={`lg:col-span-${Object.keys(cart).length > 0 ? '8' : '12'} transition-all duration-300 space-y-6`}>
              
              {filteredDishes.length === 0 ? (
                <div className="text-center py-16 bg-[#2B1B17] rounded-3xl border border-[#C5A059]/10">
                  <span className="text-5xl block mb-3">🔍</span>
                  <h3 className="text-lg font-bold text-gray-300">No dishes match your selection</h3>
                  <p className="text-xs text-gray-400 mt-1">Try typing a different name or browse other categories.</p>
                  <button 
                    onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                    className="mt-4 px-4 py-2 text-xs bg-[#E5B842] text-[#1A0E08] rounded-lg font-bold"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-6">
                  {filteredDishes.map((dish) => {
                    const quantityInCart = cart[dish.id] || 0;
                    return (
                      <div 
                        key={dish.id}
                        className="bg-[#2B1B17] rounded-2xl overflow-hidden border border-[#C5A059]/15 shadow-xl hover:border-[#E5B842]/50 transition-all duration-300 flex flex-col group"
                      >
                        {/* Image Frame */}
                        <div className="relative h-48 overflow-hidden bg-zinc-950">
                          <img 
                            src={dish.image} 
                            alt={dish.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                          />
                          
                          {/* Favorite Badge */}
                          {dish.isFavorite && (
                            <span className="absolute top-3 left-3 bg-[#E5B842] text-[#1A0E08] text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-md">
                              <Star className="w-2.5 h-2.5 fill-current" /> Customer Favorite
                            </span>
                          )}

                          {/* Price Tag Overlay */}
                          <div className="absolute bottom-3 right-3 bg-[#1A0E08]/90 text-[#E5B842] font-black px-3 py-1 rounded-lg text-sm border border-[#C5A059]/40 backdrop-blur-sm">
                            ₹{dish.price}
                          </div>
                        </div>

                        {/* Details */}
                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between items-start gap-2">
                              <h3 className="font-heading font-black text-lg text-white group-hover:text-[#E5B842] transition-colors">
                                {dish.name}
                              </h3>
                              <span className="text-xs text-gray-400 font-semibold italic bg-[#1A0E08] px-2 py-0.5 rounded border border-white/5 whitespace-nowrap">
                                {dish.categoryLabel}
                              </span>
                            </div>
                            
                            <p className="text-xs text-gray-300 leading-relaxed line-clamp-3">
                              {dish.description}
                            </p>

                            {/* Tags list */}
                            <div className="flex flex-wrap gap-1 pt-1">
                              {dish.tags.map((tag, i) => (
                                <span key={i} className="text-[10px] bg-[#1A0E08] text-[#C5A059] px-2 py-0.5 rounded-full border border-[#C5A059]/10">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Card Interactive Add Action */}
                          <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                            <div className="flex items-center text-xs text-[#E5B842] font-bold">
                              <Star className="w-3.5 h-3.5 fill-[#E5B842] stroke-none mr-1" />
                              {dish.rating} / 5 Rating
                            </div>

                            {quantityInCart > 0 ? (
                              <div className="flex items-center bg-[#1A0E08] border border-[#E5B842]/40 rounded-xl overflow-hidden shadow-inner">
                                <button 
                                  onClick={() => removeFromCart(dish.id)}
                                  className="px-3 py-2 text-[#E5B842] hover:bg-[#C5A059]/10 transition-colors"
                                  title="Reduce Quantity"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="px-3 text-sm font-bold text-white min-w-[20px] text-center">
                                  {quantityInCart}
                                </span>
                                <button 
                                  onClick={() => addToCart(dish.id)}
                                  className="px-3 py-2 text-[#E5B842] hover:bg-[#C5A059]/10 transition-colors"
                                  title="Increase Quantity"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => addToCart(dish.id)}
                                className="bg-[#E5B842] hover:bg-white text-[#1A0E08] hover:text-[#1A0E08] text-xs font-black py-2.5 px-4 rounded-xl transition-all flex items-center gap-1 shadow-md cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" /> Add to Plate
                              </button>
                            )}
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Interactive Cart Panel (Showcases instant receipt calculation) */}
            {Object.keys(cart).length > 0 && (
              <div id="cart-section" className="lg:col-span-4 bg-[#2B1B17] rounded-3xl p-6 border-2 border-[#E5B842]/40 shadow-2xl space-y-6 self-start sticky top-24">
                
                {/* Cart header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="p-2 bg-[#E5B842] text-[#1A0E08] rounded-xl text-lg">🛒</span>
                    <div>
                      <h3 className="font-heading font-black text-white text-lg">Your Selected Plate</h3>
                      <p className="text-[10px] text-gray-400">Compile items to order on WhatsApp</p>
                    </div>
                  </div>
                  <button 
                    onClick={clearCart}
                    className="text-xs text-gray-400 hover:text-red-400 underline transition-colors cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>

                {/* Selected items list */}
                <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                  {Object.entries(cart).map(([id, qty]) => {
                    const dish = POPULAR_DISHES.find(d => d.id === id);
                    if (!dish) return null;
                    return (
                      <div key={id} className="flex items-center justify-between gap-3 bg-[#1A0E08]/60 p-3 rounded-xl border border-[#C5A059]/10">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-xs text-white truncate">{dish.name}</h4>
                          <span className="text-[10px] text-[#C5A059] block">₹{dish.price} x {qty}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => removeFromCart(id)}
                            className="w-6 h-6 rounded bg-[#2B1B17] hover:bg-red-950 text-gray-300 hover:text-white flex items-center justify-center text-xs transition-colors"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold text-white min-w-[15px] text-center">{qty}</span>
                          <button 
                            onClick={() => addToCart(id)}
                            className="w-6 h-6 rounded bg-[#2B1B17] hover:bg-green-950 text-gray-300 hover:text-white flex items-center justify-center text-xs transition-colors"
                          >
                            +
                          </button>
                          <span className="text-xs font-black text-[#E5B842] ml-1 min-w-[40px] text-right">
                            ₹{dish.price * qty}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Invoice Breakdown */}
                <div className="space-y-2 pt-4 border-t border-white/10 text-xs text-gray-300">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-white">₹{getCartTotal()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST & Packaging Charges</span>
                    <span className="text-green-400 font-bold">₹0 (FREE)</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-dashed border-white/10">
                    <span className="font-extrabold text-white uppercase">Grand Total</span>
                    <span className="font-black text-[#E5B842] text-base">₹{getCartTotal()}</span>
                  </div>
                </div>

                {/* Highlight benefits */}
                <div className="bg-[#1A0E08] p-3 rounded-xl border border-white/5 text-[11px] text-gray-400 space-y-1.5">
                  <p className="flex items-center gap-1.5 text-[#E5B842] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E5B842]"></span>
                    Ready in 20-25 Minutes!
                  </p>
                  <p>Upon sending this order, our team in Ponkuthi will instantly start packing/cooking so it's fresh upon your arrival.</p>
                </div>

                {/* Proceed Checkout Trigger */}
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-[#1A0E08] py-4 rounded-xl font-black text-sm transition-all shadow-xl shadow-green-950/20 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
                >
                  <span>💬</span> Order on WhatsApp (₹{getCartTotal()})
                </button>

                <p className="text-[10px] text-center text-gray-400">
                  Clicking will open WhatsApp chat with pre-written order details. No pre-payment required! Pay at the counter.
                </p>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* WHY CUSTOMERS LOVE US SECTION */}
      <section id="why-us" className="py-20 bg-[#FDFBF7] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-[#7C5A32] text-xs font-bold uppercase tracking-wider bg-[#C5A059]/10 px-3 py-1 rounded-full">
              👑 Our Quality Pledge
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black tracking-tight text-[#1A0E08]">
              Why Local Foodies Love <span className="text-[#7C5A32]">HOMRAI</span>
            </h2>
            <p className="text-sm text-gray-600">
              We stand apart in Kolachery by combining exquisite traditional culinary skills, flawless cleanliness, and prices that make delicious dining accessible to everyone.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Rating Card */}
            <div className="bg-[#1E110B] text-white p-8 rounded-3xl border-2 border-[#C5A059]/30 relative overflow-hidden flex flex-col justify-between min-h-[220px]">
              <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl text-white font-heading">4.3</div>
              <div>
                <div className="flex gap-1 text-[#E5B842] mb-3">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current opacity-50" />
                </div>
                <h3 className="font-heading font-black text-xl text-white">4.3 / 5 Rating</h3>
                <p className="text-xs text-gray-300 mt-2">
                  With 39 Google Map Reviews, we are proudly rated highly for taste, behavior, and portions in Kolachery town.
                </p>
              </div>
              <div className="pt-4 border-t border-white/5 text-[10px] text-[#E5B842] uppercase tracking-wider font-extrabold">
                Verified Local Business
              </div>
            </div>

            {/* Highlight 2 */}
            <div className="bg-white p-8 rounded-3xl border border-[#C5A059]/25 hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[220px]">
              <div>
                <span className="p-3 bg-[#1E110B] text-[#E5B842] rounded-xl text-2xl inline-block mb-4">🍛</span>
                <h3 className="font-heading font-black text-lg text-[#1A0E08]">Delicious & Flavorful Food</h3>
                <p className="text-xs text-gray-600 mt-2">
                  No artificial chemical colors or shortcuts. Just hand-blended local Kerala spices and pristine ghee.
                </p>
              </div>
              <div className="text-[10px] text-[#7C5A32] font-bold uppercase tracking-wider pt-4">
                100% Authentic Recipes
              </div>
            </div>

            {/* Highlight 3 */}
            <div className="bg-white p-8 rounded-3xl border border-[#C5A059]/25 hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[220px]">
              <div>
                <span className="p-3 bg-[#1E110B] text-[#E5B842] rounded-xl text-2xl inline-block mb-4">💰</span>
                <h3 className="font-heading font-black text-lg text-[#1A0E08]">Budget-Friendly Pricing</h3>
                <p className="text-xs text-gray-600 mt-2">
                  Enjoy authentic Arabian grills, high quality biryanis, fresh juices under ₹200. Clean food shouldn’t break the bank.
                </p>
              </div>
              <div className="text-[10px] text-[#7C5A32] font-bold uppercase tracking-wider pt-4">
                ₹1 - ₹200 Max Range
              </div>
            </div>

            {/* Highlight 4 */}
            <div className="bg-white p-8 rounded-3xl border border-[#C5A059]/25 hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[220px]">
              <div>
                <span className="p-3 bg-[#1E110B] text-[#E5B842] rounded-xl text-2xl inline-block mb-4">🧼</span>
                <h3 className="font-heading font-black text-lg text-[#1A0E08]">Clean & Organized</h3>
                <p className="text-xs text-gray-600 mt-2">
                  A high-hygiene family room, neatly set steel plates, hand sanitizers, and daily deep cleaned kitchen.
                </p>
              </div>
              <div className="text-[10px] text-[#7C5A32] font-bold uppercase tracking-wider pt-4">
                Strict Sanitation Code
              </div>
            </div>

          </div>

          {/* Secondary highlights grid row */}
          <div className="grid sm:grid-cols-3 gap-6 mt-6">
            
            <div className="bg-[#1A0E08]/5 p-6 rounded-2xl flex gap-3 items-center border border-amber-950/5">
              <span className="text-3xl">😊</span>
              <div>
                <h4 className="font-bold text-sm text-[#1A0E08]">Attentive Staff</h4>
                <p className="text-xs text-gray-500">Mannerly and welcoming local team.</p>
              </div>
            </div>

            <div className="bg-[#1A0E08]/5 p-6 rounded-2xl flex gap-3 items-center border border-amber-950/5">
              <span className="text-3xl">🥤</span>
              <div>
                <h4 className="font-bold text-sm text-[#1A0E08]">Fresh Juices</h4>
                <p className="text-xs text-gray-500">Healthy and cooling, prepared instantly.</p>
              </div>
            </div>

            <div className="bg-[#1A0E08]/5 p-6 rounded-2xl flex gap-3 items-center border border-amber-950/5">
              <span className="text-3xl">☕</span>
              <div>
                <h4 className="font-bold text-sm text-[#1A0E08]">Live Tea Counter</h4>
                <p className="text-xs text-gray-500">Perfect evening snack pit-stop in Ponkuthi.</p>
              </div>
            </div>

          </div>

          {/* Live Visitor Planner Form (Pre-book / Notify Visit) */}
          <div className="mt-16 bg-[#1A0E08] text-white rounded-3xl p-8 lg:p-12 border-2 border-[#C5A059]/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
              <span className="text-9xl font-accent">H</span>
            </div>
            
            <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
              
              <div className="lg:col-span-6 space-y-4 text-center lg:text-left">
                <span className="text-[#E5B842] text-xs font-bold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full inline-block">
                  🕒 Save Visit Waiting Time
                </span>
                <h3 className="text-2xl sm:text-3xl font-heading font-black text-[#FDFBF7]">
                  Let Us Know You're Arriving!
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Average dining visit takes only 25 minutes. Plan your arrival date and time below, and we will keep your tables pre-arranged and food piping hot! Clicking notify opens direct WhatsApp.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Check className="w-4 h-4 text-[#E5B842]" /> Zero Booking Charges</span>
                  <span className="flex items-center gap-1"><Check className="w-4 h-4 text-[#E5B842]" /> Priority Serving</span>
                </div>
              </div>

              <div className="lg:col-span-6">
                <form onSubmit={handleVisitPlan} className="bg-[#2B1B17] p-6 rounded-2xl border border-[#C5A059]/30 space-y-4">
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-gray-300 uppercase font-extrabold mb-1">Your Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="E.g., Arjun" 
                        value={visitName}
                        onChange={(e) => setVisitName(e.target.value)}
                        className="w-full bg-[#1A0E08] text-white border border-[#C5A059]/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#E5B842]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-300 uppercase font-extrabold mb-1">Guests Count</label>
                      <select 
                        value={visitGuests}
                        onChange={(e) => setVisitGuests(e.target.value)}
                        className="w-full bg-[#1A0E08] text-white border border-[#C5A059]/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#E5B842]"
                      >
                        <option value="1">1 Person</option>
                        <option value="2">2 People</option>
                        <option value="4">4 People</option>
                        <option value="6">6+ Family group</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-gray-300 uppercase font-extrabold mb-1">Arrival Date</label>
                      <input 
                        type="date" 
                        required
                        value={visitDate}
                        onChange={(e) => setVisitDate(e.target.value)}
                        className="w-full bg-[#1A0E08] text-white border border-[#C5A059]/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#E5B842]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-300 uppercase font-extrabold mb-1">Expected Time</label>
                      <input 
                        type="time" 
                        required
                        value={visitTime}
                        onChange={(e) => setVisitTime(e.target.value)}
                        className="w-full bg-[#1A0E08] text-white border border-[#C5A059]/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#E5B842]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#E5B842] hover:bg-[#F6D072] text-[#1A0E08] font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>💬</span> Notify via WhatsApp
                  </button>

                  {visitSubmitted && (
                    <p className="text-center text-xs text-green-400 font-bold animate-pulse">
                      ✓ Redirecting you to WhatsApp to save your visit!
                    </p>
                  )}
                </form>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section id="reviews" className="py-20 bg-[#1E110B] text-[#FDFBF7] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Aggregated Google rating details */}
            <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
              <span className="text-[#E5B842] text-xs font-bold uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full inline-block">
                💬 Diner Feedback
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-black tracking-tight text-[#FDFBF7]">
                What Our Customers <br />
                Say About Us
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                We are proud to serve families, local commuters, and foodie travelers visiting Ponkuthi, Kolachery town. Read honest reviews and share your own experience!
              </p>

              <div className="bg-[#2B1B17] p-6 rounded-2xl border border-[#C5A059]/30 inline-block text-center lg:text-left w-full">
                <div className="flex items-center justify-center lg:justify-start gap-4">
                  <span className="text-5xl font-black text-[#E5B842]">4.3</span>
                  <div>
                    <div className="flex text-[#E5B842]">
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current opacity-40" />
                    </div>
                    <p className="text-xs text-gray-300 mt-1">Google Maps Local Business Standard Rating</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 flex justify-between text-xs text-gray-400">
                  <span>39 Total Reviews</span>
                  <span className="text-[#E5B842]">100% Verified</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Review Cards + Write a Review */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Dynamic list of reviews */}
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div 
                    key={rev.id} 
                    className="bg-[#2B1B17] p-6 rounded-2xl border border-white/5 space-y-3 shadow-md hover:border-[#C5A059]/30 transition-all"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#C5A059] text-[#1A0E08] font-black flex items-center justify-center text-sm shadow-inner uppercase">
                          {rev.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-extrabold text-sm text-white">{rev.name}</h4>
                          <span className="text-[10px] text-gray-400 block">{rev.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center bg-[#1A0E08] px-2.5 py-1 rounded-lg border border-white/5">
                        <span className="text-xs text-[#E5B842] font-black mr-1">★</span>
                        <span className="text-xs text-white font-extrabold">{rev.rating}.0</span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-200 leading-relaxed italic">
                      "{rev.comment}"
                    </p>

                    {rev.verified && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-[#E5B842] font-semibold bg-white/5 px-2 py-0.5 rounded-full">
                        <Check className="w-3 h-3 text-[#E5B842]" /> Verified Google Reviewer
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* simulated review submission form */}
              <div className="bg-[#2B1B17] p-6 rounded-3xl border border-[#C5A059]/30 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg">✍️</span>
                  <h3 className="font-heading font-black text-white text-base">Visited Us? Leave Your Instant Review!</h3>
                </div>

                <form onSubmit={handleAddReview} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      className="w-full bg-[#1A0E08] text-white border border-[#C5A059]/20 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-[#E5B842]"
                      required
                    />
                    <select 
                      value={newReview.rating}
                      onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                      className="w-full bg-[#1A0E08] text-white border border-[#C5A059]/20 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-[#E5B842]"
                    >
                      <option value="5">⭐⭐⭐⭐⭐ (Excellent Taste)</option>
                      <option value="4">⭐⭐⭐⭐ (Very Good Quality)</option>
                      <option value="3">⭐⭐⭐ (Average / Good)</option>
                    </select>
                  </div>
                  
                  <textarea 
                    rows={2}
                    placeholder="E.g., Very tidy place, fast service and delicious Biryani!" 
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full bg-[#1A0E08] text-white border border-[#C5A059]/20 rounded-xl p-4 text-xs focus:outline-none focus:border-[#E5B842] resize-none"
                    required
                  ></textarea>

                  <button 
                    type="submit"
                    className="bg-[#C5A059] hover:bg-[#E5B842] text-[#1A0E08] font-black text-xs px-6 py-2 rounded-xl transition-all float-right cursor-pointer"
                  >
                    Submit Review
                  </button>
                  <div className="clear-both"></div>
                </form>

                {reviewSubmitted && (
                  <div className="bg-green-950 text-green-300 p-3 rounded-xl text-xs text-center border border-green-800 font-bold animate-bounce">
                    🎉 Thank you so much! Your review was verified and added above to the list immediately.
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* BEAUTIFUL IMAGE GALLERY */}
      <section id="gallery" className="py-20 bg-[#FDFBF7] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-[#7C5A32] text-xs font-bold uppercase tracking-wider bg-[#C5A059]/10 px-3 py-1 rounded-full">
              📸 Photo Gallery
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black tracking-tight text-[#1A0E08]">
              HOMRAI Culinary <span className="text-[#7C5A32]">Moments</span>
            </h2>
            <p className="text-sm text-gray-600">
              Take a visual journey through our kitchen, elegant local dine-in area, signature dishes, and live counter vibes.
            </p>

            {/* Gallery filter tags */}
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              {[
                { id: 'all', label: 'All Photos' },
                { id: 'dishes', label: 'Signature Dishes' },
                { id: 'interior', label: 'Restaurant Interior' },
                { id: 'tea-snack', label: 'Tea & Snacks Counter' },
                { id: 'juices', label: 'Fresh Juices' },
                { id: 'experience', label: 'Dining Experience' }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setGalleryFilter(filter.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    galleryFilter === filter.id 
                      ? 'bg-[#1A0E08] text-[#E5B842] scale-105 shadow-md' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Photo Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_PHOTOS.filter(photo => galleryFilter === 'all' || photo.category === galleryFilter).map((photo, i) => (
              <div 
                key={i} 
                className="group relative rounded-2xl overflow-hidden shadow-md bg-zinc-950 border-2 border-[#C5A059]/10 hover:border-[#E5B842]/50 transition-all duration-300"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={photo.url} 
                    alt={photo.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0E08] via-[#1A0E08]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-[10px] text-[#E5B842] uppercase tracking-wider font-extrabold">{photo.category}</span>
                  <h4 className="font-heading font-black text-lg text-white mt-1">{photo.title}</h4>
                  <p className="text-xs text-gray-300 mt-1">{photo.desc}</p>
                </div>

                {/* Always-visible title on mobile/non-hover devices */}
                <div className="p-4 bg-white border-t border-gray-100 group-hover:hidden transition-all">
                  <span className="text-[9px] text-[#7C5A32] uppercase tracking-widest font-black block">{photo.category}</span>
                  <h4 className="font-bold text-sm text-[#1A0E08] truncate mt-0.5">{photo.title}</h4>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* LOCAL SEO & DELIVERY COVERAGE ZONE */}
      <section className="bg-[#1A0E08] text-white py-16 border-t border-b border-[#C5A059]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <span className="text-[#E5B842] text-xs font-bold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full inline-block">
                📍 Serving Kolachery & Ponkuthi
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-[#FDFBF7]">
                The Heart of Local Flavors in Kannur District
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
                Looking for the best biryani, tandoori grills, or tea snacks near Kolachery? HOMRAI Restaurant is the favorite choice for customers across Ponkuthi, Kolachery Town, Cheleri, Valapattanam outskirts, and adjoining villages. Stop by for our quick 25-minute dine-in or pre-book via WhatsApp to save time!
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 pt-2">
                {['Ponkuthi', 'Kolachery Town', 'Cheleri', 'Pappinisseri road', 'Kannur suburbs', 'Kolachery Panchayat'].map((loc, idx) => (
                  <span key={idx} className="bg-[#2B1B17] text-gray-300 px-3 py-1 rounded-lg text-xs border border-[#C5A059]/25 font-semibold">
                    ✓ {loc}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#2B1B17] p-6 rounded-2xl border border-white/5 space-y-3">
              <h4 className="font-bold text-[#E5B842] text-sm uppercase tracking-wider">⚡ Fast Takeaway Guarantee</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                No long wait times. We package your Biryanis, Mandi, and Chinese boxes with sturdy temperature-locked covers to keep them piping hot until you reach home.
              </p>
              <a 
                href="https://wa.me/919645119966" 
                target="_blank" 
                rel="noreferrer"
                className="block text-center bg-[#E5B842] text-[#1A0E08] font-bold py-2 rounded-lg text-xs transition-colors hover:bg-white"
              >
                Send WhatsApp Pre-Order
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 bg-[#FDFBF7] scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-12">
            <span className="text-[#7C5A32] text-xs font-bold uppercase tracking-wider bg-[#C5A059]/10 px-3 py-1 rounded-full">
              ❓ Frequently Asked Questions
            </span>
            <h2 className="text-3xl font-heading font-black text-[#1A0E08] tracking-tight">
              Have Questions? We Have Answers!
            </h2>
            <p className="text-sm text-gray-600">
              Everything you need to know about dining, pricing, and orders at HOMRAI Restaurant.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <details 
                key={i} 
                className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm [&_summary::-webkit-details-marker]:hidden transition-all duration-300 cursor-pointer"
              >
                <summary className="flex items-center justify-between gap-4">
                  <h3 className="font-extrabold text-sm sm:text-base text-[#1A0E08] group-hover:text-[#7C5A32] transition-colors">
                    {faq.question}
                  </h3>
                  <span className="shrink-0 rounded-full bg-gray-100 p-1.5 text-gray-900 group-open:rotate-180 transition-transform">
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-gray-600 border-t border-gray-50 pt-3">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>

        </div>
      </section>

      {/* CONTACT & GOOGLE MAPS SECTION */}
      <section id="contact" className="py-16 bg-[#FDFBF7] border-t border-[#C5A059]/25 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Contact details */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="inline-flex items-center gap-1 text-xs text-[#7C5A32] font-bold uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-[#C5A059]" /> Location & Hours
              </div>

              <h2 className="text-3xl sm:text-4xl font-heading font-black text-[#1A0E08] tracking-tight">
                Visit Us at <span className="text-[#7C5A32]">Ponkuthi</span>
              </h2>

              <p className="text-sm text-gray-600 leading-relaxed">
                We are located right in the heart of Ponkuthi, Kolachery, Kerala. Stop by with your family or friends to enjoy a lovely, hygienic, and extremely delicious dining experience!
              </p>

              <div className="space-y-4">
                
                {/* Location item */}
                <div className="flex gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <span className="p-3 bg-[#1A0E08] text-[#E5B842] rounded-xl font-bold">📍</span>
                  <div>
                    <h4 className="font-black text-sm text-[#1A0E08]">Restaurant Address</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      HOMRAI Restaurant, Ponkuthi, Kolachery, Kerala 670601
                    </p>
                  </div>
                </div>

                {/* Phone item */}
                <div className="flex gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <span className="p-3 bg-[#1A0E08] text-[#E5B842] rounded-xl font-bold">📞</span>
                  <div>
                    <h4 className="font-black text-sm text-[#1A0E08]">Phone & WhatsApp</h4>
                    <p className="text-xs text-[#1A0E08] font-bold mt-1">
                      <a href="tel:+919645119966" className="hover:underline">+91 96451 19966</a>
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Feel free to call for takeaway booking</p>
                  </div>
                </div>

                {/* Hours item */}
                <div className="flex gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <span className="p-3 bg-[#1A0E08] text-[#E5B842] rounded-xl font-bold">🕒</span>
                  <div>
                    <h4 className="font-black text-sm text-[#1A0E08]">Opening Hours</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Open Daily: 11:00 AM — 11:00 PM
                    </p>
                    <p className="text-[10px] text-green-600 font-bold mt-1">Live Tea & Snacks active from 3 PM</p>
                  </div>
                </div>

              </div>

              {/* Instant Action */}
              <div className="pt-4 flex flex-wrap gap-4">
                <a 
                  href="https://wa.me/919645119966" 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-[#25D366] hover:bg-[#20ba5a] text-[#1A0E08] font-black text-sm px-6 py-3.5 rounded-xl transition-all shadow-md flex items-center gap-2"
                >
                  <span>💬</span> Order on WhatsApp Now
                </a>
                <a 
                  href="tel:+919645119966" 
                  className="bg-[#1A0E08] text-white hover:bg-zinc-800 font-bold text-sm px-6 py-3.5 rounded-xl transition-all flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#E5B842]" /> Call Restaurant
                </a>
              </div>

            </div>

            {/* Google maps iframe embedding */}
            <div className="lg:col-span-7 space-y-3">
              <div className="rounded-3xl overflow-hidden border-4 border-[#C5A059]/40 shadow-2xl h-96 bg-zinc-100">
                {/* Clean embedded Google Maps specifically centered around Kolachery, Ponkuthi, Kerala */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15612.339247385966!2d75.39962255776686!3d11.968600863004383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba4399e559d7ff7%3A0xc39cb7db07357c91!2sKolachery%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                  className="w-full h-full border-0"
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="HOMRAI Restaurant Location Map, Ponkuthi"
                ></iframe>
              </div>
              <p className="text-[11px] text-gray-500 text-center">
                📍 Convenient roadside parking space available. We are situated prominently in Ponkuthi, Kolachery Town.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1A0E08] text-[#FDFBF7] pt-16 pb-8 border-t-2 border-[#C5A059]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-white/5">
            
            {/* Branding widget */}
            <div className="space-y-4">
              <a href="#" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#E5B842] to-[#9E782F] p-0.5 flex items-center justify-center shadow-lg">
                  <div className="w-full h-full bg-[#1A0E08] rounded-[8px] flex items-center justify-center">
                    <span className="font-accent font-bold text-lg text-[#E5B842]">H</span>
                  </div>
                </div>
                <div>
                  <span className="block font-accent font-black text-lg tracking-widest text-white">HOMRAI</span>
                  <span className="block text-[9px] uppercase tracking-widest text-[#C5A059]">RESTAURANT</span>
                </div>
              </a>
              <p className="text-xs text-gray-400 leading-relaxed">
                Bringing the authentic tastes of delicious Biryani, juicy Arabian Charcoal Alfahm, smoky Mandi, and live tea snacks to Kolachery town since inception. Excellent taste, absolute hygiene, and budget pricing.
              </p>
              
              {/* Rating badge */}
              <div className="flex items-center gap-2 bg-[#2B1B17] p-3 rounded-xl border border-[#C5A059]/20 w-max">
                <span className="text-[#E5B842] text-sm">★</span>
                <span className="text-xs font-extrabold text-white">4.3 / 5</span>
                <span className="text-[10px] text-gray-400">(39 Reviews)</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-heading font-black text-sm text-[#E5B842] uppercase tracking-wider">Quick Navigation</h3>
              <ul className="space-y-2.5 text-xs text-gray-300">
                <li><a href="#about" className="hover:text-[#E5B842] transition-colors">About Homrai Restaurant</a></li>
                <li><a href="#menu" className="hover:text-[#E5B842] transition-colors">Our Interactive Menu</a></li>
                <li><a href="#why-us" className="hover:text-[#E5B842] transition-colors">Why Customers Choose Us</a></li>
                <li><a href="#reviews" className="hover:text-[#E5B842] transition-colors">Verified Customer Reviews</a></li>
                <li><a href="#gallery" className="hover:text-[#E5B842] transition-colors">Food & Interior Photos</a></li>
                <li><a href="#contact" className="hover:text-[#E5B842] transition-colors">Location & Contact Details</a></li>
              </ul>
            </div>

            {/* Popular dishes list */}
            <div className="space-y-4">
              <h3 className="font-heading font-black text-sm text-[#E5B842] uppercase tracking-wider">Our specialties</h3>
              <ul className="space-y-2 text-xs text-gray-300">
                <li className="flex justify-between">
                  <span>Malabar Chicken Biryani</span>
                  <span className="text-[#E5B842]">₹140</span>
                </li>
                <li className="flex justify-between">
                  <span>Arabian Alfahm Chicken</span>
                  <span className="text-[#E5B842]">₹150</span>
                </li>
                <li className="flex justify-between">
                  <span>Yemeni Chicken Mandi</span>
                  <span className="text-[#E5B842]">₹160</span>
                </li>
                <li className="flex justify-between">
                  <span>Chinese Chicken Fried Rice</span>
                  <span className="text-[#E5B842]">₹120</span>
                </li>
                <li className="flex justify-between">
                  <span>Live Cardamom Masala Chai</span>
                  <span className="text-[#E5B842]">₹12</span>
                </li>
                <li className="flex justify-between">
                  <span>Fresh Squeezed Orange Juice</span>
                  <span className="text-[#E5B842]">₹50</span>
                </li>
              </ul>
            </div>

            {/* Local Search Keywords for SEO */}
            <div className="space-y-4">
              <h3 className="font-heading font-black text-sm text-[#E5B842] uppercase tracking-wider">Local Search Area</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                We are the top searched restaurant in Ponkuthi, Kolachery, Cheleri, Pappinisseri, Valapattanam, and adjoining Kannur regions. Known for quality family dining, clean tables, and rapid takeaways.
              </p>
              <div className="pt-2">
                <a 
                  href="https://wa.me/919645119966" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#1A0E08] font-bold bg-[#E5B842] hover:bg-white px-3.5 py-2 rounded-xl transition-colors"
                >
                  <span>💬</span> Order on WhatsApp
                </a>
              </div>
            </div>

          </div>

          {/* Socials & Copyright */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
            <p>© {new Date().getFullYear()} HOMRAI Restaurant. Ponkuthi, Kolachery, Kerala 670601. All rights reserved.</p>
            
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-[#E5B842]">Facebook</a>
              <span>•</span>
              <a href="#" className="hover:text-[#E5B842]">Instagram</a>
              <span>•</span>
              <a href="#" className="hover:text-[#E5B842]">Google Maps</a>
              <span>•</span>
              <a href="tel:+919645119966" className="text-[#E5B842] font-bold">Call Support</a>
            </div>
          </div>

        </div>
      </footer>

      {/* FLOATING "ORDER ON WHATSAPP" ACTION STICKER */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
        
        {/* Helper balloon popup */}
        <div className="bg-[#1A0E08] text-[#FDFBF7] text-xs px-4 py-2.5 rounded-2xl shadow-2xl border border-[#C5A059]/50 max-w-xs animate-bounce pointer-events-auto flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
          <div>
            <p className="font-bold">Ordering is Fast & Easy!</p>
            <p className="text-[10px] text-[#C5A059]">Order Biryani / Alfahm on WhatsApp</p>
          </div>
        </div>

        {/* Real Float Button */}
        <a 
          href="https://wa.me/919645119966" 
          target="_blank" 
          rel="noreferrer"
          className="pointer-events-auto bg-[#25D366] hover:bg-[#20ba5a] text-[#1A0E08] p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 border-4 border-[#1E110B] flex items-center justify-center group"
          title="Order on WhatsApp now"
        >
          <span className="absolute right-14 bg-[#25D366] text-[#1A0E08] text-xs font-black px-3 py-1 rounded-full whitespace-nowrap shadow-md opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline">
            Direct WhatsApp Chat
          </span>
          {/* Custom high quality SVG for whatsapp */}
          <svg className="w-7 h-7 text-[#1A0E08]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.333 4.993L2 22l5.13-1.347a9.944 9.944 0 004.882 1.277h.005c5.505 0 9.989-4.478 9.99-9.985A9.987 9.987 0 0012.012 2zm5.82 14.37c-.255.715-1.48 1.397-2.031 1.486-.5.082-1.15.152-3.328-.748-2.784-1.15-4.577-3.985-4.717-4.172-.138-.186-1.123-1.493-1.123-2.847 0-1.355.706-2.02.956-2.29.25-.27.546-.338.728-.338l.523.01c.145.004.34.004.52.433.187.447.64 1.554.697 1.666.056.112.093.242.018.39-.074.15-.112.242-.224.373-.112.13-.234.29-.335.39-.107.108-.22.224-.094.44.127.217.564.93 1.21 1.505.834.74 1.536.968 1.752 1.077.215.108.34.09.467-.056.126-.146.545-.634.69-.85.146-.214.29-.18.49-.104.2.075 1.27.6 1.49.71.22.112.368.167.42.26.056.094.056.545-.2 1.26z" />
          </svg>
        </a>
      </div>

    </div>
  );
}