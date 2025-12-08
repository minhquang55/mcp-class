# Figma Code Generation Rules for MCP Server

## 1. **Design Token Extraction**

- Extract color palettes from Figma styles and map to CSS custom properties
- Convert typography styles (font-family, size, weight, line-height) to design tokens
- Extract spacing values and create consistent spacing scale
- Map shadow styles to CSS box-shadow utilities
- Extract border-radius values for consistent corner rounding
- Convert effect styles (blur, opacity) to reusable CSS classes

## 2. **Component Generation Strategy**

- Identify Figma components and instances for React component creation
- Generate TypeScript React components with proper type definitions
- Use component variants as props (size, color, state variants)
- Auto-generate prop types based on Figma component properties
- Create shadcn/ui compatible components when possible
- Use composition pattern for complex nested components
- Generate separate files for each component following project structure

## 3. **Layout & Responsive Design**

- Convert Auto Layout to Flexbox/Grid CSS
- Extract constraints and convert to responsive CSS
- Generate media queries based on Figma breakpoints
- Use CSS Grid for complex layouts, Flexbox for simpler ones
- Preserve spacing and alignment from Figma design
- Convert absolute positioning only when necessary
- Generate mobile-first responsive styles

## 4. **Asset Export & Optimization**

- Export SVG icons and place in `src/assets/images/svgs/`
- Export images in appropriate formats (WebP, PNG, JPG)
- Optimize SVG code (remove unnecessary attributes, simplify paths)
- Generate image components with proper alt text placeholders
- Create icon components as React components with customizable props
- Use public folder for static assets that don't need bundling
- Follow naming convention: kebab-case for files, PascalCase for components

## 5. **Styling Implementation**

- Use Tailwind CSS utility classes as primary styling method
- Extract custom CSS only for complex animations or unique styles
- Place custom CSS in appropriate files under `src/css/`
- Use CSS modules for component-specific styles if needed
- Leverage shadcn/ui theming system for consistent design
- Apply dark mode support using CSS variables
- Follow BEM naming convention for custom CSS classes

## 6. **Component Props & Variants**

- Generate TypeScript interfaces for all component props
- Map Figma variants to discriminated union types
- Use optional props with sensible defaults
- Include JSDoc comments for better IDE support
- Support size variants: sm, md, lg, xl
- Support color/theme variants from design system
- Support state variants: default, hover, active, disabled, loading

## 7. **Accessibility (a11y)**

- Add ARIA labels and roles based on component type
- Generate semantic HTML elements (button, nav, article, etc.)
- Include keyboard navigation support for interactive elements
- Add focus states and focus-visible styles
- Ensure color contrast meets WCAG AA standards
- Generate alt text placeholders for images
- Add screen reader only text where appropriate

## 8. **State Management & Interactivity**

- Identify interactive components and add event handlers
- Generate controlled component patterns for forms
- Use React hooks (useState, useEffect) appropriately
- Extract complex logic to custom hooks
- Generate form validation schemas using Zod (see `src/schema/`)
- Integrate with existing context providers when applicable
- Use React Hook Form for form components

## 9. **Code Quality & Best Practices**

- Follow existing project conventions and patterns
- Use functional components with TypeScript
- Implement proper error boundaries where needed
- Add loading states for async operations
- Use React.memo for performance optimization when necessary
- Follow React best practices (key props, pure functions, etc.)
- Add comments for complex logic only

## 10. **Integration with Existing Codebase**

- Place components in appropriate directories under `src/components/`
- Follow existing import patterns and aliases
- Integrate with existing theme provider
- Use existing utility functions from `src/lib/utils.ts`
- Match existing component API patterns
- Leverage existing shadcn/ui components
- Follow i18n patterns if component contains text content

## 11. **File Organization**

- Component files: `src/components/[category]/ComponentName.tsx`
- Type definitions: Include in component file or `src/types/`
- Styles: Co-locate or use Tailwind classes
- Assets: Place in appropriate `src/assets/images/` subdirectory
- Context providers: `src/context/[FeatureName]Context/index.tsx`
- API integration: `src/api/[feature].api.ts`
- Schemas: `src/schema/[feature].schema.ts`
- Mock data: `src/data/[feature].json` for static data
- Locale files: `src/locales/[language]/[feature].json` for i18n strings

