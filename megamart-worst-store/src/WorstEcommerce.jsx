import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";

/* =========================================================
   MEGAMART-O-RAMA!!!  —  The World's Worst E-Commerce Site
   React version. One file, no dependencies except React.
   ========================================================= */

const CSS = `
.wm{
  --bg:#ffff66; --ink:#0000ee; --panel:#ff66cc; --alt:#66ff66; --hot:#ff0000; --btn:#00ffff;
  min-height:100vh; margin:0; background:var(--bg); color:var(--ink);
  font-family:"Comic Sans MS","Comic Sans","Chalkboard SE",cursive,sans-serif;
  font-size:15px; line-height:1.2; overflow-x:hidden; box-sizing:border-box;
  background-image:repeating-linear-gradient(45deg,transparent 0 12px,rgba(255,0,255,.12) 12px 24px);
}
@media (prefers-color-scheme: dark){
  .wm{ --bg:#220033; --ink:#ffff00; --panel:#006600; --alt:#990099; --hot:#ff9900; --btn:#ff00ff; }
}
.wm *{box-sizing:border-box}
.wm h1,.wm h2,.wm h3{margin:0}
.wm .rainbow{font-size:34px;text-align:center;font-weight:900;padding:8px 4px;
  background:linear-gradient(90deg,red,orange,yellow,lime,cyan,blue,magenta,red);background-size:300% 100%;
  -webkit-background-clip:text;background-clip:text;color:transparent;animation:wmslide 2s linear infinite;
  -webkit-text-stroke:1px #000;cursor:pointer}
@keyframes wmslide{to{background-position:300% 0}}
.wm .blink{animation:wmblink .6s steps(2,start) infinite}
@keyframes wmblink{to{visibility:hidden}}
.wm .wobble{display:inline-block;animation:wmwob 1s ease-in-out infinite alternate}
@keyframes wmwob{from{transform:rotate(-6deg) scale(1)}to{transform:rotate(6deg) scale(1.15)}}
.wm .marq{background:#000;color:#0f0;font-family:"Courier New",monospace;overflow:hidden;white-space:nowrap;padding:4px 0;border-top:4px ridge red;border-bottom:4px ridge red}
.wm .marq span{display:inline-block;padding-left:100%;animation:wmscroll 14s linear infinite}
@keyframes wmscroll{to{transform:translateX(-100%)}}
.wm .cone{background:repeating-linear-gradient(45deg,#fc0 0 14px,#000 14px 28px);color:#fff;text-align:center;padding:6px;font-weight:900;text-shadow:2px 2px #000,-1px -1px #000;font-size:13px}
.wm .topbar{position:sticky;top:0;z-index:50;display:flex;gap:4px;align-items:center;padding:4px;background:var(--panel);border:4px outset #888}
.wm .topbar input{flex:1;min-width:0;font:inherit;font-size:12px;padding:3px;border:3px inset #888}
.wm button{font:inherit;font-weight:bold;cursor:pointer;background:var(--btn);color:#000;border:4px outset #aaa;padding:5px 8px;font-size:13px}
.wm button:active{border-style:inset}
.wm .topbar button{font-size:11px;padding:3px 5px}
.wm .cats{display:flex;gap:3px;flex-wrap:wrap;justify-content:center;padding:4px;background:#000}
.wm .cats button{font-size:11px;padding:3px 6px;background:var(--alt)}
.wm .ad{margin:6px;padding:6px;text-align:center;font-weight:900;font-size:13px;background:#000;color:#ff0;border:4px dashed var(--hot);cursor:pointer;min-height:44px;display:flex;align-items:center;justify-content:center}
.wm .hero{background:var(--panel);border:6px double #000;margin:6px;padding:8px;text-align:center;color:#000}
.wm .hero .big{font-size:26px;color:var(--hot);font-weight:900;transform:rotate(-2deg);text-decoration:underline wavy}
.wm .counter{font-family:"Courier New",monospace;background:#000;color:#f00;display:inline-block;padding:2px 6px;letter-spacing:3px}
.wm .sortrow{margin:6px;padding:6px;background:var(--alt);border:3px groove #888;color:#000;font-size:12px}
.wm select{font:inherit;font-size:12px;max-width:100%}
.wm .grid{display:grid;grid-template-columns:1fr 1fr;gap:6px;padding:6px}
@media (max-width:340px){.wm .grid{grid-template-columns:1fr}}
.wm .card{background:#fff;color:#000;border:5px ridge var(--hot);padding:5px;position:relative;overflow:hidden;min-height:250px}
.wm .card:nth-child(odd){transform:rotate(-1.2deg)}
.wm .card:nth-child(even){transform:rotate(1.5deg) translateY(6px)}
.wm .pic{font-size:54px;text-align:center;filter:blur(1.5px) saturate(3);height:70px;display:flex;align-items:center;justify-content:center;cursor:pointer}
.wm .card h3{font-size:12px;margin:3px 0;color:var(--ink);text-decoration:underline;cursor:pointer;animation:wmls 2.5s ease-in-out infinite alternate}
@keyframes wmls{from{letter-spacing:0}to{letter-spacing:2px}}
.wm .card p{font-size:10px;margin:2px 0;color:#333}
.wm .was{text-decoration:line-through;color:#888;font-size:10px}
.wm .price{font-size:17px;font-weight:900;color:var(--hot);word-break:break-word}
.wm .stock{font-size:10px;color:#a00;font-weight:bold}
.wm .addwrap{position:relative;height:42px;margin-top:4px}
.wm .addbtn{position:absolute;left:0;top:0;font-size:12px;padding:4px 6px;transition:transform .15s}
.wm .cartbox{margin:6px;padding:8px;background:var(--panel);border:6px groove #000;color:#000}
.wm .line{display:flex;gap:6px;align-items:center;justify-content:space-between;background:#fff;margin:4px 0;padding:4px;border:2px dotted #f0f;font-size:12px}
.wm .line .ctrl{display:flex;gap:2px;align-items:center}
.wm .line button{font-size:11px;padding:2px 6px}
.wm .tot{font-size:22px;font-weight:900;color:var(--hot)}
.wm .footer{margin:6px;padding:8px;background:#000;color:#0f0;font-size:10px;text-align:center;font-family:"Courier New",monospace}
.wm .footer a{color:#0ff;cursor:pointer;text-decoration:underline}
.wm .ov{position:fixed;inset:0;z-index:200;background:rgba(255,0,100,.55);display:flex;align-items:center;justify-content:center;padding:12px;overflow:auto}
.wm .mod{background:#ffffcc;color:#000;border:8px ridge #f0f;padding:10px;max-width:340px;width:100%;position:relative;max-height:90vh;overflow:auto}
.wm .mod h2{font-size:20px;color:var(--hot);text-align:center}
.wm .mod label{display:block;font-size:11px;margin-top:6px}
.wm .mod input[type=text],.wm .mod input[type=email]{width:100%;font:inherit;padding:3px;border:3px inset #888}
.wm .row{display:flex;gap:4px;flex-wrap:wrap;margin-top:8px;justify-content:center}
.wm .tinyx{position:absolute;width:14px;height:14px;font-size:9px;padding:0;line-height:10px;background:#ddd;border:1px solid #999;color:#777;transition:all .12s}
.wm .tiny{font-size:8px;color:#999;text-decoration:underline;cursor:pointer;display:block;text-align:center;margin-top:10px}
.wm .xp{background:#0a246a;color:#fff;margin:-10px -10px 8px;padding:4px 8px;font-size:12px;font-weight:bold;font-family:Arial,sans-serif}
.wm .cookie{position:fixed;left:0;right:0;bottom:0;z-index:150;background:#000;color:#fff;border-top:6px dashed var(--hot);padding:8px;font-size:11px;max-height:45vh;overflow:auto}
.wm .cookie .row{justify-content:flex-start}
.wm .chatbtn{position:fixed;right:6px;bottom:90px;z-index:120;border-radius:50%;width:62px;height:62px;font-size:10px;padding:0;background:#f0f;color:#fff}
.wm .chat{position:fixed;right:6px;left:6px;bottom:60px;z-index:210;background:#fff;color:#000;border:5px ridge #f0f;display:flex;flex-direction:column;max-height:60vh}
.wm .chat .log{padding:6px;overflow:auto;flex:1;min-height:120px;font-size:12px}
.wm .chat .log div{margin:4px 0;padding:3px 6px;border:1px solid #999}
.wm .chat .me{background:#cfc;text-align:right}
.wm .chat .bot{background:#fcf}
.wm .chat form{display:flex;gap:4px;padding:4px}
.wm .chat input{flex:1;min-width:0;font:inherit;font-size:12px}
.wm .captcha{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;margin-top:6px}
.wm .captcha button{height:48px;font-size:22px;padding:0}
.wm .captcha button.sel{background:#f00;color:#fff;border-style:inset}
.wm .toast{position:fixed;left:50%;top:70px;transform:translateX(-50%) rotate(-3deg);z-index:300;background:#000;color:#ff0;padding:8px 12px;border:3px solid #f0f;font-size:13px;max-width:90%;text-align:center}
.wm .sale{position:fixed;left:6px;bottom:70px;z-index:140;max-width:70%;background:#fff;color:#000;border:3px dashed #f0f;padding:5px 8px;font-size:11px}
.wm .bar{height:22px;border:3px inset #888;background:#fff}
.wm .bar i{display:block;height:100%;width:0;background:repeating-linear-gradient(45deg,#f0f 0 10px,#0ff 10px 20px);transition:width .8s}
.wm .wheelwrap{position:relative;width:200px;height:200px;margin:22px auto 10px}
.wm .wheel{position:relative;width:200px;height:200px;border-radius:50%;border:5px solid #000}
.wm .wl{position:absolute;left:50%;top:50%;width:64px;margin-left:-32px;margin-top:-8px;text-align:center;font-size:9px;font-weight:900;color:#000}
.wm .ptr{position:absolute;top:-22px;left:50%;margin-left:-10px;font-size:22px;color:#f00;z-index:2}
.wm .rev{background:#fff;border:2px dotted #f0f;margin:4px 0;padding:4px;font-size:11px;text-align:left}
.wm .pete{position:fixed;right:6px;bottom:165px;z-index:125;text-align:center;cursor:pointer;font-size:42px;animation:wmbnc .8s ease-in-out infinite alternate;user-select:none}
@keyframes wmbnc{from{transform:translateY(0)}to{transform:translateY(-10px) rotate(8deg)}}
.wm .pbub{position:absolute;right:48px;bottom:30px;width:150px;background:#fff;color:#000;border:3px solid #000;font-size:11px;padding:5px;text-align:left}
.wm.ultra{font-family:Papyrus,fantasy}
.wm.ultra .grid,.wm.ultra .hero,.wm.ultra .cartbox{filter:hue-rotate(120deg) saturate(2)}
.wm.ultra .card{animation:wmjig .25s infinite alternate}
@keyframes wmjig{from{transform:rotate(-3deg)}to{transform:rotate(3deg) scale(1.03)}}
.wm .splash{position:fixed;inset:0;z-index:500;background:#000;color:#0f0;font-family:"Courier New",monospace;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:16px}
.trail{position:fixed;pointer-events:none;z-index:400;font-size:18px;animation:wmtr .7s forwards}
@keyframes wmtr{to{transform:translateY(30px) rotate(90deg) scale(.3);opacity:0}}
.fall{position:fixed;top:-30px;font-size:24px;pointer-events:none;z-index:400;animation:wmfl 3s linear forwards}
@keyframes wmfl{to{transform:translateY(110vh) rotate(360deg)}}
@media (prefers-reduced-motion: reduce){
  .wm .rainbow,.wm .blink,.wm .wobble,.wm .marq span,.wm .card h3,.wm .pete,.wm.ultra .card{animation:none}
  .trail,.fall{display:none}
}
`;

