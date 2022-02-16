package org.mbozecki.domain.repositories.criteria;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserSearchCriteria {

    private String name;

    private String email;

    private String firebase_id;

    private Integer pageNumber;

    private Integer pageSize;
}
