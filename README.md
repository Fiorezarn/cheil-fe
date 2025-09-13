# Submission Management System

A modern, responsive web application built with React and Vite for managing form submissions with image upload capabilities.

## 🌐 Live Demo

Visit the live application: [https://submission-cheil.vercel.app/](https://submission-cheil.vercel.app/)

## ✨ Features

- **📝 Form Submission**: Clean and intuitive form interface for collecting user data
- **📷 Image Upload**: Support for image file uploads with preview
- **📊 Data Management**: View and manage all submissions in a structured table
- **📱 Responsive Design**: Mobile-friendly interface that works on all devices
- **🔍 Search & Filter**: Built-in data table functionality for easy data navigation
- **📈 Statistics Dashboard**: Real-time statistics showing submission counts and trends
- **🎨 Modern UI**: Beautiful gradient designs and smooth animations
- **⚡ Fast Performance**: Optimized with Vite for lightning-fast development and builds

## 🛠️ Tech Stack

### Frontend

- **[React 18](https://reactjs.org/)** - Modern JavaScript library for building user interfaces
- **[Vite](https://vitejs.dev/)** - Next generation frontend tooling for blazing fast development
- **[JavaScript (ES6+)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)** - Modern JavaScript features

### Styling & UI

- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework for rapid UI development
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icon library
- **[React Toastify](https://fkhadra.github.io/react-toastify/)** - Elegant toast notifications

### Data & Components

- **[React Data Table Component](https://react-data-table-component.netlify.app/)** - Powerful data table with sorting, pagination, and filtering

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm**, **yarn**, or **pnpm**

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd submission-management-system
   ```

2. **Install dependencies**

   ```bash
   # Using npm
   npm install

   # Using yarn
   yarn install

   # Using pnpm
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   VITE_PREFIX=https
   VITE_BASE_URL=your-api-base-url.com
   ```

4. **Start the development server**

   ```bash
   # Using npm
   npm run dev

   # Using yarn
   yarn dev

   # Using pnpm
   pnpm dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173` to view the application.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   └── ImageModal.jsx  # Image preview modal component
├── pages/              # Main application pages
│   ├── MainPages.jsx   # Form submission page
│   └── ResponsePages.jsx # Data management page
├── service/            # API service layer
│   └── api/
│       └── submission.js # API calls for submissions
├── assets/             # Static assets (images, etc.)
└── App.jsx            # Main application component
```

## 🎯 Key Features Breakdown

### 1. Form Submission Page (`/`)

- **User-friendly form** with validation
- **Image upload** with file type restrictions
- **Real-time feedback** with toast notifications
- **Loading states** during submission
- **Automatic form reset** after successful submission

### 2. Data Management Page (`/response`)

- **Interactive data table** with sorting and pagination
- **Image preview** in modal popup
- **Statistics cards** showing submission metrics
- **Responsive design** for mobile and desktop
- **Error handling** with retry functionality

### 3. Image Management

- **Secure image upload** handling
- **Image preview** functionality
- **Optimized display** in data table
- **Modal viewing** for full-size images

## 🔧 Available Scripts

- **`npm run dev`** - Start development server
- **`npm run build`** - Build for production
- **`npm run preview`** - Preview production build
- **`npm run lint`** - Run ESLint for code quality

## 🎨 Styling & Theming

The application uses **Tailwind CSS** for styling with:

- **Responsive design patterns**
- **Gradient backgrounds** and modern aesthetics
- **Smooth animations** and transitions
- **Consistent color scheme**
- **Mobile-first approach**

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## 🚀 Deployment

The application is deployed on **Vercel** and can be accessed at:
[https://submission-cheil.vercel.app/](https://submission-cheil.vercel.app/)

### Deploy Your Own

1. **Fork this repository**
2. **Connect to Vercel**
3. **Set environment variables** in Vercel dashboard
4. **Deploy automatically** on push to main branch

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first approach
- **Lucide** for beautiful icons
- **Vercel** for seamless deployment

---

**Built with ❤️ using React + Vite**
