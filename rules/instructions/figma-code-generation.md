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

## 21. **Feature CRUD theo chuẩn `employee`**

> Khi generate code từ Figma cho các màn hình master/CRUD (table + form), **luôn cố gắng bám sát convention và style giống cụm `employee`** hiện có trong project.

### 21.1. **Cấu trúc thư mục & file (mirroring cụm `employee`)**

- **Ví dụ cụm `employee` đang có**:
  - List page: `src/views/master/employee/employee.tsx`
  - Create page: `src/views/master/employee/employee-create.tsx`
  - Edit page: `src/views/master/employee/employee-edit.tsx`
  - Form component: `src/components/master/employee/employee-form.tsx`
  - Constants (columns, default values): `src/constants/employee.constant.tsx`
  - API mock: `src/api/employee.api.ts`
  - Schema: `src/schema/employee.schema.ts`
  - Data mock: `src/data/employees.json`
  - Types: `src/types/apps/employee.ts`
  - Locale: `src/locales/jp/employee.json` (và các ngôn ngữ khác nếu có)

- **Cho feature mới `<Feature>` kiểu master/CRUD**:
  - Tạo cấu trúc tương tự:
    - `src/views/master/<feature>/<feature>.tsx` (list)
    - `src/views/master/<feature>/<feature>-create.tsx`
    - `src/views/master/<feature>/<feature>-edit.tsx`
    - `src/components/master/<feature>/<feature>-form.tsx`
    - `src/constants/<feature>.constant.tsx`
    - `src/api/<feature>.api.ts`
    - `src/schema/<feature>.schema.ts`
    - `src/data/<feature>s.json`
    - `src/types/apps/<feature>.ts`
    - `src/locales/[lang]/<feature>.json`
  - **Giữ nguyên pattern đặt tên** như `Employee`, `EmployeeForm`, `EmployeeCreate`, `EmployeeEdit` cho các feature khác (PascalCase cho component, kebab-case cho file TSX).

### 21.2. **List page style (giống `employee.tsx`)**

- **Sử dụng `DynamicTable`**:
  - Import: `import DynamicTable from '@/components/utilities/table/DinamicTable';`
  - Columns import từ constants: `import { columns } from 'src/constants/<feature>.constant';`
  - Type generic: `columns: ColumnInput<FeatureRow>[];`
  - Data state: `const [data, setData] = useState<Array<FeatureRow>>([]);`
  - Fetch data trong `useEffect` bằng API mock tương ứng (`getList<Features>()`).
  - Truyền prop:
    - `columns={columns}`
    - `data={data}`
    - `title={t('<feature>:title')}`
    - `onRowClick` dùng `generatePath` + `ROUTES.MASTER.<FEATURE>.<FEATURE>_EDIT`
    - `action` là `Button` thêm mới (icon + navigate tới route create).

- **Hook & libs phải dùng giống cụm `employee`**:
  - `useTranslation()` từ `react-i18next`
  - `useNavigate`, `generatePath` từ `react-router`
  - `Button` từ `src/components/ui/button`
  - `ROUTES` từ `src/constants/routes`

### 21.3. **Form page style (giống `employee-form.tsx`)**

- **Pattern form chung**:
  - Functional component dạng arrow function, default export: `const <Feature>Form = ({ isEdit = false }: Props) => { ... }`
  - Dùng `useForm` từ `react-hook-form` + `zodResolver`:
    - `defaultValues` import từ `src/constants/<feature>.constant`
    - `resolver` chọn giữa `<feature>Schema` và `<feature>EditSchema` giống `employee`.
  - Dùng wrapper `Form` và `SimpleField` từ `src/components/ui/form`.
  - Control từng field thông qua render prop `(field) => <Input {...field} />` hoặc component tương ứng (`Select`, `Calendar`, ...).
  - `onSubmit` hiện có thể chỉ `alert(JSON.stringify(data, null, 2));` (hoặc TODO comment) – **giữ đúng pattern này** cho tới khi tích hợp API thật.

