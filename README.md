# shaheermasood.github.io

My personal website hosted on GitHub Pages.

## Live Site

Visit: [https://shaheermasood.github.io](https://shaheermasood.github.io)

## Project Structure

```
├── index.html              # Main homepage
├── CNAME                   # Custom domain configuration
├── README.md               # This file
└── assets/
    ├── css/
    │   └── styles.css      # Website styling
    ├── images/             # Image files (logos, photos, project screenshots)
    ├── js/                 # JavaScript files
    └── docs/               # Downloadable documents (resume, PDFs, etc.)
```

### Where to put new files

| File type             | Location           | Example path                         |
|-----------------------|--------------------|--------------------------------------|
| Stylesheets           | `assets/css/`      | `assets/css/styles.css`              |
| Images / icons        | `assets/images/`   | `assets/images/profile.jpg`          |
| JavaScript            | `assets/js/`       | `assets/js/main.js`                  |
| Documents / downloads | `assets/docs/`     | `assets/docs/resume.pdf`             |

Reference files from `index.html` using relative paths from the root:

```html
<link rel="stylesheet" href="assets/css/styles.css">
<img src="assets/images/profile.jpg" alt="Profile photo">
<script src="assets/js/main.js"></script>
<a href="assets/docs/resume.pdf">Download Resume</a>
```

## Customization

1. Update the content in `index.html` with your own information
2. Replace placeholder project descriptions with your actual projects
3. Update contact links with your real email and social profiles
4. Modify colors in `assets/css/styles.css` by changing the CSS variables in `:root`

## Local Development

Open `index.html` in your browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve
```

## License

This project is open source and available under the MIT License.
