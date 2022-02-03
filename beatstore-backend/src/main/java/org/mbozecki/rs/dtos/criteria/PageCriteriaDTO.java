package org.mbozecki.rs.dtos.criteria;


import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.QueryParam;

@Getter
@Setter
public class PageCriteriaDTO {

    @Min(0)
    @QueryParam("page")
    @DefaultValue("0")
    private Integer pageNumber;

    @Min(1)
    @Max(50)
    @QueryParam("size")
    @DefaultValue("50")
    private Integer pageSize;
}
