import {
  Accordion, AccordionHeader, AccordionItem, AccordionPanel, AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const faqs = [
  {
    q: "What is Mycogen UI?",
    a: "A token-driven admin template built with Next.js, Tailwind CSS and Base UI. It ships with dashboards, tables, forms and a full component gallery.",
  },
  {
    q: "Can I customize the theme?",
    a: "Yes. Open the settings panel from the header to switch accent colors, density and dark mode. Choices persist to localStorage.",
  },
  {
    q: "Is dark mode supported?",
    a: "Every page is designed for both light and dark themes with token-based colors, so contrast stays consistent in both.",
  },
  {
    q: "How do I add new pages?",
    a: "Create a route under src/app/(dashboard)/dashboard and register it in the sidebar navigation groups.",
  },
]

export default function AccordionPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Accordion</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Expandable sections for FAQs and grouped content.
        </p>
      </div>

      <Card size="sm" className="bg-card card-original shadow-sm">
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            FAQ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion>
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionHeader>
                  <AccordionTrigger>{f.q}</AccordionTrigger>
                </AccordionHeader>
                <AccordionPanel>{f.a}</AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
