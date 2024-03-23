<?php

namespace App\DataFixtures;

use App\Entity\Salle;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

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

        $manager->flush();
    }
}
