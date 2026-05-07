# Select Page Redesigned - Multi-Download Enabled

**Date**: 2026-04-22  
**Status**: ✅ COMPLETE

---

## What Changed

The select page has been completely redesigned to show all images nicely and allow downloading one or multiple designs on the same page.

---

## New Features

### ✅ All Images Displayed in Nice Grid
- Full-size images (no more small thumbnails)
- Clean, modern layout
- Responsive grid:
  - 1 image: Large centered display
  - 2 images: Side-by-side
  - 3 images: 3-column grid
  - 6 images: 2×3 grid

### ✅ Multi-Select Capability
- Click any image to select it
- Click again to deselect
- Selected images have black border + checkmark
- Can select 1 or all images

### ✅ Quick Actions
- **Select All** button - Select all designs at once
- **Clear** button - Deselect everything

### ✅ Download on Same Page
- No need to navigate away
- Download button shows count: "Download 3 designs"
- Downloads all selected images automatically
- Each image saved with unique filename

---

## New User Experience

### Before (Old Design):
```
┌─────────────────────────────────────┐
│ Choose your favourite               │
│                                     │
│ [Thumbnail 1] [Thumbnail 2] [...]  │
│                                     │
│ [ Refine Selected Design ]          │
└─────────────────────────────────────┘
↓ Click button to go to next page
↓ Can only download 1 image
```

### After (New Design):
```
┌─────────────────────────────────────────────────────────┐
│ Your Generated Designs        [Select All] [Clear]     │
│ 3 designs ready. Select one or multiple to download.   │
│                                                         │
│ ┌─────────┐  ┌─────────┐  ┌─────────┐                │
│ │         │  │    ✓    │  │    ✓    │                │
│ │ Image 1 │  │ Image 2 │  │ Image 3 │                │
│ │         │  │(selected)│  │(selected)│                │
│ └─────────┘  └─────────┘  └─────────┘                │
│   Option 1     Option 2     Option 3                  │
│   [specs]      [specs]      [specs]                   │
│                                                         │
│ [ ⬇ Download 2 designs ]                              │
│                                                         │
│ ✓ 2 designs selected. Click button to download.       │
└─────────────────────────────────────────────────────────┘
```

---

## Features in Detail

### 1. Image Display
- **Full-size, natural aspect ratio**
- Clean white background for images
- Hover effect: "Click to select" overlay
- Selection indicator: Black checkmark in circle

### 2. Selection State
- **Unselected**: Gray border, no checkmark
- **Hover**: Darker gray border, overlay appears
- **Selected**: Black border, checkmark visible, shadow

### 3. Multi-Select Logic
```typescript
// Click to toggle selection
toggleSelection(id: string) {
  if (selected.has(id)) {
    remove from selection
  } else {
    add to selection
  }
}
```

### 4. Bulk Actions
- **Select All**: Instantly selects all designs
- **Clear**: Clears all selections
- Buttons only show when relevant

### 5. Download Functionality
```typescript
downloadSelected() {
  for each selected image:
    - Fetch image as blob
    - Create download link
    - Trigger download with unique filename
    - Small delay between downloads (if multiple)
}
```

**Filenames**: `sign-mockup-[id].png`

### 6. Download Button States
- **No selection**: Gray, disabled, "Select designs to download"
- **1 selected**: Black, enabled, "Download 1 design"
- **Multiple**: Black, enabled, "Download 3 designs"

### 7. Selection Counter
- Shows count: "2 designs selected"
- Appears below download button when selections made
- Updates in real-time

---

## Grid Layout Logic

```typescript
// Responsive grid based on count:
candidates.length === 1 ? "grid-cols-1 max-w-2xl mx-auto"  // Centered
candidates.length === 2 ? "grid-cols-1 sm:grid-cols-2"     // Side-by-side
candidates.length === 3 ? "grid-cols-1 sm:grid-cols-3"     // 3 columns
default                 ? "grid-cols-2 sm:grid-cols-3"     // 2×3 grid
```

### Visual Examples:

**1 Image**:
```
┌─────────────────┐
│                 │
│   Large Image   │
│    (centered)   │
│                 │
└─────────────────┘
```

**2 Images**:
```
┌─────────┐  ┌─────────┐
│ Image 1 │  │ Image 2 │
└─────────┘  └─────────┘
```

**3 Images**:
```
┌───────┐  ┌───────┐  ┌───────┐
│Image 1│  │Image 2│  │Image 3│
└───────┘  └───────┘  └───────┘
```

**6 Images**:
```
┌───────┐  ┌───────┐  ┌───────┐
│Image 1│  │Image 2│  │Image 3│
└───────┘  └───────┘  └───────┘
┌───────┐  ┌───────┐  ┌───────┐
│Image 4│  │Image 5│  │Image 6│
└───────┘  └───────┘  └───────┘
```

---

## User Flow Examples

### Example 1: Download Single Image
1. User sees 3 generated designs
2. Clicks on favorite image
3. Image gets black border + checkmark
4. Download button shows "Download 1 design"
5. Click download
6. Image saves to computer as `sign-mockup-abc123.png`