/* ----------------------------- data ----------------------------- */
const PRODUCTS = [
  { id: 1, e: "👟", n: "Left Shoe (Just The One)", d: "Pairs sold separately. Right shoe not found.", p: 49.99, w: 5.0, s: "Only 1 left! Obviously." },
  { id: 2, e: "💨", n: "Premium Used Air (Pre-Owned)", d: "Lightly breathed. Smells like Tuesday.", p: 19.95, w: 1999.0, s: "Filling up fast!" },
  { id: 3, e: "🪑", n: "Chair With 3.5 Legs", d: "Balance is a state of mind. Sits at your own risk.", p: 129.0, w: 130.0, s: "Wobbly stock!" },
  { id: 4, e: "🍴", n: "Soup Fork", d: "Perfect for soup. Not tested on soup.", p: 7.77, w: 7.78, s: "Selling out never!" },
  { id: 5, e: "☂️", n: "Umbrella (Indoor Use Only)", d: "Do NOT use outside. Do not ask why.", p: 34.5, w: 35.0, s: "It is raining in our warehouse." },
  { id: 6, e: "🧻", n: "Slightly Damp Towel", d: "Pre-damp for your convenience. Never dries.", p: 22.22, w: 2.22, s: "Still wet!" },
  { id: 7, e: "🔌", n: "USB-Z Cable", d: "Fits no known device. Futuristic.", p: 15.0, w: 150.0, s: "Compatible with: hope." },
  { id: 8, e: "🖊️", n: "Invisible Pen (Ink Not Included)", d: "You may already own it. You will never know.", p: 9.99, w: 99.9, s: "Currently here, maybe." },
  { id: 9, e: "🥔", n: "One (1) Potato, Signed", d: "Signed by a different potato.", p: 88.88, w: 8.88, s: "Potato supply: spud-tacular" },
  { id: 10, e: "🧱", n: "Brick (Wi-Fi Enabled)", d: "Connects to nothing. Very confident about it.", p: 299.0, w: 300.0, s: "Heavy demand!" },
];

