# JSON Data Visualizer

A modern, interactive JSON parser that transforms complex JSON data into readable, structured HTML with proper headings, subheadings, and collapsible sections.

## Features

- **Smart Parsing**: Automatically converts JSON into hierarchical HTML structure
- **Collapsible Sections**: Navigate large JSON files easily with expandable/collapsible sections
- **Type-Aware Rendering**: Different visual styles for strings, numbers, booleans, arrays, and objects
- **Semantic Headings**: Proper H2-H6 heading hierarchy based on nesting level
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Sample Data**: Load the included `complete-results.json` with one click
- **Error Handling**: Clear error messages for invalid JSON

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
app/
├── components/
│   ├── JsonParser.tsx       # Main parser component with input/output UI
│   ├── JsonRenderer.tsx     # Recursive JSON renderer with type handling
│   └── json-renderer.css    # Styling for JSON visualization
├── utils/
│   └── jsonHelpers.ts       # Utility functions for JSON operations
├── page.tsx                 # Main page
├── layout.tsx              # Root layout
└── globals.css             # Global styles

public/
└── complete-results.json   # Sample JSON data
```

## How It Works

1. **Input**: Paste JSON data or load the sample file
2. **Parse**: Click "Parse & Visualize" to process the JSON
3. **Navigate**: Use collapsible sections to explore nested data
4. **Read**: View formatted data with proper headings and structure

## Component Architecture

### JsonParser
- Handles user input and JSON validation
- Manages state for parsed data and errors
- Provides UI for loading sample data

### JsonRenderer
- Recursively renders JSON structure
- Creates semantic HTML with proper heading levels
- Handles different data types (objects, arrays, primitives)
- Implements collapsible sections for better navigation

### Utilities
- JSON validation helpers
- Type detection functions
- String formatting utilities

## Styling

The app uses a modular CSS approach with:
- Custom properties for consistent theming
- Responsive design patterns
- Type-specific color coding
- Smooth transitions and interactions

## Technologies

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Biome** - Fast linting and formatting
