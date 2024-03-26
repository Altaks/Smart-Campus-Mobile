<?php

namespace App\Controller;

use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use App\Entity\Recommandation;
use Symfony\Component\Serializer\SerializerInterface;

class RecommandationsController extends AbstractController
{
    #[Route('/api/recommandations', name: 'app_recommandations')]
    public function getRecommendationsBySituation(Request $request, ManagerRegistry $managerRegistry, SerializerInterface $serializer): Response
    {
        $temp = $request->query->get('temp');

        // request url -> /api/recommendations/situations?temp=float&co2=int&hum=float

        $temp = $request->query->get('temp');
        $co2 = $request->query->get('co2');
        $hum = $request->query->get('hum');

        $recommendationsRepository = $managerRegistry->getManager()->getRepository(Recommandation::class);

        // temp temp < min ou temp > max
        $recommandations = $recommendationsRepository->getBySituation($temp, $co2, $hum);

        $json = $serializer->serialize($recommandations, 'json');

        return new JsonResponse($json, Response::HTTP_OK, [], true);

    }
}
