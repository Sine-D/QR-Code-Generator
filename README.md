# 🎨 QR Studio Elite

A high-performance, premium QR code generation suite built with **React**, **Vite**, and **Tailwind CSS**. QR Studio Elite offers professional-grade customization, real-time preview, and high-quality vector exports.

![QR-Studio-Elite-Banner](https://images.unsplash.com/photo-1595079676339-1534802ad6cf?auto=format&fit=crop&q=80&w=1200&h=400)

## ✨ Key Features

- **🚀 Real-time Generation**: Instant QR code updates as you type or change options.
- **🎨 Elite Customization**:
  - Precision color control (Foreground & Background).
  - Adjustable error correction levels (L, M, Q, H).
  - Variable sizing for various use cases.
- **🖼️ Logo Integration**: Upload and center your brand logo within the QR code.
- **💾 Professional Exports**:
  - **PNG**: High-definition raster image for web and social media.
  - **SVG**: Clean vector format for print and professional design work.
- **✨ Premium UI**: 
  - Glassmorphic design with mesh gradients.
  - Smooth micro-animations powered by **Framer Motion**.
  - Interactive 3D tilt effects on the output preview.
- **🎭 Design Presets**: One-click professional color themes.

## 🛠️ Tech Stack

- **Framework**: [React 18](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **QR Core**: [qrcode.react](https://github.com/zpao/qrcode.react)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/QR-Code.git
   cd QR-Code
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 📂 Project Structure

```text
QR-Code/
├── src/
│   ├── components/       # UI Components (Header, InputBox, OutputBox, etc.)
│   ├── App.jsx           # Main Application Logic & State
│   ├── index.css         # Global Styles & Mesh Gradients
│   └── main.jsx          # Entry Point
├── public/               # Static Assets
└── package.json          # Dependencies & Scripts
```

## 🔐 Privacy

QR Studio Elite generates QR codes locally in your browser. No destination data or uploaded logos are sent to any external server.

## 📄 License

&copy; 2026 QR Studio Elite. Released under the MIT License.