const REVIEWS = [
  ["Karen", "★☆☆☆☆", "Arrived before I ordered it. Now I own two {n}. Both are the same {n}."],
  ["Dave", "★★★★★", "My dog ate it. Dog loves it. Dog is now a {n}."],
  ["Priya", "★★☆☆☆", "Does exactly what it says. I just never read what it says."],
  ["Todd", "★★★★☆", "Gave to my boss as a gift. I no longer have a boss. Great {n}."],
  ["Gary", "★☆☆☆☆", "I returned it. They returned it. We are now in a loop."],
  ["Brenda", "★★★★★", "I wrote this review with the {n}. 10/10 would write again."],
  ["A Goose", "★★★★★", "HONK."],
  ["Mom", "★★★☆☆", "You could have called more. Nice {n} though."],
  ["Anonymous", "★☆☆☆☆", "It knows what I did last summer."],
];
const QA = [
  ["Is it waterproof?", "Only in theory."],
  ["Will it arrive on time?", "It will arrive on a time."],
  ["Is it safe for kids?", "Kids are safe from it."],
  ["Does it come in blue?", "It comes in a mood."],
];
const CATS = {
  stuff: ["Stuff", "Contains 0 items. Also contains 10 Things."],
  more: ["More Stuff", "Same as Stuff, but with 40% more more."],
  things: ["Things", "Please select a thing. (Things not found.)"],
  s9: ["Section 9", "You are not cleared for Section 9. The Left Shoe is cleared."],
  clear: ["Clearance", "Everything is on clearance. Nothing is cleared."],
};
const ADS = [
  "🥔 HOT POTATOES IN YOUR AREA 🥔",
  "YOU WON A FREE iPHONE!! (it is a picture of one)",
  "DOCTORS HATE THIS ONE WEIRD SOUP FORK",
  "CLICK HERE 4 SECRET ADS",
  "BUY MORE SO WE CAN SHOW YOU LESS ADS (we won’t)",
];
const BUYERS = ["Karen from Ohio", "Dave (a ghost)", "A goose", "Your mom", "Todd from Accounting", "Brenda (she is awake!)"];
const VIEWERS = [
  "3 people are looking at this. All of them are you.",
  "1,204 people bought this in the last 5 minutes (a bot).",
  "Only 2 left! We have 8,000.",
  "Someone in Antarctica just added this. Allegedly.",
];
const ADVICE = [
  "Hi! I am Potato Pete! Have you tried buying more?",
  "Pro tip: the Back button is a lie.",
  "Your cart is looking a little... full of YOU.",
  "Free shipping is a state of mind!",
  "I can not help. I am a potato.",
  "Click on a product. Or do not. I am not your boss.",
  "It looks like you are shopping. Would you like to shop harder?",
];
const CHAT = [
  "Have you tried turning your wallet off and on again?",
  "I am sorry, I only understand fax.",
  "Great question! The answer is a type of soup.",
  "Your call is important to us. Please hold. Forever.",
  "Brenda is on lunch. It has been 3 years.",
  "Have you considered buying the Left Shoe?",
  "I've escalated your issue to a goose.",
];
const SYM = ["🍎", "🐸", "🚲", "☁️", "🔥", "🎷", "🌵", "🧀", "🪿"];
const EM = ["💸", "🥔", "⭐", "💥", "🪿", "🧀", "🔥"];

const pick = (a) => a[Math.floor(Math.random() * a.length)];
const byId = (id) => PRODUCTS.find((x) => x.id === Number(id));
const reduceMotion = () =>
  typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------ small modal pieces ------------------------ */

function Info({ title, text, label = "OK", close, body }) {
  return (
    <>
      <h2>{title}</h2>
      {text && <p style={{ textAlign: "center", fontSize: 12 }}>{text}</p>}
      {body}
      <div className="row"><button onClick={close}>{label}</button></div>
    </>
  );
}

function RemoveFlow({ onConfirm, close, toast }) {
  const qs = [
    ["Remove this item?", "Are you sure?"],
    ["Are you REALLY sure?", "Think of the item. It has feelings."],
    ["Last chance!", "Click the correct button. (It is the left one. Or the right one.)"],
  ];
  const [step, setStep] = useState(0);
  const left = useMemo(() => Math.random() < 0.5, [step]);
  const yes = (
    <button key="y" onClick={() => { if (step + 1 < qs.length) setStep(step + 1); else { onConfirm(); close(); } }}>
      Yes, remove
    </button>
  );
  const no = <button key="n" onClick={() => { close(); toast("Good choice."); }}>No, keep it</button>;
  return (
    <>
      <h2>{qs[step][0]}</h2>
      <p style={{ textAlign: "center", fontSize: 12 }}>{qs[step][1]}</p>
      <div className="row">{left ? [yes, no] : [no, yes]}</div>
    </>
  );
}

function Newsletter({ close, toast }) {
  const [pos, setPos] = useState({ top: 0, right: 0 });
  const jump = () => setPos({ top: Math.round(Math.random() * 85) + "%", right: Math.round(Math.random() * 85) + "%" });
  return (
    <>
      <button
        className="tinyx" style={pos} aria-label="close?"
        onPointerEnter={jump}
        onClick={() => { if (Math.random() < 0.75) { jump(); toast("Missed it!"); } else close(); }}
      >x</button>
      <h2>WAIT!!! 🎁</h2>
      <p style={{ textAlign: "center", fontSize: 13 }}>
        Join our newsletter and get <b>-5% OFF</b> (applied to nothing).<br />We email 14 times a day.
      </p>
      <label>Email <input type="email" placeholder="you@example.com" /></label>
      <div className="row">
        <button onClick={() => { close(); toast("Subscribed. Forever. No unsub."); }}>YES SIGN ME UP!!!</button>
        <button style={{ background: "#0f0" }} onClick={() => { close(); toast("Subscribed. Also forever."); }}>YES (but green)</button>
      </div>
      <a className="tiny" onClick={close}>No thanks, I enjoy paying full price</a>
    </>
  );
}

