import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ArrowRight, Facebook, Instagram, ShoppingCart, CheckCircle2, Truck } from "lucide-react";

// === QUICK CONFIG ===
const CONFIG = {
  name: "Geza Meat",
  tagline: "Premium cevapi & burger patties — handmade in Adelaide.",
  phone: "+61 400 000 000",
  email: "Gezameat@outlook.com",
  address: "Adelaide, South Australia",
  facebook: "https://www.facebook.com/share/16kK7pTBFb/",
  instagram: "https://instagram.com/geza.meat",
  ctaPrimaryText: "Order or Get a Quote",
  ctaSecondaryText: "See Our Menu",
  paypalLink: "https://www.paypal.me/gezameat"
};

export default function App() {
  const [order, setOrder] = useState({name:"", phone:"", details:"", delivery:"Pickup", address:"", date:""});
  const [sent, setSent] = useState(false);

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    const subject = `New Order – ${order.name} (${order.delivery})`;
    const body = [
      `Name: ${order.name}`,
      `Phone: ${order.phone}`,
      `Delivery: ${order.delivery}`,
      order.address ? `Address: ${order.address}` : null,
      order.date ? `Preferred Date/Time: ${order.date}` : null,
      `Order: ${order.details}`
    ].filter(Boolean).join("\n");

    const mailto = `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="sticky top-0 z-40 bg-white/80 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#home" className="font-semibold text-xl">{CONFIG.name}</a>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#gallery">Gallery</a>
            <a href="#order">Order</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <section id="home" className="py-20 max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}}>
          <h1 className="text-4xl font-extrabold">{CONFIG.tagline}</h1>
          <p className="mt-4 text-lg text-gray-600">
            We specialise in authentic cevapi and burger patties made from premium Australian beef.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#order" className="px-5 py-3 bg-black text-white rounded-2xl">{CONFIG.ctaPrimaryText}</a>
            <a href="#services" className="px-5 py-3 border rounded-2xl">{CONFIG.ctaSecondaryText}</a>
          </div>
        </motion.div>
      </section>

      <section id="order" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold mb-4">Order Now</h2>
            <p className="text-gray-700">Use the form or pay directly via PayPal.</p>
            {CONFIG.paypalLink && (
              <a href={CONFIG.paypalLink} className="px-5 py-3 bg-black text-white rounded-2xl inline-flex items-center gap-2">
                <ShoppingCart size={18}/>Pay with PayPal
              </a>
            )}
          </div>
          <form onSubmit={handleOrderSubmit} className="p-6 bg-white border rounded-2xl">
            <input className="w-full border p-2 mb-3" placeholder="Name" value={order.name} onChange={e=>setOrder({...order,name:e.target.value})} required/>
            <input className="w-full border p-2 mb-3" placeholder="Phone" value={order.phone} onChange={e=>setOrder({...order,phone:e.target.value})} required/>
            <textarea className="w-full border p-2 mb-3" placeholder="Order details" value={order.details} onChange={e=>setOrder({...order,details:e.target.value})} required/>
            <button className="px-5 py-3 bg-black text-white rounded-2xl">Submit Order</button>
            {sent && <p className="mt-2 text-green-600">✅ Order sent! We'll confirm shortly.</p>}
          </form>
        </div>
      </section>

      <footer className="border-t py-6 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} {CONFIG.name}. All rights reserved.
      </footer>
    </div>
  );
}