- **Layout & Tailwind**:
  - Khối form chính bọc bởi:
    - `div` với class: `rounded-xl border border-defaultBorder md:p-6 p-4`
  - Title dùng `h5` với class `card-title`, text lấy từ i18n:
    - `isEdit ? t('<feature>:form.title_edit') : t('<feature>:form.title_create')`
  - Lưới field:
    - `div` grid với `className="mt-6 grid gap-y-2 gap-x-4 md:grid-cols-2"`
    - Mỗi field nằm trong `div` `md:col-span-1` (hoặc span khác nếu cần).
  - Footer button:
    - Container: `className="mt-6 flex w-full items-center justify-between gap-3"`
    - Button cancel: `variant="outline"`, `className="border-black-20 text-black-60"`, navigate về list route.
    - Button submit: `type="submit"`, text từ i18n `button:submit`.

- **Field types & component UI**:
  - Text input: `Input` từ `src/components/ui/input`.
  - Select: `Select`, `SelectTrigger`, `SelectContent`, `SelectItem`, `SelectValue` từ `src/components/ui/select`.
  - Date picker: pattern `Popover` + `Button` + `Calendar` giống field `startDate` của `employee`.
  - Password/confirm password: `Input` `type="password"`, custom `onChange` nếu cần chuẩn hoá giá trị.

### 21.4. **Schema, constants & types (bám chuẩn `employee`)**

- **Zod schema**:
  - Định nghĩa trong `src/schema/<feature>.schema.ts`.
  - Dùng `i18n.t('message:...')` cho message validate giống `employee.schema.ts`.
  - Nếu có schema edit: `<feature>EditSchema = <feature>Schema.omit(...).extend(...);` giống `employeeEditSchema`.
  - Export type: `export type <Feature>FormData = z.infer<typeof <feature>Schema>;`

- **Constants**:
  - `columns`: `ColumnInput<FeatureRow>[]`, text header luôn dùng i18n:
    - `header: i18n.t('<feature>:columns.<fieldKey>')`
  - `default<Feature>FormValues`: object typed theo `<Feature>FormData`, cung cấp giá trị mặc định giống `defaultEmployeeFormValues`.

- **Types**:
  - Đặt trong `src/types/apps/<feature>.ts`.
  - Đặt tên interface/típe theo PascalCase, ví dụ: `<Feature>Row`.

### 21.5. **i18n & route convention giống `employee`**

- **i18n key pattern**:
  - Tiêu đề list: `<feature>:title`
  - Columns: `<feature>:columns.<field>`
  - Form:
    - Title: `<feature>:form.title_create`, `<feature>:form.title_edit`
    - Fields: `<feature>:form.fields.<field>`
    - Các nhóm con (ví dụ positions, statuses): `<feature>:form.<group>.<item>`
  - Message chung dùng namespace `message:` giống hiện tại.

- **Routes**:
  - Định nghĩa theo pattern `ROUTES.MASTER.<FEATURE>.<FEATURE>`, `. <FEATURE>_ADD`, `. <FEATURE>_EDIT` giống `ROUTES.MASTER.EMPLOYEE`.
  - Các page `...-create.tsx` và `...-edit.tsx` chỉ nên là wrapper mỏng:
    - Create: `return <<Feature>Form />;`
    - Edit: `return <<Feature>Form isEdit />;`

### 21.6. **Tóm tắt rule “giống cụm employee”**

- **Luôn**:
  - Mirror cấu trúc thư mục + tên file như `employee`.
  - Dùng `DynamicTable` + `columns` từ constants cho list.
  - Dùng `react-hook-form` + `zodResolver` + `Form`/`SimpleField` cho form.
  - Dùng i18n cho toàn bộ text (không hardcode).
  - Dùng `ROUTES` + `useNavigate`/`useParams` từ `react-router`.
  - Bám Tailwind class layout giống `employee-form.tsx` trừ khi Figma yêu cầu khác rõ ràng.
- Chỉ khác đi khi Figma/Business yêu cầu đặc biệt; mặc định, **code sinh ra phải trông và hành xử giống cụm `employee`**.

