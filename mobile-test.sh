#!/bin/bash

# Mobile Testing Helper Script
# This script helps you test the portfolio on different devices

echo "🚀 Portfolio Mobile Testing Helper"
echo "=================================="
echo ""
echo "📱 Development server should be running on http://localhost:5175/"
echo ""
echo "🔍 Testing Methods:"
echo ""
echo "1️⃣  Browser DevTools (Recommended)"
echo "   • Open: http://localhost:5175/"
echo "   • Press F12 (Windows) or Cmd+Opt+I (Mac)"
echo "   • Click device toggle or press Cmd+Shift+M (Mac) / Ctrl+Shift+M (Windows)"
echo "   • Select device from dropdown"
echo ""
echo "2️⃣  Test on Real Device"
echo "   • Get your local IP address:"

# Get local IP address
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    LOCAL_IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -n 1)
else
    # Linux
    LOCAL_IP=$(hostname -I | awk '{print $1}')
fi

echo "   • Your local IP: $LOCAL_IP"
echo "   • Open this URL on your phone: http://$LOCAL_IP:5175/"
echo ""
echo "3️⃣  Chrome DevTools Device Emulation"
echo "   • Right-click page → Inspect"
echo "   • Click 'Toggle device toolbar' icon"
echo "   • Test these devices:"
echo "     - iPhone SE (320px) - Smallest"
echo "     - iPhone 12 Pro (390px)"
echo "     - Samsung Galaxy S20 (360px)"
echo "     - iPad (768px)"
echo ""
echo "📋 Complete testing checklist: MOBILE_TESTING_CHECKLIST.md"
echo "📄 Contact section updates: CONTACT_SECTION_UPDATE.md"
echo ""
echo "✨ What to Test:"
echo "   ✅ Contact section: 6 cards + 1 quote"
echo "   ✅ Social icons with theme colors"
echo "   ✅ Responsive grid layout"
echo "   ✅ Theme switcher on mobile"
echo "   ✅ All sections on mobile"
echo "   ✅ No horizontal scrolling"
echo ""
echo "🎨 Test All 6 Themes:"
echo "   1. Purple Dream 🌸"
echo "   2. Ocean Blue 🌊"
echo "   3. Forest Green 🌿"
echo "   4. Purple Night 🌙"
echo "   5. Deep Ocean 🌌"
echo "   6. Sunset Glow 🌅"
echo ""
echo "Happy Testing! 🎉"
