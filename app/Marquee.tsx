/* Auto-scrolling keyword strip: white band, black English words in the brand
   serif, with the gradient "K" from the logo between them. Decorative —
   hidden from assistive tech. Pauses on hover; static under reduced-motion. */

const WORDS = [
  "Wealth Management",
  "Tax-Efficient Investing",
  "Pension Planning",
  "Retirement",
  "Insurance",
  "Financial Freedom",
  "Smart Portfolios",
  "Family Wealth",
  "Long-Term Growth",
];

export default function Marquee() {
  // Two copies so the -50% loop is seamless.
  const items = [...WORDS, ...WORDS];
  return (
    <div className="border-y border-black/10 bg-white py-5" aria-hidden>
      <div className="marquee" dir="ltr">
        <div className="marquee-track">
          {items.flatMap((w, i) => [
            <span key={`w${i}`} className="marquee-word">
              {w}
            </span>,
            <span key={`k${i}`} className="marquee-k">
              K
            </span>,
          ])}
        </div>
      </div>
    </div>
  );
}
