# Scalable Design Proposal: Content-Code Separation

## Problem Statement

Current design hardcodes all scenario content in `src/data/scenarios.js`:
- 850+ lines of JS for just 2 expanded scenarios
- Editing scenarios requires editing code
- No clear separation between content and logic
- Difficult to maintain, version control, or collaborate on content
- Will become unmanageable with 6 full scenarios (~2500+ lines)

## Proposed Solution

### Option A: JSON Files (Recommended)

**Structure:**
```
src/data/scenarios/
  s1.json
  s2.json
  s3.json
  s4.json
  s5.json
  s6.json
  index.js  (loader)
```

**Benefits:**
- Clean separation: content in JSON, logic in JS
- Easy to edit scenarios without touching code
- Can version control scenarios independently
- Can validate JSON schema
- Smaller file sizes, easier to navigate

**Implementation:**
```javascript
// src/data/scenarios/index.js
import s1 from './s1.json';
import s2 from './s2.json';
import s3 from './s3.json';
import s4 from './s4.json';
import s5 from './s5.json';
import s6 from './s6.json';

export const scenarios = [s1, s2, s3, s4, s5, s6];
```

**JSON Schema Example (s1.json):**
```json
{
  "id": "S1",
  "level": "upper_sec",
  "profile": "mixed_readiness",
  "subject": "Mathematics",
  "topic": "Completing the Square",
  "contextNote": "Sec 3 Express Math, 30 students...",
  "students": [
    {
      "name": "Rajan",
      "role": "fast",
      "note": "Finished correctly in 3 minutes..."
    }
  ],
  "ep1": {
    "situation": "20 minutes into the lesson...",
    "evidence": "The gap is visible...",
    "choices": [
      {
        "id": "A",
        "label": "Run a Two-Step MCQ",
        "elaboration": "Stop the class and project...",
        "theoryKey": "Two_Step_MCQ",
        "tradeoff": "You get precise evidence..."
      }
    ]
  },
  "ep2": { ... },
  "ep3": { ... }
}
```

### Option B: Markdown with YAML Frontmatter

**Structure:**
```
src/data/scenarios/
  s1.md
  s2.md
  s3.md
  s4.md
  s5.md
  s6.md
  loader.js
```

**Benefits:**
- Human-readable and editable
- Can include rich formatting in text
- Easier to write and review long text content
- Can use existing .md files in specs folder

**Drawbacks:**
- Requires markdown parser
- More complex to load in browser
- Harder to validate structure

### Option C: Hybrid Approach (JSON + Markdown)

**Structure:**
```
src/data/scenarios/
  s1/
    meta.json       (structure, IDs, theory keys)
    content.md      (all text content)
  s2/
    meta.json
    content.md
  ...
  loader.js
```

**Benefits:**
- Structure in JSON (easy to validate)
- Content in Markdown (easy to write/edit)
- Best of both worlds

**Drawbacks:**
- More complex loader
- Two files per scenario

## Recommendation: Option A (JSON Files)

**Why:**
1. **Simplest to implement** - no new dependencies, works with ES6 imports
2. **Browser-friendly** - JSON loads natively, no parsing needed
3. **Validatable** - can use JSON schema to validate structure
4. **Version control friendly** - clean diffs, easy to review changes
5. **Maintainable** - one file per scenario, clear structure

**Trade-off:**
- JSON is less human-friendly for long text than Markdown
- But for this project, the structure is more important than formatting

## Implementation Plan

### Phase 1: Create JSON Schema
1. Define JSON schema for scenario structure
2. Validate against existing S1 and S2

### Phase 2: Extract Scenarios
1. Create `src/data/scenarios/` folder
2. Convert S1 from JS to `s1.json`
3. Convert S2 from JS to `s2.json`
4. Create placeholder JSON for S3-S6

### Phase 3: Update Loader
1. Update `src/data/scenarios/index.js` to import JSON files
2. Update `src/data/index.js` to export from new location
3. Test that engine and UI still work

### Phase 4: Update Workflow
1. Update SCENARIO-EXPANSION-FRAMEWORK.md
2. Document JSON editing workflow
3. Create JSON template for new scenarios

