package org.mbozecki.rs.dtos.criteria;

import javax.ws.rs.QueryParam;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class BeatSearchCriteriaDTO extends PageCriteriaDTO {
    
    @QueryParam("name")
    private String name;

    @QueryParam("producedby")
    private String producedby;

}
