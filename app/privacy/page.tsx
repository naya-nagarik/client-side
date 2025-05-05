import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function PrivacyPage() {
  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>Last updated: March 20, 2025</p>
          
          <h2>Introduction</h2>
          <p>
            Naya Nagarik ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we handle your data when you use our application.
          </p>

          <h2>Information We Collect</h2>
          <ul>
            <li>Personal identification information (Name, email address, phone number)</li>
            <li>Government-issued identification details</li>
            <li>Usage data and preferences</li>
            <li>Device and technical information</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <ul>
            <li>To provide and maintain our service</li>
            <li>To notify you about changes to our service</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information to improve our service</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.
          </p>

          <h2>Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal information. You can exercise these rights by contacting us through the provided contact information.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at privacy@nayanagarik.gov.np
          </p>
        </CardContent>
      </Card>
    </div>
  )
}