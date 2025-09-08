"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface QuoteData {
  quote: string;
  author: string;
}

export default function RandomQuoteGenerator() {
  const [quote, setQuote] = useState<QuoteData | null>(null);
  const [displayedWords, setDisplayedWords] = useState<string[]>([]);
  const [showAuthor, setShowAuthor] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const fetchRandomQuote = async () => {
    try {
      setIsAnimating(true);
      setShowAuthor(false);
      setDisplayedWords([]);

      const response = await fetch("http://localhost:8000/quotes/get-random");
      console.log(response);
      const data: QuoteData = await response.json();

      setQuote(data);
      animateQuote(data.quote);
    } catch (error) {
      console.error("Error fetching quote:", error);
      setIsAnimating(false);
    }
  };

  const animateQuote = (quoteText: string) => {
    const words = quoteText.split(" ");
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < words.length) {
        setDisplayedWords((prev) => [...prev, words[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setShowAuthor(true);
          setIsAnimating(false);
        }, 500);
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <Quote className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Random Quote Generator
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover inspiring words from great minds
          </p>
        </div>

        <Card className="bg-card border-border p-8 mb-8 min-h-[300px] flex flex-col justify-center">
          {quote ? (
            <div className="space-y-6">
              <blockquote className="text-2xl md:text-3xl font-bold text-card-foreground leading-relaxed text-pretty">
                "{displayedWords.join(" ")}"
                {isAnimating && <span className="animate-pulse">|</span>}
              </blockquote>

              {showAuthor && (
                <div className="animate-fade-in">
                  <cite className="text-xl text-muted-foreground font-medium">
                    — {quote.author}
                  </cite>
                </div>
              )}
            </div>
          ) : (
            <div className="text-muted-foreground text-lg">
              Click the button below to generate your first inspiring quote
            </div>
          )}
        </Card>

        <Button
          onClick={fetchRandomQuote}
          disabled={isAnimating}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          {isAnimating ? "Generating..." : "Get New Quote"}
        </Button>
      </div>
    </div>
  );
}
