package org.mbozecki.rs.dtos;

import io.quarkus.runtime.annotations.RegisterForReflection;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import java.util.List;


@Getter
@Setter
@RegisterForReflection
public class BeatMP3DTO {
    public String guid;

    public String beatid;

    public String path;

}
