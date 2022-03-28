package org.mbozecki.rs.dtos;

import io.quarkus.runtime.annotations.RegisterForReflection;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import java.util.List;


@Getter
@Setter
@RegisterForReflection
public class BeatMP3FullDTO {
    public String guid;

    public String beatid;

    public byte[] fullbeatmp3;

}
