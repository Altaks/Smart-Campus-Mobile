<?php

namespace App\Repository;

use App\Entity\Recommandation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Recommandation>
 *
 * @method Recommandation|null find($id, $lockMode = null, $lockVersion = null)
 * @method Recommandation|null findOneBy(array $criteria, array $orderBy = null)
 * @method Recommandation[]    findAll()
 * @method Recommandation[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class RecommandationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Recommandation::class);
    }

    public function getBySituationType(string $type, float $value): array
    {
        if ($type != 'temp' && $type != 'co2' && $type != 'hum') {
            return [];
        }

        // SELECT * FROM recommandation WHERE type = :type AND :value <= min OR :value >= max
        $queryMin = $this->createQueryBuilder('r')
            ->where('r.type = :type')
            ->andWhere(':value <= r.min')
            ->setParameter('type', $type)
            ->setParameter('value', $value)
            ->getQuery();

        $queryMax = $this->createQueryBuilder('r')
            ->where('r.type = :type')
            ->andWhere(':value >= r.max')
            ->setParameter('type', $type)
            ->setParameter('value', $value)
            ->getQuery();

        return array_merge($queryMin->getResult(), $queryMax->getResult());
    }

    public function getBySituation(?float $temp, ?int $co2, ?float $hum): array
    {
        $temps = null;
        $co2s = null;
        $hums = null;

        if ($temp != null) {
            $temps = $this->getBySituationType('temp', $temp);
        }
        if ($co2 != null) {
            $co2s = $this->getBySituationType('co2', $co2);
        }
        if ($hum != null) {
            $hums = $this->getBySituationType('hum', $hum);
        }

        return ['temp' => $temps, 'co2' => $co2s, 'hum' => $hums];
    }

//    /**
//     * @return Recommandation[] Returns an array of Recommandation objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('r')
//            ->andWhere('r.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('r.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Recommandation
//    {
//        return $this->createQueryBuilder('r')
//            ->andWhere('r.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