### Example 2: Download Multiple Images
1. User sees 6 generated designs
2. Clicks on 3 favorites
3. All 3 have black borders + checkmarks
4. Download button shows "Download 3 designs"
5. Click download
6. All 3 images download sequentially:
   - `sign-mockup-abc123.png`
   - `sign-mockup-def456.png`
   - `sign-mockup-ghi789.png`

### Example 3: Download All
1. User sees 3 generated designs
2. Clicks "Select All" button
3. All images instantly selected
4. Download button shows "Download 3 designs"
5. Click download
6. All 3 download

### Example 4: Change Mind
1. User selects 2 images
2. Realizes they want different ones
3. Clicks "Clear" button
4. All selections cleared
5. Select new images
6. Download

---

## Technical Implementation

### State Management
```typescript
const [selectedForDownload, setSelectedForDownload] = useState<Set<string>>(new Set())
```

**Why Set?**
- Fast add/remove operations
- Automatic uniqueness
- Easy to check if item selected

### Download Function
```typescript
const downloadSelected = async () => {
  const selected = candidates.filter((c) => selectedForDownload.has(c.id))
  
  for (const candidate of selected) {
    // Fetch image
    const response = await fetch(candidate.imageUrl)
    const blob = await response.blob()
    
    // Create download link
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `sign-mockup-${candidate.id}.png`
    
    // Trigger download
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
    
    // Small delay between downloads
    if (selected.length > 1) {
      await new Promise((resolve) => setTimeout(resolve, 500))
    }
  }
}
```

**Why 500ms delay?**
- Prevents browser blocking multiple simultaneous downloads
- Gives browser time to process each download
- Improves reliability

---

## Visual Design Details

### Colors:
- **Unselected border**: `border-gray-200`
- **Hover border**: `border-gray-400`
- **Selected border**: `border-black`
- **Background**: `bg-white`
- **Hover overlay**: `bg-black/40`

### Spacing:
- Grid gap: `gap-4` (1rem)
- Card padding: `p-3` (0.75rem)
- Image rounded: `rounded-xl` (0.75rem)

### Typography:
- Title: `text-2xl font-bold`
- Subtitle: `text-gray-500`
- Option label: `text-sm font-semibold`
- Specs: `text-[10px] font-medium`

### Animations:
- Border color: `transition-all`
- Hover overlay: `opacity-0 group-hover:opacity-100`
- Button: `transition-colors`

---

## Advantages of New Design

### For Users:
✅ See all images clearly at once  
✅ Easy to compare options side-by-side  
✅ Download multiple favorites instantly  
✅ No navigation required  
✅ Flexible selection (1 or all)  
✅ Quick actions (Select All, Clear)  

### For Business:
✅ Better showcase of variations  
✅ Encourages downloading multiple options  
✅ Professional presentation  
✅ Reduces friction in download flow  
✅ Higher perceived value  

---

## Browser Compatibility

### Download Feature:
- ✅ Chrome/Edge: Full support
- ✅ Firefox: Full support
- ✅ Safari: Full support
- ✅ Mobile browsers: Full support

### Note on Multiple Downloads:
Some browsers may show a permission prompt:
```
"This site is attempting to download multiple files.
Do you want to allow this?"
```

User needs to click "Allow" once. After that, all selected images download automatically.

---

## Testing Scenarios

### Test 1: Single Download
1. Go through flow to generate 3 designs
2. Select 1 image
3. Verify checkmark appears
4. Click download
5. Verify 1 file downloads

### Test 2: Multi-Download
1. Select 3 images
2. Click download
3. Verify 3 files download
4. Check filenames are unique

### Test 3: Select All
1. Click "Select All"
2. Verify all have checkmarks
3. Download
4. Verify all files download

### Test 4: Clear Selection
1. Select 2 images
2. Click "Clear"
3. Verify checkmarks removed
4. Verify download button disabled

### Test 5: Toggle Selection
1. Click image A (selected)
2. Click image A again (deselected)
3. Verify toggle works correctly

---

## Future Enhancements (Optional)

### 1. Filename Customization
Allow user to set base filename:
```
[ Business Name: _______ ]
Downloads as: "bistro-signage-1.png"
```

### 2. Format Selection
```
○ PNG (High quality)
○ JPG (Smaller file)
○ PDF (Print ready)
```

### 3. Zip Download
For 3+ selections:
```
[ ⬇ Download as ZIP ]
Creates: "sign-mockups.zip"
```

### 4. Edit Before Download
```
[ ✏️ Edit ] [ ⬇ Download ]
Opens image in adjustment tool first
```

### 5. Share Links
```
[ 🔗 Copy Link ]
Creates shareable URL for specific design
```

---

## Summary

### Changed:
- ✅ File: `components/steps/step-select.tsx`
- ✅ Added multi-select functionality
- ✅ Added download on same page
- ✅ Added Select All / Clear buttons
- ✅ Improved image display (full size)

### New Capabilities:
- ✅ Select one or multiple images
- ✅ Download directly from selection page
- ✅ Bulk actions (Select All, Clear)
- ✅ Visual feedback (checkmarks, borders)
- ✅ Download counter in button

### User Flow:
```
Generate → View all images nicely → Select favorites → Download
          (All on one page)
```

---

**Status**: ✅ COMPLETE - Select page redesigned with multi-download! 🎉