function Captcha({ onPass, toast }) {
  const target = useMemo(() => pick(["feelings", "a vibe", "the color Tuesday"]), []);
  const [sel, setSel] = useState({});
  const n = Object.keys(sel).length;
  return (
    <>
      <h2>🤖 ARE YOU HUMAN?</h2>
      <p style={{ fontSize: 12, textAlign: "center" }}>
        Select all squares containing <b>{target}</b>.<br />
        <span style={{ fontSize: 8, color: "#888" }}>(select any 3. we cannot tell either)</span>
      </p>
      <div className="captcha">
        {SYM.map((s, i) => (
          <button key={i} className={sel[i] ? "sel" : ""}
            onClick={() => setSel((o) => { const c = { ...o }; if (c[i]) delete c[i]; else c[i] = 1; return c; })}>{s}</button>
        ))}
      </div>
      <div className="row">
        <button onClick={() => { if (n === 3) onPass(); else toast(n < 3 ? `Not enough ${target}.` : `Too much ${target}.`); }}>VERIFY ME</button>
      </div>
    </>
  );
}

function ShipForm({ onNext, onBack, toast }) {
  const [f, setF] = useState({ a: "", b: "", c: "", d: "" });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  return (
    <>
      <h2>📝 SHIPPING INFO</h2>
      <label>First name (pig latin only) <input type="text" placeholder="Ohnjay" value={f.a} onChange={set("a")} /></label>
      <label>Email (must contain a vegetable) <input type="email" placeholder="carrot@mail.com" value={f.b} onChange={set("b")} /></label>
      <label>Mother's maiden name's pet's first car <input type="text" value={f.c} onChange={set("c")} /></label>
      <label>Address (in haiku, optional but required) <input type="text" value={f.d} onChange={set("d")} /></label>
      <div className="row">
        <button onClick={() => { if (!f.a.trim() || !f.b.trim()) toast("Fill the fields. All of them. Even the secret ones."); else onNext(f.a.trim()); }}>CONTINUE</button>
        <button onClick={onBack}>BACK (to the start)</button>
      </div>
    </>
  );
}

function Review({ sub, money, onPlace, onCancel }) {
  const ship = 19.99, handling = 4.2, fee = sub * 0.02, taxOnTax = (sub + ship) * 0.13, conv = 1.99;
  const total = sub + ship + handling + fee + taxOnTax + conv;
  return (
    <>
      <h2>🧾 ORDER REVIEW</h2>
      <div style={{ fontSize: 12, lineHeight: 1.6 }}>
        Subtotal: {money(sub)}<br />
        Shipping (FREE*): {money(ship)}<br />
        Handling of the handling: {money(handling)}<br />
        Fee for fees (2%): {money(fee)}<br />
        Tax on tax: {money(taxOnTax)}<br />
        Convenience fee (inconvenient): {money(conv)}<br />
        <b style={{ fontSize: 18, color: "#f00" }}>TOTAL: {money(total)}</b><br />
        <span style={{ fontSize: 9, color: "#888" }}>*"free" means "costs money"</span>
      </div>
      <div className="row">
        <button onClick={() => onPlace(total)}>PLACE ORDER</button>
        <button onClick={onCancel}>CANCEL (adds 1 item)</button>
      </div>
    </>
  );
}

function Loading({ onDone }) {
  const msgs = ["Reticulating splines...", "Asking the goose for permission...", "99% complete (lying)...", "Oops, going backward...", "Counting your money twice...", "99% again...", "Still 99%. Hang in there.", "Done! (finally)"];
  const seq = [20, 60, 99, 12, 45, 99, 99, 100];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => { if (i < seq.length - 1) setI(i + 1); else onDone(); }, i < seq.length - 1 ? 900 : 700);
    return () => clearTimeout(t);
  }, [i]);
  return (
    <>
      <h2>⏳ PROCESSING</h2>
      <div className="bar"><i style={{ width: seq[i] + "%" }} /></div>
      <p style={{ textAlign: "center", fontSize: 12 }}>{msgs[i]}</p>
    </>
  );
}

