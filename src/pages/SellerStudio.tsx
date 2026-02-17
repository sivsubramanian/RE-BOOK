import { motion } from "framer-motion";
import { Plus, BookOpen, Inbox, CheckCircle2, ArrowRight, Package } from "lucide-react";
import { sellerStats, mockTransactions, mockBooks } from "@/lib/mockData";

const statCards = [
  { label: "Books Listed", value: sellerStats.totalListed, icon: BookOpen, color: "text-primary" },
  { label: "Requests", value: sellerStats.requestsReceived, icon: Inbox, color: "text-secondary" },
  { label: "Accepted", value: sellerStats.accepted, icon: CheckCircle2, color: "text-emerald-400" },
  { label: "Completed", value: sellerStats.completed, icon: Package, color: "text-primary" },
];

const statusStyle: Record<string, string> = {
  requested: "bg-yellow-500/20 text-yellow-400",
  accepted: "bg-primary/20 text-primary",
  completed: "bg-secondary/20 text-secondary",
};

const SellerStudio = () => {
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Seller Studio</h1>
            <p className="text-muted-foreground text-sm mt-1">Manage your listings and track exchanges</p>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="gradient-btn px-5 py-3 rounded-2xl flex items-center gap-2 text-sm font-semibold">
            <Plus className="w-4 h-4" /> Add Book
          </motion.button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-5 rounded-2xl"
            >
              <stat.icon className={`w-5 h-5 ${stat.color} mb-3`} />
              <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Transactions */}
        <h2 className="font-display text-xl font-semibold mb-4 text-foreground">Recent Activity</h2>
        <div className="space-y-3 mb-10">
          {mockTransactions.map((tx, i) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="glass-card-hover p-4 rounded-2xl flex items-center gap-4"
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{tx.bookTitle}</p>
                <p className="text-xs text-muted-foreground">from {tx.buyerName} · {tx.date}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusStyle[tx.status]}`}>
                {tx.status}
              </span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </motion.div>
          ))}
        </div>

        {/* My Listings */}
        <h2 className="font-display text-xl font-semibold mb-4 text-foreground">My Listings</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockBooks.slice(0, 4).map((book, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card-hover rounded-2xl overflow-hidden"
            >
              <img src={book.image} alt={book.title} className="w-full aspect-[3/4] object-cover" />
              <div className="p-3">
                <p className="text-sm font-medium text-foreground line-clamp-1">{book.title}</p>
                <p className="text-xs gradient-text font-bold mt-1">₹{book.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellerStudio;
