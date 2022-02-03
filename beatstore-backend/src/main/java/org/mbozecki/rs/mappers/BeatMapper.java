package org.mbozecki.rs.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mbozecki.domain.models.Beat;
import org.mbozecki.domain.repositories.criteria.BeatSearchCriteria;
import org.mbozecki.domain.repositories.criteria.models.PageResult;
import org.mbozecki.rs.dtos.BeatDTO;
import org.mbozecki.rs.dtos.criteria.BeatSearchCriteriaDTO;
import org.mbozecki.rs.dtos.criteria.PageResultDTO;

import java.util.List;

@Mapper(componentModel = "cdi")
public interface BeatMapper {

    BeatDTO map(Beat user);

    List<BeatDTO> map(List<Beat> userList);

    @Mapping(target = "guid", ignore = true)
    Beat create(BeatDTO userDTO);

    void update(@MappingTarget Beat user, BeatDTO userDTO);

    BeatSearchCriteria mapToSearchCriteria(BeatSearchCriteriaDTO dto);

    PageResultDTO<BeatDTO> mapToPageResultDTO(PageResult<Beat> page);
}

