export function centerOnSwitzerland(map) {
    const swissBounds = L.latLngBounds(
        L.latLng(45.8179, 5.9559),  // SW corner
        L.latLng(47.8084, 10.4921)  // NE corner
    );
    map.fitBounds(swissBounds);
}