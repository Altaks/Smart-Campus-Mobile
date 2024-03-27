<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\SalleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: SalleRepository::class)]
#[ApiResource(
    description: 'Salle au sein de l\'établissement',
    operations: [
        new GetCollection()
    ],
    normalizationContext: ['groups' => 'salle:read']
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

    #[ORM\OneToMany(mappedBy: 'salle', targetEntity: SystemeAcquisition::class)]
    #[Groups(['salle:read'])]
    private Collection $systemesAcquisitions;

    public function __construct()
    {
        $this->systemesAcquisitions = new ArrayCollection();
    }

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

    /**
     * @return Collection<int, SystemeAcquisition>
     */
    public function getSystemesAcquisitions(): Collection
    {
        return $this->systemesAcquisitions;
    }

    public function addSystemesAcquisition(SystemeAcquisition $systemesAcquisition): static
    {
        if (!$this->systemesAcquisitions->contains($systemesAcquisition)) {
            $this->systemesAcquisitions->add($systemesAcquisition);
            $systemesAcquisition->setSalle($this);
        }

        return $this;
    }

    public function removeSystemesAcquisition(SystemeAcquisition $systemesAcquisition): static
    {
        if ($this->systemesAcquisitions->removeElement($systemesAcquisition)) {
            // set the owning side to null (unless already changed)
            if ($systemesAcquisition->getSalle() === $this) {
                $systemesAcquisition->setSalle(null);
            }
        }

        return $this;
    }
}
