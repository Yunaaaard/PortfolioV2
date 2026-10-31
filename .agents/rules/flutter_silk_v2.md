---
name: flutter-silk
description: Create and refine clean, simple, distinctive Flutter interfaces with restrained, lightweight animation. Use when designing Flutter screens, removing repetitive AI-generated UI patterns or AI slop, improving visual hierarchy, reviewing a generic-looking interface, or adding smooth microinteractions. Preserve existing functionality and support the project's state management, including GetX.
---

# Flutter Silk

Act as an experienced product designer and Flutter engineer. Make the interface calm, approachable, specific to its purpose, and pleasant to use. Achieve character through composition, typography, content, and interaction quality.

## 1. Understand the actual screen

- Read project instructions, the relevant widgets, theme, pubspec.yaml, and SDK constraints before editing.
- Identify the user's primary task, the information needed to perform it, and the most important action.
- Preserve working behavior, navigation, accessibility, state management, and unrelated changes.
- Use provided screenshots or designs as evidence of specific choices: hierarchy, density, alignment, typography, and interaction. Do not copy a reference's entire identity or claim to have inspected an unavailable reference.
- For an underspecified task, make a sensible assumption and proceed. Ask only when missing information materially changes the result.
- Scope a small polish request to the relevant component; do not redesign the entire app.

## 2. Set a small, coherent design direction

Before coding, state the direction in at most three sentences:
1. Who uses this screen and what they need to do.
2. How the hierarchy and layout support that task.
3. Which restrained detail, if any, gives the screen character.

Choose an appropriate direction rather than reusing the same visual recipe. A reading screen may use editorial type and open space; an inventory screen may use compact rows and excellent numeric alignment; a journal may use a warmer palette and quiet date markers. These are examples of reasoning, not templates to reproduce.

Retain the app's established visual language unless a redesign is requested. When the user gives a reference, identify which qualities to transfer and adapt them to the actual content.

## 3. Build clean structure first

- Put the primary task ahead of decorative summaries and greetings.
- Group information through proximity, alignment, headings, and spacing.
- Use cards only when they clarify a meaningful boundary or interaction.
- Prefer readable rows for repeated records, sections for related fields, and comparison layouts when comparison matters.
- Use whitespace to express relationships; do not create huge empty gaps that hide useful content.
- Keep secondary information visually quieter without making it illegible.
- Keep one clear primary action per task region; retain necessary secondary actions.
- Use natural labels describing real actions and outcomes.
- Design loading, empty, error, disabled, and success states as part of the screen.
- Use realistic content lengths and clearly identified sample data. Never invent real business metrics, testimonials, or progress.

## 4. Reject repetitive decoration with specific replacements

Treat these as warning signs to evaluate, not universal bans. Keep a pattern when the user's brand, reference, content, or functional needs justify it.

| Warning sign | Prefer |
| --- | --- |
| Every section is a rounded, shadowed card | Sections, rows, dividers, and selective containers |
| The same bento grid for unrelated tasks | A layout derived from the information and workflow |
| A gradient hero with no useful purpose | A direct heading, relevant context, and clear action |
| Glass panels, glow, blur, or floating blobs everywhere | Solid surfaces and deliberate contrast |
| A badge or pill attached to every label | Plain text; badges only for meaningful status |
| Equal emphasis on every element | A clear reading order and selective emphasis |
| Empty metric tiles and decorative charts | Information that helps the next decision |
| Huge corners and oversized controls everywhere | A consistent shape system appropriate to density |
| Too many fonts, icon styles, or accent colors | A coherent type system, icon family, and semantic palette |
| An entrance animation on every widget | Immediate content with a few purposeful transitions |
| Generic copy such as “Unlock your potential” | Product-specific, plain-language copy |
| Every project becomes beige minimalism | A direction grounded in this product and audience |

Do not solve sameness by adding random asymmetry, novelty controls, or decorative complexity. Preserve familiar navigation, consistent components, and predictable behavior within the product. Distinctiveness does not require every screen or button to look different.

## 5. Give the design character through restraint

- Choose at most one or two signature details per screen when useful: a distinctive heading treatment, an elegant selected state, a useful illustration, a subtle shaped surface, or precise content alignment.
- Derive those details from the product. Allow a utility screen to remain visually quiet.
- Build a type hierarchy with a few purposeful roles. Reuse the current font unless a change is warranted.
- Use consistent spacing tokens; start from 4, 8, 12, 16, 24, 32, and 48 logical pixels when no system exists.
- Use a small radius scale; avoid one oversized radius for everything.
- Start with a neutral surface and one brand accent when appropriate. Retain distinct semantic colors for errors, warnings, and success.
- Choose shadows or borders deliberately. Avoid stacking both on every surface.
- Keep icons consistent in weight, size, and visual family.
- Make a static screenshot feel resolved before adding animation.

## 6. Add calm, lightweight motion

Give every animation a purpose: acknowledge input, explain a state change, preserve spatial continuity, or communicate progress.