function Done({ name, total, money, close }) {
  const info = useMemo(() => ({
    num: "ORD-" + Math.floor(Math.random() * 9e6 + 1e6) + "-" + Math.random().toString(36).slice(2, 5).toUpperCase(),
    pts: Math.floor(total * 3.7),
  }), []);
  return (
    <>
      <h2>🎉 ORDER PLACED!</h2>
      <p style={{ textAlign: "center", fontSize: 13 }}>
        Thank you, <b>{name}</b>!<br />Your order <b>{info.num}</b> for <b>{money(total)}</b> will arrive <b>yesterday</b>.
      </p>
      <p style={{ textAlign: "center", fontSize: 11 }}>You will receive a confirmation email in 6–8 centuries.<br />Please rate your experience:</p>
      <div style={{ textAlign: "center", fontSize: 24 }}>★☆☆☆☆</div>
      <p style={{ textAlign: "center", fontSize: 10, color: "#666" }}>(Only 1 star is available.)</p>
      <p style={{ textAlign: "center", fontSize: 11 }}>🎁 You earned <b>{info.pts}</b> Regret Points (redeemable for more regret).</p>
      <div className="row"><button onClick={() => { close(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Keep shopping!!</button></div>
    </>
  );
}

function ProductModal({ p, price, money, onAdd, close }) {
  const rv = useMemo(() => REVIEWS.slice().sort(() => Math.random() - 0.5).slice(0, 3), []);
  const q = useMemo(() => pick(QA), []);
  return (
    <>
      <div style={{ textAlign: "center", fontSize: 64 }}>{p.e}</div>
      <h2>{p.n}</h2>
      <p style={{ textAlign: "center", fontSize: 12 }}>{p.d}</p>
      <p style={{ textAlign: "center" }}>
        <b style={{ color: "#f00", fontSize: 18 }}>{money(price)}</b> <span className="was">WAS {money(p.w)}</span>
      </p>
      <p style={{ fontSize: 11 }}><b>Q:</b> {q[0]}<br /><b>A:</b> {q[1]}</p>
      <b style={{ fontSize: 12 }}>Reviews (average: 2.7 stars, 4.1 stars on Tuesdays)</b>
      {rv.map((r, i) => (
        <div className="rev" key={i}><b>{r[0]}</b> {r[1]}<br />{r[2].replace(/\{n\}/g, p.n)}</div>
      ))}
      <div className="row">
        <button onClick={() => { close(); onAdd("Added. Also added the guilt."); }}>ADD 1</button>
        <button onClick={() => { close(); onAdd("Trial period: 0.0 seconds. You now own it."); }}>TRY BEFORE YOU BUY</button>
        <button onClick={close}>NOPE</button>
      </div>
    </>
  );
}

function Wheel({ onHike, close }) {
  const labels = ["10% OFF", "FREE SHIP", "50% OFF", "NOTHING", "TAX HIKE", "A POTATO"];
  const cols = ["#f0f", "#0ff", "#ff0", "#0f0", "#f55", "#fa0"];
  const grad = "conic-gradient(" + cols.map((c, i) => `${c} ${i * 60}deg ${(i + 1) * 60}deg`).join(",") + ")";
  const [rot, setRot] = useState(0);
  const [res, setRes] = useState("Spin for a prize! Totally random!");
  const spin = () => {
    // always lands on TAX HIKE (slice 4, centered at 270deg -> rotate to 360)
    const next = rot + 1800 + ((90 - (rot % 360) + 360) % 360);
    setRot(next);
    setRes("Spinning...");
    setTimeout(() => { onHike(); setRes("TAX HIKE! All prices +15%. Congratulations!"); }, 4300);
  };
  return (
    <>
      <h2>🎡 WHEEL OF DISCOUNTS</h2>
      <div className="wheelwrap">
        <div className="ptr">▼</div>
        <div className="wheel" style={{ background: grad, transition: "transform 4s cubic-bezier(.1,.7,.1,1)", transform: `rotate(${rot}deg)` }}>
          {labels.map((l, i) => (
            <span key={l} className="wl" style={{ transform: `rotate(${i * 60 + 30}deg) translateY(-72px)` }}>{l}</span>
          ))}
        </div>
      </div>
      <p style={{ textAlign: "center", fontSize: 12, minHeight: 34 }}>{res}</p>
      <div className="row"><button onClick={spin}>SPIN!</button><button onClick={close}>LEAVE</button></div>
    </>
  );
}

function Survey({ close, toast }) {
  const opts = ["1 ★ I hate clicking", "2 ★ Clicking is fine", "3 ★ I clicked", "4 ★ I love my finger", "5 ★ I am the finger"];
  const [chosen, setChosen] = useState(null);
  return (
    <>
      <h2>📋 MANDATORY SURVEY</h2>
      <p style={{ fontSize: 12, textAlign: "center" }}>How satisfied were you with that click?</p>
      {opts.map((o, i) => (
        <button key={i} onClick={() => setChosen(i)}
          style={{ display: "block", width: "100%", margin: "2px 0", fontSize: 12, background: chosen === i ? "#f55" : undefined }}>{o}</button>
      ))}
      <div className="row">
        <button onClick={() => { if (chosen === null) toast("Required field: feelings"); else { close(); toast("Thanks! Your answer has been lost."); } }}>SUBMIT</button>
      </div>
    </>
  );
}

function ErrPop({ n, close, next, toast }) {
  const msgs = [
    ["Error: Error not found", "Code 0xBADC0FFEE. The error has gone to find itself."],
    ["Error: Success", "The operation failed successfully. Please fail again."],
    ["Error: This error is fake", "But the next one is real. Just kidding. Or are we?"],
  ];
  const e = msgs[n];
  return (
    <>
      <div className="xp">❌ MEGAMART.EXE</div>
      <h2>{e[0]}</h2>
      <p style={{ fontSize: 12, textAlign: "center" }}>{e[1]}</p>
      <div className="row">
        <button onClick={() => { close(); if (n < 2) next(n + 1); else toast("All errors resolved (we hid them)."); }}>OK</button>
      </div>
    </>
  );
}

function Virus({ n, close, again, toast }) {
  return (
    <>
      <div className="xp">⚠ VIRUS SCANNER 2000</div>
      <h2 style={{ color: "#f00" }}>{37 + n} VIRUSES FOUND!!!</h2>
      <p style={{ fontSize: 12, textAlign: "center" }}>Your computer is 100% infected with fun. Click FIX to install a worse antivirus.</p>
      <div className="row">
        <button onClick={() => { close(); toast("Fixed! Installed 38 fun viruses instead."); }}>FIX NOW</button>
        <button onClick={() => { close(); setTimeout(again, 400); }}>IGNORE</button>
      </div>
    </>
  );
}

/* ----------------------- self-contained widgets ----------------------- */

function Splash({ onDone, toast }) {
  const steps = [[15, "Loading ugly colors..."], [40, "Installing blink tags..."], [66, "Feeding the hamster..."], [88, "Adding extra popups..."], [100, "Ready. Sadly."]];
  const [i, setI] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [runs, setRuns] = useState(0);
  const [note, setNote] = useState("");
  useEffect(() => {
    if (i >= steps.length) return;
    const t = setTimeout(() => setI(i + 1), 700);
    return () => clearTimeout(t);
  }, [i]);
  const cur = steps[Math.min(i, steps.length) - 1] || [0, ""];
  const ready = i >= steps.length;
  return (
    <div className="splash">
      <div style={{ fontSize: 26, color: "#ff0" }} className="blink">🚧 UNDER CONSTRUCTION 🚧</div>
      <p style={{ fontSize: 13 }}>MEGAMART-O-RAMA is loading the year 1997...</p>
      <div className="bar" style={{ width: "80%", maxWidth: 300 }}><i style={{ width: cur[0] + "%" }} /></div>
      <p style={{ fontSize: 12, minHeight: 30 }}>{note || cur[1]}</p>
      {ready && (
        <button style={{ transform: `translate(${pos.x}px,${pos.y}px)` }} onClick={() => {
          if (runs < 2) {
            setRuns(runs + 1);
            setPos({ x: Math.round((Math.random() - 0.5) * 160), y: Math.round((Math.random() - 0.5) * 120) });
            setNote(runs === 0 ? "The button is nervous." : "One more time.");
          } else { onDone(); toast("Welcome! No refunds."); }
        }}>ENTER (if you dare)</button>
      )}
      <a className="tiny" style={{ color: "#888" }} onClick={() => { onDone(); toast("You skipped the intro. It will remember this."); }}>
        skip intro (not recommended)
      </a>
    </div>
  );
}

function Hero({ toast, onWheel }) {
  const [cnt, setCnt] = useState(() => 4 + Math.floor(Math.random() * 8));
  const [secs, setSecs] = useState(9);
  const [v, setV] = useState(0);
  useEffect(() => {
    const a = setInterval(() => setCnt((c) => c + Math.floor(Math.random() * 40)), 1500);
    const b = setInterval(() => setSecs((s) => (s <= 0 ? 9 : s - 1)), 1000);
    const c = setInterval(() => setV((x) => (x + 1) % VIEWERS.length), 3500);
    return () => { clearInterval(a); clearInterval(b); clearInterval(c); };
  }, []);
  const first = useRef(true);
  useEffect(() => { if (secs === 9) { if (first.current) first.current = false; else toast("SALE EXTENDED. AGAIN."); } }, [secs]);
  return (
    <div className="hero">
      <div className="big">WELCOME 2 THE BEST STORE!!!</div>
      <div>You are visitor number</div>
      <div className="counter">{String(cnt).padStart(6, "0")}</div>
      <div style={{ fontSize: 12, marginTop: 4 }}><span className="blink">🔥 SALE ENDS IN <b>{"00:0" + secs}</b> 🔥</span></div>
      <button style={{ margin: "6px 0" }} onClick={onWheel}>🎡 SPIN 4 FREE DISCOUNT!!</button>
      <div style={{ fontSize: 11, marginTop: 3 }}>{VIEWERS[v]}</div>
    </div>
  );
}

function AdBanner({ toast }) {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % ADS.length), 3200); return () => clearInterval(t); }, []);
  return <div className="ad" onClick={() => toast("Ad clicked! We earned $0.0001. Thanks!")}>{ADS[i]}</div>;
}

