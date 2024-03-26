<?php

namespace App\Controller;

use App\Entity\Salle;
use App\Service\ReleveService;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SalleController extends AbstractController
{
    #[Route('/api/salle/{id}', name: 'api_salle_item')]
    public function getSalle(Salle $salle, ManagerRegistry $managerRegistry): JsonResponse
    {
        $releveService = new ReleveService();
        date_default_timezone_set("Europe/Paris");

        $releves = $releveService->getDernierJour($salle->getBaseDeDonnees());
        ksort($releves);

        $salleJson[] = ['id' => $salle->getId(),
                        'nom' => $salle->getNom(),
                        'idProchaineSalle' => $managerRegistry->getManager()->getRepository(Salle::class)->getIdProchaineSalle($salle->getNom()),
                        'idSallePrecedente' => $managerRegistry->getManager()->getRepository(Salle::class)->getIdSallePrecedente($salle->getNom()),
                        'data' => $releves];
        $salleJson = json_encode($salleJson);

        return new JsonResponse($salleJson, Response::HTTP_OK, [], true);
    }
}
