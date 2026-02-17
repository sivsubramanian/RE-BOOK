import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search as SearchIcon, SlidersHorizontal, X } from "lucide-react";
import BookCard from "@/components/BookCard";
import { mockBooks } from "@/lib/mockData";

const departments = ["All", "Computer Science", "Electrical Eng.", "Mechanical Eng.", "Business Admin", "Mathematics", "Physics"];
const conditions = ["All", "Like New", "Good", "Fair"];

const Search = () => {
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("All");
  const [cond, setCond] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const results = useMemo(() => {
    return mockBooks.filter((b) => {
      const matchesQuery = !query || b.title.toLowerCase().includes(query.toLowerCase()) || b.author.toLowerCase().includes(query.toLowerCase());
      const matchesDept = dept === "All" || b.department === dept;
      const matchesCond = cond === "All" || b.condition === cond;
      return matchesQuery && matchesDept && matchesCond;
    });
  }, [query, dept, cond]);

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-3xl font-bold mb-6 text-foreground">Find Your Books</h1>

          <div className="flex gap-3">
            <div className="flex-1 glass-card flex items-center gap-3 px-4 py-3 rounded-2xl">
              <SearchIcon className="w-5 h-5 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, author, or subject..."
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className={`glass-card px-4 rounded-2xl transition-colors ${showFilters ? "text-primary border-primary/30" : "text-muted-foreground"}`}
            >
              <SlidersHorizontal className="w-5 h-5" />
            </motion.button>
          </div>

          {showFilters && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="mt-4 glass-card p-4 rounded-2xl space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-2 font-medium">Department</p>
                <div className="flex flex-wrap gap-2">
                  {departments.map((d) => (
                    <button
                      key={d}
                      onClick={() => setDept(d)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${dept === d ? "gradient-btn" : "bg-muted text-muted-foreground hover:text-foreground"}`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2 font-medium">Condition</p>
                <div className="flex flex-wrap gap-2">
                  {conditions.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCond(c)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${cond === c ? "gradient-btn" : "bg-muted text-muted-foreground hover:text-foreground"}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        <p className="text-sm text-muted-foreground mb-4">{results.length} books found</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((book, i) => (
            <BookCard key={book.id} book={book} index={i} />
          ))}
        </div>

        {results.length === 0 && (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">📚</p>
            <p className="text-muted-foreground">No books found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