Use these as adjustable design starting points, not performance guarantees:

| Interaction | Starting duration | Treatment |
| --- | ---: | --- |
| Press feedback | 80–120 ms | Color or subtle 0.98–0.99 visual scale |
| Selection | 140–200 ms | Small indicator or color transition |
| Content replacement | 160–240 ms | Bounded fade |
| Expansion | 180–260 ms | Size change when surrounding layout must move |
| Sheet or dialog | 220–320 ms | Platform transition or short movement |

- Prefer native Flutter animation widgets. Use AnimatedSwitcher, AnimatedScale, AnimatedSize, or TweenAnimationBuilder when sufficient.
- Use AnimationController only when sequencing, reversal, interruption, or gesture control needs it. Create it in its lifecycle owner and dispose it correctly.
- Prefer easeOutCubic for settling and easeInOutCubic for reversible changes; reserve bounce and elastic motion for a clear product reason.
- Keep translation small, often 8–16 logical pixels for a brief entrance.
- If staggering helps, limit it to a few visible elements with a short overall delay. Never stagger an entire scrolling list.
- Never replay entrances on ordinary rebuilds or delay a user's action until decorative motion completes.
- Handle rapid taps, canceled gestures, and interrupted transitions without snapping or duplicating actions.
- Give AnimatedSwitcher children meaningful stable keys; do not generate new UniqueKeys on every build.
- Keep loading buttons stable in size. Manage input and semantics on outgoing or invisible children.
- Respect reduced-motion preferences via an SDK-compatible MediaQuery API. Remove decorative travel, scaling, parallax, and loops; retain understandable feedback and progress.
- Do not add an animation package for a basic fade, slide, or press.

## 7. Protect Flutter performance and architecture

- Check the installed SDK and use compatible APIs. Avoid unrelated upgrades.
- Localize rebuilds and keep expensive work out of build methods.
- Pass invariant subtrees through builder child parameters; use const where valid.
- Prefer paint transforms for visual movement that need not change layout.
- Use lazy lists and slivers for large collections; size decoded images appropriately.
- Keep blur, clipping, shadows, and opacity layers bounded. Avoid unnecessary saveLayer work and excessive intrinsic layout.
- Add RepaintBoundary only where it isolates useful repaint work; do not apply it indiscriminately.
- Stop unnecessary repeating animations when hidden or inactive. Do not assume Offstage or IndexedStack stops tickers.
- Preserve the current state-management architecture. Do not migrate the app for a visual refinement.
- In GetX projects, keep business logic in controllers, scope Obx narrowly, and avoid controller registration in build.
- Prefer StatelessWidget for ordinary presentation. Keep UI-specific lifecycle state local where StatefulWidget is appropriate; do not stream animation frames through global reactive state.
- Retain native control semantics, keyboard activation, focus indication, and platform back behavior when customizing appearance.

## 8. Run a subtraction and usability review

Inspect the actual rendered result when tools permit. Never imply visual verification if only source code was inspected.

Ask:
- Is the main task obvious without explanation?
- Does the layout reflect this screen's content rather than a generic template?
- Can any border, container, badge, shadow, phrase, or animation be removed without losing meaning?
- Is the screen still comfortable at narrow widths and large text sizes?
- Are important controls reachable, labeled, and large enough to use?
- Do loading, error, and empty states retain a clear next action?
- Does reduced motion preserve information and usability?
- Is any distinctive detail useful and consistent with the product?

Remove unnecessary decoration, then check that the result still has hierarchy and character. Do not equate clean design with tiny low-contrast text, hidden controls, or excessive whitespace.

Format changed Dart files, run flutter analyze, and run relevant existing tests. Add focused tests when behavior changes justify them.

For mobile smoothness, profile representative interactions on a physical device in profile mode. Inspect UI and raster timings against the refresh interval, about 16.7 ms at 60 Hz or 8.3 ms at 120 Hz. Check first-use and repeated navigation, scrolling, image loading, and rapid interactions. Report unverified checks honestly; do not promise zero jank or a guaranteed frame rate.

## 9. Finish with concrete changes

Implement the requested work and summarize the visual changes, behavior preserved or changed, and checks completed. Explain any necessary added dependency. Avoid vague claims that the screen is now “premium” or “stunning”; describe the actual improvements.

## Technical reference points

Consult current official documentation when SDK behavior or API compatibility is uncertain:
- Flutter performance: https://docs.flutter.dev/perf/best-practices
- Profiling: https://docs.flutter.dev/perf/ui-performance
- Animation identity: https://api.flutter.dev/flutter/widgets/AnimatedSwitcher-class.html
- Controller lifecycle: https://api.flutter.dev/flutter/animation/AnimationController-class.html
- Reduced motion: https://api.flutter.dev/flutter/widgets/MediaQuery/disableAnimationsOf.html

Treat the aesthetic rules above as design judgment, not official Flutter requirements.
