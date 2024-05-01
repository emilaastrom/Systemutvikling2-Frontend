import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DarkModeToggle from './DarkModeToggle';
import ThemeManager from './ThemeManager'; // Import ThemeManager if it's needed for testing

describe('DarkModeToggle component', () => {
  test('renders DarkModeToggle component', () => {
    render(<DarkModeToggle />);

    // Assert that the component renders without errors
    const darkModeToggleElement = screen.getByTestId('darkmodetoggle');
    expect(darkModeToggleElement).toBeInTheDocument();

    // Test radio button functionality

    // Assert that initially, no radio button is checked
    const lightModeRadio = screen.getByLabelText('Lys modus');
    const darkModeRadio = screen.getByLabelText('Mørk modus');
    const autoModeRadio = screen.getByLabelText('Auto / system');

    expect(lightModeRadio).not.toBeChecked();
    expect(darkModeRadio).not.toBeChecked();
    expect(autoModeRadio).not.toBeChecked();

    // Simulate clicking on the dark mode radio button
    fireEvent.click(darkModeRadio);

    // Assert that the dark mode radio button is checked
    expect(lightModeRadio).not.toBeChecked();
    expect(darkModeRadio).toBeChecked();
    expect(autoModeRadio).not.toBeChecked();

    // You can add more assertions as needed based on your component's behavior
  });
});
