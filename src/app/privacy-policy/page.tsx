
import { ShieldAlert } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for CodeAndCount.com, compliant with Indian law.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background text-foreground">
      <header className="py-16 md:py-24 text-center bg-secondary border-b border-border">
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
          <div className="bg-card rounded-xl shadow-xl p-8 md:p-12 border border-border prose prose-lg lg:prose-xl max-w-none text-foreground prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/80">
            
            <p>Welcome to CodeAndCount.com! We care about your privacy. This policy explains what information we collect, how we use it, and how we keep it safe when you use our website (codeandcount.com, the "Site") and services. By using our Site, you agree to this policy.</p>
            <p>We follow Indian laws, including the Information Technology Act, 2000, and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 (the "SPDI Rules").</p>

            <h2>What Information We Collect</h2><br />
            <p>We collect information in a few ways:</p>
            <h3>Information You Give Us</h3>
            <p>
              This includes details like your name, email address, phone number, and any other information you provide when you:
            </p>
            <ul>
              <li>Fill out forms (like our contact form).</li>
              <li>Register for an account (if applicable).</li>
              <li>Communicate with us directly.</li>
            </ul>
            <p>You don't have to give us this information, but some parts of our Site might not work as intended without it.</p>
            
            <h3>Information We Collect Automatically</h3>
            <p>
              When you use our Site, we automatically gather some technical information, such as:
            </p>
            <ul>
              <li>Your IP address.</li>
              <li>Your browser type and operating system.</li>
              <li>The pages you visit on our Site and how long you spend on them.</li>
              <li>How you interact with our Site.</li>
            </ul>
            <p>This helps us improve our Site and services.</p>

            <h3>Financial Information</h3>
            <p>
              <strong>We do not collect or store your financial details like credit card numbers.</strong> If you make a payment related to our services, it’s processed by secure third-party payment providers. We are not responsible for their privacy practices, so we encourage you to review their policies.
            </p>
            
            <h2>How We Use Your Information</h2><br />
            <p>We use your information to:</p>
            <ul>
              <li>Provide, operate, and maintain our Site and services.</li>
              <li>Improve, personalize, and expand our Site and services.</li>
              <li>Understand and analyze how you use our Site.</li>
              <li>Develop new products, services, features, and functionality.</li>
              <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the Site, and for marketing and promotional purposes (if you've agreed).</li>
              <li>Process your transactions (though payment details are handled by third parties).</li>
              <li>Send you emails.</li>
              <li>Find and prevent fraud.</li>
              <li>Comply with legal obligations.</li>
            </ul>

            <h2>When We Might Share Your Information</h2><br />
            <p>We don’t sell your personal information. However, we might share your information in these limited situations:</p>
            <ul>
              <li><strong>With Service Providers:</strong> We may share your information with trusted third-party companies that help us run our Site and business (e.g., website hosting, data analysis, email delivery, customer service). They are obligated to protect your information and can only use it for the services they provide to us.</li>
              <li><strong>For Legal Reasons:</strong> If required by law or if we believe it's necessary to respond to legal process, protect our rights or property, prevent harm, or ensure the safety of any person, we may disclose your information.</li>
              <li><strong>Business Transfers:</strong> If CodeAndCount.com is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you if this happens.</li>
            </ul>

            <h2>Keeping Your Information Safe</h2><br />
            <p>We take reasonable steps and use administrative, technical, and physical security measures to help protect your personal information from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction. However, please remember that no method of transmission over the internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.</p>

            <h2>How Long We Keep Your Information</h2><br />
            <p>We keep your personal information only for as long as necessary to fulfill the purposes we collected it for, including for satisfying any legal, accounting, or reporting requirements. When we no longer need your information, we will securely delete or anonymize it.</p>

            <h2>Your Privacy Rights</h2><br />
            <p>Under Indian law, you have certain rights regarding your personal information. These may include the right to:</p>
            <ul>
              <li>Access the personal information we hold about you.</li>
              <li>Request correction of any inaccurate or incomplete personal information.</li>
              <li>Withdraw your consent to our processing of your personal information (where we rely on consent as the legal basis for processing).</li>
              <li>Request the deletion or erasure of your personal information, under certain conditions.</li>
              <li>Lodge a complaint with the relevant data protection authority if you are unhappy with how we’ve handled your personal information.</li>
            </ul>
            <p>To exercise these rights, please contact us using the details provided in the "Contact Us" section below.</p>


            <h2>Cookies and Similar Technologies</h2><br />
            <p>We use cookies (small text files placed on your device) and similar tracking technologies to help our Site work better, analyze how you use it, and improve your experience. For example, cookies can remember your preferences or help us understand which parts of our Site are most popular. Your personal information is not typically collected through cookies unless you voluntarily provide it.</p>
            <p>Most web browsers are set to accept cookies by default. You can usually choose to set your browser to remove or reject browser cookies. Please note that if you choose to remove or reject cookies, this could affect the availability and functionality of our Site.</p>

            <h2>Links to Other Websites</h2><br />
            <p>Our Site may contain links to other websites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</p>

            <h2>Updates to This Privacy Policy</h2><br />
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Effective Date" at the top. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>

            <h2>Contact Us</h2><br />
            <p>If you have any questions or comments about this Privacy Policy, please feel free to contact us:</p>
            <p>
              CodeAndCount.com<br />
              Email: hello@codeandcount.com<br />
              Address: spaze i tech park, Sec-49, Gurugram, Haryana, India
            </p>
            
          </div>
        </div>
      </section>
    </div>
  );
}
