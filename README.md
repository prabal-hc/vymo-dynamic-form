# Dynamic Form and Design System

A lead capture form built with React + TypeScript. The form renders itself from a config list, and the validation is one pure function. Styling is plain CSS modules, with no component library and no form library. The only build extra is a small PostCSS plugin, so media queries can use the breakpoint tokens.

## Install and run

```bash
npm install
npm run dev      # starts the app at http://localhost:5173
npm test         # runs the validation tests
npm run build    # type-checks and builds for production
```

## Folder layout

```
src/
  main.tsx                        renders the lead page
  styles/global.css               base styles, imports the tokens

  design-system/                  generic, knows nothing about leads
    tokens/tokens.css             colours, spacing, type
    tokens/breakpoints.css        breakpoints (--tablet-up, --desktop)
    atoms/                        TextInput, TextArea, Select, Checkbox, Button
    molecules/Field.tsx           label + control + hint + error
    form/
      types.ts                    FieldConfig, ValidationRule, FormValues
      DynamicForm.tsx             takes a config and renders one field per entry
      FormField.tsx               maps a field type to an atom (switch on type)
      formHelpers.ts              visibility, initial values
      DynamicForm.module.css      desktop and mobile form layout

  features/lead/                  everything specific to the lead form
    leadFormConfig.ts             the field config
    validation.ts                 validation rules (pure function)
    validation.test.ts            tests for the rules
    LeadCapturePage.tsx           the page
    LeadCapturePage.module.css    page container and card
```

## Where things live

- **Tokens**: `src/design-system/tokens/tokens.css` (CSS variables) and `src/design-system/tokens/breakpoints.css` (custom media, used as `@media (--desktop)`, wired up in `postcss.config.js`)
- **Atoms**: `src/design-system/atoms/`. They only receive a value, a label and events. They don't contain any lead rules.
- **Field molecule**: `src/design-system/molecules/Field.tsx`
- **Form**: `src/design-system/form/DynamicForm.tsx`
- **Config**: `src/features/lead/leadFormConfig.ts`
- **Validation rules**: `src/features/lead/validation.ts`. `validateForm(config, values)` returns an errors object. It skips hidden fields, so Company name is only required when Lead type is Company.

## Layout files

- **Desktop and mobile form layout**: `src/design-system/form/DynamicForm.module.css`
  - Over 1024px: two columns. Each field's `width` in the config (`half` or `full`) decides whether it takes one column or the whole row. The submit button sits at the end of the form.
  - 1024px and below (phone and tablet): one column, full-width inputs, and a sticky submit button at the bottom of the screen.
- **Page container**: `src/features/lead/LeadCapturePage.module.css` (full width on a phone, a card from 768px up)

## How it works

- **Adding a field** means adding one entry to `leadFormConfig.ts`. Adding a new field *type* means adding a case in `FormField.tsx`.
- **Conditional fields** use `showWhen: { field: 'leadType', equals: 'company' }`.
- **Errors** are recalculated from the values on every render. A field's error shows after the field is blurred, or after a submit attempt.
- **Submit** checks every rule. If anything is invalid, it shows all errors, focuses the first invalid field and blocks the submit. If everything passes, the visible values are logged to the console and shown on the page.
