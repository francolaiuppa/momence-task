const getFlagEmoji = (code: string) => {
    const flags: Record<string, string> = {
      USD: '🇺🇸',
      EUR: '🇪🇺',
      GBP: '🇬🇧',
      JPY: '🇯🇵',
      CAD: '🇨🇦',
      AUD: '🇦🇺',
      BRL: '🇧🇷',
      CNY: '🇨🇳',
      BGN: '🇧🇬',
      DKK: '🇩🇰',
      HKD: '🇭🇰',
      HUF: '🇭🇺',
      ISK: '🇮🇸',
      XDR: '🏳️',
      INR: '🇮🇳',
      IDR: '🇮🇩',
      ILS: '🇮🇱',
      MYR: '🇲🇾',
      MXN: '🇲🇽',
      NZD: '🇳🇿',
      NOK: '🇳🇴',
      PHP: '🇵🇭',
      PLN: '🇵🇱',
      RON: '🇷🇴',
      SGD: '🇸🇬',
      ZAR: '🇿🇦',
      KRW: '🇰🇷',
      SEK: '🇸🇪',
      CHF: '🇨🇭',
      THB: '🇹🇭',
      TRY: '🇹🇷',
    };
  
    return flags[code] || '🏳️';
  };
export default getFlagEmoji;