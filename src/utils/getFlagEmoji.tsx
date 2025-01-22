const getFlagEmoji = (code: string) => {
    const flags: Record<string, string> = {
      AUD: '🇦🇺',
      BGN: '🇧🇬',
      BRL: '🇧🇷',
      CAD: '🇨🇦',
      CHF: '🇨🇭',
      CNY: '🇨🇳',
      CZK: '🇨🇿',
      DKK: '🇩🇰',
      EUR: '🇪🇺',
      GBP: '🇬🇧',
      HKD: '🇭🇰',
      HUF: '🇭🇺',
      IDR: '🇮🇩',
      ILS: '🇮🇱',
      INR: '🇮🇳',
      ISK: '🇮🇸',
      JPY: '🇯🇵',
      KRW: '🇰🇷',
      MXN: '🇲🇽',
      MYR: '🇲🇾',
      NOK: '🇳🇴',
      NZD: '🇳🇿',
      PHP: '🇵🇭',
      PLN: '🇵🇱',
      RON: '🇷🇴',
      SEK: '🇸🇪',
      SGD: '🇸🇬',
      THB: '🇹🇭',
      TRY: '🇹🇷',
      USD: '🇺🇸',
      XDR: '🏳️',
      ZAR: '🇿🇦',
    };
  
    return flags[code] || '🏳️';
  };
export default getFlagEmoji;