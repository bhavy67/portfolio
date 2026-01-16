# Quick Reference: Update Personal Information

## 🎯 EDIT THIS ONE FILE TO UPDATE EVERYTHING:

```
/src/config/personal-info.json
```

---

## 📝 What to Update

### Essential (Required):
```json
{
  "personal": {
    "fullName": "Your Full Name",           ← Your name
    "initials": "YN",                       ← Your initials
    "title": "Your Job Title",              ← Your role
    "tagline": "Your tagline here"          ← Brief description
  },
  "contact": {
    "email": "your@email.com",              ← Your email
    "phone": "+1 (555) 123-4567"            ← Your phone
  },
  "social": {
    "github": {
      "username": "yourgithub",             ← GitHub username
      "url": "https://github.com/yourgithub" ← GitHub URL
    },
    "linkedin": {
      "username": "yourlinkedin",           ← LinkedIn username
      "url": "https://linkedin.com/in/yourlinkedin" ← LinkedIn URL
    }
  }
}
```

---

## ⚡ Quick Commands

### Check your configuration:
```bash
npm run validate-info
```

### View current settings:
```bash
npm run show-info
```

### Start development:
```bash
npm run dev
```

---

## 🎨 Updates These Automatically:

✅ Hero section (name, title, image)  
✅ Contact section (email, phone, LinkedIn)  
✅ All social links (GitHub, LinkedIn, etc.)  
✅ Navbar logo (your initials)  
✅ Resume download button  
✅ Browser tab title  
✅ SEO meta tags  
✅ Social media sharing cards  

---

## 💡 Remember:

**Edit 1 file** → **Updates entire portfolio** 🎉

---

Need help? Read: `/PERSONAL_INFO_GUIDE.md`
