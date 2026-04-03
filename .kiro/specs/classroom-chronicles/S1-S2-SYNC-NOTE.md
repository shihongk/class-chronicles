# S1 and S2 Synchronization Note

## Status
The complete, expanded versions of S1 and S2 are currently in `src/data/scenarios.js`.

## S1: Mixed Readiness — Completing the Square
**Location**: `src/data/scenarios.js` lines 1-148
**Status**: ✅ Fully expanded with framework
**Content includes**:
- Enhanced contextNote (30 students, specific timing, practice question details)
- 4 detailed focal students with behavioral notes
- Ep1 situation: 150-word detailed paragraph with class distribution (10/12/8)
- 3 Ep1 choices with 80-120 word elaborations
- 3 Ep2 branches (A, B, C) with 150-180 word consequences
- 6 Ep2 choices (2 per branch) with detailed elaborations
- 6 Ep3 outcomes (A1, A2, B1, B2, C1, C2) with 180-220 word detailed outcomes
- Condensed 3-question reflections for all 6 paths

## S2: Fast Finishers — Quadratic Factorisation
**Location**: `src/data/scenarios.js` lines 149-onwards
**Status**: ✅ Fully expanded with framework
**Content includes**:
- Enhanced contextNote (24 students, specific timing, 4 practice questions)
- 4 detailed focal students (Rajan doodling, Nur disengaged, Wei Jie stuck, Siti frustrated)
- Ep1 situation: 150-word detailed paragraph with class distribution (16/5/3)
- 3 Ep1 choices with detailed MCQ questions, extension tasks, gallery walk protocols
- 3 Ep2 branches with differential student responses
- 6 Ep2 choices with theory-grounded elaborations
- 6 Ep3 outcomes showing who was served/missed
- Condensed 3-question reflections

## Why Markdown Files Are Not Updated Yet

The expanded content in `scenarios.js` is:
- **S1**: ~150 lines of detailed JavaScript object
- **S2**: ~150 lines of detailed JavaScript object
- **Total**: ~300 lines per scenario

Markdown files would need to be:
- Manually formatted from JS to readable Markdown
- Split across multiple files or sections
- Kept in sync with JS changes

## Recommendation

**Option 1: Keep scenarios.js as source of truth** (Current state)
- ✅ Single source of truth
- ✅ Used directly by the application
- ✅ Easy to maintain consistency
- ❌ Not human-friendly for editing

**Option 2: Move to JSON files** (Proposed in SCALABLE-DESIGN-PROPOSAL.md)
- ✅ Separate content from code
- ✅ Easier to edit and version control
- ✅ Can generate markdown documentation from JSON
- ✅ Scalable for all 6 scenarios

**Option 3: Maintain parallel markdown files**
- ❌ Requires manual sync between JS and MD
- ❌ Risk of inconsistency
- ❌ Double maintenance burden
- ✅ Human-readable documentation

## Next Steps

**Recommended**: Implement Option 2 (JSON files)
1. Extract S1 and S2 from `scenarios.js` to `s1.json` and `s2.json`
2. Update loader to import JSON files
3. Generate markdown documentation from JSON automatically
4. Use JSON as source of truth for both app and documentation

This approach:
- Eliminates sync issues
- Makes content easy to edit
- Keeps documentation automatically up-to-date
- Scales to all 6 scenarios

## For Now

The complete, expanded S1 and S2 content is in `src/data/scenarios.js`.

To view the complete content:
```bash
# View S1 (lines 1-148)
sed -n '1,148p' src/data/scenarios.js

# View S2 (lines 149-end of S2)
sed -n '149,<end_line>p' src/data/scenarios.js
```

Or open `src/data/scenarios.js` in your editor and navigate to the S1 and S2 const declarations.

---

**Decision needed**: Should we proceed with JSON extraction (Option 2) or maintain parallel markdown files (Option 3)?
