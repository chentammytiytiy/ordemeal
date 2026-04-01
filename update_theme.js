const fs = require('fs');
const path = require('path');

const files = [
    path.join(__dirname, 'order_meal_back_ui_tammy.html'),
    path.join(__dirname, 'order_meal_overview_tammy.html')
];

for (const file of files) {
    if (!fs.existsSync(file)) continue;
    let content = fs.readFileSync(file, 'utf8');

    // Remove dark theme of flatpickr
    content = content.replace(/<link rel="stylesheet" href=".\/cdn\.jsdelivr\.net\/npm\/flatpickr\/dist\/themes\/dark\.css">/g, '');
    content = content.replace(/<link rel="stylesheet" href="https:\/\/cdn\.jsdelivr\.net\/npm\/flatpickr\/dist\/themes\/dark\.css">/g, '');

    // CSS variables
    content = content.replace(/--bg-dark:\s*#0f172a;/g, '--bg-dark: #f0f4f8;');
    content = content.replace(/--card-bg:\s*rgba\(30,\s*41,\s*59,\s*0\.7\);/g, '--card-bg: rgba(255, 255, 255, 0.95);');
    content = content.replace(/--modal-bg:\s*rgba\(15,\s*23,\s*42,\s*0\.95\);/g, '--modal-bg: rgba(255, 255, 255, 0.98);');
    content = content.replace(/--text-main:\s*#f8fafc;/g, '--text-main: #1e293b;');
    content = content.replace(/--text-muted:\s*#94a3b8;/g, '--text-muted: #64748b;');
    content = content.replace(/--border:\s*rgba\(255,\s*255,\s*255,\s*0\.1\);/g, '--border: rgba(0, 0, 0, 0.08);');

    // Background gradients
    content = content.replace(/background-image:\s*radial-gradient\(circle at 15% 50%, rgba\(99, 102, 241, 0\.15\), transparent 25%\),\s*radial-gradient\(circle at 85% 30%, rgba\(16, 185, 129, 0\.15\), transparent 25%\);/g, 'background-image: none;');

    // Sidebar
    content = content.replace(/background:\s*rgba\(15,\s*23,\s*42,\s*0\.8\);/g, 'background: rgba(255, 255, 255, 0.85); box-shadow: 2px 0 10px rgba(0,0,0,0.02);');

    // menu-item hover
    content = content.replace(/background:\s*rgba\(255,\s*255,\s*255,\s*0\.05\);/g, 'background: rgba(0, 0, 0, 0.03);');

    // Search Box / form-control inputs
    content = content.replace(/background:\s*rgba\(0,\s*0,\s*0,\s*0\.2\);/g, 'background: rgba(255, 255, 255, 0.8);');

    // th background (Need to specifically replace th after the above change or before)
    // The previous change turns 0,0,0,0.2 into 255,255,255,0.8. Let's map it explicitly for th.
    content = content.replace(/th {\s*background:\s*rgba\(255,\s*255,\s*255,\s*0\.8\);/g, 'th {\n            background: rgba(0, 0, 0, 0.03);');

    // secondary button
    content = content.replace(/background:\s*rgba\(255,\s*255,\s*255,\s*0\.1\);/g, 'background: rgba(0, 0, 0, 0.05);');
    content = content.replace(/background:\s*rgba\(255,\s*255,\s*255,\s*0\.2\);/g, 'background: rgba(0, 0, 0, 0.08);');

    // tr hover
    content = content.replace(/background:\s*rgba\(255,\s*255,\s*255,\s*0\.03\);/g, 'background: rgba(0, 0, 0, 0.015);');

    // overview layout background
    content = content.replace(/background-image:\s*none;\s*radial-gradient/g, 'background-image: none;');

    // select option
    content = content.replace(/background-color:\s*var\(--bg-dark\);/g, 'background-color: #ffffff;');

    // modal overlay
    content = content.replace(/background:\s*rgba\(0,\s*0,\s*0,\s*0\.6\);/g, 'background: rgba(0, 0, 0, 0.3);');

    // inline styles
    content = content.replace(/background:\s*rgba\(0,0,0,0\.2\); color: white;/g, 'background: white;');
    content = content.replace(/background:\s*rgba\(255,255,255,0\.1\); color: white;/g, 'background: rgba(0,0,0,0.05);');
    content = content.replace(/color:\s*#fff;"\x3e儲存並新增下一筆/g, 'color: var(--primary);">儲存並預留在本頁');

    fs.writeFileSync(file, content, 'utf8');
}
console.log("Updated files to light theme successfully.");
