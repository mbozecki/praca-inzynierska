package org.mbozecki.domain.models;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Entity
@Table(name="t_beat")
public class Beat extends PanacheEntityBase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long guid;

    public String name;

    public String img_url;

    public Double price;

    @ElementCollection
    public List<String> genre = new ArrayList<String>();
    public String link;
    public String producedby;
    public Integer howmanysold;
}
