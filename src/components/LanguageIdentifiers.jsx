import { useEffect, useState } from 'react';

const LanguageIdentifiers = () => {
  const [languageCodes, setLanguageCodes] = useState([]);
  const [identifiers, setIdentifiers] = useState({});

  useEffect(() => {
    // Fetch language codes
    fetch('http://api.alquran.cloud/v1/edition/language')
      .then(response => response.json())
      .then(data => setLanguageCodes(data.data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    // Fetch identifiers for each language code
    const fetchIdentifiers = async () => {
      const identifiers = {};

      for (const code of languageCodes) {
        try {
          const response = await fetch(`https://api.alquran.cloud/v1/edition/language/${code}`);
          const data = await response.json();
          const identifier = data.data[0]?.identifier;
          identifiers[code] = identifier;
        } catch (error) {
          console.error(`Failed to fetch identifier for language code ${code}`);
        }
      }

      setIdentifiers(identifiers);
    };

    if (languageCodes.length > 0) {
      fetchIdentifiers();
    }
  }, [languageCodes]);

  return (
    <div>
      <h2>Language Identifiers</h2>
      <ul>
        {Object.entries(identifiers).map(([code, identifier]) => (
          <li key={code}>{`${code}: ${identifier}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageIdentifiers;