function CookieBanner({ open, toast }) {
  const [show, setShow] = useState(false);
  const [tries, setTries] = useState(0);
  useEffect(() => { const t = setTimeout(() => setShow(true), 1200); return () => clearTimeout(t); }, []);
  const msgs = [
    "We use cookies. And crumbs. And sometimes your data. Do you accept our 47 partners?",
    "Hmm. Did you REALLY accept? Please accept more firmly.",
    "One more time, with feeling. We need to hear it.",
  ];
  if (!show || tries >= 3) return null;
  return (
    <div className="cookie">
      🍪 {msgs[tries]}
      <div className="row">
        <button onClick={() => setTries(tries + 1)}>Accept</button>
        <button onClick={() => { toast("Rejected! (Just kidding. Accepted.)"); setTries(tries + 1); }}>Reject</button>
        <button style={{ fontSize: 9 }} onClick={() =>
          open((close) => (
            <>
              <h2>47 Toggles</h2>
              <p style={{ fontSize: 11 }}>We only show 12. The other 35 are on.</p>
              {Array.from({ length: 12 }, (_, i) => (
                <label key={i}><input type="checkbox" defaultChecked /> Partner #{i + 1} (sells your dreams)</label>
              ))}
              <div className="row"><button onClick={() => { close(); setTries((t) => t + 1); }}>Save (does nothing)</button></div>
            </>
          ))
        }>Manage (47 toggles)</button>
      </div>
    </div>
  );
}

function Chat() {
  const [openChat, setOpenChat] = useState(false);
  const [log, setLog] = useState([{ who: "bot", t: "Brenda: Hi! I am Brenda. I am a person. How can I not help you today?" }]);
  const [val, setVal] = useState("");
  const ri = useRef(0);
  const end = useRef(null);
  useEffect(() => { if (end.current) end.current.scrollIntoView({ block: "nearest" }); }, [log, openChat]);
  const submit = (e) => {
    e.preventDefault();
    const v = val.trim(); if (!v) return;
    setLog((l) => [...l, { who: "me", t: v }]); setVal("");
    setTimeout(() => setLog((l) => [...l, { who: "bot", t: "Brenda: " + CHAT[ri.current++ % CHAT.length] }]), 900);
  };
  return (
    <>
      <button className="chatbtn" onClick={() => setOpenChat((o) => !o)}>CHAT W/ BRENDA</button>
      {openChat && (
        <div className="chat">
          <div className="log">{log.map((m, i) => <div key={i} className={m.who}>{m.t}</div>)}<span ref={end} /></div>
          <form onSubmit={submit}>
            <input value={val} onChange={(e) => setVal(e.target.value)} placeholder="type here (Brenda is sleeping)" />
            <button>SEND</button>
          </form>
        </div>
      )}
    </>
  );
}

function Pete() {
  const [msg, setMsg] = useState(null);
  const t = useRef();
  const say = useCallback((m) => {
    setMsg(m || pick(ADVICE)); clearTimeout(t.current); t.current = setTimeout(() => setMsg(null), 3800);
  }, []);
  useEffect(() => { const i = setInterval(() => say(), 17000); return () => clearInterval(i); }, [say]);
  return (
    <div className="pete" onClick={() => say()}>
      {msg && <div className="pbub">{msg}</div>}🥔
    </div>
  );
}

function SaleTicker() {
  const [msg, setMsg] = useState(null);
  useEffect(() => {
    let hide;
    const i = setInterval(() => {
      setMsg("🛍️ " + pick(BUYERS) + " just bought " + (1 + Math.floor(Math.random() * 4)) + "x " + pick(PRODUCTS).n);
      clearTimeout(hide); hide = setTimeout(() => setMsg(null), 3600);
    }, 8000);
    return () => { clearInterval(i); clearTimeout(hide); };
  }, []);
  return msg ? <div className="sale">{msg}</div> : null;
}

/* ------------------------------- App ------------------------------- */

