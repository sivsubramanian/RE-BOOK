import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowLeft, MessageCircle, Heart, Share2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { mockBooks } from "@/lib/mockData";
import BookCard from "@/components/BookCard";

const BookDetail = () => {
  const { id } = useParams();
  const book = mockBooks.find((b) => b.id === id) || mockBooks[0];
  const similar = mockBooks.filter((b) => b.department === book.department && b.id !== book.id).slice(0, 4);
  const [requested, setRequested] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleRequest = () => {
    setShowModal(true);
    setTimeout(() => {
      setRequested(true);
      setShowModal(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={book.image} alt="" className="w-full h-full object-cover blur-3xl opacity-20 scale-110" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 to-background" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 py-12">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to feed
          </Link>

          <div className="grid md:grid-cols-[300px_1fr] gap-8">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-3xl overflow-hidden glow-md">
              <img src={book.image} alt={book.title} className="w-full aspect-[3/4] object-cover" />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="flex flex-col">
              <span className="text-xs text-primary font-semibold mb-2">{book.department} · Sem {book.semester}</span>
              <h1 className="font-display text-3xl font-bold mb-2 text-foreground">{book.title}</h1>
              <p className="text-muted-foreground mb-6">by {book.author}</p>

              <div className="glass-card p-5 mb-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Condition</span>
                  <span className="text-foreground font-medium">{book.condition}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-display font-bold text-xl gradient-text">₹{book.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Listed</span>
                  <span className="text-foreground">{book.listedAt}</span>
                </div>
              </div>

              {/* Seller card */}
              <div className="glass-card p-4 flex items-center gap-3 mb-6">
                <img src={book.sellerAvatar} alt={book.sellerName} className="w-10 h-10 rounded-full bg-muted" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{book.sellerName}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="w-3 h-3 fill-primary text-primary" /> {book.sellerRating}
                    <ShieldCheck className="w-3 h-3 text-primary ml-2" /> Verified
                  </div>
                </div>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="flex gap-3 mt-auto">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleRequest}
                  disabled={requested}
                  className={`flex-1 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-300 ${
                    requested ? "bg-primary/20 text-primary" : "gradient-btn"
                  }`}
                >
                  {requested ? "✓ Request Sent" : "Request Book"}
                </motion.button>
                <button className="glass-card p-3.5 rounded-2xl text-muted-foreground hover:text-foreground transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="glass-card p-3.5 rounded-2xl text-muted-foreground hover:text-foreground transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Similar */}
      {similar.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 mt-12">
          <h2 className="font-display text-xl font-semibold mb-5 text-foreground">Similar Books</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {similar.map((b, i) => (
              <BookCard key={b.id} book={b} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Request modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card p-8 text-center max-w-sm mx-4"
            >
              <div className="w-16 h-16 mx-auto rounded-full gradient-btn flex items-center justify-center mb-4 animate-glow-pulse">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="font-display text-lg font-bold mb-2 text-foreground">Sending Request...</h3>
              <p className="text-sm text-muted-foreground">Notifying {book.sellerName} about your interest.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookDetail;
