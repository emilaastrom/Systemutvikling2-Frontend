import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DarkModeToggle from '../app/components/settings/DarkModeToggle';
import ThemeManager from '../app/components/settings/ThemeManager'; // Import ThemeManager if it's needed for testing

// Mock window.matchMedia before rendering the component
beforeAll(() => {
  window.matchMedia = jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated, but still necessary for compatibility
    removeListener: jest.fn(), // Deprecated, but still necessary for compatibility
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
});

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

    fireEvent.click(lightModeRadio);

    // Assert that the light mode radio button is checked
    expect(lightModeRadio).toBeChecked();
    expect(darkModeRadio).not.toBeChecked();
    expect(autoModeRadio).not.toBeChecked();

    // You can add more assertions as needed based on your component's behavior
  });
});

// Test to select the "Auto / system" radio button
test('selects Auto / system radio button', () => {
  render(<DarkModeToggle />);

  // Find the radio button by its label text
  const autoModeRadio = screen.getByLabelText('Auto / system');

  // Simulate a click event on the radio button
  fireEvent.click(autoModeRadio);

  // Assert that the radio button is checked after clicking it
  expect(autoModeRadio).toBeChecked();
});

