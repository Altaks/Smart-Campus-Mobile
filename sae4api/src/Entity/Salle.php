<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\SalleRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: SalleRepository::class)]
#[ApiResource(
    description: 'Salle au sein de l\'établissement',
    operations: [
        new Get(
            controller: 'App\Controller\SalleController::getSalle',
            requirements: ['id' => '\d+']
        ),
        new GetCollection()
    ],
    normalizationContext: ['groups' => 'salle:read'],
    extraProperties: [
        'standard_put' => true,
    ]
)]
class Salle
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['salle:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 15)]
    #[Groups(['salle:read'])]
    private ?string $nom = null;

    #[ORM\Column(length: 255)]
    private ?string $baseDeDonnees = null;
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): static
    {
        $this->nom = $nom;

        return $this;
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
}
