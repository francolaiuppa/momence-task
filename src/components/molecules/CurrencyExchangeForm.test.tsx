import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CurrencyExchangeForm from './CurrencyExchangeForm';

const mockExchangeRates = [
  { country: 'Australia', currency: 'dollar', amount: 1, code: 'AUD', rate: 15.126, ratePer100CZK: 6.61 },
  { country: 'Brazil', currency: 'real', amount: 1, code: 'BRL', rate: 4.018, ratePer100CZK: 24.89 },
  { country: 'Japan', currency: 'yen', amount: 100, code: 'JPY', rate: 15.611, ratePer100CZK: 640.57 },
  { country: 'India', currency: 'rupee', amount: 100, code: 'INR', rate: 28.063, ratePer100CZK: 356.34 },
  { country: 'South Korea', currency: 'won', amount: 100, code: 'KRW', rate: 1.686, ratePer100CZK: 5931.2 },
];

describe('CurrencyExchangeForm', () => {
  it('renders the form with hardcoded and dynamic options', () => {
    render(<CurrencyExchangeForm exchangeRates={mockExchangeRates} />);

    // Check input and select exist
    expect(screen.getByLabelText(/Amount/i)).toBeInTheDocument();
    expect(document.querySelector('#To')).toBeInTheDocument(); // all the form items have an id attr that matches the label

    // Check hardcoded options
    const options = screen.getAllByRole('option');
    const optionTexts = options.map(option => option.textContent);

    // Ensure hardcoded options are present and in correct order
    const expectedOrder = ['🇪🇺 EUR - Euro', '🇬🇧 GBP - British Pound', '🇺🇸 USD - US Dollar'];
    expect(optionTexts.slice(0, 3)).toEqual(expectedOrder);

    // Ensure dynamic options are also present
    expect(optionTexts).toContain('🇦🇺 AUD - Australia dollar');
    expect(optionTexts).toContain('🇯🇵 JPY - Japan yen');
    expect(optionTexts).toContain('🇰🇷 KRW - South Korea won');
  });

  it('updates the input value correctly', () => {
    render(<CurrencyExchangeForm exchangeRates={mockExchangeRates} />);

    const amountInput = screen.getByLabelText(/Amount/i) as HTMLInputElement;
    fireEvent.change(amountInput, { target: { value: '123' } });

    expect(amountInput.value).toBe('123');
  });

  it('updates the dropdown value correctly', () => {
    render(<CurrencyExchangeForm exchangeRates={mockExchangeRates} />);

    const currencySelect = document.querySelector("#To") as HTMLSelectElement; // all the form elements have an id that matches the label prop
    fireEvent.change(currencySelect, { target: { value: 'JPY' } });

    expect(currencySelect.value).toBe('JPY');
  });

  it('calculates the correct total based on input and selection', () => {
    render(<CurrencyExchangeForm exchangeRates={mockExchangeRates} />);

    const amountInput = screen.getByLabelText(/Amount/i) as HTMLInputElement;
    const currencySelect = document.querySelector("#To") as HTMLSelectElement; // all the form elements have an id that matches the label prop

    // Simulate user input
    fireEvent.change(amountInput, { target: { value: '100' } });
    fireEvent.change(currencySelect, { target: { value: 'JPY' } });

    // Verify calculated total
    expect(screen.getByDisplayValue(/6.41 JPY/i)).toBeInTheDocument();
  });
});
