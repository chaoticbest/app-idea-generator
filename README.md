# App Idea Generator

A modern web application that generates creative app ideas using a backend API. Simply press a button to get three unique app ideas across different categories.

## Features

- **API-Powered Generation**: Uses a FastAPI backend to generate creative app ideas
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
2. **API Generation**: For each category, it calls the backend API to generate a single app idea
3. **Display**: The 3 generated ideas are displayed in beautiful cards side-by-side

## Setup

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Backend API server running

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

3. Create a `.env` file in the root directory and add your API URL:

```bash
REACT_APP_API_URL=http://localhost:5000
```

4. Start the development server:

```bash
npm start
```

The app will open in your browser at `http://localhost:3000`.

### Backend API Setup

This app requires the App Idea Generator API to be running. Please refer to the backend API documentation for setup instructions.

## Usage

1. Open the app in your browser
2. Click the "Generate App Ideas" button
3. Wait for the AI to generate ideas (usually takes 10-20 seconds)
4. View your three unique app ideas
5. Click the button again to generate new ideas

## Technologies Used

- **React**: Frontend framework
- **FastAPI Backend**: API-powered idea generation
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

### Modifying the API Integration

To change how the app interacts with the backend API, modify the `generateIdeas` function in `src/App.js`.

### Styling

The app uses CSS classes for styling. You can customize the appearance by modifying `src/index.css`.

## Troubleshooting

### API Connection Issues

- Make sure your `.env` file is in the root directory
- Ensure the environment variable is named `REACT_APP_API_URL`
- Verify that the backend API server is running
- Restart the development server after adding the API URL

### Network Issues

- Check your internet connection
- Verify that the backend API is accessible at the configured URL
- Check the browser console for any error messages

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to submit issues and enhancement requests!