## 11.1. **Data Files & i18n**

- **Mock Data Structure**: Place static/mock data in `src/data/` as JSON files

  - Use descriptive filenames: `customers.json`, `employees.json`, `products.json`
  - Structure data as arrays of objects with consistent typing
  - Include all necessary fields for component rendering
  - Add TypeScript interfaces in corresponding type files

- **Internationalization (i18n)**:

  - Language files located in `src/locales/[language]/` (e.g., `jp/`, `en/`, `vi/`)
  - Separate JSON files by feature: `button.json`, `employee.json`, `message.json`
  - Use nested structure for organization:
    ```json
    {
      "title": "Employee Management",
      "actions": {
        "add": "Add Employee",
        "edit": "Edit Employee",
        "delete": "Delete Employee"
      },
      "fields": {
        "name": "Name",
        "email": "Email"
      }
    }
    ```
  - Use translation keys in components via i18n library (see `src/lib/i18n.ts`)
  - Never hardcode user-facing text; always use translation keys
  - Add translation strings to ALL language files to maintain parity
  - Use descriptive key names: `feature.section.element` pattern
  - Languege default: japan

- **Data Integration Rules**:
  - Import data types from `src/types/` for type safety
  - Use API files in `src/api/` for dynamic data fetching
  - Mock data files should match API response structure
  - Include realistic sample data for testing and development
  - Document data structure in JSDoc comments

## 12. **Naming Conventions**

- Components: PascalCase (e.g., `UserProfile.tsx`)
- Files: kebab-case for assets (e.g., `user-avatar.svg`)
- Props interfaces: `ComponentNameProps`
- Event handlers: `handleEventName` or `onEventName`
- Boolean props: `isLoading`, `hasError`, `shouldRender`
- CSS classes: kebab-case or camelCase for Tailwind

## 13. **Documentation Generation**

- Add TypeScript JSDoc comments to components
- Document prop types with descriptions
- Include usage examples in comments for complex components
- Document any non-obvious behavior or side effects
- Add README.md for major feature components

## 14. **Testing Considerations**

- Generate components with testability in mind
- Use data-testid attributes for testing hooks
- Avoid inline functions in JSX when possible
- Keep components pure and side-effect free when possible
- Separate business logic from presentation

## 15. **Performance Optimization**

- Lazy load heavy components and images
- Use React.lazy and Suspense for code splitting
- Optimize re-renders with proper memoization
- Use appropriate image formats and sizes
- Implement virtualization for long lists
- Debounce/throttle expensive operations

## 16. **Animation & Transitions**

- Convert Figma smart animate to CSS transitions
- Use Framer Motion for complex animations
- Keep animations subtle and purposeful
- Use CSS transforms for better performance
- Respect prefers-reduced-motion user preference
- Define animation durations in design tokens

## 17. **Form Components**

- Generate form components compatible with React Hook Form
- Include validation logic using Zod schemas
- Add proper input types and attributes
- Implement error message display
- Add helper text and labels
- Support disabled and readonly states

## 18. **Icon & SVG Handling**

- Convert Figma icons to React components
- Accept size and color props for flexibility
- Use currentColor for stroke/fill to inherit text color
- Provide viewBox for proper scaling
- Add title prop for accessibility
- Export as functional components

## 19. **Theme & Dark Mode**

- Use CSS custom properties for theme colors
- Support both light and dark mode variants
- Follow existing theme structure in `src/css/theme/`
- Use theme-aware components from shadcn/ui
- Test both themes during generation
- Avoid hardcoded colors

## 20. **Error Handling & Edge Cases**

- Handle loading states gracefully
- Display appropriate error messages
- Handle empty states with proper UI
- Validate props with TypeScript
- Provide fallback content for failed loads
- Handle network errors for API-dependent components
