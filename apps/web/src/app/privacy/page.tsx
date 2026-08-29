import { PublicLayout } from '@/components/layout/PublicLayout';
import { Shield, Lock } from 'lucide-react';

export default function PrivacyPage() {
  const lastUpdated = 'August 29, 2026';

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="container-wide max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 mb-6">
            <Shield className="h-3.5 w-3.5" />
            Legal
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-500 text-sm">Last updated: {lastUpdated}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container-wide max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-12 space-y-10">

            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-sm text-indigo-800">
              <strong>Your privacy matters to us.</strong> This policy explains what data we collect,
              how we use it, and what controls you have over it.
            </div>

            <Section title="1. Who We Are">
              <p>
                Yantrix Technologies Pvt. Ltd. (&quot;Yantrix&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the Yantrix
                platform at yantrix.in. This Privacy Policy describes how we collect, use, and share
                information about you when you use our platform.
              </p>
            </Section>

            <Section title="2. Information We Collect">
              <p><strong>Account Information:</strong> When you register, we collect your name, email address, phone number, and business details including GSTIN.</p>
              <p><strong>Business Data:</strong> Invoice details, customer records, product information, payment records, and other data you input into the platform.</p>
              <p><strong>Usage Data:</strong> Log files, IP addresses, browser type, pages visited, and features used — to improve our service.</p>
              <p><strong>Payment Information:</strong> Billing details processed securely through our payment partner (Razorpay). We do not store full card numbers.</p>
              <p><strong>Communications:</strong> If you contact our support team, we retain those communications to improve our service.</p>

              <h3 className="font-semibold text-gray-900 mt-6 mb-3">Permission-Based Data Collection (Mobile Apps)</h3>
              <p>Our mobile applications may request the following device permissions:</p>
              <ul>
                <li><strong>Location Permission:</strong> Used to identify user location for location-based services, analytics, and service improvements. Location data is never shared with third parties without explicit consent.</li>
                <li><strong>Camera Permission:</strong> Used for document scanning, profile picture uploads, and video-based features within our applications. Camera access is only activated when the user initiates these features.</li>
                <li><strong>SMS Permission:</strong> Used to read SMS messages for financial transaction authentication and two-factor verification during payment processing. SMS data is processed securely and immediately after use.</li>
                <li><strong>Contacts Permission:</strong> Used to access contact information for business customer management and communication features within our CRM tools.</li>
                <li><strong>Storage Permission:</strong> Used to save and retrieve invoices, documents, and business data on your device for offline access.</li>
              </ul>
            </Section>

            <Section title="3. How We Use Your Information">
              <p><strong>Platform Operations:</strong></p>
              <ul>
                <li>To provide, maintain, and improve the Yantrix platform and mobile applications</li>
                <li>To process payments and manage your subscription</li>
                <li>To send transactional emails (invoice confirmations, payment receipts)</li>
                <li>To provide customer support and respond to inquiries</li>
              </ul>

              <p className="mt-4"><strong>Analytics and Improvement:</strong></p>
              <ul>
                <li>To analyze usage patterns and improve user experience</li>
                <li>To monitor app performance and fix technical issues</li>
                <li>To understand feature adoption and prioritize development</li>
                <li>To send product updates and feature announcements (you can opt out via app settings)</li>
              </ul>

              <p className="mt-4"><strong>Security and Compliance:</strong></p>
              <ul>
                <li>To detect and prevent fraud, abuse, and unauthorized access</li>
                <li>To comply with legal obligations under Indian law (GST regulations, taxation, etc.)</li>
                <li>To respond to legal requests or government inquiries</li>
                <li>To protect the rights, privacy, and safety of our users and the platform</li>
              </ul>

              <p className="mt-4"><strong>Permission-Specific Use:</strong></p>
              <ul>
                <li><strong>Location Data:</strong> Used only for location-specific services and analytics. You can disable location tracking in your device settings or app preferences at any time.</li>
                <li><strong>Camera/Scanner:</strong> Processed only on your device. No camera data is stored or transmitted except for the documents/images you choose to upload.</li>
                <li><strong>SMS/OTP:</strong> Read only for authentication purposes. OTP messages are not stored after use.</li>
                <li><strong>Contacts:</strong> Stored locally on your device. Only contacts you explicitly add to the platform are synced to our servers.</li>
              </ul>
            </Section>

            <Section title="4. Data Sharing">
              <p>We do not sell your personal data to third parties for marketing purposes. We share data only in these circumstances:</p>
              <ul>
                <li><strong>Service Providers:</strong> Trusted third parties who help us operate the platform:
                  <ul className="mt-2 ml-4">
                    <li>Payment Processors (Razorpay) — to process transactions securely</li>
                    <li>Email Service Providers — to send transactional and notification emails</li>
                    <li>Cloud Hosting Providers — to store and backup your data</li>
                    <li>Analytics Services — to understand usage patterns and improve our platform</li>
                  </ul>
                  These service providers are contractually bound to protect your data and use it only for specified purposes.
                </li>
                <li><strong>Google Analytics:</strong> We use Google Analytics to track app usage and user behavior. Google may use this data according to their privacy policy. You can control this via app settings.</li>
                <li><strong>Legal Requirements:</strong> If required by law, court order, or government authority in India (including GST authorities, IT department, etc.), we will disclose data as mandated.</li>
                <li><strong>Business Transfer:</strong> In the event of a merger, acquisition, or sale of assets, user data may be transferred with appropriate notification and privacy protection measures.</li>
              </ul>
            </Section>

            <Section title="5. Data Storage and Security">
              <p>
                Your data is stored on servers located in India. We use industry-standard security measures
                including 256-bit SSL encryption, regular security audits, and access controls.
              </p>
              <p>
                While we take reasonable precautions, no internet transmission is 100% secure. We encourage
                you to use a strong, unique password and enable two-factor authentication.
              </p>
            </Section>

            <Section title="6. Data Retention">
              <p>
                We retain your data as long as your account is active. If you delete your account,
                we will permanently delete your data within 90 days, except where we are required to
                retain it for legal or compliance purposes.
              </p>
              <p>
                Invoice data may be retained for up to 7 years to comply with GST record-keeping requirements
                under the CGST Act, 2017.
              </p>
            </Section>

            <Section title="7. Your Rights">
              <p>As a user of Yantrix, you have the right to:</p>
              <ul>
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update inaccurate or incomplete data</li>
                <li><strong>Deletion:</strong> Request deletion of your account and associated data</li>
                <li><strong>Export:</strong> Download your business data in CSV or PDF format from Settings</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing emails at any time</li>
              </ul>
              <p>To exercise these rights, contact <a href="mailto:support@yantrixlab.com" className="text-indigo-600 hover:underline">support@yantrixlab.com</a>.</p>
            </Section>

            <Section title="8. Cookies">
              <p>
                We use cookies and similar technologies to maintain your session, remember your preferences,
                and analyze usage patterns. You can control cookie settings through your browser.
              </p>
              <p>
                We do not use cookies for cross-site advertising or sell cookie data to third parties.
              </p>
            </Section>

            <Section title="9. Children's Privacy">
              <p>
                Yantrix applications are intended for use by businesses and professionals and are not directed at individuals under 18 years of age. We do not knowingly collect personal data from minors. If we become aware that a minor has provided us with personal data, we will take steps to delete such data and terminate the minor's account.
              </p>
            </Section>

            <Section title="10. Changes to This Policy">
              <p>
                We may update this Privacy Policy periodically to reflect changes in our practices, technology, and legal requirements. We will notify you via email or in-app notification when significant changes are made. Continued use of the Service constitutes acceptance of the updated policy.
              </p>
            </Section>

            <Section title="11. Google Play Store Compliance">
              <p>
                As required by Google Play Store policies, we maintain this Privacy Policy to be transparent about:
              </p>
              <ul>
                <li>What sensitive permissions our apps request and why (location, camera, SMS, contacts, storage)</li>
                <li>How we collect, use, and protect user data</li>
                <li>How users can control their data and privacy settings</li>
                <li>Our data security measures and retention policies</li>
              </ul>
              <p className="mt-4">
                Users can review app permissions in their Android device settings and revoke permissions at any time.
                Revoking permissions may limit certain app features but will not affect core functionality.
              </p>
            </Section>

            <Section title="12. Contact">
              <p>
                For privacy-related queries, contact us at{' '}
                <a href="mailto:support@yantrixlab.com" className="text-indigo-600 hover:underline">support@yantrixlab.com</a>
                {' '}or write to us at:
              </p>
              <div className="bg-gray-50 rounded-lg p-4 text-sm">
                <p className="font-medium text-gray-900">Yantrix Labs</p>
                <p>JB 163, Block 9</p>
                <p>Faraka, WB - 742212</p>
                <p>India</p>
                <p className="mt-3">
                  <strong>Support Email:</strong>{' '}
                  <a href="mailto:support@yantrixlab.com" className="text-indigo-600 hover:underline">support@yantrixlab.com</a>
                </p>
                <p className="mt-2">
                  <strong>Website:</strong>{' '}
                  <a href="https://yantrixlabs.com" className="text-indigo-600 hover:underline">yantrixlabs.com</a>
                </p>
              </div>
            </Section>

          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
      <div className="text-gray-600 leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2">
        {children}
      </div>
    </div>
  );
}
