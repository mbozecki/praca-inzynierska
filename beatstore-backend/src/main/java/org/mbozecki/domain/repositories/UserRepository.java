package org.mbozecki.domain.repositories;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import org.mbozecki.domain.models.User;
import org.mbozecki.domain.models.User_;
import org.mbozecki.domain.repositories.criteria.UserSearchCriteria;
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
public class UserRepository implements PanacheRepository<User> {
    @Transactional
    public User findById(String id) {
        return find("guid", id).firstResult();
    }

    @Transactional
    public PageResult<User> searchByCriteria(UserSearchCriteria criteria) {
        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
        List<Predicate> predicates = new ArrayList<>();
        CriteriaQuery<User> criteriaQuery = cb.createQuery(User.class);
        Root<User> root = criteriaQuery.from(User.class);

        if (criteria.getName() != null && !criteria.getName().isEmpty()) {
            predicates.add(cb.equal(cb.lower(root.get(User_.NAME)), criteria.getName().toLowerCase()));
        }
        if (criteria.getEmail() != null && !criteria.getEmail().isEmpty()) {
            predicates.add(cb.like(cb.lower(root.get(User_.EMAIL.toLowerCase())), criteria.getEmail().toLowerCase()));
        }
        if (criteria.getFirebase_id() != null && !criteria.getFirebase_id().isEmpty()) {
            predicates.add(cb.like(cb.lower(root.get(User_.FIREBASE_ID.toLowerCase())), criteria.getFirebase_id().toLowerCase()));
        }

        if (!predicates.isEmpty()) {
            criteriaQuery.where(predicates.toArray(new Predicate[0]));
        }
        TypedQuery<User> query = getEntityManager().createQuery(criteriaQuery);
        List<User> userList = query
                .setFirstResult(criteria.getPageNumber())
                .setMaxResults(criteria.getPageSize())
                .getResultList();
        int count =  userList.size();
        return new PageResult<>(count, userList.stream(), Page.of(criteria.getPageNumber(), criteria.getPageSize()));
    }
}

