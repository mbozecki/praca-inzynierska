package org.mbozecki.rs.dtos;

import io.quarkus.runtime.annotations.RegisterForReflection;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import java.util.List;


@Getter
@Setter
@RegisterForReflection
public class BeatDTO {
    private String guid;

    private String name;

    public byte[] beatimg;

    private Double price;

    public Double BPM;

    public Double likeNumber;

    private String genre;

    public String mp3ID;

    private String producedby;

    public Integer howmanysold;

}
