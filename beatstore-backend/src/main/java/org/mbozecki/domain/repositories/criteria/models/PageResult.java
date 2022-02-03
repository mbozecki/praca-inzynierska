package org.mbozecki.domain.repositories.criteria.models;

import lombok.Getter;
import lombok.Setter;

import java.util.stream.Stream;

@Getter
@Setter
public class PageResult<T> {
    private long totalElements;
    private int number;
    private int size;
    private long totalPages;
    private Stream<T> stream;

    public PageResult(long totalElements, Stream<T> stream, Page page) {
        this.totalElements = totalElements;
        this.stream = stream;
        this.number = page.getNumber();
        this.size = page.getSize();
        this.totalPages = (totalElements + (long)this.size - 1) / (long)this.size;
    }

    public String toString() {
        return "PageResult{count=" + this.totalElements + ", number=" + this.number + ", size=" + this.size + "}";
    }
}
