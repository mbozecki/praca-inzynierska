package org.mbozecki.rs.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mbozecki.domain.models.Beat;
import org.mbozecki.domain.models.BeatMP3;
import org.mbozecki.domain.repositories.criteria.BeatSearchCriteria;
import org.mbozecki.domain.repositories.criteria.models.PageResult;
import org.mbozecki.rs.dtos.BeatDTO;
import org.mbozecki.rs.dtos.BeatMP3DTO;
import org.mbozecki.rs.dtos.criteria.BeatSearchCriteriaDTO;
import org.mbozecki.rs.dtos.criteria.PageResultDTO;

import java.util.List;

@Mapper(componentModel = "cdi")
public interface BeatMP3Mapper {

    BeatMP3DTO map(BeatMP3 user);

    List<BeatMP3DTO> map(List<BeatMP3> userList);

    @Mapping(target = "guid", ignore = true)
    BeatMP3 create(BeatMP3DTO userDTO);

    void update(@MappingTarget BeatMP3 user, BeatMP3DTO userDTO);

}

