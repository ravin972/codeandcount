
import { ShieldAlert } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for CodeAndCount.com, compliant with Indian law.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background text-foreground">
      <header className="py-16 md:py-24 text-center bg-secondary/70 dark:bg-secondary/70 backdrop-blur-lg border-b border-white/10 dark:border-neutral-700/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 flex items-center justify-center">
            <ShieldAlert className="h-12 w-12 mr-4 text-primary" />
            Privacy Policy
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Effective Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </header>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="bg-background/70 dark:bg-neutral-900/70 backdrop-blur-lg rounded-xl shadow-xl p-8 md:p-12 border border-white/10 dark:border-neutral-700/30 prose prose-lg lg:prose-xl max-w-none text-foreground prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/80">
            
            <p>
              CodeAndCount.com ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website codeandcount.com (the "Site"), including any other media form, media channel, mobile website, or mobile application related or connected thereto. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
            <p>
              This Privacy Policy is framed in compliance with the Information Technology Act, 2000, and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 (the "SPDI Rules"), and other applicable laws in India.
            </p>

            <h2>1. Information We Collect</h2>
            <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
            <h3>Personal Data</h3>
            <p>
              Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site, such as online chat and message boards. You are under no obligation to provide us with personal information of any kind, however, your refusal to do so may prevent you from using certain features of the Site.
            </p>
            <h3>Derivative Data</h3>
            <p>
              Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.
            </p>
            <h3>Financial Data</h3>
            <p>
             We do not collect or store any financial information. All payment transactions are processed through secure third-party payment gateways. We are not responsible for the data-collection or privacy practices of these third-party payment gateways.
            </p>
            
            <h2>2. How We Use Your Information</h2>
            <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
            <ul>
              <li>Create and manage your account.</li>
              <li>Email you regarding your account or order.</li>
              <li>Enable user-to-user communications.</li>
              <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
              <li>Generate a personal profile about you to make future visits to the Site more personalized.</li>
              <li>Increase the efficiency and operation of the Site.</li>
              <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
              <li>Notify you of updates to the Site.</li>
              <li>Offer new products, services, and/or recommendations to you.</li>
              <li>Perform other business activities as needed.</li>
              <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.</li>
              <li>Process payments and refunds.</li>
              <li>Request feedback and contact you about your use of the Site.</li>
              <li>Resolve disputes and troubleshoot problems.</li>
              <li>Respond to product and customer service requests.</li>
              <li>Send you a newsletter.</li>
              <li>Solicit support for the Site.</li>
            </ul>

            <h2>3. Disclosure of Your Information</h2>
            <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
            <h3>By Law or to Protect Rights</h3>
            <p>
              If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation. This includes exchanging information with other entities for fraud protection and credit risk reduction.
            </p>
            <h3>Third-Party Service Providers</h3>
            <p>
              We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
            </p>
            <h3>Business Transfers</h3>
            <p>
              We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
            </p>

            <h2>4. Data Security</h2>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>

            <h2>5. Data Retention</h2>
            <p>
              We will only retain your personal information for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
            </p>

            <h2>6. Your Rights</h2>
            <p>Under Indian law, you have certain rights regarding your personal data. These may include the right to:</p>
            <ul>
              <li>Access your personal data.</li>
              <li>Correct any inaccurate or incomplete personal data.</li>
              <li>Withdraw your consent to the processing of your personal data (where processing is based on consent).</li>
              <li>Request the deletion of your personal data, subject to certain conditions.</li>
              <li>Lodge a complaint with the relevant data protection authority.</li>
            </ul>
            <p>To exercise these rights, please contact our Grievance Officer.</p>

            <h2>7. Cookies and Tracking Technologies</h2>
            <p>
              We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Site to help customize the Site and improve your experience. When you access the Site, your personal information is not collected through the use of tracking technology. Most browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality of the Site.
            </p>

            <h2>8. Third-Party Links</h2>
            <p>
              The Site may contain links to third-party websites and applications of interest, including advertisements and external services, that are not affiliated with us. Once you have used these links to leave the Site, any information you provide to these third parties is not covered by this Privacy Policy, and we cannot guarantee the safety and privacy of your information.
            </p>

            <h2>9. Grievance Officer</h2>
            <p>
              In accordance with the Information Technology Act, 2000 and rules made thereunder, the name and contact details of the Grievance Officer are provided below:
            </p>
            <p>
              [Name of Grievance Officer]<br />
              [Email Address of Grievance Officer]<br />
              [Contact Number of Grievance Officer]<br />
              CodeAndCount.com<br />
              spaze i tech park, Sec-49, Gurugram, Haryana, India
            </p>
            <p>Please contact the Grievance Officer if you have any concerns or grievances regarding the processing of your personal information.</p>

            <h2>10. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on the Site. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>

            <h2>11. Contact Us</h2>
            <p>
              If you have questions or comments about this Privacy Policy, please contact us at:
            </p>
            <p>
              CodeAndCount.com<br />
              Email: hello@codeandcount.com<br />
              Address: spaze i tech park, Sec-49, Gurugram, Haryana, India
            </p>

            <p className="mt-8 text-sm text-muted-foreground">
              <strong>Disclaimer:</strong> This is a template Privacy Policy and may not be suitable for all circumstances. It is crucial to consult with a legal professional to ensure your Privacy Policy is compliant with all applicable laws and tailored to your specific business practices and data processing activities in India.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
