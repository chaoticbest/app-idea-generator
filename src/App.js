import React, { useState, useEffect } from "react";
import OpenAI from "openai";

const CATEGORIES = [
  "Generative Visuals & Ambience",
  "Audio & Music",
  "Productivity & Time",
  "Writing & Language",
  "Wellness & Mood",
  "Social & Playful",
  "Data and Vizualization",
  "Web Readers, Scrapers & Linkers",
  "Games & Toys",
  "Developer and Creative Utiltiies",
  "Retro Web",
  "Printables",
  "Learning & Studying",
  "Accessibility",
  "Color, Type & Layout",
  "Camera & Visual Effects",
  "Marketing",
  "Personal Finance",
  "Maps, Places & Journeys",
  "Collaboration",
];

function App() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [savedIdeas, setSavedIdeas] = useState([]);

  // Load saved ideas from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem("savedAppIdeas");
    if (saved) {
      try {
        setSavedIdeas(JSON.parse(saved));
      } catch (error) {
        console.error("Error parsing saved ideas:", error);
        setSavedIdeas([]);
      }
    }
  }, []);

  // Save ideas to localStorage whenever savedIdeas changes
  useEffect(() => {
    localStorage.setItem("savedAppIdeas", JSON.stringify(savedIdeas));
  }, [savedIdeas]);

  const saveIdea = (idea) => {
    const ideaWithTimestamp = {
      ...idea,
      savedAt: new Date().toISOString(),
      id: Date.now() + Math.random(), // Simple unique ID
    };
    setSavedIdeas((prev) => [ideaWithTimestamp, ...prev]);
  };

  const removeSavedIdea = (ideaId) => {
    setSavedIdeas((prev) => prev.filter((idea) => idea.id !== ideaId));
  };

  const isIdeaSaved = (idea) => {
    return savedIdeas.some(
      (savedIdea) =>
        savedIdea.name === idea.name &&
        savedIdea.description === idea.description &&
        savedIdea.category === idea.category
    );
  };

  const generateIdeas = async () => {
    setLoading(true);
    setError("");
    setIdeas([]);

    try {
      // Check if OpenAI API key is available
      if (!process.env.REACT_APP_OPENAI_API_KEY) {
        throw new Error(
          "OpenAI API key not found. Please set REACT_APP_OPENAI_API_KEY in your environment variables."
        );
      }

      const openai = new OpenAI({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      });

      // Select 3 random categories
      const selectedCategories = [];
      const categoriesCopy = [...CATEGORIES];

      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * categoriesCopy.length);
        selectedCategories.push(categoriesCopy[randomIndex]);
        categoriesCopy.splice(randomIndex, 1);
      }

      const generatedIdeas = [];

      // Generate ideas for each category
      for (const category of selectedCategories) {
        const prompt = `Generate 5 creative app ideas for the category "${category}". 
        
        These app ideas are part of a "100 Vibe Apps in 100 Days" project, so they should be creative, entertaining, and engaging.
        They should also be relatively small, simple, and easy to build using AI code generation tools.

        Examples of good app ideas:

        # Generative visuals & ambient

        1. Lofi Window Daydreamer — animated window that mirrors local time/weather (cozy lo-fi)
        2. Vaporwave Sunset Generator — infinite palm-sky gradients as wallpapers (vaporwave)
        3. Procedural City Nightscape — parallax skyline with twinkling windows (noir)
        4. Fluid Marble Mixer — mouse-driven flow-field art; export PNG (psychedelic)
        5. Pixel Garden — click-to-grow flowers; shareable seeds (cottagecore)
        6. Constellation Name Maker — your name as a star map (astral)
        7. Noise-Texture Studio — generate paper/grain textures (printshop)
        8. Retro Screensaver Hub — WebGL remixes of classics (CRT)
        9. ASCII Quilt — turn images into text mosaics (brutalist/terminal)
        10. Neon Sign Composer — type → glowing tubes w/ flicker (downtown-neon)

        # Audio & music toys

        11. Rain & Train Loops — mix ambience; save presets (lofi café)
        12. Tiny Drum Machine — 16-step sequencer; upload a sample (bedroom-producer)
        13. Looper Postcard — record a 5s loop; shareable URL (audio postcard)
        14. Tone Palette — map colors to pitches; paint melodies (synesthesia)
        15. Field Note Sampler — key-triggered nature sounds (forest walk)
        16. Polyrhythm Playground — visualize overlapping rhythms (math-groove)
        17. Chord Moodboard — choose vibe → chord pads + MIDI export (cinematic)
        18. Binaural Beat Sketcher — quick binaural generator (sleep/focus)
        19. White-Noise Sculptor — EQ the noise and export WAV (studio)
        20. Melody Dice — Markov melodies with seed links (toybox)

        # Tiny productivity & time

        21. One-Thing Today — a single focus card, nothing else (monastic)
        22. Micro Pomodoro Pebbles — stack a pebble per pomodoro (zen garden)
        23. Time-Zone Handshake — find 30-min overlaps; share link (global team)
        24. Habit Rings — concentric streak rings; no account (minimal)
        25. Inbox → Haiku — paste text; get a 3-line summary (poetic)
        26. Meeting Mood Meter — pre/post quick poll heatmap (soft gradient)
        27. Sticky Grid — draggable color stickies with snap (studio wall)
        28. Scope Cutter — paste a task → returns the 1-day MVP (ruthless)
        29. Calendar Heat Sketch — paint your month energy map (pastel)
        30. Decision Coin+ — weighted coin w/ juicy physics (playful)

        # Writing & language play

        31. Vibe Tagline Spinner — brand tone + noun → 10 taglines (ad shop)
        32. Micro Zine Maker — auto-layout to printable PDF (photocopier punk)
        33. Dialog Duet — alternate-line screenwriting sandbox (theatre)
        34. Prompt Polisher — rewrite a prompt across tones (craft)
        35. Emoji Thesaurus — word → clustered emoji options (visual lexicon)
        36. Anti-Block Timer — disappearing-ink freewrite (pressure cooker)
        37. Poetry Meter Visualizer — scansion as bouncing dots (prosody)
        38. Limerick Workshop — template + rhyme hints (pub humor)
        39. Summarize & Spark — TL;DR + 3 follow-up Qs (editorial)
        40. Word Palette — pick 5 anchor words for a piece (palette)

        # Wellness & mood

        41. Box Breathing Canvas — animated counts w/ gentle sound (breathwork)
        42. Gratitude Glider — one card per day; garden grows (seedling)
        43. Micro Walk Bingo — printable/card view for daily walks (wander)
        44. Screen-Stretch Coach — 2-minute guided stretch (ASCII buddy)
        45. Mood Weather — correlate mood log with local weather (clouds)
        46. Sip Water Buddy — water tracker with a plant avatar (terrarium)
        47. Take-A-Break Nudge — full-screen time-out with bell (monk mode)
        48. Compliment Mirror — randomized affirmations; screenshot share (mirror)
        49. Wind-Down Script — build your night ritual steps (warm lamp)
        50. Gentle Alarm — browser alarm that fades in light/sound (sunrise)

        # Social & playful

        51. Vibe Check Polls — aesthetic polls with animated results (confetti)
        52. Photo Caption Derby — timed caption battles (party)
        53. Two Truths & One Bot — AI adds a bluff; guess who (icebreaker)
        54. Tiny Compliments Button — embeddable button to send a nice note (kind web)
        55. Complaints Box 2.0 — vent → reframed takeaway (therapeutic)
        56. Roast Me (Kindly) — opt-in gentle roast boundaries (comedy club)
        57. Birthday Confetti Link — a link that erupts on the day (surprise)
        58. Secret High-Five — enter the same code to reveal animation (co-op)
        59. Icebreaker Sparks — vibe-filtered prompts for calls (meeting opener)
        60. Shared Soundboard — room-based SFX for remote teams (radio booth)

        # Data, viz & knowledge

        61. CSV → Story — upload data → 5 narrative bullets (explain-viz)
        62. Day in Charts — type your day → tiny charts (journal viz)
        63. API Explorer Lite — paste URL → formatted JSON + curl (dev-friendly)
        64. Habit Correlator — pick two trackers; lag correlation (insight)
        65. Paper Snowball — annotate a PDF; comment cloud (peer review)
        66. Color Audit — extract site palette + contrast check (design QA)
        67. Word Frequency Garden — text → plant garden by frequency (poetic viz)
        68. Timeline Tapestry — craft timelines as woven threads (textile)
        69. Budget Bubbles — categories as floaty bubbles (finance toy)
        70. Compare Anything — pretty side-by-side diff for specs/text (referee)

        # Web readers, scrapers & linkers (lightweight / RSS-friendly)

        71. Quiet Newsroom — pick feeds; reading in calm UI (library)
        72. HN Topic Lens — keyword HN stream with vibe tags (amber CRT)
        73. Recipe Simplifier — paste link → ingredients-only printable (kitchen)
        74. Article Time-to-Read — bookmarklet-style estimator + save (focus)
        75. Link Moodboard — paste links → auto thumbnails collage (moodboard)
        76. Trail of Tabs — save a tab set with notes (researcher)
        77. Minimal Weather Window — simple city card + ambient (clean)
        78. Flight Friend — live status + “pick-me-up” ETA share (airport)
        79. Daily Statue — random public-domain art + 60-sec story (museum)
        80. Tiny Map Tracer — draw a path; export GPX/KML (cartography)

        # Games & toys

        81. Cozy Sokoban — mossy tiles, soft clicks (comfy puzzler)
        82. Infinite Crossword Minis — auto 5×5 daily (wordplay)
        83. Typing Zen — type to ripple a pond (calm typer)
        84. Ghost Chess — pieces fade unless hovered (haunted)
        85. Word Ladder Sprint — speed ladders with timer (classic)
        86. Pixel Forager — collect pixels to craft colors (gatherer)
        87. Nonogram Painter — puzzles that reveal art palettes (logic art)
        88. Emoji Dungeon — roguelite with emoji items (silly)
        89. One-Button Platformer — hold/release timing challenge (tiny game)
        90. Deck of Vibes — draw cards that change the page mood (cards)

        # Developer & creative helpers (micro-utilities)

        91. CSS Vibe Presets — generate theme tokens + Tailwind config (themer)
        92. Icon Riff — text → simple SVG icon set (glyph lab)
        93. Favicon Foundry — craft static/animated favicons (brand sprinkle)
        94. Mock Data Sketcher — schema → fake data + CSV (seed kit)
        95. Screenshot Stage — drop image → device frames (showcase)
        96. Copy Deck Diff — compare copy versions and highlight tone (editor)
        97. README Tone Linter — check for friendly/concise/technical (voice)
        98. Tiny Webhook Tester — catch hooks; inspect payloads (dev desk)
        99. Shareable Snippet Shelf — store and tag code gists (cabinet)
        100. Image Alt-Text Muse — suggest alt-text variants; copy-ready (accessibility)

        For each app idea, provide:
        - A short, descriptive name (2-5 words)
        - A brief description of what the app does (1 sentence)
        
        Format your response as a JSON array with objects containing "name" and "description" fields.
        
        Example format:
        [
          {
            "name": "App Name",
            "description": "Brief description of what the app does."
          }
        ]
        
        Make the ideas creative, practical, and relevant to the category.`;

        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.8,
          max_tokens: 500,
        });

        const response = completion.choices[0].message.content;

        try {
          const ideasArray = JSON.parse(response);
          if (Array.isArray(ideasArray) && ideasArray.length > 0) {
            // Select one random idea from the 5 generated
            const randomIdea =
              ideasArray[Math.floor(Math.random() * ideasArray.length)];
            generatedIdeas.push({
              category,
              name: randomIdea.name,
              description: randomIdea.description,
            });
          }
        } catch (parseError) {
          console.error("Failed to parse OpenAI response:", parseError);
          // Fallback: create a simple idea if parsing fails
          generatedIdeas.push({
            category,
            name: `${category} App`,
            description: `A creative application in the ${category} category.`,
          });
        }
      }

      setIdeas(generatedIdeas);
    } catch (err) {
      setError(err.message);
      console.error("Error generating ideas:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>App Idea Generator</h1>
        <p>Get inspired with creative app ideas generated by AI</p>
      </div>

      <button
        className="generate-button"
        onClick={generateIdeas}
        disabled={loading}
      >
        {loading ? "Generating Ideas..." : "Generate App Ideas"}
      </button>

      {error && <div className="error">{error}</div>}

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Creating amazing app ideas for you...</p>
        </div>
      )}

      {ideas.length > 0 && (
        <div className="ideas-container">
          {ideas.map((idea, index) => (
            <div key={index} className="idea-card">
              <div className="idea-header">
                <div className="category">{idea.category}</div>
                <button
                  className={`star-button ${
                    isIdeaSaved(idea) ? "starred" : ""
                  }`}
                  onClick={() => (isIdeaSaved(idea) ? null : saveIdea(idea))}
                  title={isIdeaSaved(idea) ? "Already saved" : "Save this idea"}
                >
                  {isIdeaSaved(idea) ? "★" : "☆"}
                </button>
              </div>
              <h2 className="app-name">{idea.name}</h2>
              <p className="description">{idea.description}</p>
            </div>
          ))}
        </div>
      )}

      {savedIdeas.length > 0 && (
        <div className="saved-ideas-section">
          <h2 className="saved-ideas-title">Saved App Ideas</h2>
          <div className="saved-ideas-list">
            {savedIdeas.map((idea) => (
              <div key={idea.id} className="saved-idea-item">
                <div className="saved-idea-content">
                  <div className="saved-idea-header">
                    <div className="saved-category">{idea.category}</div>
                    <button
                      className="star-button starred"
                      onClick={() => removeSavedIdea(idea.id)}
                      title="Remove from saved"
                    >
                      ★
                    </button>
                  </div>
                  <h3 className="saved-app-name">{idea.name}</h3>
                  <p className="saved-description">{idea.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
