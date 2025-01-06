import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';

// Mock ReCAPTCHA
jest.mock('react-google-recaptcha', () => {
  return function ReCAPTCHA(props) {
    return (
      <div data-testid="recaptcha-mock" onClick={() => props.onChange('mock-value')}>
        Mock ReCAPTCHA
      </div>
    );
  };
});

// Set environment variable
process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY = 'test-site-key';

test('displays CAPTCHA required message', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  
    // Simulate form submission without completing CAPTCHA
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
  
    // Expect at least one element with the CAPTCHA message to be displayed
    const captchaMessages = await screen.findAllByText(/Please complete the CAPTCHA/i);
    
    // Ensure at least one of the elements is in the document
    expect(captchaMessages.length).toBeGreaterThan(0);
    expect(captchaMessages[0]).toBeInTheDocument();
  });
  