## JSON Schema Definition

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["id", "level", "profile", "subject", "topic", "contextNote", "students", "ep1", "ep2", "ep3"],
  "properties": {
    "id": { "type": "string", "pattern": "^S[1-6]$" },
    "level": { "type": "string", "enum": ["upper_sec", "lower_sec", "jc"] },
    "profile": { "type": "string", "enum": ["mixed_readiness", "fast_finishers", "quiet_class", "hidden_thinking", "learning_support", "invisible_understanding"] },
    "subject": { "type": "string" },
    "topic": { "type": "string" },
    "contextNote": { "type": "string" },
    "students": {
      "type": "array",
      "minItems": 4,
      "maxItems": 4,
      "items": {
        "type": "object",
        "required": ["name", "role", "note"],
        "properties": {
          "name": { "type": "string" },
          "role": { "type": "string", "enum": ["fast", "middle", "stalled", "support"] },
          "note": { "type": "string" }
        }
      }
    },
    "ep1": {
      "type": "object",
      "required": ["situation", "evidence", "choices"],
      "properties": {
        "situation": { "type": "string" },
        "evidence": { "type": "string" },
        "choices": {
          "type": "array",
          "minItems": 3,
          "maxItems": 3,
          "items": {
            "type": "object",
            "required": ["id", "label", "elaboration", "theoryKey", "tradeoff"],
            "properties": {
              "id": { "type": "string", "enum": ["A", "B", "C"] },
              "label": { "type": "string" },
              "elaboration": { "type": "string" },
              "theoryKey": { "type": "string" },
              "tradeoff": { "type": "string" }
            }
          }
        }
      }
    },
    "ep2": {
      "type": "object",
      "required": ["A", "B", "C"],
      "properties": {
        "A": { "$ref": "#/definitions/ep2Branch" },
        "B": { "$ref": "#/definitions/ep2Branch" },
        "C": { "$ref": "#/definitions/ep2Branch" }
      }
    },
    "ep3": {
      "type": "object",
      "required": ["A1", "A2", "B1", "B2", "C1", "C2"],
      "properties": {
        "A1": { "$ref": "#/definitions/ep3Outcome" },
        "A2": { "$ref": "#/definitions/ep3Outcome" },
        "B1": { "$ref": "#/definitions/ep3Outcome" },
        "B2": { "$ref": "#/definitions/ep3Outcome" },
        "C1": { "$ref": "#/definitions/ep3Outcome" },
        "C2": { "$ref": "#/definitions/ep3Outcome" }
      }
    }
  },
  "definitions": {
    "ep2Branch": {
      "type": "object",
      "required": ["consequence", "choices"],
      "properties": {
        "consequence": { "type": "string" },
        "choices": {
          "type": "array",
          "minItems": 2,
          "maxItems": 2,
          "items": {
            "type": "object",
            "required": ["id", "label", "elaboration", "theoryKey", "tradeoff"],
            "properties": {
              "id": { "type": "string", "enum": ["1", "2"] },
              "label": { "type": "string" },
              "elaboration": { "type": "string" },
              "theoryKey": { "type": "string" },
              "tradeoff": { "type": "string" }
            }
          }
        }
      }
    },
    "ep3Outcome": {
      "type": "object",
      "required": ["outcome", "tradeoff", "reflection"],
      "properties": {
        "outcome": { "type": "string" },
        "tradeoff": { "type": "string" },
        "reflection": { "type": "string" }
      }
    }
  }
}
```

## Benefits of This Approach

1. **Scalability**: Add new scenarios by creating new JSON files
2. **Maintainability**: Edit content without touching code
3. **Collaboration**: Content editors don't need to know JS
4. **Version Control**: Clean diffs, easy to review changes
5. **Validation**: Can validate JSON against schema
6. **Testing**: Can test scenarios independently
7. **Documentation**: JSON structure is self-documenting

## Migration Path

1. Keep current `scenarios.js` as backup
2. Create new `scenarios/` folder with JSON files
3. Update loader to use JSON
4. Test thoroughly
5. Remove old `scenarios.js` once validated

## Next Steps

1. Get approval on Option A (JSON files)
2. Create `src/data/scenarios/` folder structure
3. Convert S1 and S2 to JSON
4. Update loader and test
5. Update documentation and workflow

---

**Decision needed**: Approve Option A (JSON files) or discuss alternatives?
