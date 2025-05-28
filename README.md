# 🌊 Thulawa - Key-Aware Intra-Partition Parallelism extending Kafka Streams

## Overview

Thulawa is a cutting-edge research project that addresses critical limitations in existing stream processing frameworks, particularly Apache Kafka Streams. Our innovative solution introduces parallel event processing and fair scheduling within partitions, demonstrating substantial improvements in processing throughput through advanced design enhancements.

## 🌟 Features

* **Enhanced Parallelism**: Parallel execution of events within partitions for improved performance
* **Fair Scheduling**: Efficient asynchronous event processing while preserving key ordering
* **Kafka Streams Integration**: Extended library (Kafka-Thulawa) with practical applicability
* **Performance Validation**: Measured throughput improvements over existing stream processing models
* **Interactive Documentation**: Comprehensive research presentation with visual demonstrations

## 🌐 Website Features

The Thulawa research website includes:
* Responsive design optimized for all devices
* Interactive research objectives timeline
* Literature review with framework comparisons
* Downloadable research documents and papers
* Contact form for research inquiries and collaboration

## 📚 Research Sections

Our website presents comprehensive research documentation:
* Abstract and Research Objectives
* Literature Review and Current Landscape Analysis
* Key Research Findings and Contributions
* Interactive Methodology Demonstrations
* Downloadable Academic Papers and Documentation

## 👨‍💻 Team

| Name | Role | Email | Institution |
|------|------|-------|-------------|
| Janindu Pathirana | Group Leader | it21338052@my.sliit.lk | SLIIT |
| Teshan Jayakody | Group Member | it21345296@my.sliit.lk | SLIIT |
| Bihesha Dilshan | Group Member | it21343216@my.sliit.lk | SLIIT |
| Manula Gunatilleke | Group Member | it21321436@my.sliit.lk | SLIIT |

## 🔧 Technology Stack

This website is built with:
* **Frontend**: HTML5, CSS3, JavaScript (ES6+)
* **Styling**: Custom CSS with responsive design
* **Typography**: Google Fonts (Poppins)
* **Email Integration**: EmailJS for contact forms
* **Icons**: Custom SVG icons and Unicode symbols
* **Responsive Design**: Mobile-first approach

## 📂 Project Structure

```
thulawa-website/
├── css/                  # Stylesheets
│   ├── main.css         # Core styles and components
│   ├── docs.css         # Documentation page styles
│   └── responsive.css   # Mobile responsiveness
├── js/                  # JavaScript functionality
│   ├── main.js          # Core JavaScript features
│   └── env.js           # Environment configuration
├── pages/               # Website pages
│   ├── about.html       # About the research team
│   ├── contacts.html    # Contact form and information
│   ├── docs.html        # Research documents downloads
│   └── demo.html        # Interactive methodology demo
├── index.html           # Main homepage
├── .gitignore          # Git ignore file
└── README.md           # This file
```

## 🚀 Getting Started

### Prerequisites
* Web browser (Chrome, Firefox, Safari, Edge)
* Web server for local development (optional)

### Installation

```bash
# Clone the repository
git clone https://github.com/teshanj7/Thulawa-Website.git

# Navigate to the project directory
cd Thulawa-Website

# Serve locally (optional)
python -m http.server 8000
# or
npx serve .
# or
php -S localhost:8000
```

The website can be opened directly in a browser or served at `https://teshanj7.github.io/Thulawa-Website/index.html`

## 📧 Contact Form Setup

To enable the contact form functionality:

1. Sign up at [EmailJS.com](https://www.emailjs.com/)
2. Get your credentials (Public Key, Service ID, Template ID)
3. Update `js/env.js` with your EmailJS configuration:

```javascript
function setManualConfig() {
    window.ENV = {
        EMAILJS_PUBLIC_KEY: 'your_public_key_here',
        EMAILJS_SERVICE_ID: 'your_service_id_here',
        EMAILJS_TEMPLATE_ID: 'your_template_id_here'
    };
}
```

## 🎨 Customization

### Color Scheme
* **Primary**: #11998e (Teal)
* **Secondary**: #38ef7d (Light Green)
* **Text**: #333 (Dark Gray)
* **Background**: #f8f9fa (Light Gray)

### Typography
* **Font Family**: Poppins (Google Fonts)
* **Weights**: 300, 400, 500, 600, 700

## 📱 Responsive Design

The website is fully responsive with breakpoints:
* **Desktop**: 1200px+
* **Tablet**: 768px - 1199px  
* **Mobile**: 320px - 767px

* **Website**: [Live Demo](https://teshanj7.github.io/Thulawa-Website/)

---

© 2025 Thulawa Research Team. All Rights Reserved.

*This website showcases academic research in stream processing technology conducted at SLIIT. For detailed technical information about the Thulawa implementation, please refer to our research papers available in the documentation section.*
