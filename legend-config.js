window.legendGroups = [
  {
    title: 'Eligible Parcels',
    open: true,
    layers: [
      {
        label: 'Eligible C&I Parcels',
        layerIds: ['Eligible Parcels', 'Eligible Parcels Polygons'],
        checkboxId: 'layer-eligible-parcels',
        legendType: 'single',
        symbol: 'point',
        color: '#f122c8',
        defaultVisible: true,
      }
    ]
  },
  {
    title: 'Utility Circuits',
    open: true,
    layers: [
      {
        label: '2026 DCM-Eligible Circuits',
        layerIds: ['2026 DCM-Eligible Circuits'],
        checkboxId: 'layer-2026-dcm',
        legendType: 'single',
        symbol: 'line',
        color: '#08bf70',
        defaultVisible: true,
      },
      {
        label: 'Eversource (Western Mass. only)',
        layerIds: ['Eversource Circuits'],
        checkboxId: 'layer-eversource-circuits',
        legendType: 'single',
        symbol: 'line',
        color: '#2caae2',
        defaultVisible: false,
      },
      {
        label: 'National Grid',
        layerIds: ['National Grid Circuits'],
        checkboxId: 'layer-natl-grid-circuits',
        legendType: 'single',
        symbol: 'line',
        color: '#00148c',
        defaultVisible: false,
      }
    ]
  }
]
