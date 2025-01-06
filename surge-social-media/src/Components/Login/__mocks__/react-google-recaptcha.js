jest.mock('react-google-recaptcha', () => {
    return function ReCAPTCHA(props) {
      return (
        <div data-testid="recaptcha-mock" onClick={() => props.onChange('mock-value')}>
          Mock ReCAPTCHA
        </div>
      );
    };
  });
  