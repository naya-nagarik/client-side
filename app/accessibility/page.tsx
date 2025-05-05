import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AccessibilityPage() {
  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Accessibility Statement</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>Last updated: March 20, 2025</p>
          
          <h2>Our Commitment</h2>
          <p>
            Naya Nagarik is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
          </p>

          <h2>Conformance Status</h2>
          <p>
            The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. Naya Nagarik is partially conformant with WCAG 2.1 level AA.
          </p>

          <h2>Accessibility Features</h2>
          <ul>
            <li>High contrast mode support</li>
            <li>Keyboard navigation</li>
            <li>Screen reader compatibility</li>
            <li>Text resizing without loss of functionality</li>
            <li>Alternative text for images</li>
          </ul>

          <h2>Assistive Technologies Supported</h2>
          <ul>
            <li>Screen readers</li>
            <li>Voice recognition software</li>
            <li>Screen magnification software</li>
            <li>Alternative input devices</li>
          </ul>

          <h2>Known Limitations</h2>
          <p>
            Despite our best efforts to ensure accessibility of Naya Nagarik, there may be some limitations. Please contact us if you observe an issue.
          </p>

          <h2>Feedback</h2>
          <p>
            We welcome your feedback on the accessibility of Naya Nagarik. Please let us know if you encounter accessibility barriers by emailing accessibility@nayanagarik.gov.np
          </p>
        </CardContent>
      </Card>
    </div>
  )
}