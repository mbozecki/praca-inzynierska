package org.mbozecki.rs.dtos.criteria;
import lombok.Getter;
import lombok.Setter;

import javax.ws.rs.QueryParam;

@Getter
@Setter
public class UserSearchCriteriaDTO extends PageCriteriaDTO {

    @QueryParam("name")
    private String name;

    @QueryParam("surname")
    private String surname;

    @QueryParam("email")
    private String email;
    
    @QueryParam("firebase_id")
    private String firebase_id;

}