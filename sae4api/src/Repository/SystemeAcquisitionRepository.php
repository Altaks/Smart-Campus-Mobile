<?php

namespace App\Repository;

use App\Entity\SystemeAcquisition;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<SystemeAcquisition>
 *
 * @method SystemeAcquisition|null find($id, $lockMode = null, $lockVersion = null)
 * @method SystemeAcquisition|null findOneBy(array $criteria, array $orderBy = null)
 * @method SystemeAcquisition[]    findAll()
 * @method SystemeAcquisition[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SystemeAcquisitionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, SystemeAcquisition::class);
    }

//    /**
//     * @return SystemeAcquisition[] Returns an array of SystemeAcquisition objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('s.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?SystemeAcquisition
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
