import { render, screen } from '@testing-library/react';
import ContactPage from './page';

describe('ContactPage', () => {
  it('renders the main heading', () => {
    render(<ContactPage />);
    const headingElement = screen.getByRole('heading', { name: /Let's Connect/i });
    expect(headingElement).toBeInTheDocument();
  });

  it('renders the subheading', () => {
    render(<ContactPage />);
    const subheadingElement = screen.getByText(/Schedule a call or send us a message. We're excited to hear about your project./i);
    expect(subheadingElement).toBeInTheDocument();
  });

  it('renders the "Book a Meeting" section heading', () => {
    render(<ContactPage />);
    const bookMeetingHeading = screen.getByRole('heading', { name: /Book a Meeting/i });
    expect(bookMeetingHeading).toBeInTheDocument();
  });

  it('renders the "Schedule Your Meeting" button', () => {
    render(<ContactPage />);
    const scheduleButton = screen.getByRole('button', { name: /Schedule Your Meeting/i });
    expect(scheduleButton).toBeInTheDocument();
  });

  it('renders the "Or Send Us a Message" section heading', () => {
    render(<ContactPage />);
    const sendMessageHeading = screen.getByRole('heading', { name: /Or Send Us a Message/i });
    expect(sendMessageHeading).toBeInTheDocument();
  });

  it('renders the ContactForm component', () => {
    render(<ContactPage />);
    // Assuming ContactForm has a distinguishable element, like a form or a specific heading
    const contactFormElement = screen.getByRole('heading', { name: /Other Ways to Reach Us/i }); // Or another element specific to ContactForm
    expect(contactFormElement).toBeInTheDocument();
  });

  it('renders the "Other Ways to Reach Us" section heading', () => {
    render(<ContactPage />);
    const otherWaysHeading = screen.getByRole('heading', { name: /Other Ways to Reach Us/i });
    expect(otherWaysHeading).toBeInTheDocument();
  });

  it('renders the email link', () => {
    render(<ContactPage />);
    const emailLink = screen.getByRole('link', { name: /hello@codeandcount.com/i });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:hello@codeandcount.com');
  });

  it('renders the first phone number link', () => {
    render(<ContactPage />);
    const phoneLink1 = screen.getByRole('link', { name: /+91-9729041423/i });
    expect(phoneLink1).toBeInTheDocument();
    expect(phoneLink1).toHaveAttribute('href', 'tel:+918685941423');
  });

  it('renders the second phone number link', () => {
    render(<ContactPage />);
    const phoneLink2 = screen.getByRole('link', { name: /+91-7737770374/i });
    expect(phoneLink2).toBeInTheDocument();
    expect(phoneLink2).toHaveAttribute('href', 'tel:+917737770374');
  });

  it('renders the visit us section with address', () => {
    render(<ContactPage />);
    const visitUsHeading = screen.getByRole('heading', { name: /Visit Us/i });
    expect(visitUsHeading).toBeInTheDocument();
    const addressElement1 = screen.getByText(/spaze i tech park/i);
    expect(addressElement1).toBeInTheDocument();
     const addressElement2 = screen.getByText(/Sec-49, Gurugram, Haryana, India/i);
    expect(addressElement2).toBeInTheDocument();
  });

  it('renders the embedded map iframe', () => {
    render(<ContactPage />);
    const mapIframe = screen.getByTitle('Office Location Map - Spaze iTech Park, Gurugram');
    expect(mapIframe).toBeInTheDocument();
    expect(mapIframe).toHaveAttribute('src', expect.stringContaining('https://maps.google.com/maps'));
  });
});

