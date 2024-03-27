<?php

namespace App\Entity;

use App\Repository\SystemeAcquisitionRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: SystemeAcquisitionRepository::class)]
class SystemeAcquisition
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 12)]
    #[Groups(['salle:read'])]
    private ?string $baseDeDonnees = null;

    #[ORM\ManyToOne(inversedBy: 'systemesAcquisitions')]
    private ?Salle $salle = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getBaseDeDonnees(): ?string
    {
        return $this->baseDeDonnees;
    }

    public function setBaseDeDonnees(string $baseDeDonnees): static
    {
        $this->baseDeDonnees = $baseDeDonnees;

        return $this;
    }

    public function getSalle(): ?Salle
    {
        return $this->salle;
    }

    public function setSalle(?Salle $salle): static
    {
        $this->salle = $salle;

        return $this;
    }
}
