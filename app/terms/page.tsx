import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TermsPage() {
  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>Last updated: March 20, 2025</p>
          
          <h2>Agreement to Terms</h2>
          <p>
            By accessing or using Naya Nagarik, you agree to be bound by these Terms of Service and all applicable laws and regulations.
          </p>

          <h2>Use License</h2>
          <p>
            Permission is granted to temporarily access and use Naya Nagarik for personal, non-commercial purposes. This is the grant of a license, not a transfer of title.
          </p>

          <h2>User Responsibilities</h2>
          <ul>
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account</li>
            <li>Comply with all applicable laws and regulations</li>
            <li>Not interfere with or disrupt the service</li>
          </ul>

          <h2>Service Modifications</h2>
          <p>
            We reserve the right to modify or discontinue, temporarily or permanently, the service with or without notice.
          </p>

          <h2>Disclaimer</h2>
          <p>
            The service is provided "as is" without warranties of any kind, either express or implied, including, but not limited to, implied warranties of merchantability and fitness for a particular purpose.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
          </p>

          <h2>Contact Information</h2>
          <p>
            Questions about the Terms of Service should be sent to terms@nayanagarik.gov.np
          </p>
        </CardContent>
      </Card>
    </div>
  )
}