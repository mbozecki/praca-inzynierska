package org.mbozecki.rs.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mbozecki.domain.models.BeatMP3Full;
import org.mbozecki.rs.dtos.BeatMP3FullDTO;

import java.util.List;

@Mapper(componentModel = "cdi")
public interface BeatMP3FullMapper {

    BeatMP3FullDTO map(BeatMP3Full user);

    List<BeatMP3FullDTO> map(List<BeatMP3Full> userList);

    @Mapping(target = "guid", ignore = true)
    BeatMP3Full create(BeatMP3FullDTO userDTO);

    void update(@MappingTarget BeatMP3Full user, BeatMP3FullDTO userDTO);

}

