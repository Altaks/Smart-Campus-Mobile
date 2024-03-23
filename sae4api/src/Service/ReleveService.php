<?php

namespace App\Service;

use DateTime;
use Symfony\Component\HttpClient\HttpClient;

/**
 * Classe permettant de récupérer les relevés d'un système d'acquisition en utilisant l'API de SAE34
 * @package App\Service
 * @author Arnaud Mazurier
 * @version 1.0
 */
class ReleveService
{

    /**
     * Permet de convertir un fichier JSON en relevés groupés par type de capteur
     * @param array $array liste de relevés en JSON convertit par Symfony et la méthode toArray d'une réponse HTTP
     * @return array liste de relevés groupés par type de capteur
     */
    private static function conversionVersRelevesGroupes(array $array): array
    {
        $listeRelevesGroupes = [];

        foreach ($array as $releve) {
            $releveJson = [];

            $releveJson['date'] = $releve['dateCapture'];
            $releveJson['valeur'] = $releve['valeur'];

            $listeRelevesGroupes[$releve['nom']][] = $releveJson;
        }

        return $listeRelevesGroupes;
    }

    public function getDernierJour(string $baseDeDonnees): array
    {

        // Création du client HTTP
        $client = HttpClient::create([
            'headers' => [
                'accept' => 'application/json',
                'dbname' => $baseDeDonnees,
                'username' => 'm2eq3',
                'userpass' => 'howjoc-dyjhId-hiwre0'
            ]
        ]);

        $dateDebut = new \DateTime('-65 days');
        $dateFin = new DateTime('+1 days');

        // Envoi de la requête HTTP
        $response = $client->request('GET', 'https://sae34.k8s.iut-larochelle.fr/api/captures/interval', [
            'query' => [
                'date1' => $dateDebut->format('Y-m-d'),
                'date2' => $dateFin->format('Y-m-d'),
                'page' => 1
            ]
        ]);

        return static::conversionVersRelevesGroupes($response->toArray()); //$response->toArray();
    }
}

?>