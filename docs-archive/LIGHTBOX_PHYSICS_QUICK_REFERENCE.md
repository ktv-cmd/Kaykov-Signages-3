# Lightbox Physics Protocol - Quick Reference

**Purpose**: Force realistic 3D cabinet construction for logo lightboxes (CASE A)  
**Deployed**: 2026-04-23  
**Scope**: Logo-only generations

---

## The 4 Requirements

### 1. VOLUMETRIC CONSTRUCTION ⬛
**What**: Rigid 3D cabinet with visible side-walls  
**Check**: Can you see the thickness/depth of the box?  
**Pass**: Return planes (sides) clearly visible  
**Fail**: Flat rectangle, no visible depth

### 2. MATERIAL INTEGRITY (Weathering) 🏚️
**What**: Environmental aging matching the building  
**Check**: Does it look brand-new or weathered?  
**Pass**: Rust streaks, dust, texture variation present  
**Fail**: Pristine plastic, factory-fresh appearance

### 3. LIGHTING PHYSICS 💡
**What**: Inverse-square falloff light wash on wall  
**Check**: Does light interact with wall texture?  
**Pass**: Gradient glow on facade, texture modulation visible  
**Fail**: Flat glow, no wall interaction

### 4. AMBIENT OCCLUSION (Contact Shadows) 🌑
**What**: Hard shadow where box touches wall  
**Check**: Is there a sharp shadow at the back edge?  
**Pass**: Defined contact shadow, proves depth  
**Fail**: No shadow, floating appearance

---

## Visual Inspection Checklist

When reviewing a generated lightbox image:

```
[ ] Can I see at least one side-wall of the cabinet?
[ ] Does the weathering match the building's age/condition?
[ ] Is there a light wash on the wall behind/below the box?
[ ] Is there a contact shadow where the box meets the wall?
[ ] Does it look physically installed (not pasted)?
```

If all 5 checks pass → **Protocol Working** ✅  
If 3+ checks fail → **Protocol Not Applied** ❌

---

## Common Issues & Fixes

### Issue: Flat Rectangle (No Depth)
**Symptom**: Lightbox looks like a 2D sticker  
**Cause**: AI interpreted as texture overlay  
**Fix**: Protocol Point 1 should force return planes visible

### Issue: Too Clean/Perfect
**Symptom**: Looks like a render, not a real sign  
**Cause**: No weathering applied  
**Fix**: Protocol Point 2 should add environmental aging

### Issue: No Light Wash on Wall
**Symptom**: Lightbox glows but wall stays dark  
**Cause**: Light treated as flat emission  
**Fix**: Protocol Point 3 should force inverse-square falloff

### Issue: Floating Appearance
**Symptom**: Box doesn't look attached to wall  
**Cause**: No contact shadows  
**Fix**: Protocol Point 4 should add hard shadow at back edge

---

## Technical Terms Explained

**Inverse-Square Falloff**: Light intensity decreases with square of distance (physics law)  
**Ambient Occlusion**: Shadows in crevices/corners where surfaces meet  
**Contact Shadows**: Hard shadows at exact contact point between objects  
**Return Planes**: Side-walls perpendicular to front face (proves 3D depth)  
**PBR**: Physically-Based Rendering (realistic material physics)

---

## Example Scenarios

### Scenario A: Modern Storefront (Clean Building)
**Building**: New white stucco, well-maintained  
**Expected Weathering**: Minimal (light dust only)  
**Light Wash**: Clean, defined gradient  
**Contact Shadow**: Subtle but present  
**Return Planes**: Visible, clean aluminum

### Scenario B: Historic Building (Aged)
**Building**: 50-year-old brick, urban patina  
**Expected Weathering**: Moderate (rust, dust, texture variation)  
**Light Wash**: Warm, interacting with mortar lines  
**Contact Shadow**: Defined with texture modulation  
**Return Planes**: Visible, showing wear

### Scenario C: Industrial Building (Heavy Use)
**Building**: Concrete/metal, heavy weathering  
**Expected Weathering**: Heavy (rust streaks, oxidation, chips)  
**Light Wash**: Dramatic on textured concrete  
**Contact Shadow**: Strong, high contrast  
**Return Planes**: Visible, heavily weathered

---

## Integration Notes

- **Applies to**: CASE A (Logo Only) generations
- **Does NOT apply to**: Channel letters (CASE B), Awnings
- **Location**: `lib/ai/provider.ts`, lines 172-176
- **Activation**: Automatic for all logo-only requests
- **Override**: None (always active for CASE A)

---

## Testing Tips

1. **Test on various building types**: Modern, historic, industrial
2. **Check all 4 protocol elements**: Don't focus on just one
3. **Compare to building weathering**: Should match environment
4. **Look for return planes**: Critical depth indicator
5. **Verify light physics**: Wall wash should be visible

---

## Success Metrics

**Good Sign**: "It looks like someone installed this years ago"  
**Bad Sign**: "It looks like a Photoshop mockup"

The protocol succeeds when the lightbox appears to be a physical object that has existed in the environment for an extended period, not a freshly-rendered graphic element.

---

**Quick Ref Version**: 1.0  
**Last Updated**: 2026-04-23  
**Status**: Active in Production
