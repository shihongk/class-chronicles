# JSON Migration Plan - Revised Approach

## Current Situation

After attempting to extract S1 and S2 from `scenarios.js` to JSON:
- **Challenge**: Each scenario is ~140 lines of complex nested objects
- **Total size**: 849 lines for all scenarios
- **Complexity**: Manual conversion is error-prone and time-consuming

## Revised Recommendation

**Keep scenarios.js as-is for now**, but prepare for future JSON migration when needed.

### Why This Makes Sense

1. **Current state works**: The expanded S1 and S2 are in `scenarios.js` and functional
2. **Only 2 scenarios expanded**: S3-S6 are still basic stubs
3. **Premature optimization**: Moving to JSON before expanding all scenarios adds unnecessary complexity
4. **Better timing**: Migrate to JSON when all 6 scenarios are expanded

### When to Migrate to JSON

Migrate when:
- ✅ All 6 scenarios are fully expanded (currently only S1 and S2 are done)
- ✅ File size becomes unmanageable (>2000 lines)
- ✅ Multiple people need to edit scenarios simultaneously
- ✅ You need to generate documentation from scenario data

### Current Action Plan

**Phase 1: Complete Scenario Expansion** (Current priority)
1. Keep S1 and S2 in `scenarios.js` ✅
2. Expand S3-S6 using the framework
3. All scenarios in one file for now

**Phase 2: JSON Migration** (Future, when all 6 done)
1. Use automated tool to extract all 6 scenarios
2. Convert to JSON in one batch
3. Update loader
4. Test thoroughly
5. Remove old `scenarios.js`

### Immediate Next Steps

1. ✅ S1 and S2 are expanded and working
2. ⏭️ Use framework to expand S3 (Lower Sec / Quiet Class)
3. ⏭️ Continue with S4, S5, S6
4. ⏭️ After all 6 are done, revisit JSON migration

### Documentation Status

**Source of truth**: `src/data/scenarios.js`
- S1: Lines 1-147 (✅ Fully expanded)
- S2: Lines 149-287 (✅ Fully expanded)  
- S3: Lines 289-onwards (⏳ Basic stub, needs expansion)
- S4-S6: (⏳ Basic stubs, need expansion)

**Markdown files**: Outdated, will be regenerated from JSON after migration

## Decision

**Proceed with scenario expansion first, JSON migration later.**

This is more pragmatic because:
- Focuses on content creation (the actual work)
- Avoids premature architectural changes
- Reduces risk of breaking working code
- Easier to migrate 6 complete scenarios than 2+4 partial ones

---

**Status**: Recommendation accepted. Continue with S3 expansion using framework.
