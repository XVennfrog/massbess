// 0. Legend-Building Functions
function buildLegend(groups, map){
    const legend = document.getElementById('legend');

    legend.innerHTML = `
    <div class ="legend-title">Layers</div>

    ${groups.map(group => `
        <details class="legend-group" ${group.open ? 'open' : ''}>
            <summary class ="legend-group-title">${group.title}</summary>

            <div class="legend-group-body">
            ${group.layers.map(layer => buildLegendLayer(layer)).join('')}
            </div>
        </details>
    `).join('')}
    `;

    groups.forEach(group => {
        group.layers.forEach(layer => {
            initializeLayerToggle(layer, map);
        });

    });
}

function buildLegendLayer(layer) {
  return `
    <div class="legend-layer">
      <label class="legend-row ${layer.legendType === 'nested' ? 'legend-row-parent' : ''}" style="--legend-color:${layer.color || 'transparent'};">
        <input
          class="legend-checkbox"
          type="checkbox"
          id="${layer.checkboxId}"
          autocomplete="off"
          ${layer.defaultVisible ? 'checked' : ''}
        >

        ${layer.legendType === 'nested' ? '' : buildLegendIcon(layer)}

        <span class="legend-layer-name">${layer.label}</span>
      </label>

      ${buildNestedLegend(layer)}
    </div>
  `;
}

function buildLegendIcon(item) {
  if (item.symbol === 'point') {
    return `
      <svg class="legend-icon legend-icon-point" viewBox="0 0 20 20" aria-hidden="true">
        <circle cx="10" cy="10" r="6" fill="${item.color}"></circle>
      </svg>
    `;
  }

  if (item.symbol === 'line') {
    return `
      <svg class="legend-icon legend-icon-line" viewBox="0 0 28 20" aria-hidden="true">
        <line x1="3" y1="10" x2="25" y2="10" stroke="${item.color}" stroke-width="4" stroke-linecap="round"></line>
      </svg>
    `;
  }

  return ``;
}

function buildNestedLegend(layer) {
  if (layer.legendType !== 'nested' || !layer.stops) {
    return '';
  }

  return `
    <div class="nested-legend">
      ${layer.stops.map(stop => `
        <div class="nested-legend-row">
          ${buildLegendIcon({
            symbol: stop.symbol || layer.symbol || 'fill',
            color: stop.color
          })}
          <span class="nested-legend-label">${stop.label}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function initializeLayerToggle(layer, map) {
  const checkbox = document.getElementById(layer.checkboxId);

  if (!checkbox) {
    console.error(`Checkbox not found: ${layer.checkboxId}`);
    return;
  }

  checkbox.checked = layer.defaultVisible;

  setLayerVisibility(layer, map, layer.defaultVisible);
  updateLegendActiveState();

  checkbox.addEventListener('change', e => {
    setLayerVisibility(layer, map, e.target.checked);
    updateLegendActiveState();
  });
}

function setLayerVisibility(layer, map, isVisible) {
  const visibility = isVisible ? 'visible' : 'none';

  layer.layerIds.forEach(layerId => {
    if (map.getLayer(layerId)) {
      map.setLayoutProperty(layerId, 'visibility', visibility);
    } else {
      console.error(`Mapbox layer not found: ${layerId}`);
    }
  });
}

function updateLegendActiveState() {
  document.querySelectorAll('.legend-layer').forEach(layerEl => {
    const checkbox = layerEl.querySelector('input[type="checkbox"]');
    layerEl.classList.toggle('is-active', checkbox && checkbox.checked);
  });

  document.querySelectorAll('.legend-group').forEach(groupEl => {
    const hasActiveLayer = groupEl.querySelector('.legend-layer.is-active');
    groupEl.classList.toggle('is-active', Boolean(hasActiveLayer));
  });
}