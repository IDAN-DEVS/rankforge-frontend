export default function DocsPage() {
  return (
    <section className="w-full md:py-32 py-12 flex flex-col items-center min-h-screen">
      <div className="max-w-4xl w-full px-4">
        <h1 className="text-4xl font-semibold mb-8">Documentation</h1>

        <div className="space-y-8">
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-medium mb-4">Overview</h2>
            <p className="text-muted-foreground mb-4">
              RankForge is a contributor platform for the idan-devs repository
              that enables contributors to create profiles, log contributions,
              and get evaluated by admins. The platform gamifies and structures
              the contribution process while providing visibility and rewards
              through a scoring system.
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-medium mb-4">Technical Stack</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Next.js 15 with App Router</li>
              <li>TypeScript for type safety</li>
              <li>Tailwind CSS v4.0 for styling</li>
              <li>Shadcn UI component library</li>
              <li>Motion One for animations</li>
              <li>Zustand for state management</li>
              <li>React Hook Form with Zod validation</li>
            </ul>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-medium mb-4">Authentication</h2>
            <div className="text-muted-foreground">
              <p className="mb-3">
                The platform uses GitHub OAuth for authentication.
              </p>
            </div>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-medium mb-4">Design System</h2>
            <div className="text-muted-foreground">
              <p className="mb-3">
                The platform uses a consistent design system with:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Bricolage Grosteque as primary font</li>
                <li>Minimalist and clean interface</li>
                <li>High contrast for readability</li>
                <li>Subtle animations for interactivity</li>
                <li>System-level dark mode support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
