# infinite-animation-component

Universal and customizable infinite animation component for web loading screens/pages.

**Only A-Z and 0-9 are supported at the time; other characters will be skipped.**

This is a [Next.js](https://nextjs.org) project that includes the **HaloLoader** component (GSAP-based SVG text animation).

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the loader (text "EMT 07") and then the main page.

## Usage

Use the `HaloLoader` component with any supported text (letters and numbers):

```tsx
import HaloLoader from "@/components/HaloLoader";

<HaloLoader
  text="EMT 07"
  onComplete={() => {
    // e.g. hide loading screen
    setTimeout(() => setIsLoading(false), 500);
  }}
/>
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [GSAP](https://gsap.com/)
