# 📱 Mobile Testing Checklist

## Portfolio Website - End-to-End Mobile Testing Guide

### How to Test on Mobile
1. **Browser DevTools Method** (Recommended)
   - Open http://localhost:5175/ in your browser
   - Press `F12` or `Cmd+Opt+I` (Mac) / `Ctrl+Shift+I` (Windows)
   - Click the device toggle button (or press `Cmd+Shift+M` / `Ctrl+Shift+M`)
   - Select device: iPhone 12 Pro, iPhone SE, Samsung Galaxy S20, etc.
   - Test in both portrait and landscape orientations

2. **Real Device Testing**
   - Get your local IP: Run `ifconfig | grep "inet " | grep -v 127.0.0.1` (Mac)
   - Update vite config to allow network access if needed
   - Open `http://YOUR_IP:5175/` on your phone

---

## ✅ Testing Checklist

### 🏠 Hero Section
- [ ] Profile image loads and is properly sized
- [ ] Name and title are readable and properly formatted
- [ ] Tagline text wraps correctly on small screens
- [ ] "View Projects" and "Download Resume" buttons are tappable (min 44x44px)
- [ ] Social icons (GitHub, LinkedIn, LeetCode, Email) are visible and tappable
- [ ] Social icons have proper hover/tap states with theme colors
- [ ] Gradient text effects are visible
- [ ] Animations trigger smoothly on scroll
- [ ] No horizontal scrolling

### 💼 Experience Section
- [ ] Timeline displays correctly on mobile
- [ ] Company logos/icons are properly sized
- [ ] Text is readable (no overlapping)
- [ ] Dates and locations are formatted correctly
- [ ] Cards stack vertically on small screens
- [ ] Expand/collapse functionality works (if implemented)
- [ ] Animations are smooth

### 🎓 Education Section
- [ ] Education cards are readable
- [ ] Degrees and institutions display clearly
- [ ] Dates are properly formatted
- [ ] Cards stack vertically on mobile
- [ ] Icons and badges are visible

### 🛠️ Skills Section
- [ ] Test tube skill bars display correctly
- [ ] Skill names are readable
- [ ] Progress animations trigger on scroll
- [ ] All skills are visible (no category filtering)
- [ ] Skills are properly spaced
- [ ] Grid layout adjusts to screen size
- [ ] No overflow issues

### 🚀 Projects Section
- [ ] Project cards display in single column on mobile
- [ ] Images load properly and are responsive
- [ ] Project titles and descriptions are readable
- [ ] Technology tags wrap correctly
- [ ] "View Project" and "GitHub" links are tappable
- [ ] All projects are visible (no filtering)
- [ ] Cards have proper spacing
- [ ] Hover effects work on tap

### 📝 Blogs Section
- [ ] Blog cards stack vertically on mobile
- [ ] Featured images load correctly
- [ ] Titles are readable and don't overflow
- [ ] Descriptions/excerpts wrap properly
- [ ] Read time and date are visible
- [ ] "Read More" links are tappable
- [ ] Platform badges (Medium, Dev.to) are visible

### 📬 Contact Section (Updated)
- [ ] **Social Links Row** (LinkedIn, GitHub, LeetCode)
  - [ ] 3 cards display in single column on mobile
  - [ ] Icons are large enough (28px) and tappable
  - [ ] Usernames are readable
  - [ ] Hover/tap effects show theme colors
  - [ ] Cards lift on hover (-5px translation)

- [ ] **Contact Info Row** (Email, Phone, Location)
  - [ ] 3 cards display in single column on mobile
  - [ ] Icons are properly sized and tappable
  - [ ] Email and phone are tappable links
  - [ ] Long email doesn't overflow (break-all applied)
  - [ ] Theme colors apply on hover/tap

- [ ] **Quote Card**
  - [ ] Quote text is readable and properly sized
  - [ ] Author attribution is visible
  - [ ] Gradient background displays correctly
  - [ ] Quote changes when theme switches
  - [ ] Card is centered and properly padded

