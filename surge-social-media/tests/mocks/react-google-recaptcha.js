export default function ReCAPTCHA(props) {
    return (
      <div
        data-testid="mock-recaptcha"
        onClick={() => props.onChange('mocked-captcha-value')}
      >
        Mock ReCAPTCHA
      </div>
    );
  }
  