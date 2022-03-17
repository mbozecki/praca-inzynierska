package org.mbozecki.domain.repositories;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import org.mbozecki.domain.models.Beat;
import org.mbozecki.domain.models.Beat_;
import org.mbozecki.domain.repositories.criteria.BeatSearchCriteria;
import org.mbozecki.domain.repositories.criteria.models.Page;
import org.mbozecki.domain.repositories.criteria.models.PageResult;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class BeatRepository implements PanacheRepository<Beat> {

    @Transactional
    public Beat findById(String id) {
        return find("guid", id).firstResult();
    }

    @Transactional
    public PageResult<Beat> searchByCriteria(BeatSearchCriteria criteria) {
        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
        List<Predicate> predicates = new ArrayList<>();
        CriteriaQuery<Beat> criteriaQuery = cb.createQuery(Beat.class);
        Root<Beat> root = criteriaQuery.from(Beat.class);

        if (criteria.getName() != null && !criteria.getName().isEmpty()) {
            predicates.add(cb.equal(cb.lower(root.get(Beat_.NAME)), criteria.getName().toLowerCase()));
        }
        if (criteria.getProducedby() != null && !criteria.getProducedby().isEmpty()) {
            predicates.add(cb.equal(cb.lower(root.get(Beat_.PRODUCEDBY.toLowerCase())), criteria.getProducedby().toLowerCase()));
        }
        if (!predicates.isEmpty()) {
            criteriaQuery.where(predicates.toArray(new Predicate[0]));
        }
        TypedQuery<Beat> query = getEntityManager().createQuery(criteriaQuery);
        List<Beat> userList = query
                .setFirstResult(criteria.getPageNumber())
                .setMaxResults(criteria.getPageSize())
                .getResultList();
        int count =  userList.size();
        return new PageResult<>(count, userList.stream(), Page.of(criteria.getPageNumber(), criteria.getPageSize()));
    }

    @Transactional
    public PageResult<Beat> returnWithLimit(int n) {
        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
        List<Predicate> predicates = new ArrayList<>();
        CriteriaQuery<Beat> criteriaQuery = cb.createQuery(Beat.class);
        Root<Beat> root = criteriaQuery.from(Beat.class);
        criteriaQuery.where(predicates.toArray(new Predicate[0]));

        TypedQuery<Beat> query = getEntityManager().createQuery(criteriaQuery);
        List<Beat> offerList = query
                .setFirstResult(0)
                .setMaxResults(n)
                .getResultList();
        int count = offerList.size();
        return new PageResult<>(count, offerList.stream(), Page.of(0, n));
    }
}
