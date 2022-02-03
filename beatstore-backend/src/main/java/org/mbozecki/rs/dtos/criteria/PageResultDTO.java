package org.mbozecki.rs.dtos.criteria;

import io.quarkus.runtime.annotations.RegisterForReflection;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@RegisterForReflection
public class PageResultDTO<T> {
    private long totalElements;
    private int number;
    private int size;
    private long totalPages;
    private List<T> stream;

    public PageResultDTO() {
    }
}
