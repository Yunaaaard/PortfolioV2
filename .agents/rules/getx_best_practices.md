# GetX Best Practices Documentation & Rules

## Core Principles
1. **90% StatelessWidget**: Keep views as pure UI StatelessWidget wherever possible.
2. **10% StatefulWidget**: Reserved strictly for UI-specific lifecycle cases (e.g., `AnimationController`, `TabController`, `PageController`, or complex local UI controller states).
3. **100% Business Logic Inside GetX Controllers**: Never write business logic, API calls, or data transformations directly in views.

---

## What GetX + StatelessWidget Handles
1. **API Data**: Fetched, manipulated, and held in GetX controllers.
2. **Loading States**: Managed with `RxBool` (e.g. `final isLoading = false.obs;`).
3. **Form Values**: Managed via `RxString` or `TextEditingController` defined inside the controller.
4. **UI Updates**: Handled reactively using `Obx(() => ...)` or `GetBuilder(...)`.

### Example Controller:
```dart
class HomeController extends GetxController {
  var isLoading = false.obs;
  var username = "".obs;
}
```

### Example View:
```dart
Obx(() => Text(controller.username.value));
```

---

## When to Use StatefulWidget
Use `StatefulWidget` only for UI-specific controllers and lifecycles:
1. `AnimationController` / `TickerProviderStateMixin`
2. `TabController`
3. `PageController`

---

## Core GetX Features
1. **State Management**:
   - `Obx(() => ...)`: Reactive UI updates on `.obs` variable changes.
   - `.obs`: Observable variables (`RxBool`, `RxString`, `RxInt`, `RxList`, etc.).
   - `GetBuilder()`: Manual rebuild state management.
2. **Controllers**:
   - Encapsulate all business logic such as API calls, validation rules, repository interactions, and state updates.
3. **Routing**:
   - Always use GetX routing methods instead of `Navigator`:
     - `Get.to(...)`
     - `Get.offAll(...)`
     - `Get.toNamed(...)`
     - `Get.back()`

---

## Ideal Project Structure
Always place app features under an `app` directory with this layout:
- `lib/app/bindings/`: Dependency injection and GetX Bindings.
- `lib/app/controllers/`: Global and feature business logic.
- `lib/app/models/`: Data classes and model schemas.
- `lib/app/views/`: Pure UI views (zero business logic, use GetX routing).
- `lib/app/services/`: API services and reusable shared logic.
- `lib/app/routes/`: Route names and AppPages navigation configuration.
- `lib/app/modules/`: Module-based MVC format (`modules/<feature>/{bindings, controllers, views}`).

---

## 🚨 HIGHEST PRIORITY (MUST TAKE NOTE)
1. **All business logic must be placed in controllers.** Views must remain pure UI presentation layers.
2. **Organize widgets into clean, reusable classes**:
   - Identify common visual components across screens.
   - Extract them into dedicated, reusable widgets.
   - Pass parameters, callbacks, or styling conditions to eliminate code duplication and maximize readability and maintainability.
