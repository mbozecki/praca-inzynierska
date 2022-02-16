package org.mbozecki.rs.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mbozecki.domain.models.User;
import org.mbozecki.domain.repositories.criteria.UserSearchCriteria;
import org.mbozecki.domain.repositories.criteria.models.PageResult;
import org.mbozecki.rs.dtos.UserDTO;
import org.mbozecki.rs.dtos.criteria.PageResultDTO;
import org.mbozecki.rs.dtos.criteria.UserSearchCriteriaDTO;

import java.util.List;

@Mapper(componentModel = "cdi")
public interface UserMapper {

    UserDTO map(User user);

    List<UserDTO> map(List<User> userList);

    @Mapping(target = "guid", ignore = true)
    User create(UserDTO userDTO);

    void update(@MappingTarget User user, UserDTO userDTO);

    UserSearchCriteria mapToSearchCriteria(UserSearchCriteriaDTO dto);

    PageResultDTO<UserDTO> mapToPageResultDTO(PageResult<User> page);
}
