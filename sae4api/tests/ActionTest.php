<?php

namespace App\tests;

use App\Entity\Action;
use App\Entity\Salle;
use App\Entity\SystemeAcquisition;
use DateTimeInterface;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class ActionTest extends KernelTestCase
{
    public function testConstructDateTime()
    {
        $datetime = new \DateTimeImmutable();
        $action = new Action();

        $this->assertEquals($datetime->format(DateTimeInterface::ATOM), $action->getDatetime()->format(DateTimeInterface::ATOM));
    }
}