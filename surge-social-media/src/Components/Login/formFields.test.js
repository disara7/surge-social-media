import '@testing-library/jest-dom';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import FormFields from './formFields'; 

const mockSetFirstName = jest.fn();
const mockSetLastName = jest.fn();
const mockSetEmail = jest.fn();
const mockSetPassword = jest.fn();
const mockSetConfirmPassword = jest.fn();
const mockSetProfilePicture = jest.fn();

describe('FormFields Component', () => {
  

  test('submits the form when all required fields are filled', async () => {
    render(
      <FormFields
        isLogin={false}
        firstName="John"
        setFirstName={mockSetFirstName}
        lastName="Doe"
        setLastName={mockSetLastName}
        email="john.doe@example.com"
        setEmail={mockSetEmail}
        password="password123"
        setPassword={mockSetPassword}
        confirmPassword="password123"
        setConfirmPassword={mockSetConfirmPassword}
        setProfilePicture={mockSetProfilePicture}
        profilePicture={null}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Enter your first name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your last name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your email or username'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm your password'), { target: { value: 'password123' } });

    fireEvent.submit(screen.getByRole('form'));

    // Wait for the form submission to complete and check that no validation errors are shown
    await waitFor(() => {
      expect(screen.queryByText(/First Name is required/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Last Name is required/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Email is required/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Password is required/i)).not.toBeInTheDocument();
    });
  });


  
});