- [ ] **Overall Contact Section**
  - [ ] All 6 cards + 1 quote card visible
  - [ ] Proper spacing between cards
  - [ ] No horizontal scrolling
  - [ ] Section is centered on all screen sizes
  - [ ] Animations trigger smoothly

### 🎨 Theme Switcher
- [ ] Theme switcher is accessible on mobile
- [ ] All 6 themes are visible in the menu
- [ ] Clicking a theme changes colors instantly
- [ ] Theme persists on page reload
- [ ] Icons update with theme color
- [ ] Gradients update with theme
- [ ] Quote changes when theme switches
- [ ] No layout shift when switching themes

### 🧭 Navigation
- [ ] Navbar is sticky and visible on scroll
- [ ] Hamburger menu works on mobile (if implemented)
- [ ] All nav links are tappable
- [ ] Smooth scrolling to sections works
- [ ] Active section is highlighted
- [ ] Theme switcher accessible in navbar
- [ ] Logo/initials are visible

### 🎯 General Mobile UX
- [ ] No horizontal scrolling anywhere
- [ ] All text is legible (min 14px font size)
- [ ] All buttons/links are tappable (min 44x44px tap target)
- [ ] Proper spacing between tappable elements
- [ ] Loading states are visible
- [ ] Smooth scroll behavior works
- [ ] Page loads quickly on mobile network
- [ ] No console errors in DevTools

### 📐 Responsive Breakpoints
Test at these widths:
- [ ] **320px** - iPhone SE (smallest)
- [ ] **375px** - iPhone 12 Mini
- [ ] **390px** - iPhone 12 Pro
- [ ] **414px** - iPhone 12 Pro Max
- [ ] **768px** - iPad portrait
- [ ] **1024px** - iPad landscape

### ⚡ Performance
- [ ] Page loads in under 3 seconds
- [ ] Images are optimized and lazy-loaded
- [ ] Animations are smooth (60fps)
- [ ] No janky scrolling
- [ ] Fonts load quickly
- [ ] No layout shifts (CLS)

### 🌗 Dark/Light Mode
- [ ] Both modes work on mobile
- [ ] Contrast is sufficient in both modes
- [ ] All text is readable
- [ ] Theme switcher works in both modes

---

## 🐛 Common Issues to Check

1. **Text Overflow**: Long emails, URLs, or text should wrap or truncate
2. **Image Sizing**: Images should be responsive and not distorted
3. **Touch Targets**: All interactive elements should be at least 44x44px
4. **Spacing**: Ensure proper padding and margins on small screens
5. **Z-Index Issues**: Ensure modals, dropdowns appear above content
6. **Fixed Elements**: Check navbar, back-to-top button positioning
7. **Form Validation**: Test any forms (if re-added later)
8. **External Links**: Ensure they open in new tabs

---

## 📱 Device-Specific Tests

### iPhone (iOS Safari)
- [ ] Tap highlights work correctly
- [ ] Smooth scrolling is enabled
- [ ] Safe area is respected (notch)
- [ ] No zoom on input focus

### Android (Chrome)
- [ ] Touch events work properly
- [ ] Material design ripple effects (if used)
- [ ] Back button behavior
- [ ] No zoom on input focus

---

## 🎉 Test Results

### Desktop ✅
- All sections load correctly
- Animations smooth
- Theme switching works
- No console errors

### Mobile (to be tested)
- [ ] iPhone SE (320px)
- [ ] iPhone 12 Pro (390px)
- [ ] Samsung Galaxy S20 (360px)
- [ ] iPad (768px)

---

## 📝 Notes
- Contact form has been removed as requested
- Contact section now shows 6 contact/social cards + 1 inspirational quote
- All icons use dynamic theme colors on hover
- Grid layout: 3 columns on desktop, 1 column on mobile
