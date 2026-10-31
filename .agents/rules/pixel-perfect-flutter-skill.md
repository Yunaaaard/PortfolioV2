---
name: pixel-perfect-flutter-ui
description: Translates pasted mobile UI screenshots or mockups into pixel-accurate Flutter + GetX code while adapting to the app's primary theme color and Poppins typography. Trigger this skill whenever the user pastes an image of a mobile app screen, UI component, or design mockup and asks to build, replicate, or match it.
---

# Pixel-Perfect UI Replication Skill (Flutter + GetX)

When the user provides a UI image to build or replicate, **DO NOT immediately generate code**. Generic guesses result in Hallucinated UI. You must follow this strict 4-phase execution pipeline.

---

## Phase 1: Context Check & Visual Deconstruction (Mandatory First)

Before writing any Dart code:
1. **Locate App Theme:** Check the project's theme/color files (e.g., `/lib/app/core/theme/`, `app_colors.dart`, or `ThemeData`) to identify the application's **Primary Theme Color** and surface palette.
2. **Output a Visual Spec Sheet** analyzing the pasted image:
   - **Theme Color Mapping (Crucial):** Identify the dominant accent/brand colors in the pasted image and explicitly map them to the **Application's Primary Theme Color** (including its lighter/darker shades, opacity variants, and gradient stops). Keep neutral surfaces, borders, and shadows faithful to the image's depth and contrast.
   - **Typography & Hierarchy (`Poppins` First):** Enforce **`Poppins`** (`GoogleFonts.poppins()` or `fontFamily: 'Poppins'`) as the primary font family across all text elements. Estimate exact font weights (`w400`, `w500`, `w600`, `w700`), sizes, letter-spacing, and line heights from the image.
   - **Layout & Spacing Grid:** Outer screen padding, card border radius (`BorderRadius.circular(X)`), border strokes (width & opacity), and exact vertical/horizontal gaps.
   - **Effects & Depth:** Shadows (`BoxShadow` blur, spread, offset, and color opacity), glassmorphism (`BackdropFilter`), or 3D-inspired elevation cues.
   - **Component Tree Breakdown:** Map the visual hierarchy from top-to-bottom.

---

## Phase 2: Architecture & Code Constraints (Strict GetX)

All generated Flutter UI code **MUST** obey these architectural rules:

1. **Directory Structure:** Target `/lib/app/modules/<module_name>/views/` and `/lib/app/modules/<module_name>/controllers/` (plus reusable parts in `/lib/app/widgets/`).
2. **90%+ StatelessWidget Rule:** 
   - Views and custom UI components MUST use `GetView<Controller>` or `StatelessWidget`.
   - **NEVER** use `StatefulWidget` or `setState()`.
3. **100% Business Logic Isolation:**
   - Zero logic, calculations, or state variables inside the View file.
   - Bind reactive UI states strictly via `Obx(() => ...)` connected to `.obs` variables in the `GetxController`.
4. **Routing:** Use GetX named routes (`Get.toNamed()`, `GetPage`) if navigation triggers are present.

---

## Phase 3: Pixel-Accuracy, Theme & Font Implementation Rules

When writing the Flutter code, avoid "default Material look" shortcuts:

* **Strict `Poppins` Typography:** Every `TextStyle` MUST explicitly apply `Poppins` as the primary font family (either via `GoogleFonts.poppins(...)`, `fontFamily: 'Poppins'`, or your app's `Poppins`-configured `TextTheme`) with the exact weight and size extracted in Phase 1.
* **Primary Theme Color Adaptation:** Never hardcode clash colors from the reference screenshot if they contradict the app's brand. Replace primary buttons, active tabs, highlights, badges, and key gradients with the **Application's Primary Theme Color** (`Theme.of(context).primaryColor` or `AppColors.primary`), preserving the exact opacity, glow, and contrast ratios shown in the mockup.
* **No Generic Material Defaults:** Do not use stock `ElevatedButton` or unstyled `AppBar` if the image shows custom rounded containers, gradients, or bespoke headers. Build with `Container`, `DecoratedBox`, `ClipRRect`, and `GestureDetector`/`InkWell`.
* **Exact Proportions:** Use `MediaQuery` ratios, `Expanded`, `Flexible`, and `AspectRatio` so the layout matches the visual proportions of the mockup.
* **Custom Shapes & Borders:** Replicate subtle 1px borders or top highlights explicitly (e.g., `Border.all(color: Colors.white.withValues(alpha: 0.08), width: 1)`).
* **Placeholder Assets:** If the image contains custom 3D illustrations, avatars, or specific icons not in standard `Icons` / `LucideIcons`, build an exact-sized container placeholder tinted with the primary theme color and a clear `// TODO: Replace with asset [dimensions]` comment.

---

## Phase 4: Self-Correction Checklist

Before finalizing your response, verify:
- [ ] Did I inspect the codebase first and replace the screenshot's accent color with the **Application's Primary Theme Color**?
- [ ] Is **`Poppins`** explicitly set as the primary font family across all text styles?
- [ ] Did I match the exact corner radii, padding ratios, shadows, and borders from the image?
- [ ] Are there zero `StatefulWidget`s and zero business logic leaks in the View?