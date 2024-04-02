<?php

namespace App\Repository;

use App\Entity\Salle;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Salle>
 *
 * @method Salle|null find($id, $lockMode = null, $lockVersion = null)
 * @method Salle|null findOneBy(array $criteria, array $orderBy = null)
 * @method Salle[]    findAll()
 * @method Salle[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SalleRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Salle::class);
    }

    public function getIdProchaineSalle(string $nom): ?int
    {
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery(
            'SELECT s.id 
            FROM App\Entity\Salle s
            WHERE s.nom > :nom
            ORDER BY s.nom ASC'
        )->setParameter('nom', $nom);
        $id = $query->setMaxResults(1)->getOneOrNullResult();
        return $id === null ? null : $id['id'];
    }

    public function getIdSallePrecedente(string $nom): ?int
    {
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery(
            'SELECT s.id 
             FROM App\Entity\Salle s
             WHERE s.nom < :nom
             ORDER BY s.nom DESC'
        )->setParameter('nom', $nom);
        $id = $query->setMaxResults(1)->getOneOrNullResult();
        return $id === null ? null : $id['id'];
    }

//    /**
//     * @return Salle[] Returns an array of Salle objects
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

//    public function findOneBySomeField($value): ?Salle
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
