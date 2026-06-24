// Shared demo dataset for locations + filters (Albanian UI)
// Export via global variables (plain script include) to keep project simple.

(function () {
  const kosovoCities = [
    'Prishtinë',
    'Prizren',
    'Pejë',
    'Gjakovë',
    'Ferizaj',
    'Gjilan',
    'Mitrovicë',
    'Podujevë',
    'Vushtrri',
    'Suharekë',
    'Rahovec',
    'Malishevë',
    'Drenas',
    'Fushë Kosovë',
    'Lipjan',
    'Kaçanik',
    'Deçan',
    'Klinë',
    'Skenderaj',
    'Istog',
    'Dragash',
    'Obiliq',
    'Shtime',
    'Kamenicë',
    'Viti',
    'Junik',
    'Hani i Elezit',
    'Graçanicë',
    'Novobërdë',
    'Partesh',
    'Ranillug',
    'Kllokot',
    'Mamushë',
    'Zubin Potok',
    'Leposaviq',
    'Zveçan'
  ];

  const albaniaCities = [
    'Tiranë',
    'Durrës',
    'Vlorë',
    'Shkodër',
    'Elbasan',
    'Fier',
    'Korçë',
    'Berat',
    'Lushnjë',
    'Pogradec',
    'Lezhë',
    'Gjirokastër',
    'Kukës',
    'Sarandë',
    'Kavajë',
    'Laç',
    'Krujë',
    'Burrel',
    'Dibër',
    'Tepelenë',
    'Përmet',
    'Librazhd',
    'Gramsh',
    'Peshkopi',
    'Himarë',
    'Rrëshen',
    'Ballsh',
    'Patos',
    'Kuçovë',
    'Cërrik',
    'Roskovec',
    'Poliçan',
    'Bulqizë',
    'Maliq',
    'Delvinë',
    'Memaliaj',
    'Peqin',
    'Belsh',
    'Fushë-Arrëz',
    'Bajram Curri',
    'Konispol'
  ];

  // Note: we map City -> Municipality with the same name for demo.
  // This allows Municipality filtering without additional data sources.
  const locations = [];

  for (const c of kosovoCities) {
    locations.push({ country: 'Kosovë', city: c, municipality: c, region: 'Europe' });
  }
  for (const c of albaniaCities) {
    locations.push({ country: 'Shqipëri', city: c, municipality: c, region: 'Europe' });
  }

  // Helpers
  function unique(arr) {
    return Array.from(new Set(arr));
  }

  const cityOptions = unique(locations.map(l => l.city)).sort((a, b) => a.localeCompare(b, 'sq'));
  const municipalityOptions = unique(locations.map(l => l.municipality)).sort((a, b) => a.localeCompare(b, 'sq'));

  const filterModes = [
    { value: 'Remote', label: 'Remote' },
    { value: 'Hibrid', label: 'Hybrid' },
    { value: 'On-site', label: 'On-site' }
  ];

  const languageOptions = [
    { value: 'Shqip', label: 'Shqip (default)', enabled: true },
    { value: 'English', label: 'English', enabled: false },
    { value: 'German', label: 'German', enabled: false }
  ];

  const regionOptions = [
    { value: 'Kosovë', label: 'Kosovë' },
    { value: 'Shqipëri', label: 'Shqipëri' },
    { value: 'Europe', label: 'Europe' },
    { value: 'Worldwide', label: 'Worldwide' }
  ];

  // Expose globals
  window.PUNO_LOCATIONS = locations;
  window.PUNO_CITY_OPTIONS = cityOptions;
  window.PUNO_MUNICIPALITY_OPTIONS = municipalityOptions;
  window.PUNO_FILTER_MODES = filterModes;
  window.PUNO_LANGUAGE_OPTIONS = languageOptions;
  window.PUNO_REGION_OPTIONS = regionOptions;
})();

