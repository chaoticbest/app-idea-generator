import React, { useState, useEffect } from "react";

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

// Mapping from display categories to API snake_case format
const CATEGORY_TO_API_MAP = {
  "Generative Visuals & Ambience": "generative-visuals-ambience",
  "Audio & Music": "audio-music",
  "Productivity & Time": "productivity-time",
  "Writing & Language": "writing-language",
  "Wellness & Mood": "wellness-mood",
  "Social & Playful": "social-playful",
  "Data and Vizualization": "data-and-vizualization",
  "Web Readers, Scrapers & Linkers": "web-readers-scrapers-linkers",
  "Games & Toys": "games-toys",
  "Developer and Creative Utiltiies": "developer-and-creative-utiltiies",
  "Retro Web": "retro-web",
  Printables: "printables",
  "Learning & Studying": "learning-studying",
  Accessibility: "accessibility",
  "Color, Type & Layout": "color-type-layout",
  "Camera & Visual Effects": "camera-visual-effects",
  Marketing: "marketing",
  "Personal Finance": "personal-finance",
  "Maps, Places & Journeys": "maps-places-journeys",
  Collaboration: "collaboration",
};

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
      // Check if API URL is available
      if (!process.env.REACT_APP_API_URL) {
        throw new Error(
          "API URL not found. Please set REACT_APP_API_URL in your environment variables."
        );
      }

      const apiUrl = process.env.REACT_APP_API_URL;

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
        const apiCategory = CATEGORY_TO_API_MAP[category];

        if (!apiCategory) {
          console.error(`No API mapping found for category: ${category}`);
          continue;
        }

        try {
          const fetchUrl = `${apiUrl}/generate?c=${encodeURIComponent(
            apiCategory
          )}`;

          const response = await fetch(fetchUrl);

          if (!response.ok) {
            throw new Error(
              `API request failed: ${response.status} ${response.statusText}`
            );
          }

          const ideaData = await response.json();

          if (ideaData && ideaData.name && ideaData.description) {
            generatedIdeas.push({
              category,
              name: ideaData.name,
              description: ideaData.description,
            });
          } else {
            throw new Error("Invalid response format from API");
          }
        } catch (apiError) {
          console.error(`Error generating idea for ${category}:`, apiError);
          // Fallback: create a simple idea if API call fails
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
