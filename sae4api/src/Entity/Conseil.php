<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\ConseilRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ConseilRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection()
    ]
)]
class Conseil
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 500)]
    private ?string $texte = null;

    #[ORM\Column(length: 4)]
    private ?string $type = null;

    #[ORM\Column(nullable: true)]
    private ?float $min = null;

    #[ORM\Column(nullable: true)]
    private ?float $max = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTexte(): ?string
    {
        return $this->texte;
    }

    public function setTexte(string $texte): static
    {
        $this->texte = $texte;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getMin(): ?float
    {
        return $this->min;
    }

    public function setMin(?float $min): static
    {
        $this->min = $min;

        return $this;
    }

    public function getMax(): ?float
    {
        return $this->max;
    }

    public function setMax(?float $max): static
    {
        $this->max = $max;

        return $this;
    }
}
