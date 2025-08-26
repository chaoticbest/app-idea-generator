# App Idea Generator

A modern web application that generates creative app ideas using OpenAI's GPT API. Simply press a button to get three unique app ideas across different categories.

## Features

- **AI-Powered Generation**: Uses OpenAI's GPT-3.5-turbo to generate creative app ideas
- **Random Category Selection**: Automatically selects 3 random categories from 20 predefined options
- **Beautiful UI**: Modern, responsive design with smooth animations
- **Real-time Generation**: Watch as ideas are generated with a loading spinner

## Categories

The app includes 20 predefined categories:

- Generative Visuals & Ambience
- Audio & Music
- Productivity & Time
- Writing & Language
- Wellness & Mood
- Social & Playful
- Data and Visualization
- Web Readers, Scrapers & Linkers
- Games & Toys
- Developer and Creative Utilities
- Retro Web
- Printables
- Learning & Studying
- Accessibility
- Color, Type & Layout
- Camera & Visual Effects
- Marketing
- Personal Finance
- Maps, Places & Journeys
- Collaboration

## How It Works

1. **Category Selection**: The app randomly selects 3 categories from the predefined list
2. **AI Generation**: For each category, it calls the OpenAI API to generate 5 app ideas
3. **Random Selection**: From each set of 5 ideas, one is randomly selected
4. **Display**: The 3 final ideas are displayed in beautiful cards side-by-side

## Setup

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd app-idea-generator
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your OpenAI API key:

```bash
REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
```

4. Start the development server:

```bash
npm start
```

The app will open in your browser at `http://localhost:3000`.

### Getting an OpenAI API Key

1. Go to [OpenAI's website](https://openai.com/)
2. Sign up or log in to your account
3. Navigate to the API section
4. Create a new API key
5. Copy the key and add it to your `.env` file

## Usage

1. Open the app in your browser
2. Click the "Generate App Ideas" button
3. Wait for the AI to generate ideas (usually takes 10-20 seconds)
4. View your three unique app ideas
5. Click the button again to generate new ideas

## Technologies Used

- **React**: Frontend framework
- **OpenAI API**: AI-powered idea generation
- **CSS3**: Modern styling with gradients and animations
- **Create React App**: Development environment

## Project Structure

```
app-idea-generator/
├── public/
│   └── index.html
├── src/
│   ├── App.js          # Main application component
│   ├── index.js        # React entry point
│   └── index.css       # Global styles
├── package.json
└── README.md
```

## Customization

### Adding New Categories

To add new categories, edit the `CATEGORIES` array in `src/App.js`:

```javascript
const CATEGORIES = [
  // ... existing categories
  "Your New Category",
];
```

### Modifying the AI Prompt

To change how the AI generates ideas, modify the `prompt` variable in the `generateIdeas` function in `src/App.js`.

### Styling

The app uses CSS classes for styling. You can customize the appearance by modifying `src/index.css`.

## Troubleshooting

### API Key Issues

- Make sure your `.env` file is in the root directory
- Ensure the environment variable is named `REACT_APP_OPENAI_API_KEY`
- Restart the development server after adding the API key

### Network Issues

- Check your internet connection
- Verify that your OpenAI API key is valid and has sufficient credits
- Check the browser console for any error messages

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to submit issues and enhancement requests!
