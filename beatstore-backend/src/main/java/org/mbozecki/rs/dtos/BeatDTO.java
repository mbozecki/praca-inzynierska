package org.mbozecki.rs.dtos;

import io.quarkus.runtime.annotations.RegisterForReflection;
import lombok.Getter;
import lombok.Setter;
import java.util.List;


@Getter
@Setter
@RegisterForReflection
public class BeatDTO {
    private String guid;

    private String name;

    public String img_url;

    private Double price;

    private List<String> genre;

    private String link;

    private String producedby;

    public Integer howmanysold;
}
