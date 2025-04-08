<?php
// Aggiungi le intestazioni CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

header('Content-Type: application/json');

$json_file = 'dati.json';
$json_data = file_get_contents($json_file);
$data = json_decode($json_data, true);

if ($data === null) {
    http_response_code(500);
    echo json_encode(['error' => 'Errore nella lettura del file JSON.']);
    exit;
}

$plate = isset($_GET['plate']) ? $_GET['plate'] : null;
$evento = isset($_GET['evento']) ? $_GET['evento'] : null;
$lat_param = isset($_GET['lat']) ? $_GET['lat'] : null;
$lon_param = isset($_GET['lon']) ? $_GET['lon'] : null;
$distance_param = isset($_GET['distance']) ? $_GET['distance'] : 100; // Raggio predefinito di 100 km

function distanzaHaversine($lat1, $lon1, $lat2, $lon2) {
    $r = 6371; // Raggio della Terra in chilometri
    $dLat = deg2rad($lat2 - $lat1);
    $dLon = deg2rad($lon2 - $lon1);
    $lat1 = deg2rad($lat1);
    $lat2 = deg2rad($lat2);

    $a = sin($dLat/2) * sin($dLat/2) + cos($lat1) * cos($lat2) * sin($dLon/2) * sin($dLon/2);
    $c = 2 * atan2(sqrt($a), sqrt(1-$a));
    return $r * $c; // Distanza in chilometri
}

$risultati = ['poiList' => []];

if (isset($data['poiList']) && is_array($data['poiList'])) {
    foreach ($data['poiList'] as $elemento) {
        $match = true;

        // Filtra per targa (case-insensitive)
        if ($plate !== null && isset($elemento['targa']) && strtolower($elemento['targa']) !== strtolower($plate)) {
            $match = false;
        }

        // Filtra per evento (case-insensitive, verifica se inizia con)
        if ($evento !== null && isset($elemento['tipoEvento']) && strpos(strtolower($elemento['tipoEvento']), strtolower($evento) . ':') !== 0) {
            $match = false;
        }

        // Filtra per distanza se latitudine e longitudine sono fornite
        if ($lat_param !== null && $lon_param !== null && isset($elemento['lat']) && isset($elemento['lon'])) {
            $latUtente = floatval($lat_param);
            $lonUtente = floatval($lon_param);
            $latCentro = floatval($elemento['lat']);
            $lonCentro = floatval($elemento['lon']);
            $distanzaMassima = floatval($distance_param);

            $distanza = distanzaHaversine($latUtente, $lonUtente, $latCentro, $lonCentro);

            if ($distanza > $distanzaMassima) {
                $match = false;
            } else {
                error_log("Centro INCLUSO per distanza.");
            }
        } else {
            error_log("Coordinate utente non fornite, filtro per distanza NON applicato.");
        }

        if ($match) {
           $elemento['distanzaId'] = (isset($lat_param) && isset($lon_param) && isset($elemento['lat']) && isset($elemento['lon'])) ?
    number_format(distanzaHaversine(floatval($lat_param), floatval($lon_param), floatval($elemento['lat']), floatval($elemento['lon'])), 2, '.', '') : null;
            $risultati['poiList'][] = $elemento;
        }
    }
    $risultati['poiNum'] = count($risultati['poiList']);
} else {
    $risultati['poiNum'] = 0;
}

echo json_encode($risultati);
?>