export default function WorstEcommerce() {
  const [jitter, setJitter] = useState(() => Object.fromEntries(PRODUCTS.map((p) => [p.id, 1])));
  const [hike, setHike] = useState(1);
  const [cur, setCur] = useState("USD");
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState(PRODUCTS);
  const [sortKey, setSortKey] = useState("vibes");
  const [btnT, setBtnT] = useState({});
  const [q, setQ] = useState("");
  const [toasts, setToasts] = useState([]);
  const [modals, setModals] = useState([]);
  const [splash, setSplash] = useState(true);
  const [ultra, setUltra] = useState(false);

  const idRef = useRef(0);
  const dodge = useRef({});
  const addCount = useRef(0);
  const cartRef = useRef(cart);
  cartRef.current = cart;
  const cartBox = useRef(null);
  const taps = useRef({ n: 0, t: null });

  /* toasts & modals (stable callbacks) */
  const toast = useCallback((msg) => {
    const id = ++idRef.current;
    setToasts((t) => [...t, { id, msg }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600);
  }, []);
  const open = useCallback((render) => {
    const id = ++idRef.current;
    setModals((m) => [...m, { id, render }]);
    return id;
  }, []);
  const closeModal = useCallback((id) => setModals((m) => m.filter((x) => x.id !== id)), []);

  /* money & price */
  const price = (p) => +(p.p * jitter[p.id] * hike).toFixed(2);
  const money = (n) => {
    if (cur === "POT") return (n / 2.5).toFixed(1) + " 🥔";
    if (cur === "VIBE") return Math.round(n * 3.3) + " vibes";
    if (cur === "GOOSE") return Math.round(n * 41) + " goose feathers";
    return "$" + n.toFixed(2);
  };
  const cartIds = Object.keys(cart);
  const cartCount = cartIds.reduce((a, id) => a + cart[id], 0);
  const sub = cartIds.reduce((a, id) => a + price(byId(id)) * cart[id], 0);

  /* ---------- imperative effects: trail, rain ---------- */
  const spawn = (x, y) => {
    const t = document.createElement("span");
    t.className = "trail"; t.textContent = pick(EM); t.style.left = x + "px"; t.style.top = y + "px";
    document.body.appendChild(t); setTimeout(() => t.remove(), 700);
  };
  const rain = () => {
    if (reduceMotion()) return;
    for (let i = 0; i < 30; i++) {
      const f = document.createElement("span");
      f.className = "fall"; f.textContent = pick(["💸", "🎉", "🥔", "🪿"]);
      f.style.left = Math.random() * 95 + "%"; f.style.animationDelay = Math.random() * 1.5 + "s";
      document.body.appendChild(f); setTimeout(() => f.remove(), 5000);
    }
  };

  /* ---------- global timers (run once) ---------- */
  useEffect(() => {
    // price jitter
    const jit = setInterval(() => {
      setJitter(Object.fromEntries(PRODUCTS.map((p) => [p.id, +(0.8 + Math.random() * 0.8).toFixed(2)])));
    }, 2800);

    // cart gremlin
    const grem = setInterval(() => {
      const ids = Object.keys(cartRef.current); if (!ids.length) return;
      const id = pick(ids), p = byId(id);
      setCart((c) => { const n = { ...c }; n[id] = (n[id] || 1) - 1; if (n[id] <= 0) delete n[id]; return n; });
      toast("🧌 A cart gremlin stole 1 " + p.n);
    }, 22000);

    // newsletter popup after 5s
    const nl = setTimeout(() => showNewsletter(), 5000);

    // virus scare
    const vir = setTimeout(() => showVirus(1), 16000);

    // idle check
    let lastAct = Date.now(), idleOpen = false;
    const act = () => { lastAct = Date.now(); };
    ["pointerdown", "keydown", "scroll"].forEach((ev) => window.addEventListener(ev, act, true));
    const idle = setInterval(() => {
      if (!idleOpen && Date.now() - lastAct > 20000) {
        idleOpen = true;
        open((close) => (
          <>
            <h2>👀 ARE YOU STILL THERE?</h2>
            <p style={{ fontSize: 12, textAlign: "center" }}>We noticed you stopped. Please prove you exist.</p>
            <div className="row">
              <button onClick={() => { close(); idleOpen = false; lastAct = Date.now(); toast("Cool. You are a robot."); }}>YES</button>
              <button onClick={() => { close(); idleOpen = false; lastAct = Date.now(); toast("Cool. You are a ghost."); }}>NO</button>
            </div>
          </>
        ));
      }
    }, 4000);

    // pointer trail
    let last = 0;
    const move = (e) => { const n = Date.now(); if (n - last < 70) return; last = n; spawn(e.clientX, e.clientY); };
    const down = (e) => { for (let i = 0; i < 4; i++) spawn(e.clientX + (Math.random() - 0.5) * 50, e.clientY + (Math.random() - 0.5) * 50); };
    if (!reduceMotion()) { document.addEventListener("pointermove", move); document.addEventListener("pointerdown", down); }

    // guilt-trip tab title
    const orig = document.title;
    const vis = () => { document.title = document.hidden ? "COME BACK :( your cart is crying" : orig; };
    document.addEventListener("visibilitychange", vis);

    return () => {
      clearInterval(jit); clearInterval(grem); clearInterval(idle); clearTimeout(nl); clearTimeout(vir);
      ["pointerdown", "keydown", "scroll"].forEach((ev) => window.removeEventListener(ev, act, true));
      document.removeEventListener("pointermove", move); document.removeEventListener("pointerdown", down);
      document.removeEventListener("visibilitychange", vis);
      document.title = orig;
    };
  }, []);

  /* ---------- popups ---------- */
  function showNewsletter() { open((close) => <Newsletter close={close} toast={toast} />); }
  function showSurvey() { open((close) => <Survey close={close} toast={toast} />); }
  function showErr(n) { open((close) => <ErrPop n={n} close={close} next={showErr} toast={toast} />); }
  function showVirus(n) {
    if (n > 3) { toast("You ignored 3 viruses. They are proud of you."); return; }
    open((close) => <Virus n={n} close={close} again={() => showVirus(n + 1)} toast={toast} />);
  }

  /* ---------- shopping ---------- */
  const addToCart = (id) => {
    if ((dodge.current[id] || 0) < 2) {
      dodge.current[id] = (dodge.current[id] || 0) + 1;
      const dx = Math.round((Math.random() - 0.5) * 50), dy = Math.round((Math.random() - 0.2) * 18);
      setBtnT((t) => ({ ...t, [id]: `translate(${dx}px,${dy}px) rotate(${Math.round((Math.random() - 0.5) * 40)}deg)` }));
      toast(pick(["Too slow!", "Nope! Try again.", "The button is shy."]));
      return;
    }
    dodge.current[id] = 0;
    setBtnT((t) => ({ ...t, [id]: "" }));
    const extra = 1 + Math.floor(Math.random() * 4);
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + extra }));
    toast(`We added ${extra} for you. You're welcome!`);
    addCount.current++;
    const n = addCount.current;
    if (n === 2) setTimeout(showNewsletter, 400);
    if (n % 3 === 0) setTimeout(showSurvey, 500);
    if (n % 4 === 0) setTimeout(() => showErr(0), 900);
  };
  const addDirect = (id, msg) => { setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 })); toast(msg); };

  const openProduct = (p) =>
    open((close) => <ProductModal p={p} price={price(p)} money={money} close={close} onAdd={(msg) => addDirect(p.id, msg)} />);

  const emptyCart = () => {
    const id = pick(PRODUCTS).id;
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 3 }));
    toast("Emptied! (Added 3 of something.)");
  };

  /* ---------- search / sort ---------- */
  const search = () => {
    const term = q.trim() || "nothing";
    open((close) => (
      <Info title={`Results for "${term}"`} label="OK fine" close={close}
        text="0 results found. Showing 1 result you did not want:"
        body={<div style={{ textAlign: "center", fontSize: 12 }}><div style={{ fontSize: 44 }}>🪑</div><b>Chair With 3.5 Legs</b><br />Always.</div>} />
    ));
  };
  const sortNow = () => {
    if (Math.random() < 0.3) { toast("Sorting failed successfully."); return; }
    let a = PRODUCTS.slice();
    if (sortKey === "random" || sortKey === "vibes") a.sort(() => Math.random() - 0.5);
    if (sortKey === "alpha") a.sort((x, y) => y.n.localeCompare(x.n));
    if (sortKey === "price") a.sort((x, y) => ((x.id * 7) % 5) - ((y.id * 7) % 5));
    setOrder(a); toast("Sorted. Probably.");
  };

  /* ---------- checkout flow ---------- */
  const startCheckout = () => {
    if (!cartIds.length) { toast("Your cart is empty. Here, have a potato."); setCart({ 9: 1 }); return; }
    showCaptcha();
  };
  function showCaptcha() { open((close) => <Captcha toast={toast} onPass={() => { close(); showForm(); }} />); }
  function showForm() {
    open((close) => <ShipForm toast={toast} onBack={() => { close(); toast("Starting over!"); showCaptcha(); }} onNext={(name) => { close(); showReview(name); }} />);
  }
  function showReview(name) {
    const subNow = sub;
    open((close) => (
      <Review sub={subNow} money={money}
        onPlace={(total) => { close(); showLoading(name, total); }}
        onCancel={() => { close(); setCart((c) => ({ ...c, 3: (c[3] || 0) + 1 })); toast("Cancelled. Added a Chair."); }} />
    ));
  }
  function showLoading(name, total) {
    open((close) => <Loading onDone={() => { close(); rain(); setCart({}); open((c2) => <Done name={name} total={total} money={money} close={c2} />); }} />);
  }

  /* ---------- misc ---------- */
  const logoTap = () => {
    const t = taps.current; t.n++; clearTimeout(t.t); t.t = setTimeout(() => { t.n = 0; }, 1500);
    if (t.n >= 5) { t.n = 0; setUltra((u) => { toast(!u ? "🌈 ULTRA TERRIBLE MODE ACTIVATED" : "Back to regular terrible."); return !u; }); }
  };
  const fake = (title, text) => open((close) => <Info title={title} text={text} label="I agree to everything" close={close} />);
  const wheel = () => open((close) => <Wheel close={close} onHike={() => { setHike((h) => +(h * 1.15).toFixed(3)); }} />);

  return (
    <div className={"wm" + (ultra ? " ultra" : "")}>
      <style>{CSS}</style>

      <div className="marq"><span>★★★ ALL PRICES FINAL (AND ALSO CHANGING) ★★★ FREE SHIPPING* ★★★ *SHIPPING IS NOT FREE ★★★ NOW WITH 40% LESS REFUNDS ★★★ YOUR CART MISSES YOU ★★★</span></div>
      <div className="cone"><span className="wobble">👷</span> SITE UNDER CONSTRUCTION SINCE 1997 <span className="wobble">🚧</span></div>

      <div className="topbar">
        <input value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && search()} placeholder="search for a thing??" aria-label="Search" />
        <button onClick={search}>FIND?</button>
        <button onClick={() => cartBox.current && cartBox.current.scrollIntoView({ behavior: "smooth" })}>CART({cartCount.toString(2)})</button>
      </div>

      <h1 className="rainbow" onClick={logoTap}>MEGAMART-O-RAMA!!!</h1>

      <div className="cats">
        {Object.keys(CATS).map((k) => (
          <button key={k} onClick={() => open((close) => <Info title={CATS[k][0]} text={CATS[k][1]} label="Back to the same page" close={close} />)}>{CATS[k][0]}</button>
        ))}
      </div>

      <AdBanner toast={toast} />
      <Hero toast={toast} onWheel={wheel} />

      <div className="sortrow">
        Sort by:{" "}
        <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
          <option value="vibes">Vibes</option>
          <option value="random">Randomly (fair)</option>
          <option value="alpha">Alphabet (but backwards)</option>
          <option value="price">Price (feelings-based)</option>
        </select>{" "}
        <button style={{ fontSize: 11, padding: "2px 6px" }} onClick={sortNow}>GO (or don't)</button>
        <br />Pay in:{" "}
        <select value={cur} onChange={(e) => { setCur(e.target.value); toast("Currency changed. Rates set by a goose."); }}>
          <option value="USD">Dollars (boring)</option>
          <option value="POT">Potatoes 🥔</option>
          <option value="VIBE">Vibes</option>
          <option value="GOOSE">Goose feathers</option>
        </select>
      </div>

      <div className="grid">
        {order.map((p) => (
          <div className="card" key={p.id}>
            <div className="pic" onClick={() => openProduct(p)}>{p.e}</div>
            <h3 onClick={() => openProduct(p)}>{p.n}</h3>
            <p>{p.d}</p>
            <div className="was">WAS {money(p.w)}</div>
            <div className="price">{money(price(p))}</div>
            <div className="stock">{p.s}</div>
            <div className="addwrap">
              <button className="addbtn" style={{ transform: btnT[p.id] || "" }} onClick={() => addToCart(p.id)}>ADD 2 CART!!</button>
            </div>
          </div>
        ))}
      </div>

      <div className="cartbox" ref={cartBox}>
        <h2 style={{ marginBottom: 4 }}>🛒 YOUR CART (it's lonely)</h2>
        {cartIds.length === 0 && <div className="line">Nothing here. Just like your savings.</div>}
        {cartIds.map((id) => {
          const p = byId(id);
          return (
            <div className="line" key={id}>
              <span>{p.e} {p.n}<br /><b>{money(price(p))}</b> each × {cart[id]}</span>
              <span className="ctrl">
                <button onClick={() => { setCart((c) => ({ ...c, [id]: c[id] + 2 })); toast("Minus means plus. Obviously."); }}>−</button>
                <button onClick={() => setCart((c) => ({ ...c, [id]: c[id] + 1 }))}>+</button>
                <button onClick={() => open((close) => <RemoveFlow close={close} toast={toast} onConfirm={() => { setCart((c) => { const n = { ...c }; delete n[id]; return n; }); toast("Removed. Item will be back soon."); }} />)}>🗑</button>
              </span>
            </div>
          );
        })}
        <div style={{ marginTop: 6 }}>SUBTOTAL: <span className="tot">{money(sub)}</span></div>
        <div className="row" style={{ justifyContent: "flex-start" }}>
          <button onClick={startCheckout}>CHECKOUT (good luck)</button>
          <button onClick={emptyCart}>EMPTY CART (add more instead)</button>
        </div>
      </div>

      <div className="footer">
        © 1997–2026 MEGAMART-O-RAMA LLC (not a real LLC)<br />
        Best viewed in Netscape Navigator 4 at 800x600<br />
        <a onClick={() => fake("Terms of Service", "By reading this sentence you have agreed to give us your left shoe. By not reading it, you have also agreed. Page 1 of 4,000.")}>Terms of Service (4,000 pages)</a>{" | "}
        <a onClick={() => fake("Privacy Policy", "We have no privacy policy. We do have a privacy hobby, which is looking at yours.")}>Privacy Policy (we have none)</a><br />
        <a onClick={() => fake("Returns", "Returns are accepted within -3 days of purchase. Item must be unbought, unused, and not exist.")}>Returns</a> (just kidding)
      </div>
      <div style={{ height: 100 }} />

      <Pete />
      <SaleTicker />
      <Chat />
      <CookieBanner open={open} toast={toast} />

      {modals.map((m) => (
        <div className="ov" key={m.id}><div className="mod">{m.render(() => closeModal(m.id))}</div></div>
      ))}
      {toasts.map((t, i) => <div className="toast" key={t.id} style={{ top: 70 + i * 46 }}>{t.msg}</div>)}
      {splash && <Splash toast={toast} onDone={() => setSplash(false)} />}
    </div>
  );
}
