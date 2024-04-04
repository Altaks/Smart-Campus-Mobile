<?php

namespace App\tests;

use App\Entity\Salle;
use App\Entity\SystemeAcquisition;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class SalleTest extends KernelTestCase
{
    public function testAjoutSADansSalle()
    {
        $salle = new Salle();
        $salle->setNom('D001');
        $esp = new SystemeAcquisition();
        $esp->setBaseDeDonnees('sae34bdl2eq2');
        $salle->addSystemesAcquisition($esp);

        $this->assertEquals($esp->getBaseDeDonnees(), $salle->getSystemesAcquisitions()[0]->getBaseDeDonnees());
    }

    public function testSuppressionSADansSalle()
    {
        $salle = new Salle();
        $salle->setNom('D001');
        $esp = new SystemeAcquisition();
        $esp->setBaseDeDonnees('sae34bdl2eq2');
        $salle->addSystemesAcquisition($esp);

        $this->assertEquals($esp->getBaseDeDonnees(), $salle->getSystemesAcquisitions()[0]->getBaseDeDonnees());

        $salle->removeSystemesAcquisition($esp);

        $this->assertEquals(null, $salle->getSystemesAcquisitions()[0]);
    }
}


