package org.mbozecki.domain.repositories.criteria;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BeatSearchCriteria {
    private String name;

    private String producedby;

    private Integer pageNumber;

    private Integer pageSize;
}
