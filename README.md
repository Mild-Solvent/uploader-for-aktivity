# AKTIVITY DW Uploader

A web-based form for generating ZIP files compatible with the [aktivity-dw-mapy](https://github.com/rabbithole/aktivity-dw-mapy) project structure.

## 🌐 Live Demo

The website is deployed on GitHub Pages and can be accessed at:
`https://[your-username].github.io/uploader-for-aktivity/`

## 📋 Features

- **Pure HTML/CSS/JavaScript** with Vue.js for reactivity
- **File Upload Support** for maps, profiles, GPX files, and images
- **Automatic ZIP Generation** using JSZip library
- **Slovak Language Interface** matching the target project
- **Responsive Design** optimized for mobile and desktop
- **GitHub Pages Ready** - no build process required

## 🚀 Deployment to GitHub Pages

1. **Create a new repository** on GitHub named `uploader-for-aktivity`

2. **Push the files** to your repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: AKTIVITY DW uploader"
   git branch -M main
   git remote add origin https://github.com/[your-username]/uploader-for-aktivity.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

4. **Access your site** at: `https://[your-username].github.io/uploader-for-aktivity/`

## 📁 Generated ZIP Structure

The generated ZIP file contains all necessary files for the aktivity-dw-mapy project:

```
[track-name].zip
├── track-info.json     # Track metadata and configuration
├── preview.png         # Map preview image
├── profil.png          # Elevation profile image
├── track.gpx          # GPS track data
├── img1.jpg           # Additional track images (optional)
├── img2.jpg           # Additional track images (optional)
└── ...                # More images as needed
```

## 🎯 Form Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **Názov** | Text | ✅ | Track name (used for ZIP filename) |
| **Kategória** | Dropdown | ✅ | Activity type (cycling, hiking, running, skiing) |
| **Mapa PNG** | File | ✅ | Map preview image |
| **Profil PNG** | File | ✅ | Elevation profile image |
| **Obtiažnosť** | Dropdown | ✅ | Difficulty level |
| **Prevýšenie** | Number | ✅ | Elevation gain in meters |
| **Vzdialenosť** | Number | ✅ | Distance in kilometers |
| **Lokalita** | Text | ✅ | Location/region |
| **Trvanie** | Text | ✅ | Duration (e.g., "1h 30m") |
| **Popis** | Textarea | ✅ | Track description |
| **URL mapy** | URL | ❌ | External map link (e.g., mapy.cz) |
| **GPX súbor** | File | ✅ | GPS track file |
| **Obrázky z trasy** | Files | ❌ | Multiple track images |

## 🔧 Technical Details

### Dependencies
- **Vue.js 3** - Reactive framework for form handling
- **JSZip** - Client-side ZIP file generation
- **Pure CSS** - No CSS frameworks, custom styling

### Browser Support
- Modern browsers with ES6+ support
- File API support for file uploads
- Blob API support for ZIP downloads

### File Processing
- Automatic Slovak character normalization for filenames
- JSON generation matching aktivity-dw-mapy schema
- Binary file handling for images and GPX files

## 🎨 Customization

The website uses CSS custom properties and can be easily customized:

- **Colors**: Modify the gradient in `styles.css`
- **Form Fields**: Add/remove fields in `index.html` and `script.js`
- **Languages**: Translate strings in HTML and JavaScript files
- **Styling**: Update CSS classes and animations

## 📱 Mobile Responsive

The interface is fully responsive and optimized for:
- ✅ Desktop computers
- ✅ Tablets
- ✅ Mobile phones
- ✅ Touch interfaces

## 🐛 Error Handling

The application includes comprehensive error handling for:
- Missing required files
- Invalid file formats
- ZIP generation failures
- Form validation errors

## 📄 License

This project is open source and available under the MIT License.

---

**Ready to deploy!** Just push to GitHub and enable Pages. No build process required! 🚀
