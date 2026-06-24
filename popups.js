// 1. Pop-up Building Functions
function setupPopups(popupConfigs, map){
    popupConfigs.forEach(config=>{
        if (!map.getLayer(config.layerId)){
            console.error(`Popup layer not found: ${config.layerId}`);
            return;
        }

        map.on('click', config.layerId, (e) =>{
            const feature = e.features[0];

            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(config.buildHTML(feature.properties))
                .addTo(map);
        });

        map.on('mouseenter', config.layerId, () => {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', config.layerId, () => {
            map.getCanvas().style.cursor = '';
        });
    });
}