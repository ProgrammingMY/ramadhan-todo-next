import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * Check if a point is inside a polygon using ray-casting algorithm
 * @param point [longitude, latitude] - Note: GeoJSON uses [lon, lat] order
 * @param polygon Array of [longitude, latitude] coordinates
 */
function isPointInPolygon(
    point: [number, number],
    polygon: [number, number][]
): boolean {
    const [x, y] = point;
    let inside = false;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i];
        const [xj, yj] = polygon[j];

        const intersect = ((yi > y) !== (yj > y)) &&
            (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

        if (intersect) {
            inside = !inside;
        }
    }

    return inside;
}

/**
 * Check if a point is inside a MultiPolygon
 * @param point [longitude, latitude]
 * @param multiPolygon MultiPolygon coordinates from GeoJSON
 */
function isPointInMultiPolygon(
    point: [number, number],
    multiPolygon: number[][][][]
): boolean {
    for (const polygon of multiPolygon) {
        // Each polygon is an array of linear rings
        // The first ring is the exterior boundary, subsequent rings are holes
        const exteriorRing = polygon[0] as [number, number][];
        const inExterior = isPointInPolygon(point, exteriorRing);

        if (inExterior) {
            // Check if point is in any of the holes (interior rings)
            let inHole = false;
            for (let i = 1; i < polygon.length; i++) {
                const hole = polygon[i] as [number, number][];
                if (isPointInPolygon(point, hole)) {
                    inHole = true;
                    break;
                }
            }
            if (!inHole) {
                return true;
            }
        }
    }
    return false;
}

/**
 * Cached GeoJSON data to avoid repeated fetches
 */
let cachedGeoJson: any = null;

/**
 * Find JAKIM zone code from coordinates using point-in-polygon detection
 * @param latitude Latitude in decimal degrees
 * @param longitude Longitude in decimal degrees
 * @returns JAKIM zone code (e.g., "SGR02") or null if not found
 */
export async function getZoneFromCoordinates(
    latitude: number,
    longitude: number
): Promise<string | null> {
    try {
        console.log('[getZoneFromCoordinates] Checking coordinates:', { latitude, longitude });

        // Load GeoJSON if not cached
        if (!cachedGeoJson) {
            console.log('[getZoneFromCoordinates] Loading GeoJSON...');
            const response = await fetch('/geojson/jakim.geojson');

            if (!response.ok) {
                console.error('[getZoneFromCoordinates] Failed to load GeoJSON:', response.status, response.statusText);
                throw new Error(`Failed to load GeoJSON data: ${response.status}`);
            }

            cachedGeoJson = await response.json();
            console.log('[getZoneFromCoordinates] GeoJSON loaded, features:', cachedGeoJson.features?.length);
        }

        // Point in [longitude, latitude] format (GeoJSON standard)
        const point: [number, number] = [longitude, latitude];

        // Find the first feature that contains the point
        for (const feature of cachedGeoJson.features) {
            const { geometry, properties } = feature;

            if (geometry.type === 'MultiPolygon') {
                if (isPointInMultiPolygon(point, geometry.coordinates)) {
                    console.log('[getZoneFromCoordinates] Found zone (MultiPolygon):', properties.jakim_code, properties.name);
                    return properties.jakim_code || null;
                }
            } else if (geometry.type === 'Polygon') {
                if (isPointInPolygon(point, geometry.coordinates[0] as [number, number][])) {
                    // Check holes
                    let inHole = false;
                    for (let i = 1; i < geometry.coordinates.length; i++) {
                        if (isPointInPolygon(point, geometry.coordinates[i] as [number, number][])) {
                            inHole = true;
                            break;
                        }
                    }
                    if (!inHole) {
                        console.log('[getZoneFromCoordinates] Found zone (Polygon):', properties.jakim_code, properties.name);
                        return properties.jakim_code || null;
                    }
                }
            }
        }

        console.warn('[getZoneFromCoordinates] No matching zone found for coordinates:', { latitude, longitude });
        return null;
    } catch (error) {
        console.error('[getZoneFromCoordinates] Error:', error);
        return null;
    }
}
