function buildEligibleParcelsHTML (properties){
    return `
    <strong>${properties.site_address || 'Feature'}, ${properties.site_city}</strong><br>
    Parcel ID: ${properties.loc_id || 'n/a'}<br>
    Lot Area (acres): ${properties.lot_size || 'n/a'}<br>
    Nearest Circuit: ${properties.circuit_id || 'n/a'}<br>
    Remaining DCM Capacity (MW) of Nearest Circuit: ${properties.remaining_dcm_capacity_mw || 'n/a'}<br>
    Use Code: ${properties.use_code || 'n/a'}<br>
    Owner: ${properties.owner || 'No'}<br>
    Owner Address: ${properties.owner_address}, ${properties.owner_city} || 'n/a'}<br>
    `
}

window.popupConfigs =[
    {
      layerId: 'Eligible Parcels',
      buildHTML: buildEligibleParcelsHTML
    }
]