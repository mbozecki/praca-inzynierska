package org.mbozecki.domain.repositories.criteria.models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Page {
    private int number;
    private int size;

    private Page(int number, int size) {
        this.number = number;
        this.size = size;
    }

    public static Page of(int number, int size) {
        return new Page(number, size);
    }
}
