<?php

namespace App\DataFixtures;

use App\Entity\Conseil;
use App\Entity\Salle;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Recommandation;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $salleD205 = new Salle();
        $salleD205->setNom('D205');
        $salleD205->setBaseDeDonnees('sae34bdk1eq1');
        $manager->persist($salleD205);

        $salleD206 = new Salle();
        $salleD206->setNom('D206');
        $salleD206->setBaseDeDonnees('sae34bdk1eq2');
        $manager->persist($salleD206);


        $salleD207 = new Salle();
        $salleD207->setNom('D207');
        $salleD207->setBaseDeDonnees('sae34bdk1eq3');
        $manager->persist($salleD207);


        $salleD204 = new Salle();
        $salleD204->setNom('D204');
        $salleD204->setBaseDeDonnees('sae34bdk2eq1');
        $manager->persist($salleD204);


        $salleD203 = new Salle();
        $salleD203->setNom('D203');
        $salleD203->setBaseDeDonnees('sae34bdk2eq2');
        $manager->persist($salleD203);

        $salleD303 = new Salle();
        $salleD303->setNom('D303');
        $salleD303->setBaseDeDonnees('sae34bdk2eq3');
        $manager->persist($salleD303);

        $salleD304 = new Salle();
        $salleD304->setNom('D304');
        $salleD304->setBaseDeDonnees('sae34bdl1eq1');
        $manager->persist($salleD304);

        $salleC101 = new Salle();
        $salleC101->setNom('C101');
        $salleC101->setBaseDeDonnees('sae34bdl1eq2');
        $manager->persist($salleC101);

        $salleD109 = new Salle();
        $salleD109->setNom('D109');
        $salleD109->setBaseDeDonnees('sae34bdl1eq3');
        $manager->persist($salleD109);

        $salleSecretariat = new Salle();
        $salleSecretariat->setNom('Secretariat');
        $salleSecretariat->setBaseDeDonnees('sae34bdl2eq1');
        $manager->persist($salleSecretariat);

        $salleD001 = new Salle();
        $salleD001->setNom('D001');
        $salleD001->setBaseDeDonnees('sae34bdl2eq2');
        $manager->persist($salleD001);

        $salleD002 = new Salle();
        $salleD002->setNom('D002');
        $salleD002->setBaseDeDonnees('sae34bdl2eq3');
        $manager->persist($salleD002);

        $salleD004 = new Salle();
        $salleD004->setNom('D004');
        $salleD004->setBaseDeDonnees('sae34bdm1eq1');
        $manager->persist($salleD004);

        $salleC004 = new Salle();
        $salleC004->setNom('C004');
        $salleC004->setBaseDeDonnees('sae34bdm1eq2');
        $manager->persist($salleC004);

        $salleC007 = new Salle();
        $salleC007->setNom('C007');
        $salleC007->setBaseDeDonnees('sae34bdm1eq3');
        $manager->persist($salleC007);

        $salleD201 = new Salle();
        $salleD201->setNom('D201');
        $salleD201->setBaseDeDonnees('sae34bdm2eq1');
        $manager->persist($salleD201);

        $salleD307 = new Salle();
        $salleD307->setNom('D307');
        $salleD307->setBaseDeDonnees('sae34bdm2eq2');
        $manager->persist($salleD307);

        $salleC005 = new Salle();
        $salleC005->setNom('C005');
        $salleC005->setBaseDeDonnees('sae34bdm2eq3');
        $manager->persist($salleC005);

        // recommendations pour les salles

        $recommandation = new Recommandation();
        $recommandation->setTexte("Il est recommandé de fermer les fenêtres si elle sont ouvertes
        et d'allumer le chauffage si ils sont éteints");
        $recommandation->setType('temp');
        $recommandation->setMin(17);
        $manager->persist($recommandation);

        $recommandation2 = new Recommandation();
        $recommandation2->setTexte("Il est recommandé d'ouvrir les fenêtres si elle sont fermées
        et d'éteindre le chauffage s'il est allumé");
        $recommandation2->setType('temp');
        $recommandation2->setMax(21);
        $manager->persist($recommandation2);

        $recommandation3 = new Recommandation();
        $recommandation3->setTexte("Ouvrir les fenêtres et les portes pour faire circuler l'air dans la salle si 
        possible");
        $recommandation3->setType('co2');
        $recommandation3->setMax(1000);
        $manager->persist($recommandation3);

        $recommandation6 = new Recommandation();
        $recommandation6->setTexte("Ouvrir les fenêtres et les portes pour faire circuler l'air dans la salle si 
        possible et ne pas rester trop longtemps dans la salle");
        $recommandation6->setType('co2');
        $recommandation6->setMax(1500);
        $manager->persist($recommandation6);

        $recommandation7 = new Recommandation();
        $recommandation7->setTexte("Evacuer la salle et ouvrir les fenêtres et les portes pour faire circuler 
        l'air dans la salle");
        $recommandation7->setType('co2');
        $recommandation7->setMax(2000);
        $manager->persist($recommandation7);

        $recommandation4 = new Recommandation();
        $recommandation4->setTexte("Ouvrir les fenêtres s'il ne pleut pas dehors sinon fermer les fenêtres  
        et ouvrir les portes");
        $recommandation4->setType('hum');
        $recommandation4->setMax(50);
        $manager->persist($recommandation4);

        $recommandation5 = new Recommandation();
        $recommandation5->setTexte("S'il pleut dehors, ouvrir les fenêtres légèrement
        sinon ouvrir complètement les fenetres et ouvrir les portes");
        $recommandation5->setType('hum');
        $recommandation5->setMin(30);
        $manager->persist($recommandation5);

        // Recommandations du gouvernement pour les établissements scolaires quant à la sobriété énergétique

        // Température

        $conseil1 = new Conseil();
        $conseil1->setTexte("En période normale, il est recommandé de maintenir une température de 19°C dans les salles de cours. Éteignez les chauffages s'ils sont allumés et ouvrez les fenêtres si besoin. Laissez les portes ouvertes si possible pour faire circuler l'air.");
        $conseil1->setType("temp");
        $conseil1->setMax(19.0);
        $manager->persist($conseil1);

        $conseil2 = new Conseil();
        $conseil2->setTexte("En période de fortes chaleurs, il est recommandé de maintenir une température inférieure à 26°C dans les salles de cours. Éteignez le chauffage s'ils sont allumés et ouvrez les fenêtres en conséquence. Laissez les portes ouvertes si possible pour faire circuler l'air. Évitez d'utiliser la climatisation le plus possible");
        $conseil2->setType("temp");
        $conseil2->setMax(26.0);
        $manager->persist($conseil2);

        $conseil2 = new Conseil();
        $conseil2->setTexte("En période d'inoccupation faible (entre 24 et 48h) , il est recommandé de maintenir une température maximale de à 16°C dans les salles de cours. Éteignez le chauffage s'ils sont allumés, laissez les portes ouvertes si possible pour faire circuler l'air dans le bâtiment.");
        $conseil2->setType("temp");
        $conseil2->setMax(16.0);
        $manager->persist($conseil2);

        $conseil3 = new Conseil();
        $conseil3->setTexte("En période d'inoccupation forte (supérieure à 48h), il est recommandé de maintenir une température maximale de 8°C dans les salles de cours. Éteignez le chauffage s'ils sont allumés, laissez les portes ouvertes si possible pour faire circuler l'air dans le bâtiment.");
        $conseil3->setType("temp");
        $conseil3->setMax(8.0);
        $manager->persist($conseil3);

        $conseil4 = new Conseil();
        $conseil4->setTexte("En période normale, il est recommandé de maintenir une température supérieure à 17°C dans les salles de cours. Éteignez les chauffages s'ils sont allumés et ouvrez les fenêtres si besoin. Allumez les chauffages si besoin, fermez les fenêtres et les portes pour conserver la chaleur.");
        $conseil4->setType("temp");
        $conseil4->setMin(17.0);
        $manager->persist($conseil4);

        // CO2

        $conseil5 = new Conseil();
        $conseil5->setTexte("Au dessus d'un taux de CO2 de 1000 ppm, il est recommandé d'aérer les salles de cours. Ouvrez les fenêtres et les portes si possible pour faire circuler l'air.");
        $conseil5->setType("co2");
        $conseil5->setMax(1000.0);
        $manager->persist($conseil5);

        $conseil6 = new Conseil();
        $conseil6->setTexte("Au dessus d'un taux de CO2 de 2000 ppm, il est recommandé d'évacuer les salles de cours. Ouvrez les fenêtres ainsi que les portes pour faire circuler l'air dans l'intégralité du bâtiment.");
        $conseil6->setType("co2");
        $conseil6->setMax(2000.0);
        $manager->persist($conseil6);

        $conseil6 = new Conseil();
        $conseil6->setTexte("Au dessus d'un taux de CO2 de 1500 ppm, il est recommandé d'aérer les salles de cours et de ne pas rester trop longtemps dans les salles concernées. Ouvrez les fenêtres et les portes si possible pour faire circuler l'air.");
        $conseil6->setType("co2");
        $conseil6->setMax(1500.0);
        $manager->persist($conseil6);

        // Humidité

        $conseil7 = new Conseil();
        $conseil7->setTexte("En période normale, il est recommandé de maintenir une humidité relative supérieure à 40% dans les salles de cours. Ouvrez légèrement les fenêtres si possible pour faire circuler l'air s'il pleut faiblement à l'extérieur dehors");
        $conseil7->setType("hum");
        $conseil7->setMin(40.0);
        $manager->persist($conseil7);

        $conseil7 = new Conseil();
        $conseil7->setTexte("En période normale, il est recommandé de maintenir une humidité relative inférieure à 70% dans les salles de cours. Ouvrez les fenêtres si possible pour faire circuler l'air s'il ne pleut pas dehors, dans le cas contraire, fermez les fenêtres et changez de salle temporairement si possible.");
        $conseil7->setType("hum");
        $conseil7->setMax(70.0);
        $manager->persist($conseil7);

        $manager->flush();
    }
}
