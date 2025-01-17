# Python Minifier - Glad432

## Overview

Python Minifier is a web tool that demonstrates how various technologies collaborate for code minification, execution, and downloading. This project incorporates Python, HTML, CSS, and JavaScript, along with modern frameworks and libraries.

![Lines of code](https://sloc.xyz/github/glad432/glad432.github.io)

![Python Minifier - Glad432](/public/img/screenshots/image.png)

## Technologies Used

### Main Technologies
- HTML5
- CSS3
- JavaScript
- Python

### Frameworks and Libraries
- [Tailwind CSS](https://tailwindcss.com/) - For easy CSS styling
- [Vitejs](https://vitejs.dev/) - For modern front-end development
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - For code editing
- [Font Awesome](https://fontawesome.com/) - For icons
- [JSZip](https://stuk.github.io/jszip/) - To compress files in the browser
- [Autoprefixer](https://github.com/postcss/autoprefixer) - For automatically adding vendor prefixes  
- [PostCSS](https://postcss.org/) - For transforming CSS with plugins  
- [Sass](https://sass-lang.com/) - For CSS pre-processing  
- [Terser](https://terser.org/) - For JavaScript mangler and compressor  
- [Typewriterjs](https://github.com/tameemsafi/typewriterjs/) - For typing effects
- [ApexCharts](https://apexcharts.com/) - For interactive charts
- [SweetAlert2](https://sweetalert2.github.io/) - For nice popup boxes
- [Concurrently](https://github.com/open-cli-tools/concurrently) - For running multiple commands concurrently
- [Replace-in-file](https://www.npmjs.com/package/replace-in-file) - For replacing text in files easily
- [Flask](https://flask.palletsprojects.com/) - A lightweight WSGI web application framework
- [Flask-CORS](https://pypi.org/project/Flask-Cors/) - For enabling CORS in Flask
- [Python Minifier](https://pypi.org/project/python-minifier/) - For minifying Python code
- [Subprocess](https://docs.python.org/3/library/subprocess.html) - For managing processes
- [Re](https://docs.python.org/3/library/re.html) - For working with regular expressions in Python
- [Typing](https://docs.python.org/3/library/typing.html) - Provides type hints and static type checking

### APIs and Services
- [Python Minify](python/python-minifier/) - To make Python code smaller
- [Python Compiler](python/python-compiler/) - To run Python code

# Key Benefits of Python Minification

1. **Reduced File Size**: Smaller files lead to improved performance and faster load times.
2. **Bandwidth Optimization**: Minified code requires less bandwidth, enhancing overall efficiency.
3. **Code Protection**: Minification makes the code harder to read, providing a basic level of intellectual property protection.
4. **Improved Performance**: Faster loading times lead to quicker execution of models and algorithms.
5. **Faster Load Times**: Enhances user experience by ensuring applications load swiftly.
6. **Reduced Resource Consumption**: Lowers CPU and GPU utilization, freeing resources for intensive tasks.
7. **Enhanced Caching**: Improves caching efficiency for frequently updated data.
8. **Improved Mobile Performance**: Ensures smooth operation on resource-constrained mobile devices.
9. **Streamlined Deployment**: Simplifies deployment of applications with continuous learning.
10. **Faster Compilation Times**: Accelerates development cycles for quick experimentation.
11. **Better Integration with Microservices**: Facilitates smoother integration in microservices architectures.
12. **Optimized Data Pipeline Performance**: Enhances speed in data processing pipelines.
13. **Enhanced Scalability**: Allows applications to scale better under high loads.
14. **Reduced Latency in Distributed Systems**: Decreases response time in distributed AI systems.
15. **Improved Energy Efficiency**: Lowers energy consumption in data centers handling AI workloads.

## How to Set Up and Use

To set up and run Python Minifier:

### What You Need

- [Node.js](https://nodejs.org/) (version 20.0 or newer)
- npm (usually comes with Node.js)
- [Git](https://git-scm.com/) (version control system)
- [Python](https://www.python.org/) (version 3.11 or newer)
- [Pip](https://pip.pypa.io/en/stable/) Python package installer

### Installation

1. Clone the repository:
```
git clone https://github.com/glad432/glad432.github.io.git
cd glad432.github.io
```

2. Install dependencies:
```
npm install
```

3. Remember to update the base URL in the [vite.config.js](vite.config.js) and the API URLs in [script.js](js/script.js) from the next step.

### Replace URLs

The `replace-urls` command updates specific URLs in your project files for local development. It uses the `replace-in-file` utility to make the following replacements:

1. **In `./js/script.js`:**
   - Replace `https://python-compile.vercel.app` with `http://127.0.0.1:5000`
   - Replace `https://python-minify.vercel.app` with `http://127.0.0.1:5001`

2. **In `./vite.config.js`:**
   - Replace `https://glad432.github.io/` with `/`

Run the command with:

```bash
npm run replace-urls
```

### Pip Install

The `pip-install` command installs required Python packages from two `requirements.txt` files:

```bash
npm run pip-install
```

### For Development

To start working on the project:

```
npm run start-dev
```

This starts the development server. Open your web browser and go to `http://localhost:5173` (or the address shown in your terminal) to see the app.

### Building for Release

To make the project ready for release:

```
npm run build
```

This creates optimized files in the `dist` folder.

### Looking at the Release Version

To see how the release version looks:

```
npm run start-preview
```

## License

You can use this under the MIT License. See [LICENSE](LICENSE) for more details.

Thanks for checking out Python Minifier - Glad432. We'd love to hear what you think and welcome any help to make it better!