import { act, renderHook, waitFor } from '@testing-library/react';
import { vi, beforeEach, describe, it, expect } from 'vitest';
import useExchangeRates from './useExchangeRates';

const mockLocalStorage: Storage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => (store[key] = value.toString()),
    removeItem: (key: string) => delete store[key],
    clear: () => (store = {}),
    length: 0,
    key: (index: number) => Object.keys(store)[index] || null,
  };
})();


Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

describe('useExchangeRates', () => {
  const mockRates = [{ country: 'USA', currency: 'Dollar', amount: 1, code: 'USD', rate: 22, ratePer100CZK: 4.5 }];
  const MOCK_SUCCESS_RESPONSE = {
    rates: mockRates,
    nextExpiration: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
    lastUpdated: new Date().toISOString(),
  };
  beforeEach(() => {
    localStorage.clear();
    vi.resetAllMocks();
  });

  it('starts in loading state', async() => {
    let result: boolean[] = [];

    // TODO: fix this typing. Why isnt ts picking it up?
    (global as any).fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(MOCK_SUCCESS_RESPONSE),
      })
    );

    // Render the hook within act to handle state updates
    await act(async () => {
      renderHook(() => {
        const { loading } = useExchangeRates();
        result.push(loading);
      });
    });

    // Wait for the hook to complete its fetch
    await waitFor(() => {
      expect(result.length).toBe(2);
      expect(result[0]).toBe(true); // starts in loading
      expect(result[1]).toBe(false); // after fetching it sets loading to false
    });
  });

  it('fetches and sets exchange rates successfully', async () => {
    (global as any).fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(MOCK_SUCCESS_RESPONSE),
      })
    );

    const { result } = renderHook(() => useExchangeRates());

    // Wait for the hook to complete its fetch
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.exchangeRates).toEqual(mockRates);
    expect(result.current.lastUpdated).toEqual(MOCK_SUCCESS_RESPONSE.lastUpdated);
    expect(result.current.error).toBeNull();
  });

  it('handles errors gracefully', async () => {
    const errorMsg = "Unable to fetch exchange rates. Please try again later.";
    // Mock fetch failure
    (global as any).fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'whatever goes here' }),
      })
    );

    const { result } = renderHook(() => useExchangeRates());

    // Wait for the error to be set
    await waitFor(() => expect(result.current.error).toBeDefined());

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(errorMsg);
    expect(result.current.exchangeRates).toBeNull();
    expect(result.current.lastUpdated).toBeNull();
  });

  it('reads from localStorage when valid cache is available', async () => {
    const cachedRates = [{ country: 'Canada', currency: 'Dollar', amount: 1, code: 'CAD', rate: 18, ratePer100CZK: 5.5 }];
    const cachedExpiration = Date.now() + 1000 * 60 * 60; // 1 hour from now
    const cachedLastUpdated = new Date().toISOString();

    localStorage.setItem('cnb_data', JSON.stringify(cachedRates));
    localStorage.setItem('cnb_expiration', cachedExpiration.toString());
    localStorage.setItem('cnb_lastUpdated', cachedLastUpdated);

    // mock the fetch and ensure its never called
    const mock = vi.fn();
    (global as any).fetch = mock;

    const { result } = renderHook(() => useExchangeRates());

    // Should not try to call fetch bc we have valid data in cache
    expect(mock).not.toHaveBeenCalled();
    expect(result.current.loading).toBe(false);
    expect(result.current.exchangeRates).toEqual(cachedRates);
    expect(result.current.lastUpdated).toEqual(cachedLastUpdated);
  });

  it('clears expired cache from localStorage', async () => {
    const expiredExpiration = Date.now() - 1000 * 60 * 60; // 1 hour ago
    localStorage.setItem('cnb_expiration', expiredExpiration.toString());
    localStorage.setItem('cnb_data', JSON.stringify([{ fake: 'data' }]));
    localStorage.setItem('cnb_lastUpdated', 'some-old-timestamp');

    // Mock fetch
    const mock = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(MOCK_SUCCESS_RESPONSE),
      })
    );
    (global as any).fetch = mock;

    const { result } = renderHook(() => useExchangeRates());

    // Wait for the cache to be cleared and new data to be fetched
    await waitFor(() => expect(result.current.exchangeRates).toEqual(mockRates));

    expect(mock).toHaveBeenCalled();
    expect(localStorage.getItem('cnb_data')).not.toEqual(JSON.stringify([{ fake: 'data' }]));
    expect(localStorage.getItem('cnb_lastUpdated')).not.toEqual('some-old-timestamp');
    expect(localStorage.getItem('cnb_expiration')).not.toEqual(expiredExpiration.toString());
    expect(result.current.error).toBeNull();
  });
});
