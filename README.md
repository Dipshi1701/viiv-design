# Welcome to VIIV Design

This guide will help you get started with the VIIV Design project. It’s written for regular people, not experts. If you can open files and use a web browser, you’re in the right place.

---

## What is This?
VIIV Design is a simple front-end template using HTML, CSS, and JavaScript. You don’t need anything special to use it just open the files and go.

---

## Project Contents
Here’s how things are set up:

```
viiv-design/
├── assets/
│   ├── css/
│   │   └── styles.css        # Main styles
│   ├── img/                  # Images and icons
│   └── js/
│       └── viiv-search.js    # Search logic
├── index.html                # Main page
└── README.md                 # This guide
```

---

## Getting Started
1. Download the whole folder as a ZIP, or if you use git, run:
   `git clone https://github.com/Dipshi1701/viiv-design.git`
2. Open the `index.html` file in your browser. No servers or extra software needed.
3. To make changes, open any file in an editor like VS Code or Notepad, edit, save, and refresh your browser to see your changes.

---

## How the Search Features Work
This project includes several search features to help you find information quickly:

### Search and Gen AI
The search looks for answers in documents and product data. If you allow it, the AI assistant also tries to give a short, helpful summary above the regular results, and shows which sources it used. Your original question is sent to the AI service; nothing else personal is sent.

### Autocompleter (Search Suggestions)
As you type in the search box, you'll see a dropdown list of suggested results that match what you're typing. This helps you find what you need faster. The suggestions appear automatically and disappear when you:
- Press Enter to search
- Click the Search button
- Click outside the search box

### Refinement Tabs
After you search, you'll see tabs above the results (like "All", "full-letter", "infographic", "video", "congress-presentation"). These let you filter results by type, so if you only want to see videos or infographics, just click that tab. The "All" tab shows everything.

The code that handles search, AI, autocompleter, and tabs is in `assets/js/viiv-search.js`. Styling for these features is in `assets/css/styles.css`. You can change how they work or look by editing these files.

### Gen AI API Key and Domain Key (For Development)
To use or modify the Gen AI search features, you may need the following keys (found in the JS file):

- Domain Key: 
  
  `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJwcm9qZWN0IjoiY2xuX3ZpaXZfZ2VuX2FpX3YyXzkwNDFfc2VhcmNoX2VuIiwiZG9tYWluX2tleV9pZCI6IkJqN19qTTFFRVlwMTZEMm9EaUFlUHc6OiJ9.kCsSaC86c1zKthnP7y9f47yGVtQLQxp0o-zh5gEDHd0ed-ETqWNEhs1wVhsWqk3ZirwyztnZuxdxSMNViegKIw`

- API Key: 
  
  `BjmTFARIct6Ih8RUhfg2+9rPKRSK26kcnSa6KJuHl3s=`

These are required for running and developing the Gen AI features in development environment. Do not share them publicly outside the project team.

### Customizing Search Features

**Autocompleter Settings** (in `viiv-search.js`):
- `maxResults: 8` - How many suggestions to show (change the number to show more or fewer)
- `preload: true` - Whether suggestions are ready immediately or load when you start typing
- `showViewAllButton: false` - Set to `true` if you want a "View All" button at the bottom of suggestions

**Refinement Tabs Settings** (in `viiv-search.js`):
The tabs are set up in the code around line 478-505. You can add or remove content types by editing the `tabs` array. For example:
```javascript
tabs: [
  { facetValue: "_all" },           // Shows everything
  { facetValue: "full-letter" },    // Full letters/documents
  { facetValue: "infographic" },    // Infographics
  { facetValue: "video" },          // Videos
  { facetValue: "congress-presentation" }, // Presentations
]
```

To add a new tab, just add a line like `{ facetValue: "your-content-type" }` to the list.

---

## For Beginners
- You can’t break anything permanently. If you make a mistake, you can always re-download the files.
- No installation or setup is needed - your browser does all the work.
- To see any change, just save your file and reload the browser window.
- Learning resources:
  - [HTML for Beginners](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML)
  - [CSS Basics](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps)
  - [JavaScript Basics](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps)

---

## Useful Links and Access Information

You can try the site at:
https://viivsearch.alphanumeric.ai/


When prompted for a username, enter:
alpha2025

When prompted for a folder password, enter:
Alpha#2025,,


If you want to check responses from Gen AI and help mark the wrong answers, go to this spreadsheet:
https://alphanumeric-my.sharepoint.com/:x:/p/djayaswal/EcyQnYUhIB5Hotthm-A7f68BNBZYKqHygL1uJ5NOoJ-Yyg?e=oAs6ZH&nav=MTVfezAwMDAwMDAwLTAwMDEtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMH0

The sheet has notes on what to look for and how to flag issues.

---









