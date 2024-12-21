import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@fortawesome/fontawesome-free/css/all.min.css"
import '@fontsource/encode-sans-expanded';
import "react-image-gallery/styles/css/image-gallery.css";
import './index.css'
import App from './App.jsx'
import { register } from 'swiper/element/bundle';

register();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
