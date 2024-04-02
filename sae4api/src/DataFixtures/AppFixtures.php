<?php

namespace App\DataFixtures;

use App\Entity\Conseil;
use App\Entity\Salle;
use App\Entity\SystemeAcquisition;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Recommandation;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $salleD205 = new Salle();
        $salleD205->setNom('D205');
        $ESP001 = new SystemeAcquisition();
        $ESP001->setBaseDeDonnees('sae34bdk1eq1');
        $salleD205->addSystemesAcquisition($ESP001);
        $manager->persist($ESP001);
        $manager->persist($salleD205);

        $salleD206 = new Salle();
        $salleD206->setNom('D206');
        $ESP002 = new SystemeAcquisition();
        $ESP002->setBaseDeDonnees('sae34bdk1eq2');
        $salleD206->addSystemesAcquisition($ESP002);
        $manager->persist($ESP002);
        $manager->persist($salleD206);


        $salleD207 = new Salle();
        $salleD207->setNom('D207');
        $ESP003 = new SystemeAcquisition();
        $ESP003->setBaseDeDonnees('sae34bdk1eq3');
        $salleD207->addSystemesAcquisition($ESP003);
        $manager->persist($ESP003);
        $manager->persist($salleD207);


        $salleD204 = new Salle();
        $salleD204->setNom('D204');
        $ESP004 = new SystemeAcquisition();
        $ESP004->setBaseDeDonnees('sae34bdk2eq1');
        $salleD204->addSystemesAcquisition($ESP004);
        $manager->persist($ESP004);
        $manager->persist($salleD204);


        $salleD203 = new Salle();
        $salleD203->setNom('D203');
        $ESP005 = new SystemeAcquisition();
        $ESP005->setBaseDeDonnees('sae34bdk2eq2');
        $salleD203->addSystemesAcquisition($ESP005);
        $manager->persist($ESP005);
        $manager->persist($salleD203);

        $salleD303 = new Salle();
        $salleD303->setNom('D303');
        $ESP006 = new SystemeAcquisition();
        $ESP006->setBaseDeDonnees('sae34bdk2eq3');
        $salleD303->addSystemesAcquisition($ESP006);
        $manager->persist($ESP006);
        $manager->persist($salleD303);

        $salleD304 = new Salle();
        $salleD304->setNom('D304');
        $ESP007 = new SystemeAcquisition();
        $ESP007->setBaseDeDonnees('sae34bdl1eq1');
        $salleD304->addSystemesAcquisition($ESP007);
        $manager->persist($ESP007);
        $manager->persist($salleD304);

        $salleC101 = new Salle();
        $salleC101->setNom('C101');
        $ESP008 = new SystemeAcquisition();
        $ESP008->setBaseDeDonnees('sae34bdl1eq2');
        $salleC101->addSystemesAcquisition($ESP008);
        $manager->persist($ESP008);
        $manager->persist($salleC101);

        $salleD109 = new Salle();
        $salleD109->setNom('D109');
        $ESP009 = new SystemeAcquisition();
        $ESP009->setBaseDeDonnees('sae34bdl1eq3');
        $salleD109->addSystemesAcquisition($ESP009);
        $manager->persist($ESP009);
        $manager->persist($salleD109);

        $salleSecretariat = new Salle();
        $salleSecretariat->setNom('Secretariat');
        $ESP010 = new SystemeAcquisition();
        $ESP010->setBaseDeDonnees('sae34bdl2eq1');
        $salleSecretariat->addSystemesAcquisition($ESP010);
        $manager->persist($ESP010);
        $manager->persist($salleSecretariat);

        $salleD001 = new Salle();
        $salleD001->setNom('D001');
        $ESP011 = new SystemeAcquisition();
        $ESP011->setBaseDeDonnees('sae34bdl2eq2');
        $salleD001->addSystemesAcquisition($ESP011);
        $manager->persist($ESP011);
        $manager->persist($salleD001);

        $salleD002 = new Salle();
        $salleD002->setNom('D002');
        $ESP012 = new SystemeAcquisition();
        $ESP012->setBaseDeDonnees('sae34bdl2eq3');
        $salleD002->addSystemesAcquisition($ESP012);
        $manager->persist($ESP012);
        $manager->persist($salleD002);

        $salleD004 = new Salle();
        $salleD004->setNom('D004');
        $ESP013 = new SystemeAcquisition();
        $ESP013->setBaseDeDonnees('sae34bdm1eq1');
        $salleD004->addSystemesAcquisition($ESP013);
        $manager->persist($ESP013);
        $manager->persist($salleD004);

        $salleC004 = new Salle();
        $salleC004->setNom('C004');
        $ESP014 = new SystemeAcquisition();
        $ESP014->setBaseDeDonnees('sae34bdm1eq2');
        $salleC004->addSystemesAcquisition($ESP014);
        $manager->persist($ESP014);
        $manager->persist($salleC004);

        $salleC007 = new Salle();
        $salleC007->setNom('C007');
        $ESP015 = new SystemeAcquisition();
        $ESP015->setBaseDeDonnees('sae34bdm1eq3');
        $salleC007->addSystemesAcquisition($ESP015);
        $manager->persist($ESP015);
        $manager->persist($salleC007);

        $salleD201 = new Salle();
        $salleD201->setNom('D201');
        $ESP016 = new SystemeAcquisition();
        $ESP016->setBaseDeDonnees('sae34bdm2eq1');
        $salleD201->addSystemesAcquisition($ESP016);
        $manager->persist($ESP016);
        $manager->persist($salleD201);

        $salleD307 = new Salle();
        $salleD307->setNom('D307');
        $ESP017 = new SystemeAcquisition();
        $ESP017->setBaseDeDonnees('sae34bdm2eq2');
        $salleD307->addSystemesAcquisition($ESP017);
        $manager->persist($ESP017);
        $manager->persist($salleD307);

        $salleC005 = new Salle();
        $salleC005->setNom('C005');
        $ESP018 = new SystemeAcquisition();
        $ESP018->setBaseDeDonnees('sae34bdm2eq3');
        $salleC005->addSystemesAcquisition($ESP018);
        $manager->persist($ESP018);
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
        $recommandation6->setTexte("Ne pas rester trop longtemps dans la salle");
        $recommandation6->setType('co2');
        $recommandation6->setMax(1500);
        $manager->persist($recommandation6);

        $recommandation7 = new Recommandation();
        $recommandation7->setTexte("Evacuer la salle");
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
        $conseil1->setTexte("En période normale, il est recommandé de maintenir une température de 19°C 
        dans les salles de cours. Éteignez les chauffages s'ils sont allumés et ouvrez les fenêtres si besoin. 
        Laissez les portes ouvertes si possible pour faire circuler l'air.");
        $conseil1->setType("temp");
        $conseil1->setMax(19.0);
        $manager->persist($conseil1);

        $conseil2 = new Conseil();
        $conseil2->setTexte("En période de fortes chaleurs, il est recommandé de maintenir une température 
        inférieure à 26°C dans les salles de cours. Éteignez le chauffage s'ils sont allumés et ouvrez les fenêtres en 
        conséquence. Laissez les portes ouvertes si possible pour faire circuler l'air. Évitez d'utiliser la 
        climatisation le plus possible");
        $conseil2->setType("temp");
        $conseil2->setMax(26.0);
        $manager->persist($conseil2);

        $conseil2 = new Conseil();
        $conseil2->setTexte("En période d'inoccupation faible (entre 24 et 48h) , il est recommandé de maintenir 
        une température maximale de 16°C dans les salles de cours. Éteignez le chauffage s'ils sont allumés, 
        laissez les portes ouvertes si possible pour faire circuler l'air dans le bâtiment.");
        $conseil2->setType("temp");
        $conseil2->setMax(16.0);
        $manager->persist($conseil2);

        $conseil3 = new Conseil();
        $conseil3->setTexte("En période d'inoccupation forte (supérieure à 48h), il est recommandé de maintenir 
        une température maximale de 8°C dans les salles de cours. Éteignez le chauffage s'ils sont allumés, 
        laissez les portes ouvertes si possible pour faire circuler l'air dans le bâtiment.");
        $conseil3->setType("temp");
        $conseil3->setMax(8.0);
        $manager->persist($conseil3);

        $conseil4 = new Conseil();
        $conseil4->setTexte("En période normale, il est recommandé de maintenir une température supérieure à 17°C 
        dans les salles de cours. Éteignez les chauffages s'ils sont allumés et ouvrez les fenêtres si besoin. 
        Allumez les chauffages si besoin, fermez les fenêtres et les portes pour conserver la chaleur.");
        $conseil4->setType("temp");
        $conseil4->setMin(17.0);
        $manager->persist($conseil4);

        // CO2

        $conseil5 = new Conseil();
        $conseil5->setTexte("Au dessus d'un taux de CO2 de 1000 ppm, il est recommandé d'aérer les salles de 
        cours. Ouvrez les fenêtres et les portes si possible pour faire circuler l'air.");
        $conseil5->setType("co2");
        $conseil5->setMax(1000.0);
        $manager->persist($conseil5);

        $conseil6 = new Conseil();
        $conseil6->setTexte("Au dessus d'un taux de CO2 de 2000 ppm, il est recommandé d'évacuer les salles de 
        cours. Ouvrez les fenêtres ainsi que les portes pour faire circuler l'air dans l'intégralité du bâtiment.");
        $conseil6->setType("co2");
        $conseil6->setMax(2000.0);
        $manager->persist($conseil6);

        $conseil6 = new Conseil();
        $conseil6->setTexte("Au dessus d'un taux de CO2 de 1500 ppm, il est recommandé d'aérer les 
        salles de cours et de ne pas rester trop longtemps dans les salles concernées. 
        Ouvrez les fenêtres et les portes si possible pour faire circuler l'air.");
        $conseil6->setType("co2");
        $conseil6->setMax(1500.0);
        $manager->persist($conseil6);

        // Humidité

        $conseil7 = new Conseil();
        $conseil7->setTexte("En période normale, il est recommandé de maintenir une humidité relative supérieure 
        à 40% dans les salles de cours. Ouvrez légèrement les fenêtres si possible pour faire 
        circuler l'air s'il pleut faiblement à l'extérieur dehors");
        $conseil7->setType("hum");
        $conseil7->setMin(40.0);
        $manager->persist($conseil7);

        $conseil7 = new Conseil();
        $conseil7->setTexte("En période normale, il est recommandé de maintenir une humidité relative inférieure 
        à 70% dans les salles de cours. Ouvrez les fenêtres si possible pour faire circuler l'air s'il ne pleut pas 
        dehors, dans le cas contraire, fermez les fenêtres et changez de salle temporairement si possible.");
        $conseil7->setType("hum");
        $conseil7->setMax(70.0);
        $manager->persist($conseil7);

        $manager->flush();
    }
}
