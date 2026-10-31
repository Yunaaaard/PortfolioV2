# STRICT RULE — FLUTTER UI/UX REDESIGN ONLY

You are working on an existing Flutter application. Your task is to redesign and improve the UI/UX only while preserving the application's existing functionality and business logic.

## 🚨 NON-NEGOTIABLE RULE
NEVER modify, rewrite, remove, refactor, or interfere with the existing business logic or functional code unless explicitly authorized.
The system already works properly. Your responsibility is to change how it looks, NOT how it works.

---

### 1. Business Logic Must Remain Untouched
Do NOT modify:
- Business rules and conditions
- Calculations and formulas
- Validation logic
- API calls and API handling
- Database operations
- Authentication logic
- State management logic
- Data models
- Data processing
- Navigation logic
- Existing workflows
- Controllers/services/repositories
- Existing functions that make the application work
- Error-handling logic
- Existing event/action behavior

Do not "improve," "clean up," optimize, or refactor functional code just because you think it can be written better.

---

### 2. Flutter UI/UX Changes Are Allowed
You may modify only the presentation layer, including:
- Widget layouts
- Container, Row, Column, Stack, etc.
- Padding and margins
- Colors
- Typography
- Font sizes and weights
- Borders and border radius
- Shadows
- Icons
- Images
- Card designs
- Buttons' visual appearance
- Input field appearance
- Spacing
- Alignment
- Responsive layouts
- Animations that do not alter functionality
- Themes and styling
- Visual hierarchy
- UI-only reusable widgets

If an existing widget contains functional logic, preserve that logic and modify only its visual structure where safe.

---

### 3. Preserve Existing Flutter Functionality
Do NOT unnecessarily change:
- `onPressed`
- `onTap`
- `onChanged`
- `onSubmitted`
- Future/async operations
- Providers, BLoCs, Cubits, Controllers, or other state-management implementations
- Navigation routes
- API service calls
- Database queries
- Model classes
- JSON parsing
- Authentication
- Existing validation
- Existing callbacks

If a functional property already exists, keep it working exactly as it currently does.

---

### 4. Preserve Existing References
Do not unnecessarily rename or remove:
- Variables
- Controllers
- Keys
- Route names
- Model properties
- Function names
- Callback references
- Provider/BLoC references
- IDs or identifiers used by the application

If something must remain for functionality, keep it intact.

---

### 🎨 DESIGN REQUIREMENT CHECKING
ALWAYS FLAG WHETHER THE REQUIRED DESIGN HAS BEEN MET.
Before considering the UI redesign complete, compare the implemented UI against the provided design requirements, screenshots, mockups, or instructions.

For every requirement, explicitly report:
| Requirement | Status |
| :--- | :--- |
| Required design element | ✅ MET / ⚠ PARTIALLY MET / ❌ NOT MET |
| Required layout | ✅ MET / ⚠ PARTIALLY MET / ❌ NOT MET |
| Required colors | ✅ MET / ⚠ PARTIALLY MET / ❌ NOT MET |
| Required typography | ✅ MET / ⚠ PARTIALLY MET / ❌ NOT MET |
| Required spacing/alignment | ✅ MET / ⚠ PARTIALLY MET / ❌ NOT MET |
| Required components | ✅ MET / ⚠ PARTIALLY MET / ❌ NOT MET |
| Required responsive behavior | ✅ MET / ⚠ PARTIALLY MET / ❌ NOT MET |

Never claim that a design requirement is met if it is not actually implemented.
If something cannot be implemented without modifying business logic, FLAG IT instead of changing the business logic.

#### Required Final Report
After every UI redesign, provide:
- **Design Compliance**: MET / PARTIALLY MET / NOT MET
- **Business Logic Status**: UNCHANGED
- **Functional Changes**: NONE

Then list any design requirements that are:
- ✅ MET
- ⚠ PARTIALLY MET
- ❌ NOT MET

For anything not fully met, clearly explain why and identify a UI-only solution if one is possible.

---

### 🔒 GOLDEN RULE
**DO NOT CHANGE HOW THE APP WORKS. ONLY CHANGE HOW THE APP LOOKS.**
If there is ever a conflict between the requested design and existing functionality:
**EXISTING FUNCTIONALITY ALWAYS WINS.**

If achieving the requested design requires changing business logic, **STOP, FLAG THE CONFLICT, AND DO NOT MODIFY THE BUSINESS LOGIC.**
Your goal is to produce a visually improved Flutter application with the exact same functionality and behavior as the original system.
